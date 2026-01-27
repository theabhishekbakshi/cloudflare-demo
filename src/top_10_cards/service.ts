import type { Env } from "../types";
import {
  getAllTop10Cards,
  getTop10CardById,
  insertTop10Card,
  deleteTop10Card,
} from "./d1";
import {
  uploadTop10Image,
  deleteTop10Image,
} from "./r2";

export async function fetchTop10Cards(env: Env) {
  return getAllTop10Cards(env.fcforum);
}

export async function fetchTop10CardById(env: Env, id: string) {
  const card = await getTop10CardById(env.fcforum, id);
  if (!card) throw new Error("Top 10 card not found");
  return card;
}

export async function createTop10Card(env: Env, body: any) {
  const data: Record<string, any> = {
    title: body.title ?? null,
  };

  for (let i = 1; i <= 10; i++) {
    const slots = [
      `img_${i}`,
      `wf${i}`,
      `sm${i}`,
      `st${i}`,
    ];

    for (const slot of slots) {
      if (body.images?.[slot]) {
        data[slot] = await uploadTop10Image(
          env.fc_forum,
          body.images[slot],
          slot,
          body.title
        );
      }
    }

    data[`name_${i}`] = body[`name_${i}`] ?? null;
    data[`rlink${i}`] = body[`rlink${i}`] ?? null;
    data[`mv${i}`] = body[`mv${i}`] ?? null;
  }

  const id = await insertTop10Card(env.fcforum, data);
  return { id };
}

export async function removeTop10Card(env: Env, id: string) {
  const existing = await getTop10CardById(env.fcforum, id);
  if (!existing) throw new Error("Top 10 card not found");

  Object.keys(existing).forEach(async key => {
    if (key.startsWith("img_") || key.startsWith("wf") || key.startsWith("sm") || key.startsWith("st")) {
      const path = (existing as any)[key];
      if (path) await deleteTop10Image(env.fc_forum, path);
    }
  });

  await deleteTop10Card(env.fcforum, id);
  return { success: true };
}
