import type { Env } from "../types";
import {
  fetchTop10Cards,
  fetchTop10CardById,
  createTop10Card,
  removeTop10Card,
} from "../top_10_cards/service";

export async function top10CardsRouter(req: Request, env: Env) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  if (method === "GET" && pathname === "/top-10-cards") {
    return Response.json(await fetchTop10Cards(env));
  }

  if (method === "GET" && pathname.startsWith("/top-10-cards/")) {
    const id = pathname.split("/")[2];
    return Response.json(await fetchTop10CardById(env, id));
  }

  if (method === "POST" && pathname === "/top-10-cards-admin") {
    const body = await req.json() as any;
    return Response.json(
      await createTop10Card(env, body),
      { status: 201 }
    );
  }

  if (method === "DELETE" && pathname.startsWith("/top-10-cards/")) {
    const id = pathname.split("/")[2];
    return Response.json(await removeTop10Card(env, id));
  }

  return new Response("Not Found", { status: 404 });
}
