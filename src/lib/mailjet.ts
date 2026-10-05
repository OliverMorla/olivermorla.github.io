import "server-only";

import Mailjet from "node-mailjet";

let client: Mailjet | undefined;

/** Created on first use so a missing key only fails the request that needs it. */
export const getMailjet = () => {
  const apiKey = process.env.MAILJET_API_KEY;
  const apiSecret = process.env.MAILJET_SECRET_KEY;

  if (!apiKey || !apiSecret) {
    throw new Error(
      "Missing environment variable: MAILJET_API_KEY or MAILJET_SECRET_KEY",
    );
  }

  client ??= new Mailjet({ apiKey, apiSecret });
  return client;
};
