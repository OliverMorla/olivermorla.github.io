"use client";

import * as motion from "motion/react-m";
import { ComponentProps, FC } from "react";
import { type HTMLMotionProps } from "motion/react";

export type TransformProps = string | number;

export type CustomMotionProps = {
  x?: TransformProps;
  y?: TransformProps;
  opacity?: TransformProps;
  scale?: TransformProps;
  rotate?: TransformProps;
  delay?: number;
  type?: "spring" | "tween";
  once?: boolean;
  readonly className?: string;
  readonly children?: React.ReactNode;
};

type MotionComponentKeys = keyof typeof motion;

export type MotionProps<
  T extends MotionComponentKeys,
  K extends keyof HTMLElementTagNameMap = "div",
> = HTMLMotionProps<K> & CustomMotionProps & ComponentProps<(typeof motion)[T]>;

const spring = {
  damping: 10,
  stiffness: 100,
  duration: 0.3,
};

const parseProps = <
  T extends MotionComponentKeys,
  K extends keyof HTMLElementTagNameMap,
>({
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
  viewport,
  once,
  className,
  children,
  ...props
}: MotionProps<T, K>) => {
  const initialProps = initial || {
    x: x || 0,
    y: y || 0,
    rotate: 0,
    opacity: opacity || 0,
    scale: scale || 0.95,
  };

  const animateProps = animate || {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: rotate || 0,
    scale: scale || 1,
  };

  const transitionProps = transition || {
    delay: delay || 0,
    type: type || "spring",
    ...spring,
  };

  const exitProps = exit || {
    opacity: 0,
    scale: scale || 0.95,
  };

  const viewportProps = viewport || {
    once: once || false,
  };

  return {
    initial: initialProps,
    animate: animateProps,
    transition: transitionProps,
    exit: exitProps,
    viewport: viewportProps,
    className,
    children,
    ...props,
  };
};

const parseInViewProps = <
  T extends MotionComponentKeys,
  K extends keyof HTMLElementTagNameMap,
>({
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
  viewport,
  once,
  className,
  children,
  ...props
}: MotionProps<T, K>) => {
  const initialProps = initial || {
    x: x || 0,
    y: y || 0,
    rotate: 0,
    opacity: opacity || 0,
    scale: scale || 0.95,
  };

  const whileInViewProps = animate || {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: rotate || 0,
    scale: scale || 1,
  };

  const transitionProps = transition || {
    delay: delay || 0,
    type: type || "spring",
    ...spring,
  };

  const exitProps = exit || {
    opacity: 0,
    scale: 0.95,
  };

  const viewportProps = viewport || {
    once: once || false,
  };

  return {
    initial: initialProps,
    whileInView: whileInViewProps,
    transition: transitionProps,
    exit: exitProps,
    viewport: viewportProps,
    className,
    children,
    ...props,
  };
};

export const MotionDiv: FC<MotionProps<"div", "div">> = ({ ...rest }) => {
  const props = parseProps<"div", "div">(rest);
  return <motion.div {...props} />;
};

export const MotionAside: FC<MotionProps<"aside", "aside">> = ({ ...rest }) => {
  const props = parseProps<"aside", "aside">(rest);
  return <motion.aside {...props} />;
};

export const MotionIframe: FC<MotionProps<"iframe", "iframe">> = ({
  ...rest
}) => {
  const props = parseProps<"iframe", "iframe">(rest);
  return <motion.iframe {...props} />;
};

export const MotionImg: FC<MotionProps<"img", "img">> = ({ ...rest }) => {
  const props = parseProps<"img", "img">(rest);
  return <motion.img {...props} />;
};

export const MotionLi: FC<MotionProps<"li", "li">> = ({ ...rest }) => {
  const props = parseProps<"li", "li">(rest);
  return <motion.li {...props} />;
};

export const MotionInViewImg: FC<MotionProps<"img", "img">> = ({ ...rest }) => {
  const props = parseInViewProps<"img", "img">(rest);
  return <motion.img {...props} />;
};

export const MotionButton: FC<MotionProps<"button", "button">> = ({
  ...rest
}) => {
  const props = parseProps<"button", "button">(rest);
  return <motion.button {...props} />;
};

export const MotionInViewButton: FC<MotionProps<"button", "button">> = ({
  ...rest
}) => {
  const props = parseInViewProps<"button", "button">(rest);
  return <motion.button {...props} />;
};

