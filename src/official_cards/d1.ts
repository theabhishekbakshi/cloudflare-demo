export interface OfficialCardRow {
  id: number;
  title: string | null;

  image_url: string | null;
  animated_card: string | null;
  card_type: string | null;

  ovr_color: string;
  pos_color: string;
  name_color: string;

  has_animated: 0 | 1;

  createdDate: string;
  updatedDate: string;
}

export async function getAllOfficialCards(db: D1Database) {
  return (
    await db
      .prepare("SELECT * FROM OFFICIAL_CARDS ORDER BY createdDate DESC")
      .all<OfficialCardRow>()
  ).results;
}

export async function getOfficialCardById(
  db: D1Database,
  id: string
): Promise<OfficialCardRow | null> {
  return db
    .prepare("SELECT * FROM OFFICIAL_CARDS WHERE id = ?")
    .bind(id)
    .first<OfficialCardRow>();
}

export async function insertOfficialCard(
  db: D1Database,
  data: {
    title?: string | null;
    image_url?: string | null;
    animated_card?: string | null;
    card_type?: string | null;
    ovr_color?: string;
    pos_color?: string;
    name_color?: string;
    has_animated?: 0 | 1;
  }
) {
  const res = await db
    .prepare(
      `INSERT INTO OFFICIAL_CARDS
      (title, image_url, animated_card, card_type,
       ovr_color, pos_color, name_color, has_animated)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      data.title ?? null,
      data.image_url ?? null,
      data.animated_card ?? null,
      data.card_type ?? null,
      data.ovr_color ?? "#FFFFFF",
      data.pos_color ?? "#FFFFFF",
      data.name_color ?? "#FFFFFF",
      data.has_animated ?? 1
    )
    .run();

  return res.meta?.last_row_id;
}

export async function updateOfficialCardToggle(
  db: D1Database,
  id: string,
  has_animated: 0 | 1
) {
  await db
    .prepare(
      `UPDATE OFFICIAL_CARDS
       SET has_animated = ?, updatedDate = CURRENT_TIMESTAMP
       WHERE id = ?`
    )
    .bind(has_animated, id)
    .run();
}

export async function deleteOfficialCard(db: D1Database, id: string) {
  await db.prepare("DELETE FROM OFFICIAL_CARDS WHERE id = ?").bind(id).run();
}
