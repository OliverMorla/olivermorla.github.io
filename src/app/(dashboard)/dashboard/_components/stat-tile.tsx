import type { Metric } from "@/lib/analytics-shared";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type Props = {
  label: string;
  metric: Metric;
  format: (value: number) => string;
  /** Days in the period, for "vs previous 30 days". */
  range: number;
  /** Bounce rate: a rise is bad news. */
  lowerIsBetter?: boolean;
  /** Rates compare in percentage points, not percent of a percent. */
  delta?: "relative" | "points";
};

export default function StatTile({
  label,
  metric,
  format,
  range,
  lowerIsBetter = false,
  delta = "relative",
}: Props) {
  const { value, previous } = metric;

  let change: number | null = null;
  if (value !== null && previous !== null) {
    if (delta === "points") change = (value - previous) * 100;
    else if (previous > 0) change = ((value - previous) / previous) * 100;
  }

  const rounded = change === null ? null : Math.round(change * 10) / 10;
  const direction =
    rounded === null || rounded === 0 ? "flat" : rounded > 0 ? "up" : "down";
  const good =
    direction === "flat" ? null : (direction === "up") !== lowerIsBetter;
  const Arrow = direction === "down" ? ArrowDownRight : ArrowUpRight;

  return (
    <div className="rounded-xl bg-surface p-4 ring-1 ring-line sm:p-5">
      <p className="text-sm text-ink-2">{label}</p>
      <p className="mt-2 text-[1.75rem] leading-none font-semibold tracking-[-0.02em] sm:text-[2rem]">
        {value === null ? "—" : format(value)}
      </p>
      {/* Change on one line, the comparison on the next, so every tile
          lines up whatever its width. */}
      <div className="mt-3 text-[0.8125rem] leading-5">
        {rounded === null ? (
          <p className="text-muted">—</p>
        ) : direction === "flat" ? (
          <p className="text-ink-2">No change</p>
        ) : (
          <p
            className={`inline-flex items-center gap-0.5 font-medium ${good ? "text-up" : "text-down"}`}
          >
            <Arrow aria-hidden="true" className="size-3.5" />
            <span className="sr-only">
              {direction === "up" ? "Up" : "Down"}
            </span>
            {Math.abs(rounded)}
            {delta === "points" ? " pts" : "%"}
          </p>
        )}
        <p className="text-muted">
          {rounded === null ? "No data for the" : "vs"} previous {range} days
        </p>
      </div>
    </div>
  );
}
