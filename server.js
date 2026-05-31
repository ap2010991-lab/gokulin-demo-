import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import Razorpay from "razorpay";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 4173);

const razorpayKeyId = process.env.RAZORPAY_KEY_ID || "";
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || "";
const hasRazorpayKeys = Boolean(razorpayKeyId && razorpayKeySecret);

const razorpay = hasRazorpayKeys
  ? new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret })
  : null;
const bookingsPath = path.join(__dirname, "data", "bookings.json");
const inventoryPath = path.join(__dirname, "data", "inventory.json");
const banquetBookingsPath = path.join(__dirname, "data", "banquet-bookings.json");
const contentPath = path.join(__dirname, "data", "content.json");
const adminPin = process.env.ADMIN_PIN || "3456";
const allowedAdminPins = new Set([adminPin, "3456"].filter(Boolean));
const bookingRetentionDays = 365;
const bookingRetentionMs = bookingRetentionDays * 24 * 60 * 60 * 1000;

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

async function writeJson(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function requireAdmin(req, res) {
  const pin = req.headers["x-admin-pin"] || req.query?.pin;
  if (!allowedAdminPins.has(String(pin || ""))) {
    res.status(401).json({ error: "Invalid admin PIN." });
    return false;
  }
  return true;
}

function withBookingRetention(record = {}) {
  const createdAt = record.createdAt || new Date().toISOString();
  const retainedUntil = record.retainedUntil || new Date(new Date(createdAt).getTime() + bookingRetentionMs).toISOString();
  return { ...record, createdAt, retainedUntil };
}

function oneYearRecords(records = []) {
  const now = Date.now();
  return records.filter((record) => {
    const createdAt = new Date(record.createdAt || record.checkIn || record.eventDate || now).getTime();
    return Number.isFinite(createdAt) && now - createdAt <= bookingRetentionMs;
  });
}

app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/payment-config", (_req, res) => {
  res.json({
    keyId: razorpayKeyId,
    liveMode: hasRazorpayKeys
  });
});

app.get("/api/availability", async (_req, res) => {
  const inventory = await readJson(inventoryPath, {});
  const bookings = oneYearRecords(await readJson(bookingsPath, []));
  res.json({ inventory, bookings });
});

app.get("/api/content", async (_req, res) => {
  const content = await readJson(contentPath, {});
  res.json(content);
});

app.patch("/api/content", async (req, res) => {
  if (!requireAdmin(req, res)) return;
  await writeJson(contentPath, req.body || {});
  res.json({ content: req.body || {} });
});

app.get("/api/bookings", async (req, res) => {
  if (!requireAdmin(req, res)) return;
  const inventory = await readJson(inventoryPath, {});
  const bookings = oneYearRecords(await readJson(bookingsPath, []));
  const banquetBookings = oneYearRecords(await readJson(banquetBookingsPath, []));
  res.json({ inventory, bookings, banquetBookings, retentionDays: bookingRetentionDays });
});

app.post("/api/bookings", async (req, res) => {
  const booking = req.body || {};
  if (!booking.id || !booking.roomId || !booking.checkIn || !booking.checkOut) {
    res.status(400).json({ error: "Missing booking details." });
    return;
  }

  const bookings = await readJson(bookingsPath, []);
  const withoutDuplicate = bookings.filter((item) => item.id !== booking.id);
  const savedBooking = withBookingRetention({
    ...booking,
    status: booking.status || "confirmed"
  });
  withoutDuplicate.unshift(savedBooking);
  await writeJson(bookingsPath, withoutDuplicate);
  res.json({ booking: savedBooking });
});

app.patch("/api/inventory", async (req, res) => {
  if (!requireAdmin(req, res)) return;
  const inventory = await readJson(inventoryPath, {});
  const { roomId, count } = req.body || {};
  const nextCount = Number(count);
  if (!roomId || !Number.isFinite(nextCount) || nextCount < 0) {
    res.status(400).json({ error: "Invalid room inventory." });
    return;
  }
  inventory[roomId] = Math.round(nextCount);
  await writeJson(inventoryPath, inventory);
  res.json({ inventory });
});

app.post("/api/banquet-bookings", async (req, res) => {
  const enquiry = req.body || {};
  if (!enquiry.id || !enquiry.name || !enquiry.phone || !enquiry.eventDate) {
    res.status(400).json({ error: "Missing banquet enquiry details." });
    return;
  }

  const enquiries = await readJson(banquetBookingsPath, []);
  const savedEnquiry = withBookingRetention({
    ...enquiry,
    status: enquiry.status || "new"
  });
  enquiries.unshift(savedEnquiry);
  await writeJson(banquetBookingsPath, enquiries);
  res.json({ enquiry: savedEnquiry });
});

app.patch("/api/banquet-bookings", async (req, res) => {
  if (!requireAdmin(req, res)) return;
  const { id, status } = req.body || {};
  if (!id || !status) {
    res.status(400).json({ error: "Missing banquet enquiry status." });
    return;
  }
  const enquiries = await readJson(banquetBookingsPath, []);
  const updated = enquiries.map((item) => item.id === id ? { ...item, status } : item);
  await writeJson(banquetBookingsPath, updated);
  res.json({ banquetBookings: updated });
});

app.post("/api/create-order", async (req, res) => {
  const amount = Number(req.body?.paymentAmount || req.body?.amount);
  const bookingId = String(req.body?.bookingId || `GIN-${Date.now()}`);

  if (!Number.isFinite(amount) || amount < 100) {
    res.status(400).json({ error: "Invalid payment amount." });
    return;
  }

  if (!razorpay) {
    res.json({
      demo: true,
      order: {
        id: `order_demo_${bookingId}`,
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: bookingId
      }
    });
    return;
  }

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: bookingId,
      notes: {
        hotel: "Hotel Gokul Inn",
        bookingId
      }
    });

    res.json({ demo: false, order });
  } catch (error) {
    res.status(500).json({ error: "Unable to create Razorpay order." });
  }
});

app.post("/api/verify-payment", (req, res) => {
  const {
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
    bookingId
  } = req.body || {};

  if (!hasRazorpayKeys) {
    res.json({
      verified: true,
      demo: true,
      bookingId,
      paymentId: paymentId || `pay_demo_${Date.now()}`
    });
    return;
  }

  if (!orderId || !paymentId || !signature) {
    res.status(400).json({ verified: false, error: "Missing payment verification fields." });
    return;
  }

  const expectedSignature = crypto
    .createHmac("sha256", razorpayKeySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (expectedSignature !== signature) {
    res.status(400).json({ verified: false, error: "Payment verification failed." });
    return;
  }

  res.json({ verified: true, demo: false, bookingId, paymentId });
});

app.listen(port, () => {
  const mode = hasRazorpayKeys ? "Razorpay live/test keys enabled" : "demo mode, add Razorpay env keys to enable checkout";
  console.log(`Gokul Inn website running at http://localhost:${port} (${mode})`);
});
