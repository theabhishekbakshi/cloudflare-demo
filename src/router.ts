import { reviewsRouter } from "./routes/player_review";
import { iconRenderRouter } from "./routes/icon_render";
import { playerRenderRouter } from "./routes/player_render";
import { nomineesRouter } from "./routes/nominees";
import { clubRouter } from "./routes/club";
import { nationRouter } from "./routes/nation";
import { leagueRouter } from "./routes/league";

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

  if (pathname.startsWith("/nominees")) return nomineesRouter(req, env);
  if (pathname.startsWith("/nominees-admin")) return nomineesRouter(req, env);


  if (pathname.startsWith("/clubs")) return clubRouter(req, env);
  if (pathname.startsWith("/clubs-admin")) return clubRouter(req, env);


  if (pathname.startsWith("/nations")) return nationRouter(req, env);
  if (pathname.startsWith("/nations-admin")) return nationRouter(req, env);


  if (pathname.startsWith("/leagues")) return leagueRouter(req, env);
  if (pathname.startsWith("/leagues-admin")) return leagueRouter(req, env);

  return new Response("Not Found", { status: 404 });
}
