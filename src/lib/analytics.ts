import "server-only";

import type {
  DashboardData,
  Day,
  Metric,
  Range,
  Row,
} from "@/lib/analytics-shared";

// Site analytics for /dashboard, read server-side from PostHog's query API
// (https://posthog.com/docs/api/queries) with a personal API key that has
// the "Query Read" scope. The key never reaches the browser.
//
// The SQL follows PostHog's own web-analytics definitions (visitors, sessions,
// session duration, bounce rate), counting only real traffic: the production
// hosts, no bots, and none of the owner-only pages.

const API_HOST = process.env.POSTHOG_API_HOST ?? "https://us.posthog.com";
const PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const SITE_HOSTS = (
  process.env.ANALYTICS_SITE_HOSTS ?? "www.olivermorla.com,olivermorla.com"
)
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);

export const isAnalyticsConfigured = Boolean(PROJECT_ID && API_KEY);

/** PostHog's own web analytics view for the project, for deeper digging. */
export const posthogWebAnalyticsUrl = PROJECT_ID
  ? `${API_HOST}/project/${PROJECT_ID}/web`
  : null;

export class AnalyticsError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "AnalyticsError";
  }
}

// Hosts come from env, but quote them properly anyway.
const sqlString = (value: string) =>
  `'${value.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;

// Every query counts the same traffic.
const REAL_TRAFFIC = `
  event = '$pageview'
  AND properties.$host IN (${SITE_HOSTS.map(sqlString).join(", ")})
  AND NOT coalesce(toBool(properties.$virt_is_bot), false)
  AND NOT match(coalesce(properties.$pathname, ''), '^/(admin|auth|dashboard)(/|$)')`;

async function hogql(name: string, query: string): Promise<unknown[][]> {
  let response: Response;
  try {
    response = await fetch(`${API_HOST}/api/projects/${PROJECT_ID}/query/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, query: { kind: "HogQLQuery", query } }),
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
  } catch (cause) {
    throw new AnalyticsError(`Couldn't reach PostHog (${name}): ${cause}`);
  }

  if (!response.ok) {
    throw new AnalyticsError(
      `PostHog query "${name}" failed with ${response.status}`,
      response.status,
    );
  }

  const body = (await response.json()) as { results?: unknown[][] };
  return body.results ?? [];
}

const num = (value: unknown) => (typeof value === "number" ? value : 0);
const numOrNull = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? value : null;

async function fetchDashboard(range: Range): Promise<DashboardData> {
  // `range` is one of RANGES, so it's safe to inline.
  const [overview, daily, breakdowns] = await Promise.all([
    hogql(
      "dashboard: overview",
      `SELECT
        uniqIf(pid, cur), uniqIf(pid, NOT cur),
        sumIf(pv, cur), sumIf(pv, NOT cur),
        countIf(cur), countIf(NOT cur),
        avgIf(dur, cur), avgIf(dur, NOT cur),
        avgIf(bounced, cur), avgIf(bounced, NOT cur)
      FROM (
        SELECT
          session.session_id AS sid,
          any(events.person_id) AS pid,
          count() AS pv,
          any(session.$session_duration) AS dur,
          any(session.$is_bounce) AS bounced,
          min(session.$start_timestamp) >= now() - INTERVAL ${range} DAY AS cur
        FROM events
        WHERE ${REAL_TRAFFIC}
          AND timestamp >= now() - INTERVAL ${range * 2} DAY
          AND notEquals(events.$session_id, NULL)
        GROUP BY sid
      )`,
    ),
    hogql(
      "dashboard: daily",
      `SELECT toString(toDate(timestamp)) AS day, count(), uniq(person_id)
      FROM events
      WHERE ${REAL_TRAFFIC}
        AND timestamp >= toStartOfDay(now()) - INTERVAL ${range - 1} DAY
      GROUP BY day
      ORDER BY day`,
    ),
    hogql(
      "dashboard: breakdowns",
      (
        [
          ["page", "properties.$pathname"],
          ["source", "properties.$referring_domain"],
          ["country", "properties.$geoip_country_name"],
          ["device", "properties.$device_type"],
        ] as const
      )
        .map(
          ([kind, column]) => `SELECT * FROM (
            SELECT '${kind}' AS kind, ${column} AS label, uniq(person_id) AS visitors, count() AS views
            FROM events
            WHERE ${REAL_TRAFFIC} AND timestamp >= now() - INTERVAL ${range} DAY
            GROUP BY label
            ORDER BY visitors DESC, views DESC
            LIMIT 8
          )`,
        )
        .join(" UNION ALL "),
    ),
  ]);

  const o = overview[0] ?? [];
  const metric = (i: number): Metric => ({
    value: numOrNull(o[i]),
    previous: numOrNull(o[i + 1]),
  });

  // Fill days without traffic so the chart's x-axis is continuous.
  const byDay = new Map(daily.map((r) => [String(r[0]), r]));
  const series: Day[] = Array.from({ length: range }, (_, i) => {
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCDate(date.getUTCDate() - (range - 1 - i));
    const day = date.toISOString().slice(0, 10);
    const row = byDay.get(day);
    return { day, pageviews: num(row?.[1]), visitors: num(row?.[2]) };
  });

  const rows = (kind: string): Row[] =>
    breakdowns
      .filter((r) => r[0] === kind)
      .map((r) => ({
        label:
          r[1] === "$direct"
            ? "Direct"
            : typeof r[1] === "string" && r[1]
              ? r[1]
              : "Unknown",
        visitors: num(r[2]),
        views: num(r[3]),
      }));

  return {
    range,
    kpis: {
      visitors: metric(0),
      pageviews: metric(2),
      sessions: metric(4),
      avgSessionSeconds: metric(6),
      bounceRate: metric(8),
    },
    series,
    pages: rows("page"),
    sources: rows("source"),
    countries: rows("country"),
    devices: rows("device"),
    fetchedAt: new Date().toISOString(),
  };
}

// PostHog meters API reads per project and hour; five minutes of reuse is
// plenty for a dashboard one person looks at.
const TTL_MS = 5 * 60 * 1000;
const cache = new Map<Range, { at: number; data: Promise<DashboardData> }>();

export function getDashboardData(range: Range): Promise<DashboardData> {
  if (!isAnalyticsConfigured) {
    return Promise.reject(new AnalyticsError("Analytics isn't configured"));
  }

  const hit = cache.get(range);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.data;

  const data = fetchDashboard(range);
  cache.set(range, { at: Date.now(), data });
  // Don't keep a failure around for five minutes.
  data.catch(() => cache.delete(range));
  return data;
}
