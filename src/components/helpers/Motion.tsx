"use client";

import React from "react";
import { motion } from "motion/react";
import {
  MotionInViewProps,
  MotionProps,
  parseInViewProps,
  parseProps,
} from "@/config/motion/utils";

// // You could also create a generic component factory
// const createMotionComponent = <T extends keyof HTMLElementTagNameMap>(
//   Component: keyof typeof motion
// ) => {
//   const MotionComponent: React.FC<MotionProps<T>> = (props) => {
//     const parsedProps = parseProps<T>(props);
//     // @ts-expect-error - motion components are valid
//     return createElement(motion[Component], parsedProps);
//   };
//   return MotionComponent;
// };

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

// export const MotionInViewDiv: React.FC<MotionInViewProps<"div">> = (props) => {
//   const parsedProps = parseInViewProps<"div">(props);
//   return <motion.div {...parsedProps} />;
// };

export const MotionInViewDiv = React.memo<MotionInViewProps<"div">>(
  function MotionInViewDiv(props) {
    const parsedProps = parseInViewProps<"div">(props);
    return <motion.div {...parsedProps} />;
  }
);

// export const MotionInViewH1: React.FC<MotionInViewProps<"h1">> = (props) => {
//   const parsedProps = parseInViewProps<"h1">(props);
//   return <motion.h1 {...parsedProps} />;
// };

export const MotionInViewH1 = React.memo<MotionInViewProps<"h1">>(
  function MotionInViewH1(props) {
    const parsedProps = parseInViewProps<"h1">(props);
    return <motion.h1 {...parsedProps} />;
  }
);

export const MotionInViewH2 = React.memo<MotionInViewProps<"h2">>(
  function MotionInViewH2(props) {
    const parsedProps = parseInViewProps<"h2">(props);
    return <motion.h2 {...parsedProps} />;
  }
);

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

// export const MotionInViewText: React.FC<MotionInViewProps<"p">> = (props) => {
//   const parsedProps = parseInViewProps<"p">(props);
//   return <motion.p {...parsedProps} />;
// };

export const MotionInViewText = React.memo<MotionInViewProps<"p">>(
  function MotionInViewText(props) {
    const parsedProps = parseInViewProps<"p">(props);
    return <motion.p {...parsedProps} />;
  }
);

export const MotionInViewSpan: React.FC<MotionInViewProps<"span">> = (
  props
) => {
  const parsedProps = parseInViewProps<"span">(props);
  return <motion.span {...parsedProps} />;
};
