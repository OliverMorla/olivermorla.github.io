"use client";

import dynamic from "next/dynamic";
import { Loader } from "lucide-react";

// Move the dynamic import to a client component
const DynamicPostHogProvider = dynamic(
  () =>
    import("@/providers/posthog-provider").then((mod) => mod.PostHogProvider),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <Loader className="animate-spin" />
      </div>
    ),
  }
);

// Create a client wrapper component
export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DynamicPostHogProvider>{children}</DynamicPostHogProvider>;
}
