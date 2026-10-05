"use client";

import { cn } from "@/utils/classNames";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Project } from "../_lib/content";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

// How long each project stays up before the browser moves to the next.
const SLOT = "6s";

/**
 * Featured projects as tabs beside one browser window. It cycles on its own
 * while on screen; hovering either side pauses it, and choosing a project
 * restarts the clock from there.
 */
export default function WorkBrowser({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null);
  const onScreen = useInView(root, { margin: "-20% 0px -20% 0px" });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const current = projects[active]!;
  const address = current.domain ?? "Early access";

  const next = () => setActive((i) => (i + 1) % projects.length);

  return (
    <div
      ref={root}
      data-paused={!onScreen || hovered}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="mt-14 grid grid-cols-1 gap-8 md:mt-20 lg:grid-cols-12 lg:gap-14"
    >
      <div
        role="tablist"
        aria-label="Featured projects"
        aria-orientation="vertical"
        className="flex flex-col border-b border-line lg:col-span-5"
      >
        {projects.map((project, i) => {
          const selected = i === active;
          return (
            <button
              key={project.name}
              id={`work-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="work-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                const step =
                  e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
                if (!step) return;
                e.preventDefault();
                const to = (i + step + projects.length) % projects.length;
                setActive(to);
                document.getElementById(`work-tab-${to}`)?.focus();
              }}
              className="group relative border-t border-line py-5 text-left md:py-6"
            >
              {selected && (
                <span
                  key={active}
                  aria-hidden
                  onAnimationEnd={next}
                  className="work-progress bg-gradient absolute -top-px left-0 h-0.5 w-full"
                  style={{ "--slot": SLOT } as CSSVars}
                />
              )}
              <span className="flex items-baseline justify-between gap-4">
                <span
                  className={cn(
                    "text-[1.5rem] font-semibold tracking-[-0.035em] transition-colors duration-300 ease-[ease] md:text-[1.875rem]",
                    selected
                      ? "text-ink"
                      : "text-ink/30 group-hover:text-ink/60",
                  )}
                >
                  {project.name}
                </span>
                <span
                  className={cn(
                    "type-eyebrow shrink-0 transition-colors duration-300 ease-[ease]",
                    selected ? "text-slate" : "text-slate/50",
                  )}
                >
                  {project.industry}
                </span>
              </span>
              <span
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out)]",
                  selected
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <span className="overflow-hidden">
                  <span className="block pt-2 text-[1rem] text-slate">
                    {project.summary}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="order-first lg:order-none lg:col-span-7">
        <div
          id="work-panel"
          role="tabpanel"
          aria-labelledby={`work-tab-${active}`}
          className="overflow-clip rounded-[1.25rem] bg-card shadow-[0_0_0_1px_rgb(11_11_13/0.08),0_2px_4px_rgb(11_11_13/0.04),0_24px_60px_-20px_rgb(11_11_13/0.35),0_60px_100px_-50px_rgb(79_70_229/0.35)] lg:sticky lg:top-28"
        >
          <div className="flex h-11 items-center gap-3 border-b border-line bg-[#f7f7f9] px-4">
            <span aria-hidden className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#dcdce2]" />
              <span className="size-2.5 rounded-full bg-[#dcdce2]" />
              <span className="size-2.5 rounded-full bg-[#dcdce2]" />
            </span>
            <span className="mx-auto flex h-7 min-w-0 max-w-[22rem] flex-1 items-center justify-center rounded-lg bg-white px-3 font-mono text-[0.75rem] text-slate ring-1 ring-line">
              {current.domain && (
                <span className="hidden text-slate/60 sm:inline">https://</span>
              )}
              <span
                key={address}
                className="url-type text-ink"
                style={{ "--n": address.length } as CSSVars}
              >
                {address}
              </span>
            </span>
            {current.domain ? (
              <a
                href={`https://${current.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[0.8125rem] font-medium text-slate transition-colors duration-150 ease-[ease] hover:text-ink"
              >
                Visit
                <ArrowUpRight aria-hidden className="size-3.5" />
                <span className="sr-only">{current.name}</span>
              </a>
            ) : (
              <span aria-hidden className="w-11" />
            )}
          </div>

          <div className="relative aspect-[16/10] bg-paper">
            {projects.map((project, i) => (
              <Image
                key={project.name}
                src={project.image}
                alt={i === active ? `${project.name} homepage` : ""}
                aria-hidden={i !== active || undefined}
                data-active={i === active}
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="shot object-cover object-top"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
