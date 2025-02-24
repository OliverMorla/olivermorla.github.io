"use client";

import {
  type HTMLMotionProps,
  type CustomValueType,
  motion,
} from "motion/react";
import React, { useMemo } from "react";

type TransformProps = string | number | CustomValueType;
type ScaleProps = TransformProps | boolean;

export type MotionProps<T extends keyof HTMLElementTagNameMap> =
  HTMLMotionProps<T> &
    Readonly<{
      x?: TransformProps;
      y?: TransformProps;
      opacity?: TransformProps;
      scale?: ScaleProps;
      rotate?: TransformProps;
      delay?: number;
      type?: "spring" | "tween";
    }>;

export type MotionInViewProps<T extends keyof HTMLElementTagNameMap> =
  HTMLMotionProps<T> &
    Readonly<{
      x?: TransformProps;
      y?: TransformProps;
      opacity?: TransformProps;
      scale?: ScaleProps;
      rotate?: TransformProps;
      delay?: number;
      type?: "spring" | "tween";
      once?: boolean;
    }>;

const spring = {
  damping: 10,
  stiffness: 100,
  duration: 0.3,
} as const;

const parseProps = <T extends keyof HTMLElementTagNameMap>({
  x,
  y,
  delay,
  opacity,
  scale,
  rotate,
  initial,
  animate,
  transition,
  exit,
  type,
  ...props
}: MotionProps<T>) => {
  const customScale =
    scale === 1 || scale === "false" || scale === false || scale === true
      ? 1
      : scale;

  const initialProps = initial || {
    x: x || 0,
    y: y || 0,
    rotate: 0,
    opacity: opacity || 0,
    scale: customScale || 0.95,
  };

  const animateProps = animate || {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: rotate || 0,
    scale: customScale || 1,
  };

  const transitionProps = transition || {
    delay: delay || 0,
    type: type || "spring",
    ...spring,
  };

  const exitProps = exit || {
    opacity: 0,
    scale: customScale ||0.95,
  };

  return {
    initial: initialProps,
    animate: animateProps,
    transition: transitionProps,
    exit: exitProps,
    ...props,
  };
};

const parseInViewProps = <T extends keyof HTMLElementTagNameMap>({
  x,
  y,
  delay,
  opacity,
  scale,
  rotate,
  initial,
  animate,
  whileInView,
  transition,
  exit,
  type,
  viewport,
  once,
  ...props
}: MotionInViewProps<T>) => {
  const customScale =
    scale === 1 || scale === "false" || scale === false || scale === true
      ? 1
      : scale;

  const initialProps = initial || {
    x: x || 0,
    y: y || 0,
    rotate: 0,
    opacity: opacity || 0,
    scale: customScale || 0.95,
  };

  const whileInViewProps = whileInView || {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: rotate || 0,
    scale: customScale || 1,
  };

  const transitionProps = transition || {
    delay: delay || 0,
    type: type || "spring",

    ...spring,
  };

  const viewportProps = viewport || {
    once: once || false,
  };

  const exitProps = exit || {
    opacity: 0,
    scale: 0.95,
  };

  return {
    initial: initialProps,
    whileInView: whileInViewProps,
    transition: transitionProps,
    viewport: viewportProps,
    exit: exitProps,
    ...props,
  };
};

// You could also create a generic component factory
const createMotionComponent = <T extends keyof HTMLElementTagNameMap>(
  Component: keyof typeof motion
) => {
  const MotionComponent: React.FC<MotionProps<T>> = (props) => {
    const parsedProps = parseProps<T>(props);
    // @ts-expect-error - motion components are valid
    return createElement(motion[Component], parsedProps);
  };
  return MotionComponent;
};

export const MotionDiv = React.memo<MotionProps<"div">>(
  function MotionDiv(props) {
    const parsedProps = parseProps<"div">(props);
    return <motion.div {...parsedProps} />;
  }
);

export const MotionHeader: React.FC<MotionProps<"header">> = (props) => {
  const parsedProps = parseProps<"header">(props);
  return <motion.header {...parsedProps} />;
};

export const MotionSection: React.FC<MotionProps<"section">> = (props) => {
  const parsedProps = parseProps<"section">(props);
  return <motion.section {...parsedProps} />;
};

export const MotionMain: React.FC<MotionProps<"main">> = (props) => {
  const parsedProps = parseProps<"main">(props);
  return <motion.main {...parsedProps} />;
};

export const MotionButton: React.FC<MotionProps<"button">> = (props) => {
  const parsedProps = parseProps<"button">(props);
  return <motion.button {...parsedProps} />;
};

export const MotionH1: React.FC<MotionProps<"h1">> = (props) => {
  const parsedProps = parseProps<"h1">(props);
  return <motion.h1 {...parsedProps} />;
};

export const MotionH2: React.FC<MotionProps<"h1">> = (props) => {
  const parsedProps = parseProps<"h1">(props);
  return <motion.h2 {...parsedProps} />;
};

export const MotionText: React.FC<MotionProps<"p">> = (props) => {
  const parsedProps = parseProps<"p">(props);
  return <motion.p {...parsedProps} />;
};

export const MotionLi: React.FC<MotionProps<"li">> = (props) => {
  const parsedProps = parseProps<"li">(props);
  return <motion.li {...parsedProps} />;
};

export const MotionInViewDiv: React.FC<MotionInViewProps<"div">> = (props) => {
  const parsedProps = parseInViewProps<"div">(props);
  return <motion.div {...parsedProps} />;
};

export const MotionInViewH1: React.FC<MotionInViewProps<"h1">> = (props) => {
  const parsedProps = parseInViewProps<"h1">(props);
  return <motion.h1 {...parsedProps} />;
};

export const MotionInViewH2: React.FC<MotionInViewProps<"h2">> = (props) => {
  const parsedProps = parseInViewProps<"h2">(props);
  return <motion.h2 {...parsedProps} />;
};

export const MotionInViewSection: React.FC<MotionInViewProps<"section">> = (
  props
) => {
  const parsedProps = parseInViewProps<"section">(props);
  return <motion.section {...parsedProps} />;
};

export const MotionInViewHeader: React.FC<MotionInViewProps<"header">> = (
  props
) => {
  const parsedProps = parseInViewProps<"header">(props);
  return <motion.header {...parsedProps} />;
};

export const MotionInViewText: React.FC<MotionInViewProps<"p">> = (props) => {
  const parsedProps = parseInViewProps<"p">(props);
  return <motion.p {...parsedProps} />;
};

export const MotionInViewSpan: React.FC<MotionInViewProps<"span">> = (
  props
) => {
  const parsedProps = parseInViewProps<"span">(props);
  return <motion.span {...parsedProps} />;
};
