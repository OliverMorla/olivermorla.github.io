// Runs in the browser before the app hydrates (Next.js instrumentation-client):
// error monitoring and product analytics, each isolated so one failing can't
// take the other down.

import { sentryOptions } from "@/lib/sentry/options";
import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

// Sentry — https://docs.sentry.io/platforms/javascript/guides/nextjs/
Sentry.init(sentryOptions);

// PostHog — https://posthog.com/docs/libraries/next-js
// Initialized here rather than in a component so it's in place before the
// App Router boots; with `defaults` ≥ 2025-05-24 it then records $pageview
// and $pageleave for client-side navigations on its own (history API).
const token = process.env.NEXT_PUBLIC_POSTHOG_KEY;
// Vercel's "development" environment shares production's key, so local dev
// stays out of the real numbers unless capture is switched on to test it.
const captureInDev = process.env.NEXT_PUBLIC_POSTHOG_CAPTURE_DEV === "true";

// The owner's side of the site isn't visitor traffic.
const PRIVATE_PATHS = /^\/(admin|auth|dashboard)(\/|$)/;

try {
  if (token && (process.env.NODE_ENV === "production" || captureInDev)) {
    posthog.init(token, {
      // Reverse proxy (see rewrites in next.config.ts) so ad blockers don't
      // drop events; ui_host is the app itself, for toolbar and links.
      api_host: "/ingest",
      ui_host: (
        process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com"
      ).replace(".i.posthog.com", ".posthog.com"),
      defaults: "2026-05-30",
      before_send: (event) =>
        PRIVATE_PATHS.test(window.location.pathname) ? null : event,
    });
  } else if (process.env.NODE_ENV === "development") {
    console.info(
      token
        ? "[PostHog] Capture is off in development. Set NEXT_PUBLIC_POSTHOG_CAPTURE_DEV=true to test it."
        : "[PostHog] Not initialized: NEXT_PUBLIC_POSTHOG_KEY is not set (vercel env pull .env.local).",
    );
  }
} catch (error) {
  Sentry.captureException(error);
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
