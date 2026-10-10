"use client";

import { chatLimits } from "@/lib/chat-schema";
import { ArrowUp, ChevronDown, Square } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type KeyboardEvent,
  type Ref,
} from "react";

export type ComposerHandle = {
  fill: (text: string) => void;
  focus: () => void;
};

type Props = {
  ref?: Ref<ComposerHandle>;
  streaming: boolean;
  models: string[];
  model: string | null;
  onModelChange: (model: string) => void;
  /** Model locked to the open chat's; it can't change mid-conversation. */
  modelLocked: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
};

const MAX_HEIGHT = 224;

const morph = {
  initial: { opacity: 0, scale: 0.5, filter: "blur(3px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.5, filter: "blur(3px)" },
  transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] as const },
};

/** Short model labels: "qwen/qwen3-30b-a3b" reads as "qwen3-30b-a3b". */
export const modelLabel = (id: string) => id.split("/").pop() ?? id;

export default function Composer({
  ref,
  streaming,
  models,
  model,
  onModelChange,
  modelLocked,
  onSend,
  onStop,
}: Props) {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");

  useImperativeHandle(ref, () => ({
    fill: (value) => {
      setText(value);
      textarea.current?.focus();
    },
    focus: () => textarea.current?.focus(),
  }));

  // Grow with the text up to a cap, then scroll inside.
  useEffect(() => {
    const el = textarea.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
  }, [text]);

  const trimmed = text.trim();
  const tooLong = text.length > chatLimits.maxMessageChars;
  const canSend = Boolean(trimmed) && !tooLong && !streaming && Boolean(model);
  const nearLimit = text.length > chatLimits.maxMessageChars * 0.8;

  function send() {
    if (!canSend) return;
    onSend(trimmed);
    setText("");
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sends; Shift+Enter is a new line. Not while an IME is composing.
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      send();
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        send();
      }}
      className="rounded-2xl bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.12)] ring-1 ring-line transition-shadow focus-within:ring-ink/25 dark:shadow-none"
    >
      <label htmlFor="chat-input" className="sr-only">
        Message
      </label>
      <textarea
        id="chat-input"
        ref={textarea}
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={onKeyDown}
        rows={1}
        placeholder="Ask anything"
        autoFocus
        enterKeyHint="send"
        className="block max-h-56 w-full resize-none bg-transparent px-4 pt-3.5 pb-1 text-[0.9375rem] leading-relaxed text-ink outline-none placeholder:text-muted"
      />

      <div className="flex items-center justify-between gap-3 px-2.5 pb-2.5">
        <div className="relative min-w-0">
          <label htmlFor="chat-model" className="sr-only">
            Model
          </label>
          <select
            id="chat-model"
            value={model ?? ""}
            onChange={(event) => onModelChange(event.target.value)}
            disabled={modelLocked || models.length < 2}
            title={
              modelLocked ? "Start a new chat to switch models" : undefined
            }
            className="h-8 max-w-[14rem] appearance-none truncate rounded-lg bg-transparent pr-7 pl-2.5 text-[0.8125rem] font-medium text-ink-2 transition-colors hover:bg-grid hover:text-ink disabled:hover:bg-transparent disabled:hover:text-ink-2"
          >
            {!model && <option value="">No models</option>}
            {model && !models.includes(model) && (
              <option value={model}>{modelLabel(model)}</option>
            )}
            {models.map((id) => (
              <option key={id} value={id}>
                {modelLabel(id)}
              </option>
            ))}
          </select>
          {!modelLocked && models.length > 1 && (
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-muted"
            />
          )}
        </div>

        <div className="flex items-center gap-3">
          {nearLimit && (
            <span
              className={`text-xs tabular-nums ${tooLong ? "text-down" : "text-muted"}`}
              aria-live="polite"
            >
              {text.length.toLocaleString()} /{" "}
              {chatLimits.maxMessageChars.toLocaleString()}
            </span>
          )}

          <button
            type={streaming ? "button" : "submit"}
            onClick={streaming ? onStop : undefined}
            disabled={!streaming && !canSend}
            aria-label={streaming ? "Stop" : "Send"}
            title={streaming ? "Stop" : "Send"}
            className="grid size-8 place-items-center overflow-hidden rounded-lg bg-ink text-page transition-[opacity,transform] duration-150 active:scale-[0.94] disabled:opacity-25"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {streaming ? (
                <motion.span key="stop" {...morph}>
                  <Square aria-hidden="true" className="size-3 fill-current" />
                </motion.span>
              ) : (
                <motion.span key="send" {...morph}>
                  <ArrowUp
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={2.25}
                  />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </form>
  );
}
