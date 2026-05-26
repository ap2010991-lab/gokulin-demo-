import crypto from "node:crypto";
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

app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/payment-config", (_req, res) => {
  res.json({
    keyId: razorpayKeyId,
    liveMode: hasRazorpayKeys
  });
});

app.post("/api/create-order", async (req, res) => {
  const amount = Number(req.body?.amount);
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
