import { oneYearRecords, readStore, requireAdmin, withBookingRetention, writeStore } from "./_store.js";

export default async function handler(request, response) {
  if (request.method === "POST") {
    const enquiry = request.body || {};
    if (!enquiry.id || !enquiry.name || !enquiry.phone || !enquiry.eventDate) {
      response.status(400).json({ error: "Missing banquet enquiry details." });
      return;
    }

    const banquetBookings = await readStore("banquetBookings");
    const savedEnquiry = withBookingRetention({
      ...enquiry,
      status: enquiry.status || "new"
    });
    await writeStore("banquetBookings", [savedEnquiry, ...banquetBookings]);
    response.status(200).json({ enquiry: savedEnquiry });
    return;
  }

  if (request.method === "PATCH") {
    if (!requireAdmin(request, response)) return;
    const { id, status } = request.body || {};
    if (!id || !status) {
      response.status(400).json({ error: "Missing banquet enquiry status." });
      return;
    }

    const banquetBookings = oneYearRecords(await readStore("banquetBookings"));
    const updated = banquetBookings.map((item) => item.id === id ? { ...item, status } : item);
    await writeStore("banquetBookings", updated);
    response.status(200).json({ banquetBookings: updated });
    return;
  }

  response.status(405).json({ error: "Method not allowed." });
}
