import {
  createPlayerReview,
  fetchAllReviews,
  fetchReviewById,
} from "./player_review/service";
import type { Env } from "./types";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {

    // ✅ MUST be first
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // GET /reviews
    if (method === "GET" && path === "/reviews") {
      const reviews = await fetchAllReviews(env);
      return json(reviews);
    }

    // GET /reviews/:id
    if (method === "GET" && path.startsWith("/reviews/")) {
      const id = path.split("/")[2];
      const review = await fetchReviewById(env, id);

      if (!review) {
        return json({ error: "Not found" }, 404);
      }

      return json(review);
    }

    // POST /reviews
    if (method === "POST" && path === "/reviews") {
      const body = await request.json() as Record<string, any>;
      const result = await createPlayerReview(env, body);

      return json(
        {
          success: true,
          id: result.id,
          image: result.imagePath,
        },
        201
      );
    }

    if (method === "DELETE" && path.startsWith("/reviews/")) {
      const id = path.split("/")[2];

      const del = await env.fcforum.prepare(
        "DELETE FROM PLAYER_REVIEWS WHERE id = ?"
      ).bind(id).run();

      return Response.json({
        success: true,
        deleted: del.meta?.changes,
      });
    }

    // ✅ 404 WITH CORS
    return json({ error: "Route not found" }, 404);
  },
};
