# Plan: private AI chat at `/dashboard/chat`

A chat page on olivermorla.com that talks to a local LLM running on the owner's Mac Studio (LM Studio) through a Cloudflare Tunnel. Only signed-in users can open it; the owner can invite friends with a chat-only role. Chats are kept in the browser and deleted after 12 hours.

Written Oct 9, 2026. Read `AGENTS.md` first: this repo runs Next.js 16, and its APIs differ from older versions. Check `node_modules/next/dist/docs/` before writing route handlers, `proxy.ts` changes or segment config.

## Goals

- `/dashboard/chat`: streaming chat with the local model, usable on a phone.
- Two roles: `admin` (owner: analytics + chat) and `chat` (friends: chat only).
- The Mac is never reachable without a Cloudflare Access service token, and the token never reaches the browser.
- Per-user rate limits and input limits.
- No chat content stored on the server or in logs. Browser storage, purged after 12 hours.
- Not indexed by search engines (already true for `/dashboard`; keep it that way).

## Non-goals

- Server-side chat history or syncing across devices.
- File uploads, retrieval over documents, tools or agents.
- Public sign-up. Accounts are still created by the owner.
- Open WebUI. It runs separately at `ai.olivermorla.com` and is not part of this repo.

## Architecture

```
Browser (/dashboard/chat, signed in)
  → POST /api/chat            (Vercel: session + role check, Arcjet per-user limit, zod validation)
  → https://llm.olivermorla.com/v1/chat/completions
                              (Cloudflare Access: requires service token headers)
  → cloudflared on the Mac → LM Studio on localhost:1234
  ← SSE stream piped back to the browser
```

## What already exists (reuse, don't rebuild)

| Piece | Where | Notes |
| --- | --- | --- |
| Better Auth with admin plugin | `src/lib/auth.ts`, `src/lib/auth-client.ts` | Email + password, `disableSignUp: true`, DB rate limit on sign-in, 5-minute JWE cookie cache |
| Session helpers | `src/lib/auth-session.ts` | `getSession`, `requireAdmin`, `isAuthConfigured`, `loadAuth` |
| Optimistic login redirect | `src/proxy.ts` | Matches `/dashboard/:path*`; already covers `/dashboard/chat` |
| Dashboard root layout | `src/app/(dashboard)/layout.tsx` | Own `<html>`, `robots: { index: false, follow: false }`, ThemeProvider, `dashboard.css` |
| Dashboard header | `src/app/(dashboard)/dashboard/page.tsx` | OM logo, email, `ThemeToggle`, `SignOutButton` from `_components/account-actions.tsx` |
| Login page | `src/app/(dashboard)/auth/login/` | Only redirects `admin` sessions; copy says "for the site owner only" |
| Arcjet | `src/lib/arcjet.ts` | IP-keyed client used by the contact form; env var is `ARCJET_API_KEY` |
| robots.txt | `src/app/robots.ts` | Already disallows `/dashboard` |
| PostHog | `src/instrumentation-client.ts` | `PRIVATE_PATHS` already drops `/dashboard` events |
| Payload API catch-all | `src/app/(payload)/api/[...slug]` | Confirm a static `src/app/api/chat/route.ts` takes precedence over it |

## Environment variables

Add to `.env.example` under a new section, with comments in the file's existing style:

```
# --- Private AI chat (/dashboard/chat, server only) -------------------------
# OpenAI-compatible base URL of LM Studio. Locally: http://localhost:1234/v1
LLM_API_BASE_URL=https://llm.olivermorla.com/v1
# Cloudflare Access service token for llm.olivermorla.com. Leave both empty
# locally. Secret: never prefix NEXT_PUBLIC_.
CF_ACCESS_CLIENT_ID=
CF_ACCESS_CLIENT_SECRET=
# Model ids users may pick (comma-separated, as LM Studio reports them).
# The first one is the default.
LLM_ALLOWED_MODELS=
```

If `LLM_API_BASE_URL` is unset, the chat page shows "Chat isn't set up" instead of erroring, the same way the login page handles missing auth env vars.

## Implementation

### 1. Roles

