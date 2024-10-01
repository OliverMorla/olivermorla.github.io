import Mailjet from "node-mailjet";

// Initialize Mailjet client with API key and secret from environment variables
export const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY as string,
  apiSecret: process.env.MAILJET_SECRET_KEY as string,
});

/**
 * The Mailjet client is configured with the API key and secret key provided through environment variables.
 * Ensure that these environment variables (MAILJET_API_KEY and MAILJET_SECRET_KEY) are set in your environment.
 * 
 * Usage:
 * - This configured Mailjet client can be used to send emails and manage email campaigns.
 * 
 * Example:
 * import { mailjet } from './path-to-this-file';
 * 
 * mailjet.post('send', { version: 'v3.1' }).request({
 *   Messages: [
 *     {
 *       From: {
 *         Email: "sender@example.com",
 *         Name: "Sender Name",
 *       },
 *       To: [
 *         {
 *           Email: "recipient@example.com",
 *           Name: "Recipient Name",
 *         },
 *       ],
 *       Subject: "Your email flight plan!",
 *       TextPart: "Dear passenger, welcome to Mailjet!",
 *       HTMLPart: "<h3>Dear passenger, welcome to Mailjet!</h3>",
 *     },
 *   ],
 * }).then((result) => {
 *   console.log(result.body);
 * }).catch((err) => {
 *   console.error(err);
 * });
 */
