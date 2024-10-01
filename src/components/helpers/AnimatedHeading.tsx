"use client";

import {
  AnimationProps,
  CustomValueType,
  MotionProps,
  motion,
} from "framer-motion";
import { ComponentPropsWithoutRef, forwardRef, memo } from "react";

export interface AnimatedHeadingProps extends ComponentPropsWithoutRef<"h1"> {
  delay?: number;
  duration?: number;
  animateX?: number[] | number | string | CustomValueType;
  animateY?: number[] | number | string | CustomValueType;
  x?: string | number | CustomValueType;
  y?: string | number | CustomValueType;

  initial?: AnimationProps["initial"];
  variants?: AnimationProps["variants"];
  animate?: AnimationProps["animate"];
  exit?: AnimationProps["exit"];
}

// Default spring animation
const spring = {
  type: "spring",
  damping: 10,
  stiffness: 100,
};

const defaultProps: Partial<AnimatedHeadingProps & MotionProps> = {
  delay: 0,
  duration: 0.3,
  animateX: 0,
  animateY: 0,
  x: 0,
  y: 0,
  transition: spring,
};

const AnimatedHeading = forwardRef<
  HTMLHeadingElement,
  AnimatedHeadingProps & MotionProps
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
      <motion.h1
        ref={ref}
        {...props}
        initial={initial || defaultInitial}
        animate={animate || defaultAnimate}
        exit={exit || defaultExit}
        variants={variants}
      >
        {children}
      </motion.h1>
    );
  }
);

AnimatedHeading.displayName = "AnimatedHeading";

export default memo(AnimatedHeading);
