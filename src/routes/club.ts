import type { Env } from "../types";
import {
  fetchClubs,
  fetchClubById,
  createClub,
  removeClub,
} from "../club/service";

export async function clubRouter(req: Request, env: Env) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  // GET /clubs
  if (method === "GET" && pathname === "/clubs") {
    return Response.json(await fetchClubs(env));
  }

  // GET /clubs/:id
  if (method === "GET" && pathname.startsWith("/clubs/")) {
    const id = pathname.split("/")[2];
    return Response.json(await fetchClubById(env, id));
  }

  // POST /clubs-admin
  if (method === "POST" && pathname === "/clubs-admin") {
    const body = await req.json();
    return Response.json(await createClub(env, body), { status: 201 });
  }

  // DELETE /clubs/:id
  if (method === "DELETE" && pathname.startsWith("/clubs/")) {
    const id = pathname.split("/")[2];
    return Response.json(await removeClub(env, id));
  }

  return new Response("Not Found", { status: 404 });
}
