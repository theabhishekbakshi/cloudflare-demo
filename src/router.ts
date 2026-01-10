import { reviewsRouter } from "./routes/player_review";
import type { Env } from "./types";

export async function route(req: Request, env: Env) {
  const { pathname } = new URL(req.url);

  if (pathname.startsWith("/reviews")) {
    return reviewsRouter(req, env);
  }

  return new Response("Not Found", { status: 404 });
}
