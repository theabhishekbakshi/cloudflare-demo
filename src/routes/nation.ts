import type { Env } from "../types";
import {
  fetchNations,
  fetchNationById,
  createNation,
  removeNation,
} from "../nation/service";

export async function nationRouter(req: Request, env: Env) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  // GET /nations
  if (method === "GET" && pathname === "/nations") {
    return Response.json(await fetchNations(env));
  }

  // GET /nations/:id
  if (method === "GET" && pathname.startsWith("/nations/")) {
    const id = pathname.split("/")[2];
    return Response.json(await fetchNationById(env, id));
  }

  // POST /nations-admin
  if (method === "POST" && pathname === "/nations-admin") {
    const body = await req.json();
    return Response.json(await createNation(env, body), { status: 201 });
  }

  // DELETE /nations/:id
  if (method === "DELETE" && pathname.startsWith("/nations/")) {
    const id = pathname.split("/")[2];
    return Response.json(await removeNation(env, id));
  }

  return new Response("Not Found", { status: 404 });
}
