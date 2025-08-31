import Mailjet from "node-mailjet";

if (!process.env.MAILJET_API_KEY) {
  throw new Error("Missing ENV: MAILJET_API_KEY");
}

if (!process.env.MAILJET_SECRET_KEY) {
  throw new Error("Missing ENV: MAILJET_SECRET_KEY");
}

// Initializing Mailjet client
export const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_SECRET_KEY,
});
