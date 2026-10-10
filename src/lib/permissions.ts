import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

// Roles for the admin plugin, shared by the server config and the client so
// both agree on what each role can do. Client-safe: no secrets here.
//
// - admin: the owner. Analytics, chat, and every user-management action.
// - chat:  invited friends. The chat page and nothing else; no permission
//          to list users, set roles, ban or impersonate.
export const ac = createAccessControl(defaultStatements);

export const roles = {
  admin: ac.newRole(adminAc.statements),
  chat: ac.newRole({ user: [], session: [] }),
};

export type AppRole = keyof typeof roles;
