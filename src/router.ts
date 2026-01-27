import { reviewsRouter } from "./routes/player_review";
import { iconRenderRouter } from "./routes/icon_render";
import { playerRenderRouter } from "./routes/player_render";
import { nomineesRouter } from "./routes/nominees";
import { clubRouter } from "./routes/club";
import { nationRouter } from "./routes/nation";
import { leagueRouter } from "./routes/league";
import { redeemCodesRouter } from "./routes/redeem_codes";
import { conceptCardsRouter } from "./routes/concept_cards";
import { officialCardsRouter } from "./routes/official_cards";
import { otherVersionCardsRouter } from "./routes/other_version_cards";
import { top10CardsRouter } from "./routes/top_10_cards";
import { top5MidCardsRouter } from "./routes/top_5_mid_cards";
import { top5LowCardsRouter } from "./routes/top_5_low_cards";

import type { Env } from "./types";

export async function route(req: Request, env: Env) {
  const { pathname } = new URL(req.url);

  if (pathname.startsWith("/reviews")) { return reviewsRouter(req, env); }
  if (pathname.startsWith("/reviews-admin")) { return reviewsRouter(req, env); }


  if (pathname.startsWith("/icon-renders")) { return iconRenderRouter(req, env);}
  if (pathname.startsWith("/icon-renders-admin")) { return iconRenderRouter(req, env);}


  if (pathname.startsWith("/player-renders")) { return playerRenderRouter(req, env);}
  if (pathname.startsWith("/player-renders-admin")) { return playerRenderRouter(req, env);}


  if (pathname.startsWith("/nominees")) return nomineesRouter(req, env);
  if (pathname.startsWith("/nominees-admin")) return nomineesRouter(req, env);


  if (pathname.startsWith("/clubs")) return clubRouter(req, env);
  if (pathname.startsWith("/clubs-admin")) return clubRouter(req, env);


  if (pathname.startsWith("/nations")) return nationRouter(req, env);
  if (pathname.startsWith("/nations-admin")) return nationRouter(req, env);


  if (pathname.startsWith("/leagues")) return leagueRouter(req, env);
  if (pathname.startsWith("/leagues-admin")) return leagueRouter(req, env);


  if (pathname.startsWith("/redeem-codes")) return redeemCodesRouter(req, env);
  if (pathname.startsWith("/redeem-codes-admin")) return redeemCodesRouter(req, env);


  if (pathname.startsWith("/concept-cards")) return conceptCardsRouter(req, env);
  if (pathname.startsWith("/concept-cards-admin")) return conceptCardsRouter(req, env);


  if (pathname.startsWith("/official-cards")) return officialCardsRouter(req, env);
  if (pathname.startsWith("/official-cards-admin")) return officialCardsRouter(req, env);


  if (pathname.startsWith("/other-version-cards")) return otherVersionCardsRouter(req, env);
  if (pathname.startsWith("/other-version-cards-admin")) return otherVersionCardsRouter(req, env);


  if (pathname.startsWith("/top-10-cards")) return top10CardsRouter(req, env);
  if (pathname.startsWith("/top-10-cards-admin")) return top10CardsRouter(req, env);


  if (pathname.startsWith("/top-5-mid-cards")) return top5MidCardsRouter(req, env);
  if (pathname.startsWith("/top-5-mid-cards-admin")) return top5MidCardsRouter(req, env);


  if (pathname.startsWith("/top-5-low-cards")) return top5LowCardsRouter(req, env);
  if (pathname.startsWith("/top-5-low-cards-admin")) return top5LowCardsRouter(req, env);

  return new Response("Not Found", { status: 404 });
}
