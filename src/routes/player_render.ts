import type { Env } from "../types";
import {
  fetchPlayerRenders,
  fetchPlayerRenderById,
  createPlayerRender,
  removePlayerRender,
} from "../player_renders/service";

export async function playerRenderRouter(req: Request, env: Env) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  // GET /player-renders
  if (method === "GET" && pathname === "/player-renders") {
    return Response.json(await fetchPlayerRenders(env));
  }

  // GET /player-renders/:id
  if (method === "GET" && pathname.startsWith("/player-renders/")) {
    const id = pathname.split("/")[2];
    return Response.json(await fetchPlayerRenderById(env, id));
  }

  // POST /player-renders-admin
  if (method === "POST" && pathname === "/player-renders-admin") {
    const body = await req.json();
    return Response.json(await createPlayerRender(env, body), {
      status: 201,
    });
  }

  // DELETE /player-renders/:id
  if (method === "DELETE" && pathname.startsWith("/player-renders/")) {
    const id = pathname.split("/")[2];
    return Response.json(await removePlayerRender(env, id));
  }

  return new Response("Not Found", { status: 404 });
}