- Read Better Auth's admin plugin docs for the installed version (1.7.x) on custom roles (`createAccessControl`, `roles` option). Define `admin` and `chat` so `chat` users get no admin permissions (cannot list users, set roles or impersonate). Apply the same roles in `adminClient()`.
- In `src/lib/auth-session.ts` add `requireChatAccess(from = "/dashboard/chat")`: redirects to login with no session; allows `admin` and `chat`; anything else goes to `/auth/login?error=forbidden`. Keep `requireAdmin` unchanged.
- `/dashboard` (analytics): a signed-in `chat` user is redirected to `/dashboard/chat` instead of the forbidden error. Make the change in the analytics page or in a small wrapper; keep `requireAdmin` strict for server actions.
- Login page: a signed-in `chat` user is redirected to `/dashboard/chat` (or `next` when it points under `/dashboard/chat`). Change the copy from "for the site owner only" to something like "Private area. Invite only."
- Role changes reach users within 5 minutes because of the cookie cache. That's acceptable; note it in the docs.

### 2. Creating chat users

Add a script the owner runs locally against the production database, modelled on how `create-admin` is used today:

- `pnpm chat:create-user <email> <name>`: creates a user with role `chat` and a generated 16+ character password, printed once.
- `pnpm chat:remove-user <email>`: bans the user and revokes their sessions.

Use the admin plugin's server API (`auth.api.createUser`, `banUser`, `revokeUserSessions`). An admin UI for this is out of scope.

### 3. Upstream client — `src/lib/llm.ts`

`server-only`. Holds everything that knows about LM Studio:

- `isLlmConfigured`
- `allowedModels()`: parsed from `LLM_ALLOWED_MODELS`; the first is the default.
- `llmFetch(path, init)`: prefixes `LLM_API_BASE_URL`, adds `CF-Access-Client-Id` and `CF-Access-Client-Secret` when set, and applies a 10 s connect timeout for non-streaming calls.
- `streamChatCompletion({ model, messages, signal })`: POST `/chat/completions` with `stream: true`, the server-side system prompt, and capped `max_tokens` (e.g. 2048) and `temperature`.

The system prompt lives here, not in the client. Keep it short: a helpful assistant running privately on Oliver's home server; answers are drafts, not professional advice.

### 4. Chat API — `src/app/api/chat/route.ts`

