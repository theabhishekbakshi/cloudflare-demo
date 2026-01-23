export interface OtherVersionCardRow {
  id: number;
  title: string | null;
  image_url: string | null;
  card_type: string | null;

  ovr_color: string;
  pos_color: string;
  name_color: string;

  cards_applicable: 0 | 1;

  createdDate: string;
  updatedDate: string;
}

export async function getAllOtherVersionCards(db: D1Database) {
  return (
    await db
      .prepare("SELECT * FROM OTHER_VERSION_CARDS ORDER BY createdDate DESC")
      .all<OtherVersionCardRow>()
  ).results;
}

export async function getOtherVersionCardById(
  db: D1Database,
  id: string
): Promise<OtherVersionCardRow | null> {
  return db
    .prepare("SELECT * FROM OTHER_VERSION_CARDS WHERE id = ?")
    .bind(id)
    .first<OtherVersionCardRow>();
}

export async function insertOtherVersionCard(
  db: D1Database,
  data: {
    title?: string | null;
    image_url?: string | null;
    card_type?: string | null;
    ovr_color?: string;
    pos_color?: string;
    name_color?: string;
    cards_applicable?: 0 | 1;
  }
) {
  const res = await db
    .prepare(
      `INSERT INTO OTHER_VERSION_CARDS
      (title, image_url, card_type,
       ovr_color, pos_color, name_color, cards_applicable)
      VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      data.title ?? null,
      data.image_url ?? null,
      data.card_type ?? null,
      data.ovr_color ?? "#FFFFFF",
      data.pos_color ?? "#FFFFFF",
      data.name_color ?? "#FFFFFF",
      data.cards_applicable ?? 1
    )
    .run();

  return res.meta?.last_row_id;
}

export async function updateCardsApplicable(
  db: D1Database,
  id: string,
  cards_applicable: 0 | 1
) {
  await db
    .prepare(
      `UPDATE OTHER_VERSION_CARDS
       SET cards_applicable = ?, updatedDate = CURRENT_TIMESTAMP
       WHERE id = ?`
    )
    .bind(cards_applicable, id)
    .run();
}

export async function deleteOtherVersionCard(db: D1Database, id: string) {
  await db
    .prepare("DELETE FROM OTHER_VERSION_CARDS WHERE id = ?")
    .bind(id)
    .run();
}
