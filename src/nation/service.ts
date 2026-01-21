import type { Env } from "../types";
import {
  getAllNations,
  getNationById,
  insertNation,
  deleteNation,
} from "./d1";
import {
  uploadNationImage,
  deleteNationImage,
} from "./r2";

export async function fetchNations(env: Env) {
  return getAllNations(env.fcforum);
}

export async function fetchNationById(env: Env, id: string) {
  const nation = await getNationById(env.fcforum, id);
  if (!nation) throw new Error("Nation not found");
  return nation;
}

export async function createNation(env: Env, body: any) {
  if (!body.nation || !body.imageBase64) {
    throw new Error("nation and imageBase64 are required");
  }

  // 1️⃣ Upload image to R2
  const imagePath = await uploadNationImage(
    env.fc_forum,     // ✅ correct R2 binding
    body.imageBase64,
    body.nation
  );

  // 2️⃣ Insert DB record
  const id = await insertNation(env.fcforum, {
    nation: body.nation,
    nation_image: imagePath,
  });

  return { id, nation_image: imagePath };
}

export async function removeNation(env: Env, id: string) {
  const existing = await getNationById(env.fcforum, id);
  if (!existing) throw new Error("Nation not found");

  // 1️⃣ Delete image from R2
  if (existing.nation_image) {
    await deleteNationImage(
      env.fc_forum,
      existing.nation_image
    );
  }

  // 2️⃣ Delete DB record
  await deleteNation(env.fcforum, id);

  return { success: true };
}
