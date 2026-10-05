"use client";

import { formatCount, formatDay, type Day } from "@/lib/analytics-shared";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

// Daily pageviews and visitors: one unit (counts), so one y-axis. Marks follow
// the dataviz spec: 2px lines, hairline solid grid, end values as direct
// labels (dropped when they'd collide), a crosshair that snaps to the nearest
// day, the same readout from the keyboard, and a table twin underneath.

const SERIES = [
  { key: "pageviews", label: "Pageviews", color: "var(--color-series-1)" },
  { key: "visitors", label: "Visitors", color: "var(--color-series-2)" },
] as const;

/** Plot plus the x-axis band, so the card never needs to scroll. */
const HEIGHT = 264;
const M = { top: 12, right: 52, bottom: 30, left: 40 };

/** Clean, whole-number ticks from 0 to just past the max. */
function yTicks(max: number) {
  const raw = Math.max(max, 1) / 4;
  const power = 10 ** Math.floor(Math.log10(raw));
  const f = raw / power;
  const step = Math.max(1, (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * power);
  const top = Math.max(step, Math.ceil(max / step) * step);
  return Array.from({ length: top / step + 1 }, (_, i) => i * step);
}

export default function TrafficChart({ series }: { series: Day[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const [fromKeyboard, setFromKeyboard] = useState(false);
  const gradientId = useId();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const n = series.length;
  const empty = series.every((d) => d.pageviews === 0 && d.visitors === 0);

  const ticks = yTicks(Math.max(...series.map((d) => d.pageviews)));
  const top = ticks[ticks.length - 1];
  const plotW = Math.max(0, width - M.left - M.right);
  const plotH = HEIGHT - M.top - M.bottom;
  const x = (i: number) =>
    M.left + (n === 1 ? plotW / 2 : (i * plotW) / (n - 1));
  const y = (v: number) => M.top + plotH - (v / top) * plotH;

  const line = (key: (typeof SERIES)[number]["key"]) =>
    series.map((d, i) => `${i ? "L" : "M"}${x(i)},${y(d[key])}`).join("");

  // Label the most recent day and every `step` days back from it.
  const step = Math.ceil(n / Math.max(2, Math.min(8, Math.floor(plotW / 72))));
  const xTicks = series
    .map((_, i) => i)
    .filter((i) => (n - 1 - i) % step === 0);

  const last = series[n - 1];
  const endYs = SERIES.map((s) => y(last?.[s.key] ?? 0));
  const showEndLabels = Math.abs(endYs[0] - endYs[1]) >= 14;

  function indexAt(event: PointerEvent<SVGRectElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - box.left;
    const i = n === 1 ? 0 : Math.round((px / box.width) * (n - 1));
    return Math.min(n - 1, Math.max(0, i));
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = active ?? n - 1;
    const next =
      event.key === "ArrowLeft"
        ? current - 1
        : event.key === "ArrowRight"
          ? current + 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? n - 1
              : null;
    if (next === null) {
      if (event.key === "Escape") setActive(null);
      return;
    }
    event.preventDefault();
    setFromKeyboard(true);
    setActive(Math.min(n - 1, Math.max(0, next)));
  }

  const point = active === null ? null : series[active];
  const flip = active !== null && x(active) > width / 2;

  return (
    <figure className="rounded-xl bg-surface p-4 ring-1 ring-line sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <figcaption>
          <h2 className="text-[0.9375rem] font-semibold">Traffic</h2>
          <p className="mt-0.5 text-sm text-ink-2">
            Daily pageviews and unique visitors (UTC days)
          </p>
        </figcaption>
        <ul className="flex items-center gap-4 text-sm text-ink-2">
          {SERIES.map((s) => (
            <li key={s.key} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-0.5 w-4 rounded-full"
                style={{ background: s.color }}
              />
              {s.label}
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={wrapRef}
        tabIndex={empty ? undefined : 0}
        aria-label={
          empty
            ? undefined
            : "Traffic chart. Use the left and right arrow keys to read each day."
        }
        onKeyDown={onKeyDown}
        onFocus={() => {
          setFromKeyboard(true);
          setActive((current) => current ?? n - 1);
        }}
        onBlur={() => setActive(null)}
        className="relative mt-4 rounded-md outline-offset-4"
        style={{ height: HEIGHT }}
      >
        {empty ? (
          <div className="grid h-full place-items-center rounded-lg bg-page text-sm text-muted">
            No visits in this range yet.
          </div>
        ) : (
          width > 0 && (
            <svg
              width={width}
              height={HEIGHT}
              aria-hidden="true"
              className="block overflow-visible text-[11px]"
            >
              <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="0"
                    stopColor={SERIES[0].color}
                    stopOpacity="0.14"
                  />
                  <stop
                    offset="1"
                    stopColor={SERIES[0].color}
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              {ticks.map((tick) => (
                <g key={tick}>
                  <line
                    x1={M.left}
                    x2={M.left + plotW}
                    y1={y(tick)}
                    y2={y(tick)}
                    stroke={
                      tick === 0 ? "var(--color-line)" : "var(--color-grid)"
                    }
                    shapeRendering="crispEdges"
                  />
                  <text
                    x={M.left - 10}
                    y={y(tick)}
                    dy="0.32em"
                    textAnchor="end"
                    fill="var(--color-muted)"
                    className="tabular-nums"
                  >
                    {formatCount(tick)}
                  </text>
                </g>
              ))}

              {xTicks.map((i) => (
                <text
                  key={i}
                  x={x(i)}
                  y={HEIGHT - 8}
                  textAnchor="middle"
                  fill="var(--color-muted)"
                >
                  {formatDay(series[i].day)}
                </text>
              ))}

              <path
                d={`${line("pageviews")}L${x(n - 1)},${y(0)}L${x(0)},${y(0)}Z`}
                fill={`url(#${gradientId})`}
              />
              {SERIES.map((s) => (
                <path
                  key={s.key}
                  d={line(s.key)}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              ))}

              {SERIES.map((s, k) => (
                <g key={s.key}>
                  <circle
                    cx={x(n - 1)}
                    cy={endYs[k]}
                    r={4}
                    fill={s.color}
                    stroke="var(--color-surface)"
                    strokeWidth={2}
                  />
                  {showEndLabels && (
                    <text
                      x={x(n - 1) + 10}
                      y={endYs[k]}
                      dy="0.32em"
                      fill="var(--color-ink-2)"
                      className="text-xs font-medium tabular-nums"
                    >
                      {formatCount(last[s.key])}
                    </text>
                  )}
                </g>
              ))}

              {point && active !== null && (
                <g>
                  <line
                    x1={x(active)}
                    x2={x(active)}
                    y1={M.top}
                    y2={M.top + plotH}
                    stroke="var(--color-muted)"
                    strokeOpacity={0.5}
                    shapeRendering="crispEdges"
                  />
                  {SERIES.map((s) => (
                    <circle
                      key={s.key}
                      cx={x(active)}
                      cy={y(point[s.key])}
                      r={4.5}
                      fill={s.color}
                      stroke="var(--color-surface)"
                      strokeWidth={2}
                    />
                  ))}
                </g>
              )}

              <rect
                x={M.left}
                y={0}
                width={plotW}
                height={HEIGHT}
                fill="transparent"
                style={{ touchAction: "pan-y" }}
                onPointerMove={(event) => {
                  setFromKeyboard(false);
                  setActive(indexAt(event));
                }}
                onPointerDown={(event) => setActive(indexAt(event))}
                onPointerLeave={() => setActive(null)}
              />
            </svg>
          )
        )}

        {point && active !== null && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-2 z-10 min-w-[9.5rem] rounded-lg bg-surface px-3 py-2.5 shadow-[0_8px_24px_rgb(0_0_0/0.12)] ring-1 ring-line"
            style={
              flip
                ? { right: width - x(active) + 12 }
                : { left: x(active) + 12 }
            }
          >
            <p className="text-xs text-muted">
              {formatDay(point.day, true)}
              {active === n - 1 && " · today so far"}
            </p>
            <ul className="mt-1.5 space-y-1 text-sm">
              {SERIES.map((s) => (
                <li key={s.key} className="flex items-center gap-2">
                  <span
                    className="h-0.5 w-3 rounded-full"
                    style={{ background: s.color }}
                  />
                  <span className="font-semibold tabular-nums">
                    {formatCount(point[s.key])}
                  </span>
                  <span className="text-ink-2">{s.label.toLowerCase()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p aria-live="polite" className="sr-only">
          {fromKeyboard && point
            ? `${formatDay(point.day, true)}: ${point.pageviews} pageviews, ${point.visitors} visitors`
            : ""}
        </p>
      </div>

      <details className="mt-4 border-t border-line pt-3">
        <summary className="cursor-pointer text-sm text-ink-2 transition-colors select-none hover:text-ink">
          View as table
        </summary>
        <table className="mt-3 w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted">
              <th scope="col" className="py-1.5 font-medium">
                Day
              </th>
              <th scope="col" className="py-1.5 text-right font-medium">
                Pageviews
              </th>
              <th scope="col" className="py-1.5 text-right font-medium">
                Visitors
              </th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {[...series].reverse().map((d) => (
              <tr key={d.day} className="border-t border-grid">
                <th
                  scope="row"
                  className="py-1.5 text-left font-normal text-ink-2"
                >
                  {formatDay(d.day, true)}
                </th>
                <td className="py-1.5 text-right">
                  {formatCount(d.pageviews)}
                </td>
                <td className="py-1.5 text-right">{formatCount(d.visitors)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
