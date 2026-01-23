import type { Env } from "../types";
import {
  fetchOfficialCards,
  fetchOfficialCardById,
  createOfficialCard,
  toggleAnimatedCard,
  removeOfficialCard,
} from "../official_cards/service";

export async function officialCardsRouter(req: Request, env: Env) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  // GET /official-cards
  if (method === "GET" && pathname === "/official-cards") {
    return Response.json(await fetchOfficialCards(env));
  }

  // GET /official-cards/:id
  if (method === "GET" && pathname.startsWith("/official-cards/")) {
    const id = pathname.split("/")[2];
    return Response.json(await fetchOfficialCardById(env, id));
  }

  // POST /official-cards-admin
  if (method === "POST" && pathname === "/official-cards-admin") {
    const body = await req.json() as any;
    return Response.json(
      await createOfficialCard(env, body),
      { status: 201 }
    );
  }

  // PATCH /official-cards/:id/toggle
  if (method === "PATCH" && pathname.endsWith("/toggle")) {
    const id = pathname.split("/")[2];
    const body = await req.json() as { has_animated: 0 | 1 };
    return Response.json(
      await toggleAnimatedCard(env, id, body.has_animated)
    );
  }

  // DELETE /official-cards/:id
  if (method === "DELETE" && pathname.startsWith("/official-cards/")) {
    const id = pathname.split("/")[2];
    return Response.json(await removeOfficialCard(env, id));
  }

  return new Response("Not Found", { status: 404 });
}
