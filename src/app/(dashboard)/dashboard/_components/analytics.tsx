import {
  AnalyticsError,
  getDashboardData,
  isAnalyticsConfigured,
} from "@/lib/analytics";
import {
  formatCount,
  formatDuration,
  formatPercent,
  type DashboardData,
  type Range,
} from "@/lib/analytics-shared";
import * as Sentry from "@sentry/nextjs";
import { CircleAlert, KeyRound } from "lucide-react";
import Breakdown from "./breakdown";
import StatTile from "./stat-tile";
import TrafficChart from "./traffic-chart";

export default async function Analytics({ range }: { range: Range }) {
  if (!isAnalyticsConfigured) return <SetupNeeded />;

  let data: DashboardData;
  try {
    data = await getDashboardData(range);
  } catch (error) {
    Sentry.captureException(error);
    console.error("[dashboard]", error);
    return (
      <LoadError
        status={error instanceof AnalyticsError ? error.status : undefined}
      />
    );
  }

  const { kpis } = data;
  const minutesAgo = Math.floor(
    (Date.now() - new Date(data.fetchedAt).getTime()) / 60_000,
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-1">
          <StatTile
            label="Visitors"
            metric={kpis.visitors}
            format={formatCount}
            range={range}
          />
        </div>
        <StatTile
          label="Pageviews"
          metric={kpis.pageviews}
          format={formatCount}
          range={range}
        />
        <StatTile
          label="Sessions"
          metric={kpis.sessions}
          format={formatCount}
          range={range}
        />
        <StatTile
          label="Avg. session"
          metric={kpis.avgSessionSeconds}
          format={formatDuration}
          range={range}
        />
        <StatTile
          label="Bounce rate"
          metric={kpis.bounceRate}
          format={formatPercent}
          range={range}
          delta="points"
          lowerIsBetter
        />
      </div>

      <TrafficChart series={data.series} />

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
        <Breakdown title="Top pages" dimension="Page" rows={data.pages} />
        <Breakdown title="Sources" dimension="Referrer" rows={data.sources} />
        <Breakdown
          title="Countries"
          dimension="Country"
          rows={data.countries}
        />
        <Breakdown title="Devices" dimension="Device" rows={data.devices} />
      </div>

      <p className="pt-1 text-xs text-muted">
        Production traffic only: bots and the private pages are excluded.
        Updated {minutesAgo < 1 ? "just now" : `${minutesAgo} min ago`};
        refreshes every 5 minutes.
      </p>
    </div>
  );
}

function Notice({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof CircleAlert;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-surface p-6 ring-1 ring-line sm:p-8">
      <Icon aria-hidden="true" className="size-5 text-ink-2" />
      <h2 className="mt-3 text-base font-semibold">{title}</h2>
      <div className="mt-1.5 max-w-prose space-y-3 text-sm text-pretty text-ink-2">
        {children}
      </div>
    </div>
  );
}

const code =
  "rounded bg-page px-1.5 py-0.5 font-mono text-[0.8125rem] text-ink";

function SetupNeeded() {
  return (
    <Notice icon={KeyRound} title="Connect PostHog to see your numbers">
      <p>
        The dashboard reads from PostHog on the server. Add these environment
        variables, then redeploy:
      </p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>
          <code className={code}>POSTHOG_PERSONAL_API_KEY</code>: a personal API
          key with the{" "}
          <strong className="font-medium text-ink">Query Read</strong> scope
        </li>
        <li>
          <code className={code}>POSTHOG_PROJECT_ID</code>: the number in your
          PostHog project&apos;s URL
        </li>
      </ul>
    </Notice>
  );
}

function LoadError({ status }: { status?: number }) {
  if (status === 401 || status === 403) {
    return (
      <Notice icon={KeyRound} title="PostHog didn't accept the API key">
        <p>
          Check that <code className={code}>POSTHOG_PERSONAL_API_KEY</code> is
          current, has the Query Read scope, and can access project{" "}
          <code className={code}>POSTHOG_PROJECT_ID</code>.
        </p>
      </Notice>
    );
  }

  return (
    <Notice icon={CircleAlert} title="Couldn't load analytics">
      <p>
        {status === 429
          ? "PostHog's query limit was reached. It resets within the hour; try again shortly."
          : "PostHog didn't respond as expected. Try again in a moment."}
      </p>
    </Notice>
  );
}
