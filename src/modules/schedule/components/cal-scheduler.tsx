"use client";

import { Skeleton } from "@/components/skeletons";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const NAMESPACE = "15min";
const CAL_LINK = "oliver-morla/15min";

type Status = "loading" | "ready" | "failed";

export default function CalScheduler() {
  const { resolvedTheme } = useTheme();
  const [status, setStatus] = useState<Status>("loading");
  const theme = resolvedTheme === "light" ? "light" : "dark";

  useEffect(() => {
    let active = true;

    getCalApi({ namespace: NAMESPACE }).then((cal) => {
      if (!active) return;
      cal("ui", { hideEventTypeDetails: false, layout: "month_view", theme });
      cal("on", {
        action: "linkReady",
        callback: () => active && setStatus("ready"),
      });
      cal("on", {
        action: "linkFailed",
        callback: () => active && setStatus("failed"),
      });
    });

    return () => {
      active = false;
    };
  }, [theme]);

  if (status === "failed") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-neutral-300 p-10 text-center dark:border-neutral-700">
        <p className="font-medium">The booking calendar didn&apos;t load.</p>
        <p className="text-muted text-sm">
          Book directly on{" "}
          <a
            href={`https://cal.com/${CAL_LINK}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            cal.com/{CAL_LINK}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[40rem] w-full">
      {status === "loading" && (
        <div
          role="status"
          aria-busy
          aria-label="Loading calendar"
          className="absolute inset-0 grid gap-6 md:grid-cols-[1fr_2fr]"
        >
          <Skeleton className="h-48 rounded-xl md:h-full" />
          <div className="grid grid-cols-7 content-start gap-2">
            {Array.from({ length: 35 }, (_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>
      )}
      <Cal
        namespace={NAMESPACE}
        calLink={CAL_LINK}
        config={{ layout: "month_view", theme }}
        className="relative w-full"
        style={{ width: "100%", minHeight: "40rem", overflow: "auto" }}
      />
    </div>
  );
}
