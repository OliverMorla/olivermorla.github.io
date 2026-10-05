"use client";

import { cn } from "@/utils/classNames";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { SwapTo } from "../../_components/word-swap";
import type { Project, Sector } from "../../_lib/content";

export type IndexProject = Project & {
  quote?: { pull: string; name: string; role: string; draft: boolean };
};

type Filter = "All" | Sector;

// What the heading says each filter's projects were built for. Short, so
// the pill fits beside "Built for" on a phone.
const audience: Record<Filter, string> = {
  All: "founders",
  Fintech: "fintech",
  "Health & fitness": "wellness",
  Gaming: "gamers",
  "Local business": "Main Street",
};

/**
 * Rows with a client quote span the grid; plain cards go in pairs between
 * them, so a lone card never leaves half a row empty mid-list.
 */
function arrange(list: IndexProject[]) {
  const quoted = list.filter((p) => p.quote);
  const plain = list.filter((p) => !p.quote);
  const out: IndexProject[] = [];
  let q = 0;
  let s = 0;
  while (q < quoted.length || s < plain.length) {
    if (q < quoted.length) out.push(quoted[q++]!);
    if (s + 1 < plain.length) out.push(plain[s++]!, plain[s++]!);
    else if (q >= quoted.length && s < plain.length) out.push(plain[s++]!);
  }
  return out;
}

export default function ProjectIndex({
  projects,
  sectors,
}: {
  projects: IndexProject[];
  sectors: readonly Sector[];
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...sectors];
  const count = (f: Filter) =>
    f === "All"
      ? projects.length
      : projects.filter((p) => p.sector === f).length;
  const visible = arrange(
    filter === "All" ? projects : projects.filter((p) => p.sector === filter),
  );
  // Quote rows alternate which side the screenshot sits on.
  const quoted = visible.filter((p) => p.quote);

  return (
    <MotionConfig reducedMotion="user">
      <header
        data-night
        className="panel on-night relative isolate overflow-clip bg-night text-paper"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_85%_0%,#1b3470_0%,rgb(27_52_112/0)_70%)]"
        />
        <div className="wrap pt-36 pb-10 md:pt-44 md:pb-12">
          <h1 className="type-display hero-in">
            Built for <SwapTo word={audience[filter]} />
          </h1>
          <p
            className="type-lede hero-in mt-6 max-w-[32rem] text-ice-soft"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            {projects.length} products for startups and small businesses, from
            first call to launch.
          </p>

          <div
            role="group"
            aria-label="Filter projects by sector"
            className="hero-in mt-10 flex flex-wrap gap-2 md:mt-12"
            style={{ "--d": "160ms" } as React.CSSProperties}
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "btn h-10 gap-2 px-4 text-[0.9375rem]",
                  filter === f
                    ? "bg-paper text-night"
                    : "glass glass-night text-ice-soft hover:text-paper",
                )}
              >
                {f}
                <span
                  className={cn(
                    "text-[0.8125rem] tabular-nums",
                    filter === f ? "text-night/55" : "text-ice-soft/70",
                  )}
                >
                  {count(f)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <section
        aria-label="Projects"
        className="wrap pt-14 pb-28 md:pt-20 md:pb-36"
      >
        <p aria-live="polite" className="sr-only">
          {filter === "All"
            ? `Showing all ${visible.length} projects`
            : `Showing ${visible.length} ${filter} projects`}
        </p>

        <ul className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:gap-x-8 lg:gap-y-20">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
                transition={{ type: "spring", bounce: 0, duration: 0.55 }}
                className={cn(project.quote && "md:col-span-2")}
              >
                {project.quote ? (
                  <QuoteRow
                    project={project}
                    flip={quoted.indexOf(project) % 2 === 1}
                  />
                ) : (
                  <Card project={project} />
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </section>
    </MotionConfig>
  );
}

function Shot({
  project,
  sizes,
  className,
}: {
  project: IndexProject;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-clip rounded-[1.25rem] bg-mist ring-1 ring-ink/6",
        className,
      )}
    >
      <Image
        src={project.image}
        alt=""
        fill
        sizes={sizes}
        style={{ objectPosition: project.focus }}
        className="object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.03]"
      />
      {project.domain && (
        <span
          aria-hidden="true"
          className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-ink text-page transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          <ArrowUpRight className="size-4" strokeWidth={2.25} />
        </span>
      )}
    </div>
  );
}

function Meta({ project }: { project: IndexProject }) {
  if (!project.sector && !project.domain) return null;
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.875rem] text-slate">
      {project.sector && (
        <span className="rounded-full bg-mist px-2.5 py-0.5">
          {project.sector}
        </span>
      )}
      {project.domain && <span>{project.domain}</span>}
    </p>
  );
}

/** The whole card is the link when the site is live. */
function StretchedLink({ project }: { project: IndexProject }) {
  if (!project.domain) return null;
  return (
    <a
      href={`https://${project.domain}`}
      target="_blank"
      rel="noreferrer"
      className="absolute inset-0 z-10 rounded-[1.25rem]"
    >
      <span className="sr-only">
        Visit {project.name} ({project.domain})
      </span>
    </a>
  );
}

function Card({ project }: { project: IndexProject }) {
  return (
    <article className="group relative">
      <Shot
        project={project}
        sizes="(min-width: 1248px) 600px, (min-width: 768px) 48vw, 100vw"
      />
      <div className="mt-5 flex flex-col gap-2">
        <h2 className="type-h3">{project.name}</h2>
        <p className="text-slate">{project.summary}</p>
        <Meta project={project} />
      </div>
      <StretchedLink project={project} />
    </article>
  );
}

function QuoteRow({ project, flip }: { project: IndexProject; flip: boolean }) {
  const quote = project.quote!;

  return (
    <article className="grid items-center gap-8 md:grid-cols-12 lg:gap-12">
      <div className={cn("group relative md:col-span-7", flip && "md:order-2")}>
        <Shot
          project={project}
          sizes="(min-width: 1248px) 700px, (min-width: 768px) 56vw, 100vw"
        />
        <StretchedLink project={project} />
      </div>

      <div className="md:col-span-5">
        <h2 className="type-h3">{project.name}</h2>
        <p className="mt-2 text-slate">{project.summary}</p>
        <div className="mt-3">
          <Meta project={project} />
        </div>

        <figure className="mt-8 border-l-2 border-line pl-5 md:mt-10">
          <blockquote className="text-[1.25rem] leading-[1.35] font-semibold tracking-[-0.018em] text-balance lg:text-[1.375rem]">
            &ldquo;{quote.pull}&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-[0.9375rem] leading-snug">
            <span className="flex items-center gap-2 font-semibold">
              {quote.name}
              {quote.draft && (
                <span
                  title="Hidden in production until the client approves the wording"
                  className="rounded-full bg-ink/8 px-2 py-0.5 text-[0.6875rem] font-medium text-slate"
                >
                  Draft
                </span>
              )}
            </span>
            <span className="block text-slate">{quote.role}</span>
          </figcaption>
        </figure>
      </div>
    </article>
  );
}
