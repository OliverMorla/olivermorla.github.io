"use client";

import { useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Counts up to `to` the first time it scrolls into view, on a spring like
 * React Bits' CountUp. The server renders the final number, so it reads
 * correctly without JavaScript and for reduced-motion users.
 */
export function CountUp({
  to,
  duration = 1.4,
}: {
  to: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const value = useMotionValue(to);
  const spring = useSpring(value, {
    damping: 20 + 40 * (1 / duration),
    stiffness: 100 * (1 / duration),
  });

  // Reset to zero only while still off screen, so nobody sees it jump.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { top } = node.getBoundingClientRect();
    if (top > window.innerHeight) {
      value.jump(0);
      spring.jump(0);
      node.textContent = "0";
    }
  }, [spring, value]);

  useEffect(() => {
    if (inView) value.set(to);
  }, [inView, to, value]);

  useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) ref.current.textContent = String(Math.round(latest));
      }),
    [spring],
  );

  return (
    <span ref={ref} className="tabular-nums">
      {to}
    </span>
  );
}
