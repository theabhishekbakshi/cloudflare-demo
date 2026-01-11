
export interface IconRender {
  id: number;
  playerRenders: string;
  nation: string;
  playerImage: string;
}


export async function getAllIconRenders(db: D1Database) {
  return (
    await db
      .prepare("SELECT * FROM ICON_RENDERS ORDER BY createdDate DESC")
      .all()
  ).results;
}

export async function getIconRenderById(
  db: D1Database,
  id: string
): Promise<IconRender | null> {
  return db
    .prepare("SELECT * FROM ICON_RENDERS WHERE id = ?")
    .bind(id)
    .first<IconRender>();
}

export async function insertIconRender(
  db: D1Database,
  data: {
    playerRenders: string;
    nation: string;
    playerImage: string;
  }
) {
  const res = await db
    .prepare(
      `INSERT INTO ICON_RENDERS (playerRenders, nation, playerImage)
       VALUES (?, ?, ?)`
    )
    .bind(data.playerRenders, data.nation, data.playerImage)
    .run();

  return res.meta?.last_row_id;
}

export async function deleteIconRender(db: D1Database, id: string) {
  const res = await db
    .prepare("DELETE FROM ICON_RENDERS WHERE id = ?")
    .bind(id)
    .run();

  return res.meta?.changes ?? 0;
}
