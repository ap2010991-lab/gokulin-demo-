import { readStore, requireAdmin, writeStore } from "./_store.js";

export default async function handler(request, response) {
  if (request.method === "GET") {
    response.status(200).json(await readStore("content"));
    return;
  }

  if (request.method === "PATCH") {
    if (!requireAdmin(request, response)) return;
    await writeStore("content", request.body || {});
    response.status(200).json({ content: request.body || {} });
    return;
  }

  response.status(405).json({ error: "Method not allowed." });
}
