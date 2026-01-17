export interface NomineeRow {
  id: number;
  pos: string | null;
  slug: string | null;
  Community_Power_Rankings: string | null;
  Intro: string | null;

  Nm1?: string | null;  Nm1_name?: string | null;
  Nm2?: string | null;  Nm2_name?: string | null;
  Nm3?: string | null;  Nm3_name?: string | null;
  Nm4?: string | null;  Nm4_name?: string | null;
  Nm5?: string | null;  Nm5_name?: string | null;
  Nm6?: string | null;  Nm6_name?: string | null;
  Nm7?: string | null;  Nm7_name?: string | null;
  Nm8?: string | null;  Nm8_name?: string | null;
  Nm9?: string | null;  Nm9_name?: string | null;
  Nm10?: string | null; Nm10_name?: string | null;
  Nm11?: string | null; Nm11_name?: string | null;
  Nm12?: string | null; Nm12_name?: string | null;
  Nm13?: string | null; Nm13_name?: string | null;
  Nm14?: string | null; Nm14_name?: string | null;
  Nm15?: string | null; Nm15_name?: string | null;
  Nm16?: string | null; Nm16_name?: string | null;
  Nm17?: string | null; Nm17_name?: string | null;
  Nm18?: string | null; Nm18_name?: string | null;
  Nm19?: string | null; Nm19_name?: string | null;
  Nm20?: string | null; Nm20_name?: string | null;
}

export async function getAllNominees(db: D1Database) {
  return (
    await db
      .prepare("SELECT * FROM NOMINEES ORDER BY createdDate DESC")
      .all<NomineeRow>()
  ).results;
}

export async function getNomineeById(
  db: D1Database,
  id: string
): Promise<NomineeRow | null> {
  return db
    .prepare("SELECT * FROM NOMINEES WHERE id = ?")
    .bind(id)
    .first<NomineeRow>();
}

export async function insertNominee(
  db: D1Database,
  data: Record<string, any>
) {
  const keys = Object.keys(data);
  const placeholders = keys.map(() => "?").join(", ");

  const sql = `
    INSERT INTO NOMINEES (${keys.join(", ")})
    VALUES (${placeholders})
  `;

  const res = await db
    .prepare(sql)
    .bind(...keys.map(k => data[k]))
    .run();

  return res.meta?.last_row_id;
}

export async function deleteNominee(db: D1Database, id: string) {
  await db.prepare("DELETE FROM NOMINEES WHERE id = ?").bind(id).run();
}
