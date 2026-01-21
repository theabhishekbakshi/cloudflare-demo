export interface NationRow {
  id: number;
  nation: string;
  nation_image: string;
  createdDate: string;
  updatedDate: string;
}

export async function getAllNations(db: D1Database) {
  return (
    await db
      .prepare("SELECT * FROM NATION ORDER BY createdDate DESC")
      .all<NationRow>()
  ).results;
}

export async function getNationById(
  db: D1Database,
  id: string
): Promise<NationRow | null> {
  return db
    .prepare("SELECT * FROM NATION WHERE id = ?")
    .bind(id)
    .first<NationRow>();
}

export async function insertNation(
  db: D1Database,
  data: { nation: string; nation_image: string }
) {
  const res = await db
    .prepare(
      `INSERT INTO NATION (nation, nation_image)
       VALUES (?, ?)`
    )
    .bind(data.nation, data.nation_image)
    .run();

  return res.meta?.last_row_id;
}

export async function deleteNation(db: D1Database, id: string) {
  await db.prepare("DELETE FROM NATION WHERE id = ?").bind(id).run();
}
