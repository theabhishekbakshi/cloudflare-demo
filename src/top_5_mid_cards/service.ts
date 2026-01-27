import type { Env } from "../types";
import {
  getAllTop5MidCards,
  getTop5MidCardById,
  insertTop5MidCard,
  deleteTop5MidCard,
} from "./d1";
import {
  uploadTop5MidImage,
  deleteTop5MidImage,
} from "./r2";

export async function fetchTop5MidCards(env: Env) {
  return getAllTop5MidCards(env.fcforum);
}

export async function fetchTop5MidCardById(env: Env, id: string) {
  const card = await getTop5MidCardById(env.fcforum, id);
  if (!card) throw new Error("Top 5 Mid card not found");
  return card;
}

export async function createTop5MidCard(env: Env, body: any) {
  const data: Record<string, any> = {
    title: body.title ?? null,
    pos: body.pos ?? null,
  };

  for (let i = 1; i <= 5; i++) {
    const imageSlots = [`img_${i}`, `wf${i}`, `sm${i}`, `st${i}`];

    for (const slot of imageSlots) {
      if (body.images?.[slot]) {
        data[slot] = await uploadTop5MidImage(
          env.fc_forum,
          body.images[slot],
          slot,
          body.title
        );
      }
    }

    data[`name_${i}`] = body[`name_${i}`] ?? null;
    data[`mv${i}`] = body[`mv${i}`] ?? null;
  }

  const id = await insertTop5MidCard(env.fcforum, data);
  return { id };
}

export async function removeTop5MidCard(env: Env, id: string) {
  const existing = await getTop5MidCardById(env.fcforum, id);
  if (!existing) throw new Error("Top 5 Mid card not found");

  for (const key of Object.keys(existing)) {
    if (
      key.startsWith("img_") ||
      key.startsWith("wf") ||
      key.startsWith("sm") ||
      key.startsWith("st")
    ) {
      const path = (existing as any)[key];
      if (path) {
        await deleteTop5MidImage(env.fc_forum, path);
      }
    }
  }

  await deleteTop5MidCard(env.fcforum, id);
  return { success: true };
}
