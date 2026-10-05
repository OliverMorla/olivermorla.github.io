"use client";

import { motion, type HTMLMotionProps } from "motion/react";

let hold: number | undefined;

/**
 * Milliseconds until the intro sheet starts clearing, so the hero's own
 * entrance plays after the loading screen instead of underneath it. The
 * intro is a CSS animation that starts at first paint and clears at
 * --handoff; 0 when there's no intro (reduced motion) or it's long gone.
 */
export function introHoldMs() {
  if (hold !== undefined) return hold;
  if (typeof window === "undefined") return 0;
  const intro = document.querySelector(".intro");
  if (!intro || getComputedStyle(intro).display === "none") return (hold = 0);
  const handoff = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--handoff"),
  );
  const painted =
    performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0;
  return (hold = Math.max(0, painted + (handoff || 0) - performance.now()));
}

// The live site's `blurVariant`: everything in its hero arrives with this
// same 5px rise and blur, staggered only by `delay`.
const blur = (delay = 0) => ({
  initial: { y: 5, opacity: 0, filter: "blur(5px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
  transition: { delay: introHoldMs() / 1000 + delay },
});

type Props<T extends keyof HTMLElementTagNameMap> = HTMLMotionProps<T> & {
  delay?: number;
};

export function MotionDiv({ delay, ...props }: Props<"div">) {
  return <motion.div {...blur(delay)} {...props} />;
}

export function MotionText({ delay, ...props }: Props<"p">) {
  return <motion.p {...blur(delay)} {...props} />;
}

export function MotionH1({ delay, ...props }: Props<"h1">) {
  return <motion.h1 {...blur(delay)} {...props} />;
}
