import type { Env } from "../types";
import {
  fetchNominees,
  fetchNomineeById,
  createNominee,
  removeNominee,
} from "../nominees/service";

export async function nomineesRouter(req: Request, env: Env) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  if (method === "GET" && pathname === "/nominees") {
    return Response.json(await fetchNominees(env));
  }

  if (method === "GET" && pathname.startsWith("/nominees/")) {
    const id = pathname.split("/")[2];
    return Response.json(await fetchNomineeById(env, id));
  }

  if (method === "POST" && pathname === "/nominees-admin") {
    const body = await req.json();
    return Response.json(await createNominee(env, body), { status: 201 });
  }

  if (method === "DELETE" && pathname.startsWith("/nominees/")) {
    const id = pathname.split("/")[2];
    return Response.json(await removeNominee(env, id));
  }

  return new Response("Not Found", { status: 404 });
}
