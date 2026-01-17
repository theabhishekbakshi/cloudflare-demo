import type { Env } from "../types";
import {
  getAllPlayerRenders,
  getPlayerRenderById,
  insertPlayerRender,
  deletePlayerRender,
} from "./d1";
import {
  uploadPlayerRenderImage,
  deletePlayerRenderImage,
} from "./r2";

/**
 * GET all player renders
 */
export async function fetchPlayerRenders(env: Env) {
  return getAllPlayerRenders(env.fcforum);
}

/**
 * GET player render by ID
 */
export async function fetchPlayerRenderById(env: Env, id: string) {
  const render = await getPlayerRenderById(env.fcforum, id);
  if (!render) {
    throw new Error("Player render not found");
  }
  return render;
}

/**
 * CREATE player render (D1 + R2)
 */
export async function createPlayerRender(env: Env, body: any) {
  if (
    !body.playerName ||
    !body.club ||
    !body.nationality ||
    !body.imageBase64
  ) {
    throw new Error("Missing required fields");
  }

  // 1️⃣ Upload image to R2
  const imagePath = await uploadPlayerRenderImage(
    env.fc_forum, // R2 binding
    body.imageBase64,
    `${Date.now()}.png`
  );

  // 2️⃣ Insert DB record
  const id = await insertPlayerRender(env.fcforum, {
    playerRenders: imagePath,
    playerName: body.playerName,
    club: body.club,
    nationality: body.nationality,
  });

  return {
    id,
    playerRenders: imagePath,
  };
}

/**
 * DELETE player render (D1 + R2 cleanup)
 */
export async function removePlayerRender(env: Env, id: string) {
  const existing = await getPlayerRenderById(env.fcforum, id);

  if (!existing) {
    throw new Error("Player render not found");
  }

  // 1️⃣ Delete image from R2
  if (existing.playerRenders) {
    await deletePlayerRenderImage(
      env.fc_forum,
      existing.playerRenders
    );
  }

  // 2️⃣ Delete DB record
  await deletePlayerRender(env.fcforum, id);

  return { success: true };
}
