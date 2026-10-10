import { allowedModels, isLlmConfigured, listUpstreamModels } from "@/lib/llm";
import { authorizeChat, privateHeaders } from "../auth";

export type ModelsResponse = {
  online: boolean;
  models: string[];
  default: string | null;
};

// The page polls this for the model picker and the online dot. One upstream
// check per instance every 30 s is plenty, however many tabs are open.
const TTL_MS = 30_000;
let cached: { at: number; value: ModelsResponse } | undefined;

async function check(): Promise<ModelsResponse> {
  const allowed = allowedModels();
  const upstream = isLlmConfigured ? await listUpstreamModels() : null;

  // Offline: still list the allowlist so the picker isn't empty. Online:
  // only allowlisted models LM Studio actually has, in allowlist order.
  const models = upstream
    ? allowed.filter((model) => upstream.includes(model))
    : allowed;

  return {
    online: upstream !== null,
    models,
    default: models[0] ?? null,
  };
}

export async function GET() {
  const auth = await authorizeChat();
  if (auth.error) return auth.error;

  if (!cached || Date.now() - cached.at > TTL_MS) {
    cached = { at: Date.now(), value: await check() };
  }

  return Response.json(cached.value, { headers: privateHeaders });
}
