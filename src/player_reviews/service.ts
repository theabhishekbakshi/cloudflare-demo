import type { Env } from "../types";
import {
  getAllPlayerReviews,
  getPlayerReviewById,
  insertPlayerReview,
  deletePlayerReview,
} from "./d1";
import {
  uploadPlayerReviewImage,
  deletePlayerReviewImage,
} from "./r2";

export async function fetchPlayerReviews(env: Env) {
  return getAllPlayerReviews(env.fcforum);
}

export async function fetchPlayerReviewById(env: Env, id: string) {
  const review = await getPlayerReviewById(env.fcforum, id);
  if (!review) throw new Error("Player review not found");
  return review;
}

export async function createPlayerReview(env: Env, body: any) {
  const data: Record<string, any> = {
    urlSlug: body.urlSlug ?? null,
    playerName: body.playerName ?? null,
    position: body.position ?? null,
    eventName: body.eventName ?? null,

    weakFoot: body.weakFoot ?? null,
    skillMove: body.skillMove ?? null,
    stamina: body.stamina ?? null,

    stats1: body.stats1 ?? null,
    stats2: body.stats2 ?? null,
    stats3: body.stats3 ?? null,
    stats4: body.stats4 ?? null,
    stats5: body.stats5 ?? null,
    stats6: body.stats6 ?? null,

    statsType1: body.statsType1 ?? null,
    statsType2: body.statsType2 ?? null,
    statsType3: body.statsType3 ?? null,
    statsType4: body.statsType4 ?? null,
    statsType5: body.statsType5 ?? null,
    statsType6: body.statsType6 ?? null,

    skillPoints1: body.skillPoints1 ?? null,
    skillPoints2: body.skillPoints2 ?? null,
    skillPoints3: body.skillPoints3 ?? null,

    pros: body.pros ?? null,
    cons: body.cons ?? null,
    finalVerdict: body.finalVerdict ?? null,
    rating: body.rating ?? null,

    alternative1: body.alternative1 ?? null,
    alternative2: body.alternative2 ?? null,
    alternative3: body.alternative3 ?? null,

    playerReviews_item: body.playerReviews_item ?? null,
  };

  if (body.imageBase64) {
    data.playerImage = await uploadPlayerReviewImage(
      env.fc_forum,
      body.imageBase64,
      body.urlSlug
    );
  }

  const id = await insertPlayerReview(env.fcforum, data);
  return { id, playerImage: data.playerImage };
}

export async function removePlayerReview(env: Env, id: string) {
  const existing = await getPlayerReviewById(env.fcforum, id);
  if (!existing) throw new Error("Player review not found");

  if (existing.playerImage) {
    await deletePlayerReviewImage(
      env.fc_forum,
      existing.playerImage
    );
  }

  await deletePlayerReview(env.fcforum, id);
  return { success: true };
}
