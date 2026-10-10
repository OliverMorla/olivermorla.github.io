// The Postgres connection string for Better Auth, as the Supabase
// integration names it on Vercel:
// - DATABASE_URL: the pooled connection (Supavisor). Preferred at runtime,
//   where serverless functions open many short-lived connections.
// - DIRECT_URL: the direct connection. Used when no pooled URL is set.
// No `server-only` here: Better Auth's CLI and scripts/ load this too.
export const databaseUrl =
  process.env.DATABASE_URL || process.env.DIRECT_URL || "";
