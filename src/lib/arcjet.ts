import arcjet, { detectBot, tokenBucket, shield } from "@arcjet/next";

if (!process.env.ARKJET_API_KEY) {
  throw new Error("Missing Environment Variable: ARKJET_API_KEY");
}
export const aj = arcjet({
  key: process.env.ARKJET_API_KEY,
  characteristics: ["ip.src"],
  rules: [
    // DDoS Protection
    shield({ mode: "LIVE" }),
    // Bot Detection
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
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
