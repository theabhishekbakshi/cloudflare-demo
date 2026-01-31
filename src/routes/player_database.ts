import type { Env } from "../types";
import {
  fetchPlayers,
  fetchPlayerById,
  createPlayer,
  removePlayer,
} from "../player_database/service";

export async function playerDatabaseRouter(req: Request, env: Env) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  // GET /players
  if (method === "GET" && pathname === "/players") {
    return Response.json(await fetchPlayers(env));
  }

  // GET /players/:id
  if (method === "GET" && pathname.startsWith("/players/")) {
    const id = pathname.split("/")[2];
    return Response.json(await fetchPlayerById(env, id));
  }

  // POST /players-admin
  if (method === "POST" && pathname === "/players-admin") {
    const body = await req.json() as any;
    return Response.json(
      await createPlayer(env, body),
      { status: 201 }
    );
  }

  // DELETE /players/:id
  if (method === "DELETE" && pathname.startsWith("/players/")) {
    const id = pathname.split("/")[2];
    return Response.json(await removePlayer(env, id));
  }

  return new Response("Not Found", { status: 404 });
}
