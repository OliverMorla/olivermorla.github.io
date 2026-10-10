/**
 * Manage invited chat-only accounts. Run locally against the database in
 * .env.local (pull it with `vercel env pull .env.local`):
 *
 *   pnpm chat:create-user <email> "<name>"   creates a `chat` user and
 *                                             prints a password, once
 *   pnpm chat:create-user <email> "<name>" --admin
 *                                            the same, with the `admin` role
 *   pnpm chat:remove-user <email>            bans the user and signs them
 *                                             out everywhere
 *
 * Bans and new roles reach open tabs within 5 minutes (the session cookie
 * cache), and the chat API checks the role on every request after that.
 */
import { randomInt } from "node:crypto";
import { auth } from "../src/lib/auth";
import type { AppRole } from "../src/lib/permissions";

// No look-alikes (0/O, 1/l/I), so the password survives being read aloud.
const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

const generatePassword = (length = 20) =>
  Array.from({ length }, () => alphabet[randomInt(alphabet.length)]).join("");

async function createUser(email: string, name: string, role: AppRole) {
  const password = generatePassword();
  // Called without request headers, so the admin plugin treats it as a
  // trusted server call and skips its session check.
  const { user } = await auth.api.createUser({
    body: { email, name, password, role },
  });

  console.log(`Created ${user.email} with role "${role}".`);
  console.log(`Password (shown once): ${password}`);
  console.log("Sign in at https://olivermorla.com/auth/login");
}

async function removeUser(email: string) {
  // banUser and revokeUserSessions over the API need an admin session, so
  // go through the adapter directly; it's what those endpoints call.
  const ctx = await auth.$context;
  const user = await ctx.internalAdapter.findUserByEmail(email);
  if (!user) throw new Error(`No user with email ${email}`);

  await ctx.internalAdapter.updateUser(user.user.id, {
    banned: true,
    banReason: "Chat access removed",
  });
  await ctx.internalAdapter.deleteUserSessions(user.user.id);
  console.log(`Banned ${email} and revoked their sessions.`);
}

async function main() {
  const args = process.argv.slice(2);
  const role: AppRole = args.includes("--admin") ? "admin" : "chat";
  const [command, email, ...nameParts] = args.filter((a) => a !== "--admin");
  const name = nameParts.join(" ").trim();

  if (command === "create" && email && name) {
    return createUser(email, name, role);
  }
  if (command === "remove" && email) return removeUser(email);

  console.error(
    'Usage:\n  pnpm chat:create-user <email> "<name>" [--admin]\n  pnpm chat:remove-user <email>',
  );
  process.exitCode = 1;
}

main()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  // The pg pool keeps the process alive otherwise.
  .finally(() => setTimeout(() => process.exit(), 100));
