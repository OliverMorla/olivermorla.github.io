"use client";

import { CHAT_TTL_MS, type StoredChat } from "@/lib/chat-storage";
import { Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  chats: StoredChat[];
  activeId: string | null;
  now: number;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
};

/** Time until a chat is deleted, as the list shows it: "11h left". */
export function timeLeft(createdAt: number, now: number) {
  const ms = Math.max(0, createdAt + CHAT_TTL_MS - now);
  const minutes = Math.ceil(ms / 60_000);
  return minutes >= 60
    ? `${Math.floor(minutes / 60)}h left`
    : `${minutes}m left`;
}

export default function ChatList({
  chats,
  activeId,
  now,
  onSelect,
  onNew,
  onDelete,
}: Props) {
  return (
    <div className="flex h-full flex-col">
      <div className="p-3">
        <button
          type="button"
          onClick={onNew}
          className="flex h-9 w-full items-center gap-2 rounded-lg px-3 text-sm font-medium text-ink ring-1 ring-line transition-[background-color,transform] duration-150 hover:bg-surface active:scale-[0.98]"
        >
          <Plus aria-hidden="true" className="size-4" />
          New chat
        </button>
      </div>

      <nav
        aria-label="Chats"
        className="min-h-0 flex-1 overflow-y-auto px-3 pb-3"
      >
        {chats.length === 0 ? (
          <p className="px-3 py-2 text-sm text-muted">No chats yet.</p>
        ) : (
          <ul className="space-y-0.5">
            <AnimatePresence initial={false}>
              {chats.map((chat) => {
                const active = chat.id === activeId;
                return (
                  <motion.li
                    key={chat.id}
                    layout="position"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="group relative"
                  >
                    <button
                      type="button"
                      onClick={() => onSelect(chat.id)}
                      aria-current={active ? "page" : undefined}
                      className={`flex w-full flex-col items-start rounded-lg py-2 pr-10 pl-3 text-left transition-colors ${
                        active
                          ? "bg-surface ring-1 ring-line"
                          : "hover:bg-surface/60"
                      }`}
                    >
                      <span className="w-full truncate text-sm text-ink">
                        {chat.title || "New chat"}
                      </span>
                      <span className="text-xs text-muted tabular-nums">
                        {timeLeft(chat.createdAt, now)}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(chat.id)}
                      aria-label={`Delete "${chat.title || "New chat"}"`}
                      title="Delete"
                      className="absolute top-1/2 right-1.5 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted opacity-0 transition-[opacity,color,background-color] group-hover:opacity-100 hover:bg-grid hover:text-down focus-visible:opacity-100 max-sm:opacity-100"
                    >
                      <Trash2 aria-hidden="true" className="size-3.5" />
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </nav>

      <p className="border-t border-line px-6 py-3 text-xs leading-relaxed text-muted">
        Chats are stored on this device and deleted after 12 hours.
      </p>
    </div>
  );
}
