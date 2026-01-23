import type { Env } from "../types";
import {
  getAllOfficialCards,
  getOfficialCardById,
  insertOfficialCard,
  updateOfficialCardToggle,
  deleteOfficialCard,
} from "./d1";
import {
  uploadOfficialCardImage,
  uploadAnimatedCard,
  deleteOfficialCardImage,
} from "./r2";

export async function fetchOfficialCards(env: Env) {
  return getAllOfficialCards(env.fcforum);
}

export async function fetchOfficialCardById(env: Env, id: string) {
  const card = await getOfficialCardById(env.fcforum, id);
  if (!card) throw new Error("Official card not found");
  return card;
}

export async function createOfficialCard(env: Env, body: any) {
  let imagePath: string | null = null;
  let animatedPath: string | null = null;

  if (body.imageBase64) {
    imagePath = await uploadOfficialCardImage(
      env.fc_forum,
      body.imageBase64,
      body.title
    );
  }

  if (body.animatedBase64) {
    animatedPath = await uploadAnimatedCard(
      env.fc_forum,
      body.animatedBase64,
      body.title
    );
  }

  const id = await insertOfficialCard(env.fcforum, {
    title: body.title ?? null,
    image_url: imagePath,
    animated_card: animatedPath,
    card_type: body.card_type ?? null,
    ovr_color: body.ovr_color,
    pos_color: body.pos_color,
    name_color: body.name_color,
    has_animated: animatedPath ? 1 : 0,
  });

  return { id, image_url: imagePath, animated_card: animatedPath };
}

export async function toggleAnimatedCard(
  env: Env,
  id: string,
  has_animated: 0 | 1
) {
  await updateOfficialCardToggle(env.fcforum, id, has_animated);
  return { success: true, has_animated };
}

export async function removeOfficialCard(env: Env, id: string) {
  const existing = await getOfficialCardById(env.fcforum, id);
  if (!existing) throw new Error("Official card not found");

  if (existing.image_url) {
    await deleteOfficialCardImage(env.fc_forum, existing.image_url);
  }
  if (existing.animated_card) {
    await deleteOfficialCardImage(env.fc_forum, existing.animated_card);
  }

  await deleteOfficialCard(env.fcforum, id);
  return { success: true };
}
