export interface ConceptCardRow {
  id: number;
  title: string | null;
  image_url: string | null;
  card_type: string | null;

  ovr_color: string;
  pos_color: string;
  name_color: string;

  createdDate: string;
  updatedDate: string;
}

export async function getAllConceptCards(db: D1Database) {
  return (
    await db
      .prepare("SELECT * FROM CONCEPT_CARDS ORDER BY createdDate DESC")
      .all<ConceptCardRow>()
  ).results;
}

export async function getConceptCardById(
  db: D1Database,
  id: string
): Promise<ConceptCardRow | null> {
  return db
    .prepare("SELECT * FROM CONCEPT_CARDS WHERE id = ?")
    .bind(id)
    .first<ConceptCardRow>();
}

export async function insertConceptCard(
  db: D1Database,
  data: {
    title?: string | null;
    image_url?: string | null;
    card_type?: string | null;
    ovr_color?: string;
    pos_color?: string;
    name_color?: string;
  }
) {
  const res = await db
    .prepare(
      `INSERT INTO CONCEPT_CARDS 
      (title, image_url, card_type, ovr_color, pos_color, name_color)
      VALUES (?, ?, ?, ?, ?, ?)`
    )
    .bind(
      data.title ?? null,
      data.image_url ?? null,
      data.card_type ?? null,
      data.ovr_color ?? "#FFFFFF",
      data.pos_color ?? "#FFFFFF",
      data.name_color ?? "#FFFFFF"
    )
    .run();

  return res.meta?.last_row_id;
}

export async function deleteConceptCard(db: D1Database, id: string) {
  await db.prepare("DELETE FROM CONCEPT_CARDS WHERE id = ?").bind(id).run();
}
