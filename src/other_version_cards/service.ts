import type { Env } from "../types";
import {
  getAllOtherVersionCards,
  getOtherVersionCardById,
  insertOtherVersionCard,
  updateCardsApplicable,
  deleteOtherVersionCard,
} from "./d1";
import {
  uploadOtherVersionCardImage,
  deleteOtherVersionCardImage,
} from "./r2";

export async function fetchOtherVersionCards(env: Env) {
  return getAllOtherVersionCards(env.fcforum);
}

export async function fetchOtherVersionCardById(env: Env, id: string) {
  const card = await getOtherVersionCardById(env.fcforum, id);
  if (!card) throw new Error("Other version card not found");
  return card;
}

export async function createOtherVersionCard(env: Env, body: any) {
  let imagePath: string | null = null;

  if (body.imageBase64) {
    imagePath = await uploadOtherVersionCardImage(
      env.fc_forum,
      body.imageBase64,
      body.title
    );
  }

  const id = await insertOtherVersionCard(env.fcforum, {
    title: body.title ?? null,
    image_url: imagePath,
    card_type: body.card_type ?? null,
    ovr_color: body.ovr_color,
    pos_color: body.pos_color,
    name_color: body.name_color,
    cards_applicable: body.cards_applicable ?? 1,
  });

  return { id, image_url: imagePath };
}

export async function toggleCardsApplicable(
  env: Env,
  id: string,
  cards_applicable: 0 | 1
) {
  await updateCardsApplicable(env.fcforum, id, cards_applicable);
  return { success: true, cards_applicable };
}

export async function removeOtherVersionCard(env: Env, id: string) {
  const existing = await getOtherVersionCardById(env.fcforum, id);
  if (!existing) throw new Error("Other version card not found");

  if (existing.image_url) {
    await deleteOtherVersionCardImage(
      env.fc_forum,
      existing.image_url
    );
  }

  await deleteOtherVersionCard(env.fcforum, id);
  return { success: true };
}
