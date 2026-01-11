export interface PlayerRender {
  id: number;
  playerRenders: string; // R2 path
  playerName: string;
  club: string;
  nationality: string;
}


export async function getAllPlayerRenders(db: D1Database) {
  return (
    await db
      .prepare("SELECT * FROM PLAYER_RENDERS ORDER BY createdDate DESC")
      .all()
  ).results;
}

export async function getPlayerRenderById(
  db: D1Database,
  id: string
): Promise<PlayerRender | null> {
  return db
    .prepare("SELECT * FROM PLAYER_RENDERS WHERE id = ?")
    .bind(id)
    .first<PlayerRender>();
}

export async function insertPlayerRender(
  db: D1Database,
  data: {
    playerRenders: string;
    playerName: string;
    club: string;
    nationality: string;
  }
) {
  const res = await db
    .prepare(
      `INSERT INTO PLAYER_RENDERS (
        playerRenders,
        playerName,
        club,
        nationality
      ) VALUES (?, ?, ?, ?)`
    )
    .bind(
      data.playerRenders,
      data.playerName,
      data.club,
      data.nationality
    )
    .run();

  return res.meta?.last_row_id;
}

export async function deletePlayerRender(db: D1Database, id: string) {
  const res = await db
    .prepare("DELETE FROM PLAYER_RENDERS WHERE id = ?")
    .bind(id)
    .run();

  return res.meta?.changes ?? 0;
}
