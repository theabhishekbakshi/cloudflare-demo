import type { Env } from "../types";
import {
  getAllPlayers,
  getPlayerById,
  insertPlayer,
  deletePlayer,
} from "./d1";
import {
  uploadPlayerImage,
  deletePlayerImage,
} from "./r2";

export async function fetchPlayers(env: Env) {
  return getAllPlayers(env.fcforum);
}

export async function fetchPlayerById(env: Env, id: string) {
  const player = await getPlayerById(env.fcforum, id);
  if (!player) throw new Error("Player not found");
  return player;
}

export async function createPlayer(env: Env, body: any) {
  const data: Record<string, any> = {
    ovr_font_hex: body.ovr_font_hex ?? "#FFFFFF",
    pos_font_hex: body.pos_font_hex ?? "#FFFFFF",
    name_font_hex: body.name_font_hex ?? "#FFFFFF",

    ovr: body.ovr ?? null,
    position: body.position ?? null,
    player_name: body.player_name ?? null,
    card_type: body.card_type ?? null,
  };

  const imageSlots = {
    cardimg_url: "cardimg",
    headshot_url: "headshot",
    nationflag_url: "nation",
    leaguecrest_url: "league",
    clublogo_url: "club",
  };

  for (const [dbField, slot] of Object.entries(imageSlots)) {
    if (body.images?.[dbField]) {
      data[dbField] = await uploadPlayerImage(
        env.fc_forum,
        body.images[dbField],
        slot,
        body.player_name
      );
    }
  }

  const id = await insertPlayer(env.fcforum, data);
  return { id };
}

export async function removePlayer(env: Env, id: string) {
  const existing = await getPlayerById(env.fcforum, id);
  if (!existing) throw new Error("Player not found");

  const imageFields = [
    "cardimg_url",
    "headshot_url",
    "nationflag_url",
    "leaguecrest_url",
    "clublogo_url",
  ];

  for (const field of imageFields) {
    const path = (existing as any)[field];
    if (path) {
      await deletePlayerImage(env.fc_forum, path);
    }
  }

  await deletePlayer(env.fcforum, id);
  return { success: true };
}
