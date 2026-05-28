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

export function requireAdmin(request, response) {
  const adminPin = process.env.ADMIN_PIN || "2468";
  const pin = request.headers["x-admin-pin"] || request.query?.pin;
  if (String(pin || "") !== adminPin) {
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
