import type { Env } from "../types";
import {
  fetchPlayerReviews,
  fetchPlayerReviewById,
  createPlayerReview,
  removePlayerReview,
} from "../player_reviews/service";

export async function playerReviewsRouter(req: Request, env: Env) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  // GET /player-reviews
  if (method === "GET" && pathname === "/player-reviews") {
    return Response.json(await fetchPlayerReviews(env));
  }

  // GET /player-reviews/:id
  if (method === "GET" && pathname.startsWith("/player-reviews/")) {
    const id = pathname.split("/")[2];
    return Response.json(await fetchPlayerReviewById(env, id));
  }

  // POST /player-reviews-admin
  if (method === "POST" && pathname === "/player-reviews-admin") {
    const body = await req.json() as any;
    return Response.json(
      await createPlayerReview(env, body),
      { status: 201 }
    );
  }

  // DELETE /player-reviews/:id
  if (method === "DELETE" && pathname.startsWith("/player-reviews/")) {
    const id = pathname.split("/")[2];
    return Response.json(await removePlayerReview(env, id));
  }

  return new Response("Not Found", { status: 404 });
}
