"use client";

import { cn } from "@/utils/classNames";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type CarouselProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

/**
 * Horizontal scroll-snap rail. The slides are server-rendered children; this
 * island only adds previous/next buttons on top of native scrolling, which
 * already handles touch, trackpads and keyboard.
 */
const Carousel = ({ label, children, className }: CarouselProps) => {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const { scrollLeft, scrollWidth, clientWidth } = scroller;
      const atStart = scrollLeft <= 4;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 4;
      // Bail out unless an edge flips, so scrolling doesn't re-render.
      setEdges((prev) =>
        prev.atStart === atStart && prev.atEnd === atEnd
          ? prev
          : { atStart, atEnd },
      );
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(measure);
    };

    const resize = new ResizeObserver(onScroll);
    resize.observe(scroller);
    scroller.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      resize.disconnect();
      scroller.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const scrollByPage = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({ left: direction * scroller.clientWidth * 0.85 });
  };

  const buttonClassName =
    "grid size-10 place-items-center rounded-full border border-neutral-300 bg-white text-neutral-900 transition-colors outline-none hover:bg-neutral-100 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800";

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <ul
        ref={scrollerRef}
        aria-label={label}
        // Focusable so keyboard users can scroll it with the arrow keys.
        tabIndex={0}
        className="flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto overscroll-x-contain scroll-smooth rounded-xl pb-2 outline-none [scrollbar-width:none] focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          disabled={edges.atStart}
          aria-label="Previous projects"
          className={buttonClassName}
        >
          <ChevronLeft aria-hidden className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          disabled={edges.atEnd}
          aria-label="Next projects"
          className={buttonClassName}
        >
          <ChevronRight aria-hidden className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
