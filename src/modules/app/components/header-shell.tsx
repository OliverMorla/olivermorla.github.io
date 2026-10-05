"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Hides the header while scrolling down and brings it back on scroll up.
 * State lives in data attributes written once per frame, so scrolling never
 * re-renders React.
 */
const HeaderShell = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 4) return;

      header.dataset.scrolled = String(y > 8);
      header.dataset.hidden = String(y > 96 && y > lastY);
      lastY = y;
    };

    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };

    header.dataset.scrolled = String(lastY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[translate,background-color,border-color] duration-300 ease-out data-[hidden=true]:not-focus-within:-translate-y-full data-[scrolled=true]:border-neutral-200/80 data-[scrolled=true]:bg-white/80 data-[scrolled=true]:backdrop-blur-md dark:data-[scrolled=true]:border-neutral-800/80 dark:data-[scrolled=true]:bg-black/70"
    >
      {children}
    </header>
  );
};

export default HeaderShell;
