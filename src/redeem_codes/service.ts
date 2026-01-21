import type { Env } from "../types";
import {
  getAllRedeemCodes,
  getRedeemCodeById,
  getRedeemCodeByCode,
  insertRedeemCode,
  updateRedeemCodeStatus,
  deleteRedeemCode,
} from "./d1";

/**
 * GET all redeem codes
 */
export async function fetchRedeemCodes(env: Env) {
  return getAllRedeemCodes(env.fcforum);
}

/**
 * GET redeem code by ID
 */
export async function fetchRedeemCodeById(env: Env, id: string) {
  const code = await getRedeemCodeById(env.fcforum, id);
  if (!code) throw new Error("Redeem code not found");
  return code;
}

/**
 * CREATE redeem code
 */
export async function createRedeemCode(env: Env, body: any) {
  if (!body.code || !body.reward) {
    throw new Error("code and reward are required");
  }

  const existing = await getRedeemCodeByCode(env.fcforum, body.code);
  if (existing) {
    throw new Error("Redeem code already exists");
  }

  const id = await insertRedeemCode(env.fcforum, {
    code: body.code,
    reward: body.reward,
    is_active: body.is_active ?? 1,
  });

  return { id };
}

/**
 * TOGGLE redeem code (ON / OFF)
 */
export async function toggleRedeemCode(env: Env, id: string, is_active: 0 | 1) {
  const existing = await getRedeemCodeById(env.fcforum, id);
  if (!existing) throw new Error("Redeem code not found");

  await updateRedeemCodeStatus(env.fcforum, id, is_active);

  return {
    success: true,
    is_active,
  };
}

/**
 * VALIDATE redeem code (used by users)
 */
export async function redeemCode(env: Env, code: string) {
  const record = await getRedeemCodeByCode(env.fcforum, code);

  if (!record) {
    throw new Error("Invalid redeem code");
  }

  if (record.is_active !== 1) {
    throw new Error("Redeem code is disabled");
  }

  return {
    reward: record.reward,
  };
}

/**
 * DELETE redeem code
 */
export async function removeRedeemCode(env: Env, id: string) {
  const existing = await getRedeemCodeById(env.fcforum, id);
  if (!existing) throw new Error("Redeem code not found");

  await deleteRedeemCode(env.fcforum, id);
  return { success: true };
}
