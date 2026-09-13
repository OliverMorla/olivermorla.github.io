import { PostHog } from "posthog-node";

if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  throw new Error("Missing Environment Variable: NEXT_PUBLIC_POSTHOG_KEY");
}

export function PostHogClient() {
  return new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
}
