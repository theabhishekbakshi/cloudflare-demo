import type { Env } from "../types";
import {
  getAllNominees,
  getNomineeById,
  insertNominee,
  deleteNominee,
} from "./d1";
import {
  uploadNomineeImage,
  deleteNomineeImage,
} from "./r2";

export async function fetchNominees(env: Env) {
  return getAllNominees(env.fcforum);
}

export async function fetchNomineeById(env: Env, id: string) {
  const nominee = await getNomineeById(env.fcforum, id);
  if (!nominee) throw new Error("Nominee not found");
  return nominee;
}

export async function createNominee(env: Env, body: any) {
  if (!body.slug) throw new Error("slug is required");

  const nomineeData: Record<string, any> = {
    slug: body.slug,
    pos: body.pos ?? null,
    Intro: body.Intro ?? null,
    Community_Power_Rankings: body.Community_Power_Rankings ?? null,
  };

  for (let i = 1; i <= 20; i++) {
    const imgKey = `Nm${i}`;
    const nameKey = `Nm${i}_name`;

    if (body.images?.[imgKey]) {
      nomineeData[imgKey] = await uploadNomineeImage(
        env.fc_forum,
        body.images[imgKey],
        i,
        body.slug
      );
    }

    if (body.names?.[nameKey]) {
      nomineeData[nameKey] = body.names[nameKey];
    }
  }

  const id = await insertNominee(env.fcforum, nomineeData);
  return { id };
}

export async function removeNominee(env: Env, id: string) {
  const existing = await getNomineeById(env.fcforum, id);
  if (!existing) throw new Error("Nominee not found");

  for (let i = 1; i <= 20; i++) {
    const key = `Nm${i}` as keyof typeof existing;
    if (existing[key]) {
      await deleteNomineeImage(
        env.fc_forum,
        existing[key] as string
      );
    }
  }

  await deleteNominee(env.fcforum, id);
  return { success: true };
}
