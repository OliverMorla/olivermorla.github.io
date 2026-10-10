// The role gate as a pure function, kept apart from the Better Auth access
// control in permissions.ts so pages, routes and tests can use it alone.

/** What a signed-in user may open, from their (possibly comma-joined) role. */
export type Access = "admin" | "chat" | "none";

export function accessFor(role: string | null | undefined): Access {
  const assigned = (role ?? "").split(",").map((r) => r.trim());
  if (assigned.includes("admin")) return "admin";
  if (assigned.includes("chat")) return "chat";
  return "none";
}
