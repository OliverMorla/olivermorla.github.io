"use client";

import { cn } from "@/utils/classNames";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

export type ReelItem = {
  name: string;
  role: string;
  pull: string;
  // The rest of the quote; the whole quote when the pull line sits inside it.
  body: string;
  // The pull line also appears in `body`, so screen readers skip it once.
  pullRepeated: boolean;
  draft: boolean;
  project?: {
    name: string;
    summary: string;
    image: string;
    focus?: string;
    domain?: string;
  };
};

// Tall enough for the pinned reel to sit clear of the nav. Shorter screens,
// touch-sized ones and reduced motion get a plain swipeable rail instead.
const PINNED =
  "(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)";

function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

/**
 * Testimonials as a reel. On large screens the section pins and vertical
 * scrolling carries the cards sideways, one orchestrated move; everywhere
 * else it's a native, snapping horizontal rail. The arrow buttons and
 * keyboard focus both bring any card into view, so scrolling is never the
 * only way through.
 */
export default function ProofReel({ items }: { items: ReelItem[] }) {
  const pinned = useMedia(PINNED);
  const runwayRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);
  const [edge, setEdge] = useState({ start: true, end: false });

  // How far the track can travel: its width past the viewport's.
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const measure = () =>
      setDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });
  const { scrollXProgress } = useScroll({ container: viewportRef });
  const x = useTransform(scrollYProgress, (p) => -p * distance);
  const progress = pinned ? scrollYProgress : scrollXProgress;

  useMotionValueEvent(progress, "change", (p) =>
    setEdge({ start: p < 0.01, end: p > 0.99 }),
  );

  // Where each card starts along the track, first card at 0.
  const offsets = useCallback(() => {
    const cards = Array.from(trackRef.current?.children ?? []) as HTMLElement[];
    const first = cards[0]?.offsetLeft ?? 0;
    return cards.map((card) => Math.min(card.offsetLeft - first, distance));
  }, [distance]);

  const travelled = () =>
    pinned ? -x.get() : (viewportRef.current?.scrollLeft ?? 0);

  const goTo = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const target = offsets()[index];
      if (target === undefined) return;
      if (pinned) {
        const runway = runwayRef.current!;
        const top = runway.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + target, behavior });
      } else {
        viewportRef.current?.scrollTo({ left: target, behavior });
      }
    },
    [offsets, pinned],
  );

  const step = (direction: 1 | -1) => {
    const stops = offsets();
    const at = travelled();
    const current = stops.findLastIndex((stop) => stop <= at + 8);
    const next = Math.min(stops.length - 1, Math.max(0, current + direction));
    // Already at the last stop the track can reach: nudge to its end.
    goTo(direction === 1 && stops[next]! <= at + 8 ? stops.length - 1 : next);
  };

  // Pinned, the track only moves with the page, so a focused card that's
  // off to the side has to be scrolled to.
  const onFocus = (event: React.FocusEvent<HTMLUListElement>) => {
    if (!pinned) return;
    const cards = Array.from(event.currentTarget.children);
    const index = cards.findIndex((card) => card.contains(event.target));
    const card = cards[index]?.getBoundingClientRect();
    if (card && (card.left < 0 || card.right > window.innerWidth)) {
      goTo(index, "instant");
    }
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className={pinned ? "pt-16" : "py-28 md:py-36"}
    >
      <div
        ref={runwayRef}
        style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
      >
        <div
          className={cn(
            pinned &&
              "sticky top-0 flex h-svh flex-col justify-center overflow-clip pt-16",
          )}
        >
          <div className="wrap flex items-end justify-between gap-6">
            <div>
              <h2 id="testimonials-title" className="type-h2">
                In their words
              </h2>
              <p className="mt-4 max-w-[26rem] text-slate">
                {items.length} founders and owners on what it&rsquo;s like to
                build with me.
              </p>
            </div>
            <div className="hidden shrink-0 gap-2 sm:flex">
              <ArrowButton
                label="Previous testimonial"
                disabled={edge.start}
                onClick={() => step(-1)}
              >
                <ArrowLeft className="size-[1.125rem]" />
              </ArrowButton>
              <ArrowButton
                label="Next testimonial"
                disabled={edge.end}
                onClick={() => step(1)}
              >
                <ArrowRight className="size-[1.125rem]" />
              </ArrowButton>
            </div>
          </div>

          <div
            ref={viewportRef}
            className={cn(
              "reel mt-10 md:mt-12",
              pinned
                ? "overflow-clip"
                : "snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
            )}
          >
            <motion.ul
              ref={trackRef}
              onFocus={onFocus}
              style={{ x: pinned ? x : 0 }}
              className="reel-track flex w-max items-start gap-4 lg:items-stretch"
            >
              {items.map((item) => (
                <li key={item.name} className="flex snap-start">
                  <Card item={item} />
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="wrap mt-8">
            <div className="h-0.5 overflow-clip rounded-full bg-line">
              <motion.div
                className="h-full origin-left rounded-full bg-ink"
                style={{ scaleX: progress }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full bg-mist text-ink transition-[background-color,opacity] duration-150 hover:bg-line disabled:opacity-40 disabled:hover:bg-mist"
    >
      {children}
    </button>
  );
}

function Card({ item }: { item: ReelItem }) {
  const { project } = item;

  return (
    <figure
      className={cn(
        "flex w-[min(84vw,24rem)] flex-col rounded-[1.5rem] bg-mist p-2.5",
        project
          ? "lg:grid lg:h-[26rem] lg:w-[50rem] lg:grid-cols-[1fr_22rem] lg:gap-2"
          : "lg:h-[26rem] lg:w-[30rem]",
      )}
    >
      {/* The product they're talking about: a compact row under the quote
          on small screens, a column beside it on large ones. */}
      {project && (
        <div className="order-2 flex items-center gap-3.5 rounded-[1.0625rem] bg-page p-2.5 lg:flex-col lg:items-stretch lg:gap-0 dark:bg-black/50">
          <div className="relative aspect-[16/10] w-24 shrink-0 overflow-clip rounded-[0.75rem] bg-mist ring-1 ring-ink/6 sm:w-36 lg:w-auto">
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              fill
              sizes="(min-width: 1024px) 21rem, 9rem"
              style={{ objectPosition: project.focus }}
              className="object-cover object-top"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-0.5 lg:flex-1 lg:justify-end lg:px-1.5 lg:pt-4 lg:pb-1">
            <p className="text-[0.9375rem] font-semibold tracking-[-0.01em] lg:text-base">
              {project.name}
            </p>
            <p className="text-[0.875rem] leading-snug text-slate">
              {project.summary}
            </p>
            {project.domain && (
              <a
                href={`https://${project.domain}`}
                target="_blank"
                rel="noreferrer"
                className="mt-1.5 inline-flex max-w-full items-center gap-1 self-start text-[0.8125rem] font-medium [overflow-wrap:anywhere] lg:mt-3 lg:text-[0.875rem] text-ink underline decoration-ghost underline-offset-4 transition-colors hover:decoration-ink"
              >
                {project.domain}
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            )}
          </div>
        </div>
      )}

      <div className="order-1 flex flex-1 flex-col p-4 pt-5 pb-6 lg:p-6">
        <blockquote className="flex-1">
          <p
            aria-hidden={item.pullRepeated || undefined}
            className={cn(
              "font-semibold tracking-[-0.02em] text-balance text-ink",
              project
                ? "text-[1.25rem] leading-[1.25] lg:text-[1.375rem]"
                : "text-[1.5rem] leading-[1.18] lg:text-[1.875rem]",
            )}
          >
            &ldquo;{item.pull}
            {item.pullRepeated || !item.body ? "”" : ""}
          </p>
          {item.body && (
            <p className="mt-3 text-[0.9375rem] leading-[1.6] text-slate">
              {item.pullRepeated ? "“" : ""}
              {item.body}&rdquo;
            </p>
          )}
        </blockquote>

        <figcaption className="mt-6 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-night text-[0.8125rem] font-semibold text-ice"
          >
            {initials(item.name)}
          </span>
          <span className="min-w-0 leading-tight">
            <span className="flex items-center gap-2 font-semibold">
              {item.name}
              {item.draft && (
                <span
                  title="Hidden in production until the client approves the wording"
                  className="rounded-full bg-ink/8 px-2 py-0.5 text-[0.6875rem] font-medium text-slate"
                >
                  Draft
                </span>
              )}
            </span>
            <span className="block text-[0.875rem] text-slate">
              {item.role}
            </span>
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
