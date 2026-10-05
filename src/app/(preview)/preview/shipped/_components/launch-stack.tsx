"use client";

import { cn } from "@/utils/classNames";
import { Lock, Pause, Play } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from "motion/react";
import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { Project } from "../_lib/content";

const CYCLE_MS = 4500;
const VISIBLE = 3;

// Cards behind the front one peek out above it, smaller and washed out.
const depthPose = (depth: number) => ({
  transform: `translateY(${-depth * 7}%) scale(${1 - depth * 0.055})`,
  opacity: 1,
});
const enterPose = { ...depthPose(VISIBLE), opacity: 0 };
// The front card leaves toward the viewer as the deck moves up. Cards that
// leave from further back (after a jump) just fade where they are.
const exitVariants = (reduceMotion: boolean | null) => ({
  exit: (depth: number) =>
    depth === 0 && !reduceMotion
      ? {
          transform: "translateY(9%) scale(1.03)",
          opacity: 0,
          zIndex: VISIBLE + 1,
        }
      : { opacity: 0 },
});
const wash = [0, 0.45, 0.7];

const noopSubscribe = () => () => {};

const move = { type: "spring", duration: 0.75, bounce: 0.08 } as const;
const fade = { duration: 0.4, ease: [0.23, 1, 0.32, 1] } as const;

type LaunchStackProps = {
  projects: Project[];
  className?: string;
};

export default function LaunchStack({ projects, className }: LaunchStackProps) {
  // The server can't know the visitor's motion preference, so render the
  // default first and switch after hydration to keep the markup in sync.
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const reduceMotion = hydrated && prefersReducedMotion === true;
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  // Reduced motion: no autoplay, the visitor steps through by hand.
  const autoplay = !reduceMotion && !userPaused;
  const running = autoplay && !hovering;

  const next = () => setActive((i) => (i + 1) % projects.length);

  const deck = Array.from(
    { length: Math.min(VISIBLE, projects.length) },
    (_, depth) => ({
      project: projects[(active + depth) % projects.length],
      depth,
    }),
  );
  const current = projects[active];

  // Subtle depth on pointer devices: the stack drifts against the cursor.
  const px = useSpring(0, { stiffness: 120, damping: 20, mass: 0.6 });
  const py = useSpring(0, { stiffness: 120, damping: 20, mass: 0.6 });
  const drift = useMotionTemplate`translate3d(${px}px, ${py}px, 0)`;

  useEffect(() => {
    if (reduceMotion) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    const onMove = (event: PointerEvent) => {
      px.set((event.clientX / window.innerWidth - 0.5) * -16);
      py.set((event.clientY / window.innerHeight - 0.5) * -12);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, px, py]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Recently shipped"
      className={className}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      <motion.div style={{ transform: drift }}>
        <div className="relative">
          {/* Sizes the stack to one card; the cards themselves are absolute. */}
          <div aria-hidden className="invisible">
            <div className="h-9" />
            <div className="aspect-[16/9]" />
          </div>

          <AnimatePresence initial={false}>
            {deck.map(({ project, depth }) => (
              <motion.div
                key={project.slug}
                className="absolute inset-0 origin-top"
                style={{ zIndex: VISIBLE - depth }}
                custom={depth}
                variants={exitVariants(reduceMotion)}
                initial={
                  reduceMotion ? { ...depthPose(depth), opacity: 0 } : enterPose
                }
                animate={depthPose(depth)}
                exit="exit"
                transition={{
                  transform: reduceMotion ? { duration: 0 } : move,
                  opacity: fade,
                }}
                aria-hidden={depth !== 0}
                role={depth === 0 ? "group" : undefined}
                aria-roledescription={depth === 0 ? "slide" : undefined}
                aria-label={
                  depth === 0
                    ? `${active + 1} of ${projects.length}: ${project.name}`
                    : undefined
                }
              >
                <BrowserCard
                  project={project}
                  preload={project === projects[0]}
                >
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[#e9ebef]"
                    initial={false}
                    animate={{ opacity: wash[depth] ?? 1 }}
                    transition={fade}
                  />
                </BrowserCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="flex min-w-0 flex-col text-[0.875rem] leading-snug">
          <span className="font-semibold text-ink">{current.name}</span>
          <span className="truncate text-slate">{current.summary}</span>
        </p>

        <div className="flex shrink-0 items-center">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${project.name}`}
              aria-current={i === active}
              className="group grid h-8 w-5 place-items-center"
            >
              <span className="relative h-[3px] w-3.5 overflow-hidden rounded-full bg-ink/15 transition-colors duration-150 ease-[ease] group-hover:bg-ink/30">
                {i === active && (
                  <span
                    key={active}
                    className={cn(
                      "absolute inset-0 rounded-full bg-ink",
                      autoplay && "progress-fill",
                    )}
                    style={
                      { "--cycle": `${CYCLE_MS}ms` } as React.CSSProperties
                    }
                    data-paused={!running}
                    onAnimationEnd={next}
                  />
                )}
              </span>
            </button>
          ))}

          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setUserPaused((paused) => !paused)}
              aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
              className="ml-1 grid size-8 place-items-center rounded-full text-slate transition-colors duration-150 ease-[ease] hover:text-ink"
            >
              {userPaused ? (
                <Play className="size-3.5" fill="currentColor" />
              ) : (
                <Pause className="size-3.5" fill="currentColor" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

type BrowserCardProps = {
  project: Project;
  preload?: boolean;
  children?: React.ReactNode;
};

function BrowserCard({ project, preload, children }: BrowserCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[14px] bg-paper shadow-[0_0_0_1px_rgba(22,24,29,0.07),0_2px_4px_rgba(22,24,29,0.05),0_18px_40px_-12px_rgba(22,24,29,0.28),0_40px_80px_-32px_rgba(22,24,29,0.32)]">
      <div className="grid h-9 grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-line/70 px-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
        </span>
        <span className="flex h-6 min-w-0 items-center gap-1.5 rounded-md bg-canvas px-2.5 text-[0.75rem] text-slate">
          <Lock className="size-3 shrink-0" aria-hidden />
          <span className="truncate">{project.domain}</span>
        </span>
        <span className="flex items-center justify-end gap-1.5 text-[0.75rem] font-medium text-live">
          <span className="live-dot" aria-hidden />
          Live
        </span>
      </div>
      <div className="relative aspect-[16/9] bg-canvas">
        <Image
          src={project.image}
          alt={`${project.name} homepage`}
          fill
          sizes="(min-width: 1024px) 460px, 88vw"
          preload={preload}
          className="object-cover object-top"
        />
      </div>
      {children}
    </div>
  );
}
