import "server-only";

import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";

const createClient = (key: string) =>
  arcjet({
    key,
    characteristics: ["ip.src"],
    rules: [
      // DDoS Protection
      shield({ mode: "LIVE" }),
      // Bot Detection
      detectBot({
        mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
        allow: [
          "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
          // See the full list at https://arcjet.com/bot-list
        ],
      }),
      // Rate Limiting
      tokenBucket({
        mode: "LIVE",
        capacity: 5,
        interval: 30,
        refillRate: 5,
      }),
    ],
  });

let client: ReturnType<typeof createClient> | undefined;

/**
 * Created on first use (not at import time) so a missing key fails the one
 * request that needs it, with a clear message, instead of the whole route.
 */
export const getArcjet = () => {
  // NB: the variable is spelled ARKJET in the deployed environment.
  const key = process.env.ARKJET_API_KEY;
  if (!key) throw new Error("Missing environment variable: ARKJET_API_KEY");

  client ??= createClient(key);
  return client;
};
