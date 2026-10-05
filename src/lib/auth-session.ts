import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

/**
 * Whether the env needed to sign in at all is present. Checked before
 * loading the auth module: Better Auth refuses to start in production
 * without a secret, and that shouldn't take down pages that only want to
 * say sign-in isn't set up yet.
 */
export const isAuthConfigured = Boolean(
  process.env.DATABASE_URI && process.env.BETTER_AUTH_SECRET,
);

/** The auth instance, loaded on first use and only when configured. */
export const loadAuth = async () => (await import("@/lib/auth")).auth;

/** The current session, validated against the database once per request. */
export const getSession = cache(async () => {
  if (!isAuthConfigured) return null;
  const auth = await loadAuth();
  return auth.api.getSession({ headers: await headers() });
});

/**
 * Gate for every admin page and server action. proxy.ts only does an
 * optimistic cookie check; this is the real one.
 */
export async function requireAdmin(from = "/dashboard") {
  const session = await getSession();

  if (!session) {
    redirect(`/auth/login?next=${encodeURIComponent(from)}`);
  }
  if (session.user.role !== "admin") {
    redirect("/auth/login?error=forbidden");
  }

  return session;
}
