"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { PostHog } from "posthog-js";

// Deferred so the posthog-js client (and posthog-js/react) don't ship in the
// bundle needed for hydration — they load after the page is interactive.
const PostHogReactProvider = dynamic(
  () => import("posthog-js/react").then((mod) => mod.PostHogProvider),
  { ssr: false },
);

export function PHProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<PostHog | null>(null);

  useEffect(() => {
    let cancelled = false;

    import("posthog-js").then(({ default: posthog }) => {
      if (cancelled) {
        return;
      }

      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: "/ingest",
        ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: "history_change", // tracks App Router client-side navigations automatically
      });

      setClient(posthog);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!client) {
    return <>{children}</>;
  }

  return (
    <PostHogReactProvider client={client}>{children}</PostHogReactProvider>
  );
}
