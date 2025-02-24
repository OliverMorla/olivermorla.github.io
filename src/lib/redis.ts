import { Redis } from "@upstash/redis";

// Null check .ENV vars
if (!process.env.UPSTASH_REDIS_URL) {
  throw new Error("Missing ENV: UPSTASH_REDIS_URL");
}

if (!process.env.UPSTASH_REDIS_TOKEN) {
  throw new Error("Missing ENV: UPSTASH_REDIS_TOKEN");
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});
