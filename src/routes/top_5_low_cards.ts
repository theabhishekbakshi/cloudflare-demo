import type { Env } from "../types";
import {
  fetchTop5LowCards,
  fetchTop5LowCardById,
  createTop5LowCard,
  removeTop5LowCard,
} from "../top_5_low_cards/service";

export async function top5LowCardsRouter(req: Request, env: Env) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  // GET /top-5-low-cards
  if (method === "GET" && pathname === "/top-5-low-cards") {
    return Response.json(await fetchTop5LowCards(env));
  }

  // GET /top-5-low-cards/:id
  if (method === "GET" && pathname.startsWith("/top-5-low-cards/")) {
    const id = pathname.split("/")[2];
    return Response.json(await fetchTop5LowCardById(env, id));
  }

  // POST /top-5-low-cards-admin
  if (method === "POST" && pathname === "/top-5-low-cards-admin") {
    const body = await req.json() as any;
    return Response.json(
      await createTop5LowCard(env, body),
      { status: 201 }
    );
  }

  // DELETE /top-5-low-cards/:id
  if (method === "DELETE" && pathname.startsWith("/top-5-low-cards/")) {
    const id = pathname.split("/")[2];
    return Response.json(await removeTop5LowCard(env, id));
  }

  return new Response("Not Found", { status: 404 });
}
