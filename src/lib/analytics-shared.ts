// The parts of the analytics module that client components need too: the
// ranges, the data shapes and how numbers are shown. src/lib/analytics.ts
// (server-only) does the fetching.

export const RANGES = [7, 30, 90] as const;
export type Range = (typeof RANGES)[number];

export function parseRange(value: unknown): Range {
  const days = Number(Array.isArray(value) ? value[0] : value);
  return (RANGES as readonly number[]).includes(days) ? (days as Range) : 30;
}

export type Metric = { value: number | null; previous: number | null };
export type Row = { label: string; visitors: number; views: number };
export type Day = { day: string; pageviews: number; visitors: number };

export type DashboardData = {
  range: Range;
  kpis: {
    visitors: Metric;
    pageviews: Metric;
    sessions: Metric;
    avgSessionSeconds: Metric;
    /** 0–1 */
    bounceRate: Metric;
  };
  series: Day[];
  pages: Row[];
  sources: Row[];
  countries: Row[];
  devices: Row[];
  fetchedAt: string;
};

const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const whole = new Intl.NumberFormat("en-US");

/** 1,284 · 12.9K · 4.2M */
export const formatCount = (value: number) =>
  value >= 10_000 ? compact.format(value) : whole.format(Math.round(value));

/** 48s · 2m 14s · 1h 5m */
export function formatDuration(seconds: number) {
  const s = Math.round(seconds);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m ${s % 60}s`;
  return `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m`;
}

/** 0.5 → 50% */
export const formatPercent = (fraction: number) =>
  `${Math.round(fraction * 1000) / 10}%`;

/** "2026-09-06" → "Sep 6" (the days are UTC dates, so read them as UTC). */
export const formatDay = (day: string, withWeekday = false) =>
  new Date(`${day}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    ...(withWeekday ? { weekday: "short" } : {}),
  });
