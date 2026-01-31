export interface PlayerReviewRow {
  id: number;

  urlSlug: string | null;
  playerName: string | null;
  position: string | null;
  eventName: string | null;

  playerImage: string | null;

  weakFoot: string | null;
  skillMove: string | null;
  stamina: number | null;

  stats1: number | null;
  stats2: number | null;
  stats3: number | null;
  stats4: number | null;
  stats5: number | null;
  stats6: number | null;

  statsType1: string | null;
  statsType2: string | null;
  statsType3: string | null;
  statsType4: string | null;
  statsType5: string | null;
  statsType6: string | null;

  skillPoints1: string | null;
  skillPoints2: string | null;
  skillPoints3: string | null;

  pros: string | null;
  cons: string | null;
  finalVerdict: string | null;
  rating: number | null;

  alternative1: string | null;
  alternative2: string | null;
  alternative3: string | null;

  playerReviews_item: string | null;

  createdDate: string;
  updatedDate: string;
}

export async function getAllPlayerReviews(db: D1Database) {
  return (
    await db
      .prepare("SELECT * FROM PLAYER_REVIEWS ORDER BY createdDate DESC")
      .all<PlayerReviewRow>()
  ).results;
}

export async function getPlayerReviewById(db: D1Database, id: string) {
  return db
    .prepare("SELECT * FROM PLAYER_REVIEWS WHERE id = ?")
    .bind(id)
    .first<PlayerReviewRow>();
}

export async function insertPlayerReview(
  db: D1Database,
  data: Record<string, any>
) {
  const keys = Object.keys(data);
  const placeholders = keys.map(() => "?").join(", ");

  const res = await db
    .prepare(
      `INSERT INTO PLAYER_REVIEWS (${keys.join(", ")})
       VALUES (${placeholders})`
    )
    .bind(...keys.map(k => data[k]))
    .run();

  return res.meta?.last_row_id;
}

export async function deletePlayerReview(db: D1Database, id: string) {
  await db
    .prepare("DELETE FROM PLAYER_REVIEWS WHERE id = ?")
    .bind(id)
    .run();
}