export const MotionHeader: FC<MotionProps<"header", "header">> = ({
  ...rest
}) => {
  const props = parseProps<"header", "header">(rest);
  return <motion.header {...props} />;
};

export const MotionSection: FC<MotionProps<"section", "section">> = ({
  ...rest
}) => {
  const props = parseProps<"section", "section">(rest);
  return <motion.section {...props} />;
};

export const MotionMain: FC<MotionProps<"main", "main">> = ({ ...rest }) => {
  const props = parseProps<"main", "main">(rest);
  return <motion.main {...props} />;
};

export const MotionNav: FC<MotionProps<"nav", "nav">> = ({ ...rest }) => {
  const props = parseProps<"nav", "nav">(rest);
  return <motion.nav {...props} />;
};

export const MotionVideo: FC<MotionProps<"video", "video">> = ({ ...rest }) => {
  const props = parseProps<"video", "video">(rest);
  return <motion.video {...props} />;
};

export const MotionH1: FC<MotionProps<"h1", "h1">> = ({ ...rest }) => {
  const props = parseProps<"h1", "h1">(rest);
  return <motion.h1 {...props} />;
};

export const MotionH2: FC<MotionProps<"h2", "h2">> = ({ ...rest }) => {
  const props = parseProps<"h2", "h2">(rest);
  return <motion.h2 {...props} />;
};

export const MotionH3: FC<MotionProps<"h3", "h3">> = ({ ...rest }) => {
  const props = parseProps<"h3", "h3">(rest);
  return <motion.h3 {...props} />;
};

export const MotionH4: FC<MotionProps<"h4", "h4">> = ({ ...rest }) => {
  const props = parseProps<"h4", "h4">(rest);
  return <motion.h4 {...props} />;
};

export const MotionText: FC<MotionProps<"p", "p">> = ({ ...rest }) => {
  const props = parseProps<"p", "p">(rest);
  return <motion.p {...props} />;
};

export const MotionSpan: FC<MotionProps<"span", "span">> = ({ ...rest }) => {
  const props = parseProps<"span", "span">(rest);
  return <motion.span {...props} />;
};

export const MotionForm: FC<MotionProps<"form", "form">> = ({ ...rest }) => {
  const props = parseProps<"form", "form">(rest);
  return <motion.form {...props} />;
};

export const MotionInViewDiv: FC<MotionProps<"div", "div">> = ({ ...rest }) => {
  const props = parseInViewProps<"div", "div">(rest);
  return <motion.div {...props} />;
};

export const MotionInViewHeader: FC<MotionProps<"header", "header">> = (
  rest
) => {
  const props = parseInViewProps<"header", "header">(rest);
  return <motion.header {...props} />;
};

export const MotionInViewSection: FC<MotionProps<"section", "section">> = (
  rest
) => {
  const props = parseInViewProps<"section", "section">(rest);
  return <motion.section {...props} />;
};

export const MotionInViewMain: FC<MotionProps<"main", "main">> = (rest) => {
  const props = parseInViewProps<"main", "main">(rest);
  return <motion.main {...props} />;
};

export const MotionInViewNav: FC<MotionProps<"nav", "nav">> = (rest) => {
  const props = parseInViewProps<"nav", "nav">(rest);
  return <motion.nav {...props} />;
};

export const MotionInViewVideo: FC<MotionProps<"video", "video">> = (rest) => {
  const props = parseInViewProps<"video", "video">(rest);
  return <motion.video {...props} />;
};

export const MotionInViewH1: FC<MotionProps<"h1", "h1">> = (rest) => {
  const props = parseInViewProps<"h1", "h1">(rest);
  return <motion.h1 {...props} />;
};

export const MotionInViewH2: FC<MotionProps<"h2", "h2">> = (rest) => {
  const props = parseInViewProps<"h2", "h2">(rest);
  return <motion.h2 {...props} />;
};

export const MotionInViewText: FC<MotionProps<"p", "p">> = (rest) => {
  const props = parseInViewProps<"p", "p">(rest);
  return <motion.p {...props} />;
};

export const MotionInViewLi: FC<MotionProps<"li", "li">> = (rest) => {
  const props = parseInViewProps<"li", "li">(rest);
  return <motion.li {...props} />;
};
