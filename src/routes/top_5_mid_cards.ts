import type { Env } from "../types";
import {
  fetchTop5MidCards,
  fetchTop5MidCardById,
  createTop5MidCard,
  removeTop5MidCard,
} from "../top_5_mid_cards/service";

export async function top5MidCardsRouter(req: Request, env: Env) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  // GET /top-5-mid-cards
  if (method === "GET" && pathname === "/top-5-mid-cards") {
    return Response.json(await fetchTop5MidCards(env));
  }

  // GET /top-5-mid-cards/:id
  if (method === "GET" && pathname.startsWith("/top-5-mid-cards/")) {
    const id = pathname.split("/")[2];
    return Response.json(await fetchTop5MidCardById(env, id));
  }

  // POST /top-5-mid-cards-admin
  if (method === "POST" && pathname === "/top-5-mid-cards-admin") {
    const body = await req.json() as any;
    return Response.json(
      await createTop5MidCard(env, body),
      { status: 201 }
    );
  }

  // DELETE /top-5-mid-cards/:id
  if (method === "DELETE" && pathname.startsWith("/top-5-mid-cards/")) {
    const id = pathname.split("/")[2];
    return Response.json(await removeTop5MidCard(env, id));
  }

  return new Response("Not Found", { status: 404 });
}
