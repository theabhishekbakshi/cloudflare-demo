import { createPlayerReview } from "./player_review/service";
import type { Env } from "./types";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/reviews") {
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
