import { readStore, requireAdmin, writeStore } from "./_store.js";

export default async function handler(request, response) {
  if (request.method !== "PATCH") {
    response.status(405).json({ error: "Method not allowed." });
    return;
  }

  if (!requireAdmin(request, response)) return;
  const inventory = await readStore("inventory");
  const { roomId, count } = request.body || {};
  const nextCount = Number(count);
  if (!roomId || !Number.isFinite(nextCount) || nextCount < 0) {
    response.status(400).json({ error: "Invalid room inventory." });
    return;
  }

  inventory[roomId] = Math.round(nextCount);
  await writeStore("inventory", inventory);
  response.status(200).json({ inventory });
}
