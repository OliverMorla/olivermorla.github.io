import "server-only";

import type { ChatMessage } from "@/lib/chat-schema";

// Everything that knows about the upstream model server: LM Studio on the
// owner's Mac, reached through a Cloudflare Tunnel guarded by Cloudflare
// Access. The service token is added here and never leaves the server.

const baseUrl = process.env.LLM_API_BASE_URL?.replace(/\/+$/, "");

export const isLlmConfigured = Boolean(baseUrl);

/** Models users may pick, as LM Studio names them. The first is the default. */
export const allowedModels = (): string[] =>
  (process.env.LLM_ALLOWED_MODELS ?? "")
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean);

const SYSTEM_PROMPT = [
  "You are a helpful assistant running privately on Oliver Morla's home server.",
  "Be concise and clear. Use Markdown when it helps: lists, tables, code blocks.",
  "Your answers are drafts, not professional advice; say so when it matters",
  "(medical, legal, financial).",
].join(" ");

const CONNECT_TIMEOUT_MS = 10_000;

/** Errors that mean "the Mac or the tunnel isn't answering". */
export class LlmOfflineError extends Error {}
/** The upstream answered but refused the request. */
export class LlmUpstreamError extends Error {
  constructor(readonly status: number) {
    super(`Upstream responded ${status}`);
  }
}

export async function llmFetch(
  path: string,
  init: RequestInit & { stream?: boolean } = {},
): Promise<Response> {
  if (!baseUrl) throw new LlmOfflineError("LLM_API_BASE_URL is not set");

  const headers = new Headers(init.headers);
  const id = process.env.CF_ACCESS_CLIENT_ID;
  const secret = process.env.CF_ACCESS_CLIENT_SECRET;
  if (id && secret) {
    headers.set("CF-Access-Client-Id", id);
    headers.set("CF-Access-Client-Secret", secret);
  }

  // Non-streaming calls get a hard timeout. Streaming calls are bounded by
  // the caller's signal (a closed tab, the Stop button) and maxDuration.
  const signals = [
    init.signal,
    !init.stream && AbortSignal.timeout(CONNECT_TIMEOUT_MS),
  ].filter((signal): signal is AbortSignal => Boolean(signal));

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers,
      signal: signals.length ? AbortSignal.any(signals) : undefined,
      cache: "no-store",
    });
  } catch (error) {
    // The user aborting isn't an outage; let the caller see it as such.
    if (init.signal?.aborted) throw error;
    throw new LlmOfflineError("Upstream unreachable", { cause: error });
  }

  if (response.ok) return response;

  // Cloudflare answers 502/530 when the tunnel has no connector (the Mac is
  // asleep or cloudflared is down), and LM Studio 503s with no model loaded.
  // An Access 403 is a token problem and is reported as an upstream error.
  await response.body?.cancel();
  if ([502, 503, 504, 521, 522, 523, 524, 530].includes(response.status)) {
    throw new LlmOfflineError(`Upstream responded ${response.status}`);
  }
  throw new LlmUpstreamError(response.status);
}

export async function streamChatCompletion({
  model,
  messages,
  signal,
}: {
  model: string;
  messages: ChatMessage[];
  signal?: AbortSignal;
}): Promise<ReadableStream<Uint8Array>> {
  const response = await llmFetch("/chat/completions", {
    method: "POST",
    stream: true,
    signal,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model,
      stream: true,
      max_tokens: 2048,
      temperature: 0.7,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!response.body) throw new LlmOfflineError("Upstream sent no body");
  return response.body;
}

/** Model ids LM Studio reports, or null when it can't be reached. */
export async function listUpstreamModels(): Promise<string[] | null> {
  try {
    const response = await llmFetch("/models");
    const json = (await response.json()) as { data?: { id?: unknown }[] };
    return (json.data ?? [])
      .map((model) => model.id)
      .filter((id): id is string => typeof id === "string");
  } catch {
    return null;
  }
}
