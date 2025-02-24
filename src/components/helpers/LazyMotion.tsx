/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";
import * as m from "motion/react-m";
import {
  type CustomValueType,
  type MotionProps,
  FeatureBundle,
  LazyMotion as LM,
  LazyProps,
  domAnimation,
} from "motion/react";
import { cn } from "@/utils";

const spring = {
  damping: 10,
  stiffness: 100,
  duration: 0.3,
};

type MotionComponentProps = {
  readonly x?: string | number | CustomValueType;
  readonly y?: string | number | CustomValueType;
  readonly scale?: string | number | CustomValueType | boolean;
  readonly rotate?: string | number | CustomValueType;
  readonly type?: "spring" | "tween";
  readonly delay?: number;
  readonly initial?: MotionProps["initial"];
  readonly animate?: MotionProps["animate"];
  readonly transition?: MotionProps["transition"];
  readonly exit?: MotionProps["exit"];
};

type MotionInViewComponentProps = {
  readonly x?: string | number | CustomValueType;
  readonly y?: string | number | CustomValueType;
  readonly scale?: string | number | CustomValueType | boolean;
  readonly rotate?: string | number | CustomValueType;
  readonly type?: "spring" | "tween";
  readonly delay?: number;
  readonly initial?: MotionProps["initial"];
  readonly whileInView?: MotionProps["whileInView"];
  readonly transition?: MotionProps["transition"];
  readonly exit?: MotionProps["exit"];
  readonly viewport?: MotionProps["viewport"];
  readonly once?: boolean;
};

type MotionComponent<T> = FC<
  MotionProps & React.HTMLAttributes<T> & MotionComponentProps
>;

type MotionInViewComponent<T> = FC<
  MotionProps & React.HTMLAttributes<T> & MotionInViewComponentProps
>;

const useMotion = ({
  x,
  y,
  rotate,
  scale,
  type,
  delay,
  whileInView,
  initial,
  animate,
  once,
  viewport,
  transition,
  exit,
}: MotionComponentProps & MotionInViewComponentProps) => {
  const customScale =
    scale === 1 || scale === "false" || scale === false || scale === true
      ? 1
      : scale;
  const initialProps = initial || {
    x: x || 0,
    y: y || 0,
    rotate: 0,
    opacity: 0,
    scale: customScale || 0.95,
  };

  const animateProps = animate || {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: rotate || 0,
    scale: customScale || 1,
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
    initialProps,
    animateProps,
    viewportProps,
    whileInViewProps,
    transitionProps,
    exitProps,
  };
};

type LazyMotionProps = Omit<LazyProps, "features"> & {
  readonly children: React.ReactNode;
  readonly features?: FeatureBundle;
};

export const LazyMotion: FC<LazyMotionProps> = ({
  children,
  features,
  ...props
}) => (
  <LM features={domAnimation} {...props}>
    {children}
  </LM>
);

export const MotionDiv: MotionComponent<HTMLDivElement> = ({
  children,
  initial,
  animate,
  exit,
  transition,
  x,
  y,
  rotate,
  type,
  delay,
  scale,
  onClick,
  className,
}) => {
  const { initialProps, animateProps, transitionProps, exitProps } = useMotion({
    x,
    y,
    type,
    delay,
    scale,
    rotate,
    initial,
    animate,
    transition,
    exit,
  });

  return (
    <m.div
      onClick={onClick}
      initial={initialProps}
      animate={animateProps}
      transition={transitionProps}
      exit={exitProps}
      className={cn(className)}
    >
      {children}
    </m.div>
  );
};

export const MotionHeader: MotionComponent<HTMLDivElement> = ({
  children,
  initial,
  animate,
  exit,
  transition,
  x,
  y,
  rotate,
  type,
  delay,
  scale,
  onClick,
  className,
}) => {
  const { initialProps, animateProps, transitionProps, exitProps } = useMotion({
    x,
    y,
    type,
    delay,
    scale,
    rotate,
    initial,
    animate,
    transition,
    exit,
  });

  return (
    <m.header
      onClick={onClick}
      initial={initialProps}
      animate={animateProps}
      transition={transitionProps}
      exit={exitProps}
      className={cn(className)}
    >
      {children}
    </m.header>
  );
};

export const MotionSpan: MotionComponent<HTMLSpanElement> = ({
  children,
  onClick,
  initial,
  animate,
  transition,
  x,
  y,
  type,
  delay,
  scale,
  className,
}) => {
  const { initialProps, animateProps, transitionProps } = useMotion({
    x,
    y,
    type,
    delay,
    scale,
    initial,
    animate,
    transition,
  });

  return (
    <m.span
      onClick={onClick}
      initial={initialProps}
      animate={animateProps}
      transition={transitionProps}
      className={cn(className)}
    >
      {children}
    </m.span>
  );
};

