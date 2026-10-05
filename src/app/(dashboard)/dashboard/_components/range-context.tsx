"use client";

import { RANGES, type Range } from "@/lib/analytics-shared";
import { useRouter } from "next/navigation";
import { createContext, use, useOptimistic, useTransition } from "react";

// The range lives in the URL (?range=30) so a view can be bookmarked. Changing
// it is a transition: the current numbers stay on screen, dimmed, until the
// new ones arrive, instead of flashing back to skeletons.
const RangeContext = createContext<{
  range: Range;
  pending: boolean;
  setRange: (range: Range) => void;
} | null>(null);

function useRange() {
  const value = use(RangeContext);
  if (!value) throw new Error("useRange must be used inside <RangeProvider>");
  return value;
}

export function RangeProvider({
  range,
  children,
}: {
  range: Range;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  // The tab switches right away; the URL (and the data) catch up.
  const [optimisticRange, setOptimisticRange] = useOptimistic(range);

  const setRange = (next: Range) =>
    startTransition(() => {
      setOptimisticRange(next);
      router.replace(`/dashboard?range=${next}`, { scroll: false });
    });

  return (
    <RangeContext value={{ range: optimisticRange, pending, setRange }}>
      {children}
    </RangeContext>
  );
}

export function RangeTabs() {
  const { range, setRange } = useRange();

  return (
    <div
      role="group"
      aria-label="Date range"
      className="inline-flex w-full rounded-lg bg-surface p-1 ring-1 ring-line sm:w-auto"
    >
      {RANGES.map((days) => (
        <button
          key={days}
          type="button"
          aria-pressed={range === days}
          onClick={() => range !== days && setRange(days)}
          className="h-8 flex-1 rounded-md px-3.5 text-sm font-medium whitespace-nowrap text-ink-2 transition-colors hover:text-ink aria-pressed:bg-ink aria-pressed:text-page sm:flex-none"
        >
          <span className="max-[22rem]:sr-only">Last </span>
          {days} days
        </button>
      ))}
    </div>
  );
}

/** Wraps everything the range scopes; dims it while new data loads. */
export function RangeFrame({ children }: { children: React.ReactNode }) {
  const { pending } = useRange();

  return (
    <div
      aria-busy={pending}
      className="transition-opacity duration-200 aria-busy:opacity-55 motion-reduce:transition-none"
    >
      {children}
    </div>
  );
}
