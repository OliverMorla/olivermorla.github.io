"use client";

import { motion } from "motion/react";

/**
 * Blur-fades its children in the first time they scroll into view. Used on
 * section headings only, so each section arrives with one quiet beat.
 */
export function Reveal({
  className,
  delay = 0,
  children,
}: {
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ type: "spring", bounce: 0, duration: 0.9, delay }}
    >
      {children}
    </motion.div>
  );
}
