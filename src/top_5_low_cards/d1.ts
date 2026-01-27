export interface Top5LowCardRow {
  id: number;
  title: string | null;

  img_1: string | null; name_1: string | null; mv1: string | null; wf1: string | null; sm1: string | null; st1: string | null;
  img_2: string | null; name_2: string | null; mv2: string | null; wf2: string | null; sm2: string | null; st2: string | null;
  img_3: string | null; name_3: string | null; mv3: string | null; wf3: string | null; sm3: string | null; st3: string | null;
  img_4: string | null; name_4: string | null; mv4: string | null; wf4: string | null; sm4: string | null; st4: string | null;
  img_5: string | null; name_5: string | null; mv5: string | null; wf5: string | null; sm5: string | null; st5: string | null;

  pos: string | null;

  createdDate: string;
  updatedDate: string;
}

export async function getAllTop5LowCards(db: D1Database) {
  return (
    await db
      .prepare("SELECT * FROM TOP_5_LOW_CARDS ORDER BY createdDate DESC")
      .all<Top5LowCardRow>()
  ).results;
}

export async function getTop5LowCardById(db: D1Database, id: string) {
  return db
    .prepare("SELECT * FROM TOP_5_LOW_CARDS WHERE id = ?")
    .bind(id)
    .first<Top5LowCardRow>();
}

export async function insertTop5LowCard(
  db: D1Database,
  data: Record<string, any>
) {
  const keys = Object.keys(data);
  const placeholders = keys.map(() => "?").join(", ");

  const res = await db
    .prepare(
      `INSERT INTO TOP_5_LOW_CARDS (${keys.join(", ")})
       VALUES (${placeholders})`
    )
    .bind(...keys.map(k => data[k]))
    .run();

  return res.meta?.last_row_id;
}

export async function deleteTop5LowCard(db: D1Database, id: string) {
  await db
    .prepare("DELETE FROM TOP_5_LOW_CARDS WHERE id = ?")
    .bind(id)
    .run();
}
