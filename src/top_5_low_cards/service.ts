import type { Env } from "../types";
import {
  getAllTop5LowCards,
  getTop5LowCardById,
  insertTop5LowCard,
  deleteTop5LowCard,
} from "./d1";
import {
  uploadTop5LowImage,
  deleteTop5LowImage,
} from "./r2";

export async function fetchTop5LowCards(env: Env) {
  return getAllTop5LowCards(env.fcforum);
}

export async function fetchTop5LowCardById(env: Env, id: string) {
  const card = await getTop5LowCardById(env.fcforum, id);
  if (!card) throw new Error("Top 5 Low card not found");
  return card;
}

export async function createTop5LowCard(env: Env, body: any) {
  const data: Record<string, any> = {
    title: body.title ?? null,
    pos: body.pos ?? null,
  };

  for (let i = 1; i <= 5; i++) {
    const imageSlots = [`img_${i}`, `wf${i}`, `sm${i}`, `st${i}`];

    for (const slot of imageSlots) {
      if (body.images?.[slot]) {
        data[slot] = await uploadTop5LowImage(
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

  const id = await insertTop5LowCard(env.fcforum, data);
  return { id };
}

export async function removeTop5LowCard(env: Env, id: string) {
  const existing = await getTop5LowCardById(env.fcforum, id);
  if (!existing) throw new Error("Top 5 Low card not found");

  for (const key of Object.keys(existing)) {
    if (
      key.startsWith("img_") ||
      key.startsWith("wf") ||
      key.startsWith("sm") ||
      key.startsWith("st")
    ) {
      const path = (existing as any)[key];
      if (path) {
        await deleteTop5LowImage(env.fc_forum, path);
      }
    }
  }

  await deleteTop5LowCard(env.fcforum, id);
  return { success: true };
}
