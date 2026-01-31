export interface PlayerDatabaseRow {
  id: number;

  cardimg_url: string | null;
  headshot_url: string | null;
  nationflag_url: string | null;
  leaguecrest_url: string | null;
  clublogo_url: string | null;

  ovr_font_hex: string;
  pos_font_hex: string;
  name_font_hex: string;

  ovr: number | null;
  position: string | null;
  player_name: string | null;
  card_type: string | null;

  createdDate: string;
  updatedDate: string;
}

export async function getAllPlayers(db: D1Database) {
  return (
    await db
      .prepare("SELECT * FROM PLAYER_DATABASE ORDER BY createdDate DESC")
      .all<PlayerDatabaseRow>()
  ).results;
}

export async function getPlayerById(db: D1Database, id: string) {
  return db
    .prepare("SELECT * FROM PLAYER_DATABASE WHERE id = ?")
    .bind(id)
    .first<PlayerDatabaseRow>();
}

export async function insertPlayer(
  db: D1Database,
  data: Record<string, any>
) {
  const keys = Object.keys(data);
  const placeholders = keys.map(() => "?").join(", ");

  const res = await db
    .prepare(
      `INSERT INTO PLAYER_DATABASE (${keys.join(", ")})
       VALUES (${placeholders})`
    )
    .bind(...keys.map(k => data[k]))
    .run();

  return res.meta?.last_row_id;
}

export async function deletePlayer(db: D1Database, id: string) {
  await db
    .prepare("DELETE FROM PLAYER_DATABASE WHERE id = ?")
    .bind(id)
    .run();
}
