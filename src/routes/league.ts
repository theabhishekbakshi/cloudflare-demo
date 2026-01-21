import type { Env } from "../types";
import {
  fetchLeagues,
  fetchLeagueById,
  createLeague,
  removeLeague,
} from "../league/service";

export async function leagueRouter(req: Request, env: Env) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  // GET /leagues
  if (method === "GET" && pathname === "/leagues") {
    return Response.json(await fetchLeagues(env));
  }

  // GET /leagues/:id
  if (method === "GET" && pathname.startsWith("/leagues/")) {
    const id = pathname.split("/")[2];
    return Response.json(await fetchLeagueById(env, id));
  }

  // POST /leagues-admin
  if (method === "POST" && pathname === "/leagues-admin") {
    const body = await req.json();
    return Response.json(await createLeague(env, body), { status: 201 });
  }

  // DELETE /leagues/:id
  if (method === "DELETE" && pathname.startsWith("/leagues/")) {
    const id = pathname.split("/")[2];
    return Response.json(await removeLeague(env, id));
  }

  return new Response("Not Found", { status: 404 });
}
