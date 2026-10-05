"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  hour: "numeric",
  minute: "2-digit",
});

const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 10_000);
  return () => window.clearInterval(id);
};

const now = () => format.format(Date.now());

// Rendered empty on the server so the static page never shows a stale time.
const never = () => null;

export default function NewYorkTime() {
  const time = useSyncExternalStore(subscribe, now, never);

  return (
    <time className="tabular-nums" aria-live="off">
      {time ?? " "}
    </time>
  );
}
