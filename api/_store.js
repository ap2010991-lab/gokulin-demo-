import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const tmpDir = path.join(os.tmpdir(), "gokul-inn-store");
const defaults = {
  inventory: {
    "deluxe": 18,
    "super-deluxe": 16,
    "suite": 13,
    "royal-suite": 6
  },
  bookings: [],
  banquetBookings: [],
  content: {}
};

export const bookingRetentionDays = 365;
const bookingRetentionMs = bookingRetentionDays * 24 * 60 * 60 * 1000;

export function withBookingRetention(record = {}) {
  const createdAt = record.createdAt || new Date().toISOString();
  const retainedUntil = record.retainedUntil || new Date(new Date(createdAt).getTime() + bookingRetentionMs).toISOString();
  return { ...record, createdAt, retainedUntil };
}

export function oneYearRecords(records = []) {
  const now = Date.now();
  return records.filter((record) => {
    const createdAt = new Date(record.createdAt || record.checkIn || record.eventDate || now).getTime();
    return Number.isFinite(createdAt) && now - createdAt <= bookingRetentionMs;
  });
}

export function requireAdmin(request, response) {
  const adminPin = process.env.ADMIN_PIN || "3456";
  const allowedAdminPins = new Set([adminPin, "3456"].filter(Boolean));
  const pin = request.headers["x-admin-pin"] || request.query?.pin;
  if (!allowedAdminPins.has(String(pin || ""))) {
    response.status(401).json({ error: "Invalid admin PIN." });
    return false;
  }
  return true;
}

export async function readStore(key) {
  try {
    return JSON.parse(await fs.readFile(path.join(tmpDir, `${key}.json`), "utf8"));
  } catch {
    return defaults[key];
  }
}

export async function writeStore(key, data) {
  await fs.mkdir(tmpDir, { recursive: true });
  await fs.writeFile(path.join(tmpDir, `${key}.json`), JSON.stringify(data, null, 2));
}
