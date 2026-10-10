import type { ChatMessage } from "@/lib/chat-schema";

// Chats live only in this browser, per user, and expire 12 hours after they
// start. Every storage call is guarded: with storage blocked (private mode,
// full quota) the chat still works for the open tab.

export const CHAT_TTL_MS = 12 * 60 * 60 * 1000;

export type StoredChat = {
  id: string;
  title: string;
  model: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
};

export const storageKey = (userId: string) => `chat:v1:${userId}`;

/** Drops chats started more than 12 hours before `now`. */
export const purgeExpired = (chats: StoredChat[], now: number) =>
  chats.filter((chat) => now - chat.createdAt <= CHAT_TTL_MS);

/** A short title from the first user message. */
export function titleFrom(content: string, max = 48) {
  const line = content.replace(/\s+/g, " ").trim();
  return line.length > max ? `${line.slice(0, max - 1).trimEnd()}…` : line;
}

const isChat = (value: unknown): value is StoredChat =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as StoredChat).id === "string" &&
  typeof (value as StoredChat).createdAt === "number" &&
  Array.isArray((value as StoredChat).messages);

export function loadChats(userId: string, now = Date.now()): StoredChat[] {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    const chats = Array.isArray(parsed) ? parsed.filter(isChat) : [];
    return purgeExpired(chats, now).sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}

export function saveChats(userId: string, chats: StoredChat[]) {
  try {
    if (chats.length) {
      localStorage.setItem(storageKey(userId), JSON.stringify(chats));
    } else {
      localStorage.removeItem(storageKey(userId));
    }
  } catch {
    // Storage unavailable; the chat stays in memory for this tab.
  }
}

export function clearChats(userId: string) {
  try {
    localStorage.removeItem(storageKey(userId));
  } catch {
    // Nothing stored, or storage unavailable.
  }
}
