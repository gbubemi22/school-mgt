import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { v1 as uuidV1, v4 as uuidV4, validate as UUIDValidation } from "uuid";
import { RedisClient } from "./helper.js";

export interface DefaultResponseInt {
  success: boolean;
  data?: Array<any> | Record<string, any> | any;
  message: string;
  error?: any;
  httpStatusCode?: number;
  service?: string;
}


const redisUrl = process.env.REDIS_URL as string;

// if (!redisUrl) {
//   throw new Error('Redis URL is not defined in the environment variables.');
// }

if (process.env.NODE_ENV === "development") {
  console.log("Connecting to Redis at:", redisUrl);
}

export const redis = new RedisClient(redisUrl);


export type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;


export const generateTransactionRef = (prefix: string = "TRX"): string => {
  // Generate UUID and remove hyphens
  const uuid = uuidV4().replace(/-/g, "");

  // Take first 12 characters of UUID and combine with prefix
  const reference = `${prefix}_${uuid.substring(0, 12).toUpperCase()}`;

  return reference;
};

export const generateRandomString = (): string => {
  // Use UUID v4 for guaranteed uniqueness - removes hyphens for cleaner reference
  return uuidV4().replace(/-/g, "");
};

export function generateRandomNumber(): string {
  return `quickfoods${Math.floor(1000000 + Math.random() * 9000000)}`;
}

export function parseJSON(value: any): any {
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
}

