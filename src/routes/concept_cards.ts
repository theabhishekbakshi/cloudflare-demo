import type { Env } from "../types";
import {
  fetchConceptCards,
  fetchConceptCardById,
  createConceptCard,
  removeConceptCard,
} from "../concept_cards/service";

export async function conceptCardsRouter(req: Request, env: Env) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  // GET /concept-cards
  if (method === "GET" && pathname === "/concept-cards") {
    return Response.json(await fetchConceptCards(env));
  }

  // GET /concept-cards/:id
  if (method === "GET" && pathname.startsWith("/concept-cards/")) {
    const id = pathname.split("/")[2];
    return Response.json(await fetchConceptCardById(env, id));
  }

  // POST /concept-cards-admin
  if (method === "POST" && pathname === "/concept-cards-admin") {
    const body = await req.json() as any;
    return Response.json(
      await createConceptCard(env, body),
      { status: 201 }
    );
  }

  // DELETE /concept-cards/:id
  if (method === "DELETE" && pathname.startsWith("/concept-cards/")) {
    const id = pathname.split("/")[2];
    return Response.json(await removeConceptCard(env, id));
  }

  return new Response("Not Found", { status: 404 });
}
