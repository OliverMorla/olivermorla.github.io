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

// The private chat: keyed on the signed-in user rather than the IP, so
// friends on one network don't share a budget. No bot detection; every
// caller has already signed in. ~20 messages per 10 minutes.
const createChatClient = (key: string) =>
  arcjet({
    key,
    characteristics: ["userId"],
    rules: [
      shield({ mode: "LIVE" }),
      tokenBucket({
        mode: "LIVE",
        capacity: 20,
        interval: 60,
        refillRate: 2,
      }),
    ],
  });

const arcjetKey = () => {
  const key = process.env.ARCJET_API_KEY;
  if (!key) throw new Error("Missing environment variable: ARCJET_API_KEY");
  return key;
};

let client: ReturnType<typeof createClient> | undefined;
let chatClient: ReturnType<typeof createChatClient> | undefined;

/**
 * Created on first use (not at import time) so a missing key fails the one
 * request that needs it, with a clear message, instead of the whole route.
 */
export const getArcjet = () => (client ??= createClient(arcjetKey()));

/** Per-user limits for /api/chat. Pass `{ userId, requested: 1 }`. */
export const getChatArcjet = () =>
  (chatClient ??= createChatClient(arcjetKey()));
