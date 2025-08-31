"use client";

import { useScroll, type MotionValue } from "framer-motion";
import { ComponentProps, createContext, useContext, useRef } from "react";

export type ScrollTrackingContainerProps = ComponentProps<"div">;

type ScrollTrackingContextValue = {
  scrollYProgress: MotionValue<number>;
  // smoothYProgress: MotionValue<number>;
};

const ScrollTrackingContext = createContext<ScrollTrackingContextValue | null>(
  null,
);

export const useScrollTracking = () => {
  const ctx = useContext(ScrollTrackingContext);
  if (!ctx) {
    throw new Error(
      "useScrollTracking must be used within ScrollTrackingContainer",
    );
  }
  return ctx;
};

const ScrollTrackingContainer = ({
  children,
  ...props
}: ScrollTrackingContainerProps) => {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  //   const smoothYProgress = useSpring(scrollYProgress, {
  //     stiffness: 120,
  //     damping: 20,
  //     mass: 0.2,
  //   });

  //   // Expose CSS vars so Server-only children can react via CSS
  //   useMotionValueEvent(smoothYProgress, "change", (v) => {
  //     const el = container.current;
  //     if (el) {
  //       el.style.setProperty("--scroll-y", String(v)); // 0 → 1
  //       el.style.setProperty("--scroll-pct", `${Math.round(v * 100)}%`);
  //     }
  //   });

  return (
    <ScrollTrackingContext.Provider value={{ scrollYProgress }}>
      <div ref={container} {...props}>
        {children}
      </div>
    </ScrollTrackingContext.Provider>
  );
};

export default ScrollTrackingContainer;
