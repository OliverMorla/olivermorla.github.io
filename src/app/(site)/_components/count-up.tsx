"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Counts from 0 to `value` the first time it scrolls into view. The final
 * number is in the server markup, so it reads correctly without JS. It only
 * resets to 0 while still below the fold, so there's never a visible jump,
 * and with reduced motion it never animates.
 */
export default function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const still = useReducedMotion();
  const count = useMotionValue(value);
  const shown = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const el = ref.current;
    if (still || !el) return;
    if (el.getBoundingClientRect().top > window.innerHeight) count.set(0);
  }, [count, still]);

  useEffect(() => {
    if (!inView || still || count.get() === value) return;
    const controls = animate(count, value, {
      duration: 1.2,
      ease: [0.23, 1, 0.32, 1],
    });
    return () => controls.stop();
  }, [inView, still, value, count]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {shown}
    </motion.span>
  );
}
