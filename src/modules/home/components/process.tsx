"use client";

import CTAButtons from "@/modules/app/components/cta-buttons";
import SectionTitle from "@/modules/app/components/section-title";
import { cn } from "@/utils/classNames";

type Step = {
  id: number;
  title: string;
  blurb: string;
  bullets: string[];
  deliverables: string[];
  duration: string;
};

const STEPS: Step[] = [
  {
    id: 1,
    title: "Discovery",
    blurb:
      "Define success, scope, and constraints. Align on outcomes, not just outputs.",
    bullets: [
      "Success metrics and KPIs",
      "Scope, risks, constraints",
      "Backlog and priorities",
      "High-level architecture",
    ],
    deliverables: ["Brief + Scope", "Backlog v1", "System outline"],
    duration: "3–5 days",
  },
  {
    id: 2,
    title: "Prototype",
    blurb: "Clickable UX that validates flows early to reduce rework later.",
    bullets: [
      "User flows and key screens",
      "Click-through prototype",
      "Early usability feedback",
      "Visual direction",
    ],
    deliverables: ["Prototype", "Flow map", "Design direction"],
    duration: "1–2 weeks",
  },
  {
    id: 3,
    title: "Build",
    blurb:
      "Iterative sprints with CI/CD, code reviews, and tests for reliable delivery.",
    bullets: [
      "1–2 week sprints",
      "CI/CD and preview envs",
      "Unit + E2E tests",
      "Weekly demos",
    ],
    deliverables: ["Incremental releases", "Test suites", "Changelog"],
    duration: "2–6+ weeks (scope-dependent)",
  },
  {
    id: 4,
    title: "Launch & Support",
    blurb: "Harden, launch, monitor. Clean handoff or ongoing maintenance.",
    bullets: [
      "Perf + security hardening",
      "Observability & analytics",
      "Runbooks & docs",
      "Handoff or retainer",
    ],
    deliverables: ["Launch checklist", "Monitoring", "Handoff docs"],
    duration: "3–7 days",
  },
];

const Process = () => {
  return (
    <section
      id="process"
      className="py-24 max-sm:py-16 px-8 max-sm:px-4 bg-gradient-none-inverted"
      aria-labelledby="process-title"
    >
      <section className="relative container mx-auto flex flex-col gap-12">
        <divo
          className="absolute inset-0 bg-grid-pattern bg-grid-pattern-lg opacity-5"
          aria-hidden="true"
        />
        <SectionTitle
          tagline="No guesswork"
          title="A Clear, Four-Step Build"
          subtitle="Plan. Prototype. Build. Launch."
          description="We start with Discovery to define success and scope. Next, a clickable Prototype aligns UX early and reduces rework. Then Build in iterative sprints with CI/CD, reviews, and tests. Finally, Launch & Support—monitoring, analytics, and a clean handoff or ongoing maintenance."
          className="text-start items-start mr-auto max-w-3xl"
        />

        <ol className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <li
              key={step.id}
              className={cn(
                "group relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur p-6",
                step.id === 1 && "lg:col-span-2 col-span-1",
                step.id === 4 && "lg:col-span-2 col-span-1",
              )}
              aria-label={`Step ${step.id}: ${step.title}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 grid place-items-center font-bold">
                  {step.id}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300">
                      {step.duration}
                    </span>
                  </div>
                  <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                    {step.blurb}
                  </p>

                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {step.bullets.map((b) => (
                      <li
                        key={b}
                        className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
                      >
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {step.deliverables.map((d) => (
                      <span
                        key={d}
                        className="px-2 py-1 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <CTAButtons />
      </section>
    </section>
  );
};

export default Process;
