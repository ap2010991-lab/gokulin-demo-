import { readStore, requireAdmin, writeStore } from "./_store.js";

export default async function handler(request, response) {
  if (request.method === "GET") {
    if (!requireAdmin(request, response)) return;
    const inventory = await readStore("inventory");
    const bookings = await readStore("bookings");
    const banquetBookings = await readStore("banquetBookings");
    response.status(200).json({ inventory, bookings, banquetBookings });
    return;
  }

  if (request.method === "POST") {
    const booking = request.body || {};
    if (!booking.id || !booking.roomId || !booking.checkIn || !booking.checkOut) {
      response.status(400).json({ error: "Missing booking details." });
      return;
    }

    const bookings = await readStore("bookings");
    const savedBooking = {
      ...booking,
      status: booking.status || "confirmed",
      createdAt: booking.createdAt || new Date().toISOString()
    };
    await writeStore("bookings", [savedBooking, ...bookings.filter((item) => item.id !== booking.id)]);
    response.status(200).json({ booking: savedBooking });
    return;
  }

  response.status(405).json({ error: "Method not allowed." });
}
