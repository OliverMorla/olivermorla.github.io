// The Postgres connection string shared by Payload and Better Auth, as the
// Supabase integration names it on Vercel:
// - DATABASE_URL: the pooled connection (Supavisor). Preferred at runtime,
//   where serverless functions open many short-lived connections.
// - DIRECT_URL: the direct connection. Used when no pooled URL is set.
// No `server-only` here: Payload's and Better Auth's CLIs load this too.
export const databaseUrl =
  process.env.DATABASE_URL || process.env.DIRECT_URL || "";
