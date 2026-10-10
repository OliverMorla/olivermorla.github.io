import { getChatArcjet } from "@/lib/arcjet";
import { chatRequestSchema } from "@/lib/chat-schema";
import {
  allowedModels,
  isLlmConfigured,
  LlmOfflineError,
  streamChatCompletion,
} from "@/lib/llm";
import type { NextRequest } from "next/server";
import { authorizeChat, jsonError, privateHeaders } from "./auth";

// The Hobby plan's ceiling without Fluid compute. At ~33 tokens/s on the
// 4-bit model that covers about 2,000 tokens, close to max_tokens in llm.ts.
// With Fluid compute enabled on the project this can go up to 300.
export const maxDuration = 60;

// Privacy: nothing here logs message content. Errors are reported by type
// and status only, and Sentry doesn't attach request bodies (sendDefaultPii
// is off; see src/lib/sentry/options.ts).
export async function POST(request: NextRequest) {
  const auth = await authorizeChat();
  if (auth.error) return auth.error;
  const { user } = auth.session;

  if (!isLlmConfigured) return jsonError(503, "not_configured");

  const decision = await rateLimit(request, user.id);
  if (decision === "limited") {
    return jsonError(
      429,
      "rate_limited",
      "You're sending messages quickly. Wait a minute and try again.",
    );
  }
  if (decision === "blocked") return jsonError(403, "blocked");

  const models = allowedModels();
  if (!models.length) return jsonError(503, "not_configured");

  const parsed = chatRequestSchema(models).safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) {
    return jsonError(400, "invalid", parsed.error.issues[0]?.message);
  }

  try {
    const body = await streamChatCompletion({
      ...parsed.data,
      // A closed tab or the Stop button aborts the request on the Mac too.
      signal: request.signal,
    });

    return new Response(body, {
      headers: {
        ...privateHeaders,
        "content-type": "text/event-stream; charset=utf-8",
        "x-accel-buffering": "no",
      },
    });
  } catch (error) {
    if (request.signal.aborted) return new Response(null, { status: 499 });
    if (error instanceof LlmOfflineError) return jsonError(503, "offline");
    // An upstream 4xx (bad model id, a Cloudflare Access token problem).
    // Upstream bodies are never passed through.
    console.error("[chat] upstream error", (error as Error).message);
    return jsonError(502, "upstream");
  }
}

async function rateLimit(request: NextRequest, userId: string) {
  let aj;
  try {
    aj = getChatArcjet();
  } catch (error) {
    // No key: fail closed in production, carry on in local development.
    if (process.env.NODE_ENV === "production") throw error;
    return "allowed";
  }

  const decision = await aj.protect(request, { userId, requested: 1 });
  if (!decision.isDenied()) return "allowed";
  return decision.reason.isRateLimit() ? "limited" : "blocked";
}
