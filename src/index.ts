export interface Env {
  fcforum: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // ------------------------------
    // GET /reviews  → get all reviews
    // ------------------------------
    if (method === "GET" && path === "/reviews") {
      const q = await env.fcforum.prepare(
        "SELECT * FROM PLAYER_REVIEWS ORDER BY createdDate DESC"
      ).all();

      return Response.json(q.results);
    }

    // -----------------------------------------
    // GET /reviews/:id  → get single review by id
    if (method === "GET" && path.startsWith("/reviews/")) {
      const id = path.split("/")[2];

      const q = await env.fcforum
  .prepare("SELECT * FROM PLAYER_REVIEWS WHERE id = ?")
  .first(id);

      if (!q) return Response.json({ error: "Review not found" }, { status: 404 });

      return Response.json(q);
    }

    // -----------------------------------------------------
    // POST /reviews  → create a new review
    // Body: { ownerId, playerName, eventName, ... }
    // -----------------------------------------------------
    if (method === "POST" && path === "/reviews") {
  const body = await request.json() as Record<string, any>;

  const required = [
    "ownerId", "playerName", "eventName",
    "pros", "cons", "verdict", "rating",
    "stats1", "stats2", "stats3", "stats4", "stats5", "stats6",
    "st_type1", "st_type2", "st_type3", "st_type4", "st_type5", "st_type6",
  ];

  for (const field of required) {
    if (body[field] === undefined || body[field] === null) {
      return Response.json(
        { error: `${field} is required` },
        { status: 400 }
      );
    }
  }

  const insert = await env.fcforum
    .prepare(
      `INSERT INTO PLAYER_REVIEWS (
        ownerId, playerName, eventName, imageReview, reviewee, alt1, alt2, alt3,
        pros, cons, verdict, rating, rlink, playerReviews_players, urlReview,
        partnerId, partnerName, partnerUrl, playerReviews_list, playerReviews_item,
        stats1, stats2, stats3, stats4, stats5, stats6,
        st_type1, st_type2, st_type3, st_type4, st_type5, st_type6,
        skillImage1, skillImage2, skillImage3, skillImage4, skillImage5, skillImage6,
        skill1, skill2, skill3, skill4, skill5, skill6,
        wf_1, sm1, st1, pos, rev_cred, rev_cred_url, urlSlugCopy
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?
      )`
    )
    .bind(
      body.ownerId,
      body.playerName,
      body.eventName,
      body.imageReview ?? null,
      body.reviewee ?? null,
      body.alt1 ?? null,
      body.alt2 ?? null,
      body.alt3 ?? null,
      body.pros,
      body.cons,
      body.verdict,
      body.rating,
      body.rlink ?? null,
      body.playerReviews_players ?? null,
      body.urlReview ?? null,
      body.partnerId ?? null,
      body.partnerName ?? null,
      body.partnerUrl ?? null,
      body.playerReviews_list ?? null,
      body.playerReviews_item ?? null,
      body.stats1,
      body.stats2,
      body.stats3,
      body.stats4,
      body.stats5,
      body.stats6,
      body.st_type1,
      body.st_type2,
      body.st_type3,
      body.st_type4,
      body.st_type5,
      body.st_type6,
      body.skillImage1 ?? null,
      body.skillImage2 ?? null,
      body.skillImage3 ?? null,
      body.skillImage4 ?? null,
      body.skillImage5 ?? null,
      body.skillImage6 ?? null,
      body.skill1 ?? null,
      body.skill2 ?? null,
      body.skill3 ?? null,
      body.skill4 ?? null,
      body.skill5 ?? null,
      body.skill6 ?? null,
      body.wf_1 ?? null,
      body.sm1 ?? null,
      body.st1 ?? null,
      body.pos ?? null,
      body.rev_cred ?? null,
      body.rev_cred_url ?? null,
      body.urlSlugCopy ?? null
    )
    .run();

  return Response.json({
    success: true,
    id: insert.meta?.last_row_id,
  });
}


    // -----------------------------------------------------
    // PUT /reviews/:id → update review partially
    // -----------------------------------------------------
    if (method === "PUT" && path.startsWith("/reviews/")) {
  const id = path.split("/")[2];

  const body = await request.json() as Record<string, any>;

  const fields = Object.keys(body);

  if (fields.length === 0) {
    return Response.json(
      { error: "No fields provided" },
      { status: 400 }
    );
  }

  const setClause = fields.map((key) => `${key} = ?`).join(", ");
  const values = fields.map((key) => body[key]);

  // add id for WHERE clause
  values.push(id);

  const update = await env.fcforum
    .prepare(
      `UPDATE PLAYER_REVIEWS
       SET ${setClause}, updatedDate = CURRENT_TIMESTAMP
       WHERE id = ?`
    )
    .bind(...values)   // ✅ bind parameters here
    .run();            // ✅ run with NO arguments

  return Response.json({
    success: true,
    updated: update.meta?.changes,
  });
}



    // -----------------------------------------------------
    // DELETE /reviews/:id → delete review
    // -----------------------------------------------------
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

    // Default fallback
    return new Response("Route not found", { status: 404 });
  },
};
