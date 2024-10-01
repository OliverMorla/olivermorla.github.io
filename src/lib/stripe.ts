import Stripe from "stripe";

// Initialize Stripe client with the secret key from environment variables
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

/**
 * The Stripe client is configured with the secret key provided through environment variables.
 * Ensure that the environment variable (STRIPE_SECRET_KEY) is set in your environment.
 *
 * - `apiVersion`: The API version to be used with Stripe. Set to "2024-04-10".
 * - `typescript`: A flag indicating TypeScript support.
 *
 * Usage:
 * - This configured Stripe client can be used to create charges, handle subscriptions, and manage customer data.
 *
 * Example:
 * import { stripe } from './path-to-this-file';
 *
 * const customer = await stripe.customers.create({
 *   email: 'customer@example.com',
 * });
 *
 * const charge = await stripe.charges.create({
 *   amount: 2000, // amount in cents
 *   currency: 'usd',
 *   customer: customer.id,
 *   description: 'Example charge',
 * });
 *
 * console.log(charge);
 */
