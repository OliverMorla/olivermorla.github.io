"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ParallaxTextProps = {
  children: ReactNode;
  /** Percent of one copy's width travelled per second at rest. */
  baseVelocity?: number;
};

// Four copies are rendered, so one copy spans 25% of the track; wrapping the
// offset across that span makes the loop seamless.
const COPIES = 4;
const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

/**
 * A marquee that speeds up and flips direction with scroll velocity.
 * Runs a rAF loop only while on screen, writes the transform straight to the
 * DOM (no React re-renders), and stays still for reduced-motion users.
 */
export default function ParallaxText({
  children,
  baseVelocity = -2,
}: ParallaxTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let lastTime = 0;
    let lastScrollY = window.scrollY;
    let smoothVelocity = 0;
    let direction = 1;
    let offset = 0;

    const step = (time: number) => {
      const delta = lastTime ? Math.min(time - lastTime, 64) / 1000 : 0;
      lastTime = time;

      if (delta > 0) {
        const scrollY = window.scrollY;
        const velocity = (scrollY - lastScrollY) / delta;
        lastScrollY = scrollY;

        // Exponential smoothing stands in for a spring on the raw velocity.
        smoothVelocity += (velocity - smoothVelocity) * Math.min(1, delta * 10);
        const factor = smoothVelocity / 200;
        if (factor < 0) direction = -1;
        else if (factor > 0) direction = 1;

        offset += direction * baseVelocity * delta * (1 + Math.abs(factor));
        track.style.transform = `translate3d(${wrap(-20, -45, offset)}%, 0, 0)`;
      }

      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !frame) {
        lastTime = 0;
        lastScrollY = window.scrollY;
        frame = requestAnimationFrame(step);
      } else if (!entry.isIntersecting && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [baseVelocity]);

  return (
    <div ref={containerRef} className="parallax" aria-hidden>
      <div
        ref={trackRef}
        className="scroller will-change-transform"
        style={{ transform: "translate3d(-20%, 0, 0)" }}
      >
        {Array.from({ length: COPIES }, (_, i) => (
          <span key={i}>{children}</span>
        ))}
      </div>
    </div>
  );
}
