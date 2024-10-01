"use client";

import { MotionProps, motion } from "framer-motion";
import { ComponentPropsWithoutRef, forwardRef, memo } from "react";

interface AnimatedCustomDivProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

const AnimatedCustomDiv = forwardRef<
  HTMLDivElement,
  AnimatedCustomDivProps & MotionProps
>(({ children, ...props }, ref) => {
  return (
    <motion.div ref={ref} {...props}>
      {children}
    </motion.div>
  );
});

AnimatedCustomDiv.displayName = "AnimatedCustomDiv";

export default memo(AnimatedCustomDiv);
