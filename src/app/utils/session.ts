import { Types } from "mongoose";
import { BadRequestError } from "./error.js";
import { RedisClient } from "./helper.js";
import { redis } from "../utils/constant.js";

export declare type DefaultResponseInterface = {
  success: boolean;
  message: string;
  error?: string;
  data?: any;
  HttpStatusCode?: number;
};

export type DecodedUser = {
  id: Types.ObjectId;
  email: string;
  phoneNumber?: string;
  role?: string;
};

const DEFAULT_SESSION_TTL_SECONDS = 60 * 30;

const parseJwtValidityToSeconds = (
  jwtTokenValidity: string | undefined,
): number | null => {
  if (!jwtTokenValidity) return null;

  const rawValue = jwtTokenValidity.trim().toLowerCase();
  if (!rawValue) return null;

  if (/^\d+$/.test(rawValue)) {
    const seconds = Number(rawValue);
    return Number.isInteger(seconds) && seconds > 0 ? seconds : null;
  }

  const compactMatch = rawValue.match(/^(\d+)([smhd])$/);
  if (!compactMatch) return null;

  const value = Number(compactMatch[1]);
  const unit = compactMatch[2];

  if (!Number.isInteger(value) || value <= 0) return null;

  const unitMultiplier: Record<string, number> = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 60 * 60 * 24,
  };

  return value * unitMultiplier[unit];
};

export const createSession = async (id: string, payload: DecodedUser) => {
  const key = `auth:sessions:${id}`;

  try {
    const redisInstance = new RedisClient(redis as unknown as string);

    // Serialize the payload before storing it
    const serializedPayload = JSON.stringify(payload);

    // Retrieve current session if it exists
    const currentSession = await redisInstance.get(key);

    // If a session exists, delete it
    if (currentSession) {
      await redisInstance.delete(key);
    }

    const parsedTtlSeconds = parseJwtValidityToSeconds(
      process.env.JWT_TOKEN_VALIDITY,
    );
    const sessionTtlSeconds = parsedTtlSeconds ?? DEFAULT_SESSION_TTL_SECONDS;

    if (parsedTtlSeconds === null) {
      console.warn(
        `Invalid JWT_TOKEN_VALIDITY value "${process.env.JWT_TOKEN_VALIDITY}". Falling back to ${DEFAULT_SESSION_TTL_SECONDS} seconds for session TTL.`,
      );
    }

    await redisInstance.setEx(key, serializedPayload, sessionTtlSeconds);

    return id;
  } catch (error) {
    throw new BadRequestError(`Error creating session`);
  }
};

export const getSession = async (id: string) => {
  const key = `auth:sessions:${id}`;

  const redisInstance = new RedisClient(redis as unknown as string);

  // Retrieve current session if it exists
  const session = await redisInstance.get(key);

  if (!session || session === "") return false;

  return session;
};

export const deleteSession = async (id: string) => {
  const key = `auth:sessions:${id}`;
  const redisInstance = new RedisClient(redis as unknown as string);

  await redisInstance.delete(key);

  return true;
};
