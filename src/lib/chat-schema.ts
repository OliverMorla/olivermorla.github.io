import { z } from "zod";

// Limits for POST /api/chat. Shared with the composer so the browser stops
// at the same lengths the server enforces.
export const chatLimits = {
  maxMessages: 40,
  maxMessageChars: 8_000,
  maxTotalChars: 32_000,
} as const;

const message = z.object({
  // The system prompt is set on the server; the browser can't send one.
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(chatLimits.maxMessageChars),
});

/** Request body schema for a given model allowlist (first = default). */
export const chatRequestSchema = (models: readonly string[]) =>
  z.object({
    model: z
      .string()
      .optional()
      .transform((model) => model ?? models[0])
      .refine((model) => model !== undefined && models.includes(model), {
        message: "Unknown model",
      })
      .transform((model) => model as string),
    messages: z
      .array(message)
      .min(1)
      .max(chatLimits.maxMessages)
      .refine(
        (messages) =>
          messages.reduce((total, m) => total + m.content.length, 0) <=
          chatLimits.maxTotalChars,
        { message: "Conversation is too long" },
      ),
  });

export type ChatRequest = z.infer<ReturnType<typeof chatRequestSchema>>;
export type ChatMessage = ChatRequest["messages"][number];

/**
 * The most recent messages that fit the limits, so a long chat keeps going
 * with its oldest turns dropped instead of being rejected. Always starts on
 * a user message, the way the model expects a conversation to open.
 */
export function fitToLimits(messages: ChatMessage[]): ChatMessage[] {
  const kept: ChatMessage[] = [];
  let total = 0;

  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    if (
      kept.length === chatLimits.maxMessages ||
      total + message.content.length > chatLimits.maxTotalChars
    ) {
      break;
    }
    kept.unshift(message);
    total += message.content.length;
  }

  while (kept.length && kept[0].role !== "user") kept.shift();
  return kept;
}
