import type { Env } from "../types";
import {
  fetchOtherVersionCards,
  fetchOtherVersionCardById,
  createOtherVersionCard,
  toggleCardsApplicable,
  removeOtherVersionCard,
} from "../other_version_cards/service";

export async function otherVersionCardsRouter(req: Request, env: Env) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  // GET /other-version-cards
  if (method === "GET" && pathname === "/other-version-cards") {
    return Response.json(await fetchOtherVersionCards(env));
  }

  // GET /other-version-cards/:id
  if (method === "GET" && pathname.startsWith("/other-version-cards/")) {
    const id = pathname.split("/")[2];
    return Response.json(await fetchOtherVersionCardById(env, id));
  }

  // POST /other-version-cards-admin
  if (method === "POST" && pathname === "/other-version-cards-admin") {
    const body = await req.json() as any;
    return Response.json(
      await createOtherVersionCard(env, body),
      { status: 201 }
    );
  }

  // PATCH /other-version-cards/:id/toggle
  if (method === "PATCH" && pathname.endsWith("/toggle")) {
    const id = pathname.split("/")[2];
    const body = await req.json() as { cards_applicable: 0 | 1 };
    return Response.json(
      await toggleCardsApplicable(env, id, body.cards_applicable)
    );
  }

  // DELETE /other-version-cards/:id
  if (method === "DELETE" && pathname.startsWith("/other-version-cards/")) {
    const id = pathname.split("/")[2];
    return Response.json(await removeOtherVersionCard(env, id));
  }

  return new Response("Not Found", { status: 404 });
}
