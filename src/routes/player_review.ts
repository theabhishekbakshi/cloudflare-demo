import {
  fetchAllReviews,
  fetchReviewById,
  createPlayerReview,
} from "../player_review/service";
import type { Env } from "../types";

export async function reviewsRouter(req: Request, env: Env) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  if (method === "GET" && pathname === "/reviews") {
    return Response.json(await fetchAllReviews(env));
  }

  if (method === "GET" && pathname.startsWith("/reviews/")) {
    const id = pathname.split("/")[2];
    return Response.json(await fetchReviewById(env, id));
  }

  if (method === "POST" && pathname === "/reviews-admin") {
    const body = (await req.json()) as Record<string, any>;
    return Response.json(await createPlayerReview(env, body), { status: 201 });
  }

//   if (method === "DELETE" && pathname.startsWith("/reviews/")) {
//     const id = pathname.split("/")[2];
//     return Response.json(await deleteReview(env, id));
//   }

  return new Response("Not Found", { status: 404 });
}
