// app/providers.jsx
"use client";
import React, { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import SuspendedPostHogPageView from "@/config/posthog/modules/posthog-pageview";

export function PostHogProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    try {
      if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        throw new Error("Missing ENV: NEXT_PUBLIC_POSTHOG_KEY");
      }

      if (!process.env.NEXT_PUBLIC_POSTHOG_HOST) {
        throw new Error("Missing ENV: NEXT_PUBLIC_POSTHOG_HOST");
      }

      if (typeof window !== undefined) {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
          person_profiles: "identified_only",
          capture_pageview: false,
          //   Enable debug mode in development
          loaded: () => {
            if (process.env.NODE_ENV === "development") {
              posthog.debug();
            }
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}
