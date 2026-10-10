"use client";

import type { ModelsResponse } from "@/app/api/chat/models/route";
import { useCallback, useEffect, useState } from "react";

export type ServerStatus = ModelsResponse & { checked: boolean };

const POLL_MS = 30_000;

/** Online state and allowed models, refreshed every 30 s and on focus. */
export function useServerStatus() {
  const [status, setStatus] = useState<ServerStatus>({
    checked: false,
    online: false,
    models: [],
    default: null,
  });

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/chat/models", { cache: "no-store" });
      if (!response.ok) throw new Error(String(response.status));
      const value = (await response.json()) as ModelsResponse;
      setStatus({ ...value, checked: true });
    } catch {
      setStatus((current) => ({ ...current, checked: true, online: false }));
    }
  }, []);

  useEffect(() => {
    const tick = () => void refresh();
    const timeout = setTimeout(tick, 0);
    const interval = setInterval(tick, POLL_MS);
    window.addEventListener("focus", tick);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
      window.removeEventListener("focus", tick);
    };
  }, [refresh]);

  /** A failed send (503) says more than the last poll did. */
  const markOffline = useCallback(
    () => setStatus((current) => ({ ...current, online: false })),
    [],
  );

  return { status, refresh, markOffline };
}
