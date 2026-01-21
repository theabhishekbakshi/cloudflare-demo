export interface ClubRow {
  id: number;
  club: string;
  club_image: string;
  createdDate: string;
  updatedDate: string;
}

export async function getAllClubs(db: D1Database) {
  return (
    await db
      .prepare("SELECT * FROM CLUB ORDER BY createdDate DESC")
      .all<ClubRow>()
  ).results;
}

export async function getClubById(
  db: D1Database,
  id: string
): Promise<ClubRow | null> {
  return db
    .prepare("SELECT * FROM CLUB WHERE id = ?")
    .bind(id)
    .first<ClubRow>();
}

export async function insertClub(
  db: D1Database,
  data: { club: string; club_image: string }
) {
  const res = await db
    .prepare(
      `INSERT INTO CLUB (club, club_image)
       VALUES (?, ?)`
    )
    .bind(data.club, data.club_image)
    .run();

  return res.meta?.last_row_id;
}

export async function deleteClub(db: D1Database, id: string) {
  await db.prepare("DELETE FROM CLUB WHERE id = ?").bind(id).run();
}
