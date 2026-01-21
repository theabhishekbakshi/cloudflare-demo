import type { Env } from "../types";
import {
  getAllClubs,
  getClubById,
  insertClub,
  deleteClub,
} from "./d1";
import {
  uploadClubImage,
  deleteClubImage,
} from "./r2";

export async function fetchClubs(env: Env) {
  return getAllClubs(env.fcforum);
}

export async function fetchClubById(env: Env, id: string) {
  const club = await getClubById(env.fcforum, id);
  if (!club) throw new Error("Club not found");
  return club;
}

export async function createClub(env: Env, body: any) {
  if (!body.club || !body.imageBase64) {
    throw new Error("club and imageBase64 are required");
  }

  // 1️⃣ Upload image to R2
  const imagePath = await uploadClubImage(
    env.fc_forum,
    body.imageBase64,
    body.club
  );

  // 2️⃣ Insert DB record
  const id = await insertClub(env.fcforum, {
    club: body.club,
    club_image: imagePath,
  });

  return { id, club_image: imagePath };
}

export async function removeClub(env: Env, id: string) {
  const existing = await getClubById(env.fcforum, id);
  if (!existing) throw new Error("Club not found");

  // 1️⃣ Delete image from R2
  if (existing.club_image) {
    await deleteClubImage(
      env.fc_forum,
      existing.club_image
    );
  }

  // 2️⃣ Delete DB record
  await deleteClub(env.fcforum, id);

  return { success: true };
}
