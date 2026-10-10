import "server-only";

import { accessFor } from "@/lib/access";
import { getSession } from "@/lib/auth-session";

// Shared by the chat routes. Every response from them is private and must
// never be cached or indexed.
export const privateHeaders = {
  "cache-control": "no-store",
  "x-robots-tag": "noindex, nofollow",
};

export const jsonError = (status: number, error: string, message?: string) =>
  Response.json({ error, message }, { status, headers: privateHeaders });

/** The signed-in admin or chat user, or the error response to return. */
export async function authorizeChat() {
  const session = await getSession();
  if (!session) return { error: jsonError(401, "unauthorized") } as const;
  if (accessFor(session.user.role) === "none") {
    return { error: jsonError(403, "forbidden") } as const;
  }
  return { session } as const;
}
