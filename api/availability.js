import { readStore } from "./_store.js";

export default async function handler(_request, response) {
  const inventory = await readStore("inventory");
  const bookings = await readStore("bookings");
  response.status(200).json({ inventory, bookings });
}
