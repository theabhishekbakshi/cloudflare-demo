import type { Env } from "../types";
import {
  getAllIconRenders,
  getIconRenderById,
  insertIconRender,
  deleteIconRender,
} from "./d1";
import { uploadIconImage, deleteIconImage } from "./r2";

export async function fetchIconRenders(env: Env) {
  return getAllIconRenders(env.fcforum);
}

export async function fetchIconRenderById(env: Env, id: string) {
  const render = await getIconRenderById(env.fcforum, id);
  if (!render) throw new Error("Icon render not found");
  return render;
}

export async function createIconRender(env: Env, body: any) {
  if (!body.playerRenders || !body.nation || !body.imageBase64) {
    throw new Error("Missing required fields");
  }

  const imagePath = await uploadIconImage(
    env.fc_forum, // your R2 binding
    body.imageBase64,
    `${Date.now()}.png`
  );

  const id = await insertIconRender(env.fcforum, {
    playerRenders: body.playerRenders,
    nation: body.nation,
    playerImage: imagePath,
  });

  return { id, playerImage: imagePath };
}

export async function removeIconRender(env: Env, id: string) {
  const render = await getIconRenderById(env.fcforum, id);
  if (!render) throw new Error("Icon render not found");

  if (render.playerImage) {
    await deleteIconImage(env.fc_forum, render.playerImage);
  }

  await deleteIconRender(env.fcforum, id);
  return { success: true };
}
