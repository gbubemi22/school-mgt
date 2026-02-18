import { Redis } from "ioredis";
import { BadRequestError, UnauthenticatedError } from "./error.js";

export function parseJSON(value: any): any {
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
}

export class RedisClient {
  private client;

  constructor(url: string) {
    this.client = new Redis(url, {
      maxRetriesPerRequest: null, // Allow infinite retries for commands (essential for BullMQ/robust apps)
      connectTimeout: 10000, // 10s connection timeout
      retryStrategy(times) {
        // Exponential backoff: 50ms, 100ms, 200ms... capped at 20s
        const delay = Math.min(times * 50, 20000);
        console.warn(`⚠️ Redis disconnected. Retrying in ${delay}ms... (Attempt ${times})`);
        return delay;
      },
    });

    this.client.on('error', (err) => {
      // Prevent unhandled error crashes
      console.error('❌ Redis Client Error:', err);
    });
  }


  async keys(pattern: string): Promise<Array<string> | any> {
    return await this.client.keys(pattern);
  }

  async set(key: string, data: any): Promise<any> {
    if (!key || typeof key !== "string")
      throw new BadRequestError("Redis key must be a string");

    if (typeof data !== "number" || typeof data !== "string")
      data = JSON.stringify(data);
    return await this.client.set(key, data);
  }

  async setEx(key: string, data: any, duration: number | string): Promise<any> {
    if (!key || typeof key !== "string")
      throw new BadRequestError("Redis key must be a string");

    if (typeof data !== "number" || typeof data !== "string")
      data = JSON.stringify(data);

    if (typeof duration === "string") {
      const normalizedDuration = duration.trim().toLowerCase();

      if (/^\d+$/.test(normalizedDuration)) {
        duration = Number(normalizedDuration);
      } else {
        const compactMatch = normalizedDuration.match(/^(\d+)([smhd])$/);
        if (compactMatch) {
          const value = Number(compactMatch[1]);
          const unit = compactMatch[2];
          const compactUnitMap: Record<string, number> = {
            s: 1,
            m: 60,
            h: 60 * 60,
            d: 60 * 60 * 24,
          };
          duration = value * compactUnitMap[unit];
        } else {
          let [value, unit] = normalizedDuration.split(" ") as any;
          value = Number(value);
          if (unit === "days" || unit === "day") {
            duration = 60 * 60 * 24 * value;
          } else if (unit === "minutes" || unit === "minute") {
            duration = 60 * value;
          } else if (unit === "hours" || unit === "hour") {
            duration = 60 * 60 * value;
          } else if (unit === "seconds" || unit === "second") {
            duration = value;
          }
        }
      }
    }

    if (
      typeof duration !== "number" ||
      !Number.isFinite(duration) ||
      !Number.isInteger(duration) ||
      duration <= 0
    ) {
      throw new BadRequestError("Redis duration must be a positive integer");
    }

    return await this.client.setex(key, duration as number, data);
  }

  async get(key: string, parse: boolean = true): Promise<any> {
    if (!key || typeof key !== "string")
      throw new BadRequestError("Redis key must be a string");

    const data = (await this.client.get(key)) as any;
    return parse ? parseJSON(data) : data;
  }

  async delete(key: string): Promise<boolean> {
    if (!key || typeof key !== "string")
      throw new BadRequestError("Redis key must be a string");

    return Boolean(await this.client.del(key));
  }

  async deleteAll(prefix: string): Promise<void> {
    const keys = await this.keys(prefix);
    for (const key of keys) {
      await this.delete(key);
    }
  }

  async getCachedUser(id: string, throwError = true): Promise<any> {
    let userToken = `${id}-token`;
    const user = await this.client.get(userToken);
    if (!user && throwError)
      throw new UnauthenticatedError("Kindly login, user not found");
    return parseJSON(user);
  }

  async cacheUser(user: any): Promise<void> {
    await Promise.all([
      this.set(user.tokenRef, user),
      this.set(`${user.id}-token`, user),
    ]);
  }

  async updateAuthData(
    userId: string,
    key: string,
    value: string,
    action = "ADD"
  ): Promise<void> {
    const user = await this.getCachedUser(userId, false);

    if (!user) return;

    if (Array.isArray(user[key])) {
      if (action === "ADD") user[key].push(value);
      else if (action === "REMOVE") {
        user[key].splice(user[key].indexOf(value), 1);
      }
      await this.cacheUser(user);
    }

    return parseJSON(user);
  }
}
