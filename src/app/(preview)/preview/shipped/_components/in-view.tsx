"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

// Marks its subtree with data-inview="true" the first time it scrolls into
// view, so CSS can run a one-off reveal.
export default function InView({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <div ref={ref} data-inview={inView} className={className}>
      {children}
    </div>
  );
}
