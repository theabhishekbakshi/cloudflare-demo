import type { Env } from "../types";
import {
  getAllConceptCards,
  getConceptCardById,
  insertConceptCard,
  deleteConceptCard,
} from "./d1";
import {
  uploadConceptCardImage,
  deleteConceptCardImage,
} from "./r2";

export async function fetchConceptCards(env: Env) {
  return getAllConceptCards(env.fcforum);
}

export async function fetchConceptCardById(env: Env, id: string) {
  const card = await getConceptCardById(env.fcforum, id);
  if (!card) throw new Error("Concept card not found");
  return card;
}

export async function createConceptCard(env: Env, body: any) {
  let imagePath: string | null = null;

  if (body.imageBase64) {
    imagePath = await uploadConceptCardImage(
      env.fc_forum,
      body.imageBase64,
      body.title
    );
  }

  const id = await insertConceptCard(env.fcforum, {
    title: body.title ?? null,
    image_url: imagePath,
    card_type: body.card_type ?? null,
    ovr_color: body.ovr_color,
    pos_color: body.pos_color,
    name_color: body.name_color,
  });

  return { id, image_url: imagePath };
}

export async function removeConceptCard(env: Env, id: string) {
  const existing = await getConceptCardById(env.fcforum, id);
  if (!existing) throw new Error("Concept card not found");

  if (existing.image_url) {
    await deleteConceptCardImage(
      env.fc_forum,
      existing.image_url
    );
  }

  await deleteConceptCard(env.fcforum, id);
  return { success: true };
}
