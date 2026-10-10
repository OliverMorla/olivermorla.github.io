import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins/admin";
import { Pool } from "pg";
import { databaseUrl } from "./database-url";
import { ac, roles } from "./permissions";

// Better Auth server config (https://better-auth.com/docs). Kept free of
// `server-only` so the CLI can load it (`pnpm dlx auth@latest migrate` and
// `create-admin`); it's only ever imported from server code.
//
// Env: DATABASE_URL or DIRECT_URL (see database-url.ts),
// BETTER_AUTH_SECRET, and BETTER_AUTH_URL in production. See .env.example.

// One pool per server instance, reused across dev hot reloads so they don't
// pile up connections against the shared database.
const globalForAuth = globalThis as unknown as { authPool?: Pool };
const pool = (globalForAuth.authPool ??= new Pool({
  connectionString: databaseUrl,
  max: 5,
  idleTimeoutMillis: 10_000,
}));

// Preview deployments get their own URLs; trust them alongside the base URL.
const vercelOrigins = [
  process.env.VERCEL_URL,
  process.env.VERCEL_BRANCH_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
]
  .filter(Boolean)
  .map((host) => `https://${host}`);

export const auth = betterAuth({
  appName: "Oliver Morla",
  database: pool,
  // Prefer BETTER_AUTH_URL; on Vercel previews fall back to the deployment.
  ...(!process.env.BETTER_AUTH_URL && process.env.VERCEL_URL
    ? { baseURL: `https://${process.env.VERCEL_URL}` }
    : {}),
  trustedOrigins: vercelOrigins,

  // Every auth table is prefixed `auth_`, keeping them apart from the older
  // tables already in this database.
  user: { modelName: "auth_user" },
  account: { modelName: "auth_account" },
  verification: { modelName: "auth_verification" },
  session: {
    modelName: "auth_session",
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh daily while in use
    cookieCache: { enabled: true, maxAge: 60 * 5, strategy: "jwe" },
  },

  // A private area: there is no public sign-up. The owner's account is
  // created with `pnpm dlx auth@latest create-admin`, friends' chat-only
  // accounts with `pnpm chat:create-user` (scripts/chat-users.ts).
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 12,
    maxPasswordLength: 128,
    revokeSessionsOnPasswordReset: true,
  },

  // Database-backed so limits hold across serverless instances.
  rateLimit: {
    enabled: true,
    storage: "database",
    modelName: "auth_rate_limit",
    customRules: {
      "/sign-in/email": { window: 60, max: 5 },
    },
  },

  advanced: {
    // Vercel sets x-real-ip itself; the left of x-forwarded-for can be forged.
    ipAddress: { ipAddressHeaders: ["x-real-ip"] },
  },

  databaseHooks: {
    session: {
      create: {
        after: async (session) => {
          console.info(`[auth] session created for user ${session.userId}`);
        },
      },
    },
  },

  // nextCookies must stay last: it sets cookies from server actions.
  // Role changes reach a signed-in user within cookieCache.maxAge (5 min).
  plugins: [admin({ ac, roles }), nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
