"use client";

import {
  AnimationProps,
  CustomValueType,
  MotionProps,
  TargetAndTransition,
  VariantLabels,
  motion,
} from "framer-motion";
import { ComponentPropsWithoutRef, forwardRef, memo, RefObject } from "react";
export interface AnimatedInViewDivProps
  extends ComponentPropsWithoutRef<"div"> {
  delay?: number;
  duration?: number;
  animateX?: number[] | number | string | CustomValueType;
  animateY?: number[] | number | string | CustomValueType;
  x?: string | number | CustomValueType;
  y?: string | number | CustomValueType;

  initial?: AnimationProps["initial"];
  variants?: AnimationProps["variants"];
  animate?: VariantLabels | TargetAndTransition;
  exit?: AnimationProps["exit"];
  viewport?: {
    root?: RefObject<Element>;
    once?: boolean;
    margin?: string;
    amount?: "some" | "all" | number;
  };
}

// Default spring animation
const spring = {
  type: "spring",
  damping: 10,
  stiffness: 100,
};

const defaultProps: Partial<AnimatedInViewDivProps & MotionProps> = {
  delay: 0,
  duration: 0.3,
  animateX: 0,
  animateY: 0,
  x: 0,
  y: 0,
  transition: spring,
};

const AnimatedInViewDiv = forwardRef<
  HTMLDivElement,
  AnimatedInViewDivProps & MotionProps
>(
  (
    {
      delay = defaultProps.delay,
      duration = defaultProps.duration,
      animateX = defaultProps.animateX,
      animateY = defaultProps.animateY,
      x = defaultProps.x,
      y = defaultProps.y,
      transition = defaultProps.transition,
      children,
      initial,
      animate,
      exit,
      variants,
      viewport,
      ...props
    },
    ref
  ) => {
    const mergedTransition = { delay, duration, ...transition };

    const defaultInitial = {
      opacity: 0,
      x,
      y,
    };

    const defaultAnimate = {
      opacity: 1,
      x: animateX,
      y: animateY,
      transition: mergedTransition,
    };

    const defaultExit = {
      opacity: 0,
      x,
      y,
      transition: mergedTransition,
    };

    return (
      <motion.div
        ref={ref}
        {...props}
        initial={initial || defaultInitial}
        whileInView={animate || defaultAnimate}
        exit={exit || defaultExit}
        variants={variants}
        viewport={viewport}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedInViewDiv.displayName = "AnimatedInViewDiv";

export default memo(AnimatedInViewDiv);
