"use client";

import { fitToLimits, type ChatMessage } from "@/lib/chat-schema";
import {
  loadChats,
  purgeExpired,
  saveChats,
  titleFrom,
  type StoredChat,
} from "@/lib/chat-storage";
import { createSseParser } from "@/lib/sse";
import { ArrowDown, PanelLeft, RotateCw, X } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import ChatList from "./chat-list";
import Composer, { modelLabel, type ComposerHandle } from "./composer";
import Messages from "./messages";
import SignalPath from "./signal-path";
import { useServerStatus } from "./use-server-status";

type Notice = { kind: "offline" | "error"; message: string } | null;

const PURGE_MS = 5 * 60_000;

const suggestions = [
  "Explain a concept simply",
  "Draft a short email",
  "Review a code snippet",
];

export default function Chat({ userId }: { userId: string }) {
  const router = useRouter();
  const { status, refresh, markOffline } = useServerStatus();

  const [chats, setChats] = useState<StoredChat[]>(() => loadChats(userId));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pickedModel, setPickedModel] = useState<string | null>(null);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const controller = useRef<AbortController | null>(null);
  const composer = useRef<ComposerHandle>(null);

  const active = chats.find((chat) => chat.id === activeId) ?? null;
  const model = active?.model ?? pickedModel ?? status.default;
  const streaming = streamingId !== null;

  // Save on every change except mid-stream, where it would write on every
  // token; the stream's end is a change too.
  useEffect(() => {
    if (!streaming) saveChats(userId, chats);
  }, [userId, chats, streaming]);

  // Expire old chats on focus and every 5 minutes (load already did).
  useEffect(() => {
    const purge = () => {
      const time = Date.now();
      setNow(time);
      setChats((current) => {
        const kept = purgeExpired(current, time);
        return kept.length === current.length ? current : kept;
      });
    };
    const interval = setInterval(purge, PURGE_MS);
    window.addEventListener("focus", purge);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", purge);
    };
  }, []);

  // The open chat can expire (or be deleted) out from under the view.
  if (activeId && !active) setActiveId(null);

  // Stop a generation still running when the page goes away.
  useEffect(() => () => controller.current?.abort(), []);

  const updateChat = useCallback(
    (id: string, update: (chat: StoredChat) => StoredChat) =>
      setChats((current) =>
        current.map((chat) => (chat.id === id ? update(chat) : chat)),
      ),
    [],
  );

  async function send(text: string) {
    if (streaming || !model) return;
    setNotice(null);

    const time = Date.now();
    const user: ChatMessage = { role: "user", content: text };
    const chat: StoredChat = active
      ? { ...active, updatedAt: time, messages: [...active.messages, user] }
      : {
          id: crypto.randomUUID(),
          title: titleFrom(text),
          model,
          createdAt: time,
          updatedAt: time,
          messages: [user],
        };
    const history = chat.messages;

    // Newest first; the assistant's reply starts empty and fills as it streams.
    setChats((current) => [
      { ...chat, messages: [...history, { role: "assistant", content: "" }] },
      ...current.filter((c) => c.id !== chat.id),
    ]);
    // Persist the question now, in case the tab closes mid-answer.
    saveChats(userId, [chat, ...chats.filter((c) => c.id !== chat.id)]);
    setActiveId(chat.id);
    setStreamingId(chat.id);
    setSheetOpen(false);

    const abort = new AbortController();
    controller.current = abort;

    const setReply = (update: (reply: string) => string) =>
      updateChat(chat.id, (c) => {
        const messages = c.messages.slice();
        const last = messages[messages.length - 1];
        messages[messages.length - 1] = {
          ...last,
          content: update(last.content),
        };
        return { ...c, messages, updatedAt: Date.now() };
      });
    const dropEmptyReply = () =>
      updateChat(chat.id, (c) => {
        const last = c.messages[c.messages.length - 1];
        return last?.role === "assistant" && !last.content
          ? { ...c, messages: c.messages.slice(0, -1) }
          : c;
      });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          model: chat.model,
          messages: fitToLimits(history),
        }),
        signal: abort.signal,
      });

      if (!response.ok || !response.body) {
        dropEmptyReply();
        const body = (await response.json().catch(() => ({}))) as {
          error?: string;
          message?: string;
        };
        if (response.status === 401) {
          router.replace("/auth/login?next=/dashboard/chat");
          return;
        }
        if (response.status === 503) {
          markOffline();
          setNotice({
            kind: "offline",
            message: "Oliver's server is offline. Try again later.",
          });
          return;
        }
        setNotice({
          kind: "error",
          message:
            body.message && response.status !== 400
              ? body.message
              : response.status === 400
                ? "That message couldn't be sent. Try a shorter one."
                : "Something went wrong. Try again.",
        });
        return;
      }

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();
      const parser = createSseParser();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        const { text: delta, done: finished } = parser.push(value);
        if (delta) setReply((reply) => reply + delta);
        if (finished) break;
      }
    } catch {
      if (!abort.signal.aborted) {
        setNotice({
          kind: "error",
          message: "The connection dropped. Try again.",
        });
      }
    } finally {
      dropEmptyReply();
      controller.current = null;
      setStreamingId(null);
      composer.current?.focus();
    }
  }

  function stop() {
    controller.current?.abort();
  }

  function newChat() {
    if (streaming) stop();
    setActiveId(null);
    setNotice(null);
    setSheetOpen(false);
    composer.current?.focus();
  }

  function selectChat(id: string) {
    if (streaming && id !== streamingId) stop();
    setActiveId(id);
    setNotice(null);
    setSheetOpen(false);
  }

  function deleteChat(id: string) {
    if (id === streamingId) stop();
    setChats((current) => current.filter((chat) => chat.id !== id));
  }

  const serverState = !status.checked
    ? "checking"
    : status.online
      ? "online"
      : "offline";

  const list = (
    <ChatList
      chats={chats}
      activeId={activeId}
      now={now}
      onSelect={selectChat}
      onNew={newChat}
      onDelete={deleteChat}
    />
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-72 shrink-0 border-r border-line md:block">
          {list}
        </aside>

        <MobileSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
          {list}
        </MobileSheet>

        <main className="relative flex min-w-0 flex-1 flex-col">
          <div className="flex h-12 shrink-0 items-center justify-between gap-3 px-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-1">
              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                aria-label="Show chats"
                className="-ml-1 grid size-9 place-items-center rounded-lg text-ink-2 transition-colors hover:bg-surface hover:text-ink md:hidden"
              >
                <PanelLeft aria-hidden="true" className="size-4" />
              </button>
              <h1 className="truncate text-sm font-medium text-ink">
                {active?.title ?? "New chat"}
              </h1>
            </div>
            <StatusPill
              state={serverState}
              streaming={streaming}
              model={model}
            />
          </div>

          <Thread
            key={activeId ?? "new"}
            messages={active?.messages ?? []}
            streaming={streaming && streamingId === activeId}
          >
            <EmptyState
              state={serverState}
              onSuggest={(text) => composer.current?.fill(text)}
            />
          </Thread>

          <div className="mx-auto w-full max-w-3xl px-3 pb-3 sm:px-5 sm:pb-5">
            <AnimatePresence initial={false}>
              {notice && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="mb-2 flex items-center justify-between gap-3 rounded-xl bg-surface px-3.5 py-2.5 text-sm ring-1 ring-line"
                >
                  <span className="flex items-center gap-2.5 text-ink-2">
                    <span
                      aria-hidden="true"
                      className={`size-1.5 shrink-0 rounded-full ${
                        notice.kind === "offline" ? "bg-down" : "bg-series-2"
                      }`}
                    />
                    {notice.message}
                  </span>
                  <span className="flex shrink-0 items-center gap-1">
                    {notice.kind === "offline" && (
                      <button
                        type="button"
                        onClick={() => {
                          setNotice(null);
                          void refresh();
                        }}
                        className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-ink transition-colors hover:bg-grid"
                      >
                        <RotateCw aria-hidden="true" className="size-3" />
                        Check again
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setNotice(null)}
                      aria-label="Dismiss"
                      className="grid size-7 place-items-center rounded-md text-muted transition-colors hover:bg-grid hover:text-ink"
                    >
                      <X aria-hidden="true" className="size-3.5" />
                    </button>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <Composer
              ref={composer}
              streaming={streaming}
              models={status.models}
              model={model}
              onModelChange={setPickedModel}
              modelLocked={Boolean(active)}
              onSend={send}
              onStop={stop}
            />
          </div>
        </main>
      </div>
    </MotionConfig>
  );
}

function StatusPill({
  state,
  streaming,
  model,
}: {
  state: "checking" | "online" | "offline";
  streaming: boolean;
  model: string | null;
}) {
  const label = streaming
    ? "Answering"
    : state === "online"
      ? "Online"
      : state === "offline"
        ? "Offline"
        : "Checking";
  return (
    <span
      className="flex shrink-0 items-center gap-2 text-xs font-medium text-ink-2"
      title={model ? `Model: ${modelLabel(model)}` : undefined}
      aria-live="polite"
    >
      <span
        className="relative grid size-2 place-items-center"
        aria-hidden="true"
      >
        {(streaming || state === "online") && (
          <span
            className={`absolute inset-0 rounded-full motion-safe:animate-ping ${
              streaming
                ? "bg-series-1/60"
                : "bg-up/40 [animation-duration:2.4s]"
            }`}
          />
        )}
        <span
          className={`relative size-2 rounded-full transition-colors ${
            streaming
              ? "bg-series-1"
              : state === "online"
                ? "bg-up"
                : state === "offline"
                  ? "bg-down"
                  : "bg-muted"
          }`}
        />
      </span>
      {label}
    </span>
  );
}

/** Scrolls with the stream until the reader scrolls up, then stays put. */
function Thread({
  messages,
  streaming,
  children,
}: {
  messages: ChatMessage[];
  streaming: boolean;
  children: React.ReactNode;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(true);
  // Messages already there when the thread opened don't animate in.
  const [initialCount] = useState(messages.length);

  const lastLength = messages[messages.length - 1]?.content.length ?? 0;
  useEffect(() => {
    const el = scroller.current;
    if (el && pinned) el.scrollTop = el.scrollHeight;
  }, [messages.length, lastLength, pinned]);

  function onScroll() {
    const el = scroller.current;
    if (!el) return;
    setPinned(el.scrollHeight - el.scrollTop - el.clientHeight < 48);
  }

  function jumpToLatest() {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: "smooth",
    });
    setPinned(true);
  }

  if (!messages.length) {
    return (
      <div className="flex min-h-0 flex-1 overflow-y-auto">{children}</div>
    );
  }

  return (
    <div className="relative min-h-0 flex-1">
      <div
        ref={scroller}
        onScroll={onScroll}
        className="h-full overflow-y-auto"
      >
        <Messages
          messages={messages}
          streaming={streaming}
          animateFrom={initialCount}
        />
      </div>
      <AnimatePresence>
        {!pinned && (
          <motion.button
            type="button"
            onClick={jumpToLatest}
            aria-label="Jump to latest"
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 4 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="absolute bottom-3 left-1/2 grid size-8 -translate-x-1/2 place-items-center rounded-full bg-surface text-ink-2 shadow-sm ring-1 ring-line hover:text-ink"
          >
            <ArrowDown aria-hidden="true" className="size-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function EmptyState({
  state,
  onSuggest,
}: {
  state: "checking" | "online" | "offline";
  onSuggest: (text: string) => void;
}) {
  return (
    <div className="m-auto flex w-full max-w-md flex-col items-center px-6 py-10 text-center">
      <SignalPath state={state} />
      <h2 className="mt-8 text-2xl font-semibold tracking-[-0.025em] text-balance sm:text-[1.75rem]">
        {state === "offline" ? "The server is resting" : "Ask anything"}
      </h2>
      <p className="mt-2 text-sm text-pretty text-ink-2">
        {state === "offline"
          ? "Oliver's Mac Studio isn't answering right now. Check back later."
          : "Answered by a model running on Oliver's Mac Studio. Nothing is saved on a server."}
      </p>
      {state !== "offline" && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {suggestions.map((text) => (
            <button
              key={text}
              type="button"
              onClick={() => onSuggest(`${text}: `)}
              className="h-8 rounded-full px-3.5 text-[0.8125rem] text-ink-2 ring-1 ring-line transition-[color,background-color,transform] duration-150 hover:bg-surface hover:text-ink active:scale-[0.97]"
            >
              {text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileSheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Chats"
            className="absolute inset-y-0 left-0 w-[min(20rem,85vw)] bg-page shadow-xl ring-1 ring-line"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.4, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80 || info.velocity.x < -400) onClose();
            }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
