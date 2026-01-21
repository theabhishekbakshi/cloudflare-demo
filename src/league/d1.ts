export interface LeagueRow {
  id: number;
  league: string;
  league_image: string;
  createdDate: string;
  updatedDate: string;
}

export async function getAllLeagues(db: D1Database) {
  return (
    await db
      .prepare("SELECT * FROM LEAGUE ORDER BY createdDate DESC")
      .all<LeagueRow>()
  ).results;
}

export async function getLeagueById(
  db: D1Database,
  id: string
): Promise<LeagueRow | null> {
  return db
    .prepare("SELECT * FROM LEAGUE WHERE id = ?")
    .bind(id)
    .first<LeagueRow>();
}

export async function insertLeague(
  db: D1Database,
  data: { league: string; league_image: string }
) {
  const res = await db
    .prepare(
      `INSERT INTO LEAGUE (league, league_image)
       VALUES (?, ?)`
    )
    .bind(data.league, data.league_image)
    .run();

  return res.meta?.last_row_id;
}

export async function deleteLeague(db: D1Database, id: string) {
  await db.prepare("DELETE FROM LEAGUE WHERE id = ?").bind(id).run();
}
