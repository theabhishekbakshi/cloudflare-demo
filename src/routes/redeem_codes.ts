import type { Env } from "../types";
import {
  fetchRedeemCodes,
  fetchRedeemCodeById,
  createRedeemCode,
  toggleRedeemCode,
  redeemCode,
  removeRedeemCode,
} from "../redeem_codes/service";

export async function redeemCodesRouter(req: Request, env: Env) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  // GET /redeem-codes
  if (method === "GET" && pathname === "/redeem-codes") {
    return Response.json(await fetchRedeemCodes(env));
  }

  // GET /redeem-codes/:id
  if (method === "GET" && pathname.startsWith("/redeem-codes/")) {
    const id = pathname.split("/")[2];
    return Response.json(await fetchRedeemCodeById(env, id));
  }

  // POST /redeem-codes-admin
  if (method === "POST" && pathname === "/redeem-codes-admin") {
    const body = await req.json();
    return Response.json(await createRedeemCode(env, body), { status: 201 });
  }

  // PATCH /redeem-codes/:id/toggle
  if (method === "PATCH" && pathname.endsWith("/toggle")) {
    const id = pathname.split("/")[2];
     const body = await req.json() as { is_active: 0 | 1 }; // { is_active: 0 | 1 }
    return Response.json(
      await toggleRedeemCode(env, id, body.is_active)
    );
  }

  // POST /redeem
  if (method === "POST" && pathname === "/redeem") {
    const body = await req.json() as { code: string }; // { code }
    return Response.json(await redeemCode(env, body.code));
  }

  // DELETE /redeem-codes/:id
  if (method === "DELETE" && pathname.startsWith("/redeem-codes/")) {
    const id = pathname.split("/")[2];
    return Response.json(await removeRedeemCode(env, id));
  }

  return new Response("Not Found", { status: 404 });
}