`POST`, Node.js runtime, with the max duration set according to the Next 16 docs (aim for 300 s; check the Vercel plan's limit).

1. Session via `getSession()`; 401 without one, 403 unless the role is `admin` or `chat`.
2. Arcjet: add a second client in `src/lib/arcjet.ts` keyed on `userId`, with `shield` and a `tokenBucket` of roughly 20 requests per 10 minutes (`refillRate: 2`, `interval: 60`, `capacity: 20`). No bot detection on this route, because users are signed in. 429 with a readable message when limited.
3. Validate with zod:
   - `model`: must be in `allowedModels()`; defaults to the first one
   - `messages`: 1–40 items
   - `role`: `user` or `assistant` only (the client cannot send `system`)
   - `content`: string of up to 8,000 characters each, 32,000 total
4. Call `streamChatCompletion`, passing `request.signal` so a closed tab or Stop button aborts the upstream request.
5. Pipe the upstream SSE body straight back with `content-type: text/event-stream`, `cache-control: no-store` and `x-robots-tag: noindex`.
6. Upstream failures: connection refused, a Cloudflare 502/530, or a timeout return **503 `{ error: "offline" }`**; an upstream 4xx returns 502. Never pass upstream error bodies through.

Also add `GET /api/chat/models`: same auth, returns `{ online: boolean, models: string[], default: string }` by calling `/v1/models` upstream and intersecting with the allowlist. The page uses it for the model picker and the online indicator; cache it for 30 s per instance.

**Privacy:** no logging of message content. Check that Sentry (`sentry.server.config.ts`, `src/lib/sentry`) doesn't attach request bodies to events for `/api/chat`. Add a `beforeSend` scrub for that route if it would.

### 5. Chat page — `src/app/(dashboard)/dashboard/chat/`

- `page.tsx` (server): `requireChatAccess`, metadata title "Chat", renders the shared header and a client `<Chat />`. If `!isLlmConfigured`, show a set-up message instead.
- Extract the analytics page's header into `src/app/(dashboard)/dashboard/_components/dashboard-header.tsx` with nav links ("Analytics" for admins only, "Chat") and reuse it on both pages.
- `_components/chat.tsx` (client):
  - message list with streaming; auto-scroll that stops when the user scrolls up
  - auto-growing textarea; Enter sends, Shift+Enter adds a newline; Stop button while streaming (aborts the fetch)
  - model picker from `/api/chat/models`, plus an online/offline dot; an "Oliver's server is offline" banner on a 503
  - sidebar or sheet with past chats on mobile; "New chat"; delete one chat
  - a quiet line: "Chats are stored on this device and deleted after 12 hours."
- Render assistant messages as markdown with `react-markdown` + `remark-gfm`. No `rehype-raw`, so raw HTML is never rendered. Style it with `@tailwindcss/typography`, which is already installed.
- Parse the SSE stream by hand (`data:` lines, `[DONE]`, `choices[0].delta.content`). Don't add an AI SDK just for this.
- Match the existing dashboard look: tokens like `bg-surface`, `ring-line`, `text-ink-2`, and `lucide-react` icons.

### 6. Browser storage with 12-hour expiry — `src/lib/chat-storage.ts`

Pure functions so they can be unit-tested:

- Key: `chat:v1:<userId>`, so two people sharing a device don't see each other's chats.
- Shape: `{ id, title, model, createdAt, updatedAt, messages[] }[]`; title from the first user message.
- `purgeExpired(chats, now)` drops chats whose `createdAt` is more than 12 h old. Run it on load, on focus and every 5 minutes.
- On sign-out, remove the current user's key (hook into `SignOutButton`).
- Wrap every `localStorage` access in try/catch; with storage unavailable, the chat still works for the open tab.

### 7. Navigation and SEO

- Add the header nav from step 5.
- No changes to `robots.ts` or metadata are needed: `/dashboard/chat` inherits the layout's noindex and the robots.txt rule. Confirm with `curl -I` that `/api/chat` responses carry `x-robots-tag: noindex`.

### 8. Tests (`__tests__/`, Jest)

- zod schema: rejects `system` role, oversize content, too many messages, unknown model.
- `purgeExpired`: keeps a chat at 11 h 59 m and drops one at 12 h 1 m.
- Role gate: the helper that decides admin / chat / forbidden, extracted as a pure function.
- SSE parser: split chunks, `[DONE]`, empty deltas.

`pnpm check` must pass.

## Mac and Cloudflare setup (owner, outside the repo)

DNS for olivermorla.com is already on Cloudflare.

1. **LM Studio:** server on port 1234, context length 8–16k, 2–3 concurrent requests, idle auto-unload on. Note the exact model ids for `LLM_ALLOWED_MODELS`.
2. **Tunnel:** `brew install cloudflared`, then `cloudflared tunnel login`, `cloudflared tunnel create home-ai` and `cloudflared tunnel route dns home-ai llm.olivermorla.com`. Ingress maps `llm.olivermorla.com` → `http://localhost:1234`. Install it as a service: `sudo cloudflared service install`.
3. **Cloudflare Access:** Zero Trust → Access → Applications → self-hosted app for `llm.olivermorla.com`, with one policy of action **Service Auth** that includes a new service token. Copy the token's id and secret into the Vercel env vars.
4. **Response header:** add `X-Robots-Tag: noindex` for `llm.olivermorla.com` (Rules → Transform Rules → response headers).
5. **Mac:** never sleep and restart after power failure.

## Verification checklist

- [ ] Signed out: `/dashboard/chat` redirects to login; `POST /api/chat` returns 401.
- [ ] `chat` user: can chat; `/dashboard` sends them to `/dashboard/chat`; admin actions fail.
- [ ] `admin`: sees both pages and the nav.
- [ ] `curl https://llm.olivermorla.com/v1/models` without the token is blocked by Cloudflare Access.
- [ ] The token appears nowhere in the client bundle (`grep` the `.next` output for the id).
- [ ] Mac's LM Studio stopped: the page shows the offline banner and the API returns 503.
- [ ] Stop button and closing the tab abort generation (LM Studio logs show the request cancelled).
- [ ] The 21st request in a burst gets a 429.
- [ ] A chat older than 12 h disappears on reload; sign-out clears the user's chats.
- [ ] Works at phone width; no horizontal scroll; dark mode correct.
- [ ] No message content in Vercel logs or Sentry events.
- [ ] `pnpm check` passes.

## Suggested commits

1. Roles, `requireChatAccess`, login and redirect changes, user scripts
2. `llm.ts`, Arcjet chat client, `/api/chat` and `/api/chat/models`, env example
3. Shared header, chat page, storage, markdown rendering
4. Tests and Sentry scrub
