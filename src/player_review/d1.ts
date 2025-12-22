export async function insertPlayerReview(
  db: D1Database,
  data: {
    ownerId: string;
    playerName: string;
    eventName: string;
    imagePath: string | null;
    pros: string;
    cons: string;
    verdict: string;
    rating: number;
    stats1: number;
    stats2: number;
    stats3: number;
    stats4: number;
    stats5: number;
    stats6: number;
    st_type1: string;
    st_type2: string;
    st_type3: string;
    st_type4: string;
    st_type5: string;
    st_type6: string;
  }
) {
  const res = await db
    .prepare(
      `INSERT INTO PLAYER_REVIEWS (
        ownerId, playerName, eventName, imageReview,
        pros, cons, verdict, rating,
        stats1, stats2, stats3, stats4, stats5, stats6,
        st_type1, st_type2, st_type3, st_type4, st_type5, st_type6
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )`
    )
    .bind(
      data.ownerId,
      data.playerName,
      data.eventName,
      data.imagePath,
      data.pros,
      data.cons,
      data.verdict,
      data.rating,
      data.stats1,
      data.stats2,
      data.stats3,
      data.stats4,
      data.stats5,
      data.stats6,
      data.st_type1,
      data.st_type2,
      data.st_type3,
      data.st_type4,
      data.st_type5,
      data.st_type6
    )
    .run();

  return res.meta?.last_row_id;
}
