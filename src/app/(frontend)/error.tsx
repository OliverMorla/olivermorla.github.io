"use client";

import Button from "@/components/ui/button";
import ButtonLink from "@/components/ui/button-link";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function ErrorPage({
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
    <div className="flex min-h-svh items-center px-4 pt-28 pb-24 sm:px-8">
      <div className="container mx-auto flex max-w-xl flex-col items-start gap-5">
        <h1 className="title">This page didn&apos;t load.</h1>
        <p className="text-muted text-pretty">
          Something went wrong on our side while loading it. Try again, and if
          it keeps happening, head back home.
        </p>
        {error.digest && (
          <p className="text-muted text-sm">
            Reference: <code className="font-mono">{error.digest}</code>
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <Button variant="solidDark" onClick={() => retry()}>
            Try again
          </Button>
          <ButtonLink href="/">Go home</ButtonLink>
        </div>
      </div>
    </div>
  );
}
