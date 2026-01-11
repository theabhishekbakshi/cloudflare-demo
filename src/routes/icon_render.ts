import type { Env } from "../types";
import {
  fetchIconRenders,
  fetchIconRenderById,
  createIconRender,
  removeIconRender,
} from "../icon_renders/service";

export async function iconRenderRouter(req: Request, env: Env) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  // GET /icon-renders
  if (method === "GET" && pathname === "/icon-renders") {
    return Response.json(await fetchIconRenders(env));
  }

  // GET /icon-renders/:id
  if (method === "GET" && pathname.startsWith("/icon-renders/")) {
    const id = pathname.split("/")[2];
    return Response.json(await fetchIconRenderById(env, id));
  }

  // POST /icon-renders-admin
  if (method === "POST" && pathname === "/icon-renders-admin") {
    const body = await req.json();
    return Response.json(await createIconRender(env, body), { status: 201 });
  }

  // DELETE /icon-renders/:id
  if (method === "DELETE" && pathname.startsWith("/icon-renders/")) {
    const id = pathname.split("/")[2];
    return Response.json(await removeIconRender(env, id));
  }

  return new Response("Not Found", { status: 404 });
}
