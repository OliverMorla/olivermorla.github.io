import { type HTMLMotionProps, type CustomValueType } from "motion/react";

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

export const parseProps = <T extends keyof HTMLElementTagNameMap>({
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
    scale: customScale || 0.95,
  };

  return {
    initial: initialProps,
    animate: animateProps,
    transition: transitionProps,
    exit: exitProps,
    ...props,
  };
};

export const parseInViewProps = <T extends keyof HTMLElementTagNameMap>({
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
