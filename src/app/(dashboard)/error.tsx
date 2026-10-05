"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function DashboardError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="grid min-h-svh place-items-center px-4">
      <div className="max-w-sm text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-ink-2">
          This page didn&apos;t load. Try again, and if it keeps happening,
          check the server logs.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-muted">
            Reference: <code className="font-mono">{error.digest}</code>
          </p>
        )}
        <button
          type="button"
          onClick={() => retry()}
          className="mt-5 inline-flex h-10 items-center rounded-lg bg-ink px-4 text-sm font-medium text-page transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
