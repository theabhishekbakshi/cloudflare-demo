import {
  createPlayerReview,
  fetchAllReviews,
  fetchReviewById,
} from "./player_review/service";
import type { Env } from "./types";


export default {
  async fetch(request: Request, env: Env): Promise<Response> {

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // GET /reviews
    if (method === "GET" && path === "/reviews") {
      const reviews = await fetchAllReviews(env);
      return Response.json(reviews);
    }

    // GET /reviews/:id
    if (method === "GET" && path.startsWith("/reviews/")) {
      const id = path.split("/")[2];
      const review = await fetchReviewById(env, id);

      if (!review) {
        return Response.json({ error: "Not found" }, { status: 404 });
      }

      return Response.json(review);
    }

    // POST /reviews
    if (method === "POST" && path === "/reviews") {
      const body = await request.json() as Record<string, any>;
      const result = await createPlayerReview(env, body);

      return Response.json({
        success: true,
        id: result.id,
        image: result.imagePath,
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};
