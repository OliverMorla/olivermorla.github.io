"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

/**
 * Blur-fades its children in the first time they scroll into view. Used on
 * section headings only, so each section arrives with one quiet beat.
 */
export function Reveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ type: "spring", bounce: 0, duration: 0.9 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Marks its subtree with data-inview="true" the first time it scrolls into
 * view, so CSS can run a one-off transition.
 */
export function InView({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });

  return (
    <div ref={ref} data-inview={inView} className={className}>
      {children}
    </div>
  );
}
