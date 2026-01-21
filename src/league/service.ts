import type { Env } from "../types";
import {
  getAllLeagues,
  getLeagueById,
  insertLeague,
  deleteLeague,
} from "./d1";
import {
  uploadLeagueImage,
  deleteLeagueImage,
} from "./r2";

export async function fetchLeagues(env: Env) {
  return getAllLeagues(env.fcforum);
}

export async function fetchLeagueById(env: Env, id: string) {
  const league = await getLeagueById(env.fcforum, id);
  if (!league) throw new Error("League not found");
  return league;
}

export async function createLeague(env: Env, body: any) {
  if (!body.league || !body.imageBase64) {
    throw new Error("league and imageBase64 are required");
  }

  // 1️⃣ Upload image to R2
  const imagePath = await uploadLeagueImage(
    env.fc_forum,        // ✅ correct R2 binding
    body.imageBase64,
    body.league
  );

  // 2️⃣ Insert DB record
  const id = await insertLeague(env.fcforum, {
    league: body.league,
    league_image: imagePath,
  });

  return { id, league_image: imagePath };
}

export async function removeLeague(env: Env, id: string) {
  const existing = await getLeagueById(env.fcforum, id);
  if (!existing) throw new Error("League not found");

  // 1️⃣ Delete image from R2
  if (existing.league_image) {
    await deleteLeagueImage(
      env.fc_forum,
      existing.league_image
    );
  }

  // 2️⃣ Delete DB record
  await deleteLeague(env.fcforum, id);

  return { success: true };
}
