import { accessFor } from "@/lib/access";
import { posthogWebAnalyticsUrl } from "@/lib/analytics";
import { parseRange } from "@/lib/analytics-shared";
import { getSession, requireAdmin } from "@/lib/auth-session";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Analytics from "./_components/analytics";
import AnalyticsSkeleton from "./_components/analytics-skeleton";
import DashboardHeader from "./_components/dashboard-header";
import {
  RangeFrame,
  RangeProvider,
  RangeTabs,
} from "./_components/range-context";

export const metadata: Metadata = { title: "Analytics" };

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string | string[] }>;
}) {
  // Invited friends only have the chat; send them there rather than to the
  // login page's "no access" message. requireAdmin stays strict.
  if (accessFor((await getSession())?.user.role) === "chat") {
    redirect("/dashboard/chat");
  }
  const session = await requireAdmin("/dashboard");
  const range = parseRange((await searchParams).range);

  return (
    <RangeProvider range={range}>
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <DashboardHeader
          email={session.user.email}
          userId={session.user.id}
          access="admin"
        />

        <main className="pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem]">
                Analytics
              </h1>
              <p className="mt-1 text-sm text-ink-2">
                Who&apos;s visiting olivermorla.com and how they found it.
                {posthogWebAnalyticsUrl && (
                  <>
                    {" "}
                    <a
                      href={posthogWebAnalyticsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-0.5 font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      Open in PostHog
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </a>
                  </>
                )}
              </p>
            </div>
            <RangeTabs />
          </div>

          <div className="mt-6">
            <RangeFrame>
              {/* No key: on a range change React keeps the current content
                  (dimmed by RangeFrame) rather than falling back here. */}
              <Suspense fallback={<AnalyticsSkeleton />}>
                <Analytics range={range} />
              </Suspense>
            </RangeFrame>
          </div>
        </main>
      </div>
    </RangeProvider>
  );
}
