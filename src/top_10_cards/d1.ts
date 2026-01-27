export interface Top10CardRow {
  id: number;
  title: string | null;

  img_1: string | null; name_1: string | null; rlink1: string | null; mv1: string | null; wf1: string | null; sm1: string | null; st1: string | null;
  img_2: string | null; name_2: string | null; rlink2: string | null; mv2: string | null; wf2: string | null; sm2: string | null; st2: string | null;
  img_3: string | null; name_3: string | null; rlink3: string | null; mv3: string | null; wf3: string | null; sm3: string | null; st3: string | null;
  img_4: string | null; name_4: string | null; rlink4: string | null; mv4: string | null; wf4: string | null; sm4: string | null; st4: string | null;
  img_5: string | null; name_5: string | null; rlink5: string | null; mv5: string | null; wf5: string | null; sm5: string | null; st5: string | null;
  img_6: string | null; name_6: string | null; rlink6: string | null; mv6: string | null; wf6: string | null; sm6: string | null; st6: string | null;
  img_7: string | null; name_7: string | null; rlink7: string | null; mv7: string | null; wf7: string | null; sm7: string | null; st7: string | null;
  img_8: string | null; name_8: string | null; rlink8: string | null; mv8: string | null; wf8: string | null; sm8: string | null; st8: string | null;
  img_9: string | null; name_9: string | null; rlink9: string | null; mv9: string | null; wf9: string | null; sm9: string | null; st9: string | null;
  img_10: string | null; name_10: string | null; rlink10: string | null; mv10: string | null; wf10: string | null; sm10: string | null; st10: string | null;

  createdDate: string;
  updatedDate: string;
}

export async function getAllTop10Cards(db: D1Database) {
  return (
    await db
      .prepare("SELECT * FROM TOP_10_CARDS ORDER BY createdDate DESC")
      .all<Top10CardRow>()
  ).results;
}

export async function getTop10CardById(db: D1Database, id: string) {
  return db
    .prepare("SELECT * FROM TOP_10_CARDS WHERE id = ?")
    .bind(id)
    .first<Top10CardRow>();
}

export async function insertTop10Card(db: D1Database, data: Record<string, any>) {
  const keys = Object.keys(data);
  const values = keys.map(() => "?").join(", ");

  const res = await db
    .prepare(
      `INSERT INTO TOP_10_CARDS (${keys.join(", ")})
       VALUES (${values})`
    )
    .bind(...keys.map(k => data[k]))
    .run();

  return res.meta?.last_row_id;
}

export async function deleteTop10Card(db: D1Database, id: string) {
  await db.prepare("DELETE FROM TOP_10_CARDS WHERE id = ?").bind(id).run();
}
