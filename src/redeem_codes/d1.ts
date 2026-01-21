export interface RedeemCodeRow {
  id: number;
  code: string;
  reward: string;
  is_active: 0 | 1;
  createdDate: string;
  updatedDate: string;
}

export async function getAllRedeemCodes(db: D1Database) {
  return (
    await db
      .prepare("SELECT * FROM REDEEM_CODES ORDER BY createdDate DESC")
      .all<RedeemCodeRow>()
  ).results;
}

export async function getRedeemCodeById(
  db: D1Database,
  id: string
): Promise<RedeemCodeRow | null> {
  return db
    .prepare("SELECT * FROM REDEEM_CODES WHERE id = ?")
    .bind(id)
    .first<RedeemCodeRow>();
}

export async function getRedeemCodeByCode(
  db: D1Database,
  code: string
): Promise<RedeemCodeRow | null> {
  return db
    .prepare("SELECT * FROM REDEEM_CODES WHERE code = ?")
    .bind(code)
    .first<RedeemCodeRow>();
}

export async function insertRedeemCode(
  db: D1Database,
  data: { code: string; reward: string; is_active?: 0 | 1 }
) {
  const res = await db
    .prepare(
      `INSERT INTO REDEEM_CODES (code, reward, is_active)
       VALUES (?, ?, ?)`
    )
    .bind(data.code, data.reward, data.is_active ?? 1)
    .run();

  return res.meta?.last_row_id;
}

export async function updateRedeemCodeStatus(
  db: D1Database,
  id: string,
  is_active: 0 | 1
) {
  await db
    .prepare(
      `UPDATE REDEEM_CODES
       SET is_active = ?, updatedDate = CURRENT_TIMESTAMP
       WHERE id = ?`
    )
    .bind(is_active, id)
    .run();
}

export async function deleteRedeemCode(db: D1Database, id: string) {
  await db.prepare("DELETE FROM REDEEM_CODES WHERE id = ?").bind(id).run();
}
