import { reviewsRouter } from "./routes/player_review";
import { iconRenderRouter } from "./routes/icon_render";
import { playerRenderRouter } from "./routes/player_render";

import type { Env } from "./types";

export async function route(req: Request, env: Env) {
  const { pathname } = new URL(req.url);

  if (pathname.startsWith("/reviews")) {
    return reviewsRouter(req, env);
  }

  if (pathname.startsWith("/reviews-admin")) {
    return reviewsRouter(req, env);
  }

  if (pathname.startsWith("/icon-renders")) {
    return iconRenderRouter(req, env);
  }

  if (pathname.startsWith("/icon-renders-admin")) {
    return iconRenderRouter(req, env);
  }

   if (pathname.startsWith("/player-renders")) {
    return playerRenderRouter(req, env);
  }

  if (pathname.startsWith("/player-renders-admin")) {
    return playerRenderRouter(req, env);
  }

  return new Response("Not Found", { status: 404 });
}
