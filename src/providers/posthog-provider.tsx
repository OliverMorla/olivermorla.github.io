"use client";

import dynamic from "next/dynamic";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import type { PostHog } from "posthog-js";

// Deferred so the posthog-js client (and posthog-js/react) don't ship in the
// bundle needed for hydration — they load after the page is interactive.
const PostHogReactProvider = dynamic(
  () => import("posthog-js/react").then((mod) => mod.PostHogProvider),
  { ssr: false },
);

// posthog-js's `capture_pageview: "history_change"` patches
// window.history.pushState, but Next's App Router calls its own cached
// reference to the native pushState, so the patch never fires — capture
// pageviews manually from the router's own pathname/search state instead.
function PostHogPageView({ client }: { client: PostHog }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const search = searchParams.toString();
    const url = search
      ? `${window.origin}${pathname}?${search}`
      : `${window.origin}${pathname}`;

    client.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams, client]);

  return null;
}

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
        capture_pageview: false, // captured manually via PostHogPageView below
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
    <PostHogReactProvider client={client}>
      <Suspense fallback={null}>
        <PostHogPageView client={client} />
      </Suspense>
      {children}
    </PostHogReactProvider>
  );
}
