import { posthogWebAnalyticsUrl } from "@/lib/analytics";
import { parseRange } from "@/lib/analytics-shared";
import { requireAdmin } from "@/lib/auth-session";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SignOutButton, ThemeToggle } from "./_components/account-actions";
import Analytics from "./_components/analytics";
import AnalyticsSkeleton from "./_components/analytics-skeleton";
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
  const session = await requireAdmin("/dashboard");
  const range = parseRange((await searchParams).range);

  return (
    <RangeProvider range={range}>
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <header className="flex h-16 items-center justify-between gap-4 border-b border-line">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold tracking-[-0.01em]"
          >
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-lg bg-ink text-[0.8125rem] font-bold text-page"
            >
              OM
            </span>
            <span className="hidden sm:inline">Oliver Morla</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="mr-1 hidden max-w-[16rem] truncate text-sm text-ink-2 md:inline">
              {session.user.email}
            </span>
            <ThemeToggle />
            <SignOutButton />
          </div>
        </header>

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