export const MotionText: MotionComponent<HTMLParagraphElement> = ({
  children,
  onClick,
  initial,
  animate,
  transition,
  x,
  y,
  type,
  delay,
  scale,
  className,
}) => {
  const { initialProps, animateProps, transitionProps } = useMotion({
    x,
    y,
    type,
    delay,
    scale,
    initial,
    animate,
    transition,
  });

  return (
    <m.p
      onClick={onClick}
      initial={initialProps}
      animate={animateProps}
      transition={transitionProps}
      className={cn(className)}
    >
      {children}
    </m.p>
  );
};

export const MotionH1: MotionComponent<HTMLHeadingElement> = ({
  children,
  className,
  initial,
  animate,
  transition,
  x,
  y,
  type,
  delay,
  scale,
  onClick,
}) => {
  const { initialProps, animateProps, transitionProps } = useMotion({
    x,
    y,
    type,
    delay,
    scale,
    initial,
    animate,
    transition,
  });

  return (
    <m.h1
      onClick={onClick}
      initial={initialProps}
      animate={animateProps}
      transition={transitionProps}
      className={cn(className)}
    >
      {children}
    </m.h1>
  );
};

export const MotionH2: MotionComponent<HTMLHeadingElement> = ({
  children,
  onClick,
  initial,
  animate,
  transition,
  x,
  y,
  type,
  delay,
  scale,
  className,
}) => {
  const { initialProps, animateProps, transitionProps } = useMotion({
    x,
    y,
    type,
    delay,
    scale,
    initial,
    animate,
    transition,
  });

  return (
    <m.h2
      onClick={onClick}
      initial={initialProps}
      animate={animateProps}
      transition={transitionProps}
      className={cn(className)}
    >
      {children}
    </m.h2>
  );
};

export const MotionSection: MotionComponent<HTMLDivElement> = ({
  children,
  className,
  initial,
  animate,
  transition,
  x,
  y,
  type,
  delay,
  scale,
  onClick,
}) => {
  const { initialProps, animateProps, transitionProps } = useMotion({
    x,
    y,
    type,
    delay,
    scale,
    initial,
    animate,
    transition,
  });

  return (
    <m.section
      onClick={onClick}
      initial={initialProps}
      animate={animateProps}
      transition={transitionProps}
      className={cn(className)}
    >
      {children}
    </m.section>
  );
};

export const MotionMain: MotionComponent<HTMLDivElement> = ({
  children,
  className,
  initial,
  animate,
  exit,
  transition,
  x,
  y,
  type,
  delay,
  scale,
}) => {
  const { initialProps, animateProps, exitProps, transitionProps } = useMotion({
    x,
    y,
    type,
    delay,
    scale,
    initial,
    animate,
    exit,
    transition,
  });


  return (
    <m.main
      className={cn(className)}
      initial={initialProps}
      animate={animateProps}
      exit={exitProps}
      transition={transitionProps}
    >
      {children}

    </m.main>
  );
};

export const MotionInViewDiv: MotionInViewComponent<HTMLDivElement> = ({
  children,
  className,
  initial,
  animate,
  viewport,
  transition,
  x,
  y,
  type,
  delay,
  scale,
  once,
}) => {
  const { initialProps, whileInViewProps, transitionProps, viewportProps } =
    useMotion({
      x,
      y,
      type,
      delay,
      scale,
      initial,
      animate,
      transition,
      viewport,
      once,
    });

  return (
    <m.div
      className={cn(className)}
      initial={initialProps}
      whileInView={whileInViewProps}
      transition={transitionProps}
      viewport={viewportProps}
    >
      {children}
    </m.div>
  );
};

export const MotionInViewText: MotionInViewComponent<HTMLParagraphElement> = ({
  children,
  className,
  initial,
  animate,
  viewport,
  transition,
  x,
  y,
  once,
  type,
  delay,
  scale,
}) => {
  const { initialProps, whileInViewProps, transitionProps, viewportProps } =
    useMotion({
      x,
      y,
      type,
      once,
      delay,
      scale,
      viewport,
      initial,
      animate,
      transition,
    });

  return (
    <m.p
      className={cn(className)}
      initial={initialProps}
      whileInView={whileInViewProps}
      transition={transitionProps}
      viewport={viewportProps}
    >
      {children}
    </m.p>
  );
};

export const MotionInViewSection: MotionInViewComponent<HTMLDivElement> = ({
  children,
  className,
  initial,
  animate,
  viewport,
  transition,
  x,
  y,
  type,
  delay,
  scale,
  once,
}) => {
  const { initialProps, whileInViewProps, transitionProps, viewportProps } =
    useMotion({
      x,
      y,
      type,
      delay,
      scale,
      initial,
      once,
      animate,
      transition,
      viewport,
    });

  return (
    <m.section
      className={cn(className)}
      initial={initialProps}
      whileInView={whileInViewProps}
      transition={transitionProps}
      viewport={viewportProps}
    >
      {children}
    </m.section>
  );
};
