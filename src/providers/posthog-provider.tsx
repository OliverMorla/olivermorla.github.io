"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

/**
 * Exposes the PostHog client to `usePostHog()` and friends. It's initialized
 * in src/instrumentation-client.ts (before hydration), which also handles
 * pageviews, so this only provides context. Without a key PostHog is never
 * initialized and calls through it do nothing.
 */
export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
