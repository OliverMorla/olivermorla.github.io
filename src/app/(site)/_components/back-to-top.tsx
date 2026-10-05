"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLiquidLens } from "./use-liquid-lens";

/**
 * Small screens only: mirrors the theme toggle in the bottom-left corner
 * and appears once the hero is behind you (see `.back-to-top` in
 * site.css). Hidden while the mobile menu is open.
 */
export default function BackToTop() {
  const [shown, setShown] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { lensProps, lensFilter } = useLiquidLens(buttonRef, {
    bezel: 12,
    scale: 24,
  });

  useEffect(() => {
    const check = () => setShown(window.scrollY > window.innerHeight);
    const frame = requestAnimationFrame(check);
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", check);
    };
  }, []);

  const toTop = () => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });
  };

  return (
    <>
      <button
        ref={buttonRef}
        {...lensProps}
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        inert={!shown}
        data-shown={shown}
        className="back-to-top glass liquid liquid-day fixed bottom-[calc(var(--gutter)+0.75rem+env(safe-area-inset-bottom))] left-[calc(var(--gutter)+0.75rem+env(safe-area-inset-left))] z-50 grid size-12 place-items-center rounded-full text-ink md:hidden"
      >
        <ArrowUp aria-hidden="true" className="size-5" />
      </button>
      {lensFilter}
    </>
  );
}
