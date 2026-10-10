"use client";

import type { ChatMessage } from "@/lib/chat-schema";
import { motion } from "motion/react";
import CopyButton from "./copy-button";
import Markdown from "./markdown";

type Props = {
  messages: ChatMessage[];
  streaming: boolean;
  /** Index from which messages animate in (earlier ones were already there). */
  animateFrom: number;
};

export default function Messages({ messages, streaming, animateFrom }: Props) {
  return (
    <ol className="mx-auto w-full max-w-3xl space-y-7 px-4 pt-4 pb-10 sm:px-6">
      {messages.map((message, i) => {
        const last = i === messages.length - 1;
        const live = streaming && last && message.role === "assistant";
        return (
          <motion.li
            key={i}
            initial={i >= animateFrom ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className={message.role === "user" ? "flex justify-end" : "group"}
          >
            {message.role === "user" ? (
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-surface px-4 py-2.5 text-[0.9375rem] leading-relaxed whitespace-pre-wrap text-ink ring-1 ring-line [overflow-wrap:anywhere]">
                <span className="sr-only">You: </span>
                {message.content}
              </div>
            ) : (
              <div>
                <span className="sr-only">Assistant: </span>
                {message.content ? (
                  <Markdown>{message.content}</Markdown>
                ) : (
                  live && (
                    <p
                      className="chat-shimmer text-[0.9375rem] font-medium"
                      aria-live="polite"
                    >
                      Thinking
                    </p>
                  )
                )}
                {!live && message.content && (
                  <div className="mt-2 -ml-1.5 flex opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100 max-sm:opacity-100">
                    <CopyButton
                      getText={() => message.content}
                      label="Copy answer"
                    />
                  </div>
                )}
              </div>
            )}
          </motion.li>
        );
      })}
    </ol>
  );
}
