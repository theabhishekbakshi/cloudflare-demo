import { uploadReviewImage } from "./r2";
import { insertPlayerReview } from "./d1";
import type { Env } from "../types";

export async function createPlayerReview(
  env: Env,
  body: Record<string, any>
) {
  let imagePath: string | null = null;

  if (body.imageBase64) {
    imagePath = await uploadReviewImage(
      env.player_review, // 👈 lowercase binding
      body.imageBase64,
      `${body.playerName}-${Date.now()}.png`
    );
  }

  const id = await insertPlayerReview(env.fcforum, {
    ownerId: body.ownerId,
    playerName: body.playerName,
    eventName: body.eventName,
    imagePath,
    pros: body.pros,
    cons: body.cons,
    verdict: body.verdict,
    rating: body.rating,
    stats1: body.stats1,
    stats2: body.stats2,
    stats3: body.stats3,
    stats4: body.stats4,
    stats5: body.stats5,
    stats6: body.stats6,
    st_type1: body.st_type1,
    st_type2: body.st_type2,
    st_type3: body.st_type3,
    st_type4: body.st_type4,
    st_type5: body.st_type5,
    st_type6: body.st_type6,
  });

  return { id, imagePath };
}
