import { cache } from "react";

export const blurVariant = cache((delay?: number) => ({
  initial: {
    y: 5,
    opacity: 0,
    filter: "blur(5px)",
  },
  animate: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    y: 5,
    opacity: 0,
    filter: "blur(5px)",
  },
  transition: {
    delay: delay ?? 0,
  },
}));

export const blurInViewVariant = cache((delay?: number, once?: boolean) => ({
  initial: {
    y: 5,
    opacity: 0,
    filter: "blur(5px)",
  },
  whileInView: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    y: 5,
    opacity: 0,
    filter: "blur(5px)",
  },
  transition: {
    delay: delay ?? 0,
  },
  viewport: {
    once: once ?? true,
  },
}));

export const simpleBlurVariant = cache((delay?: number) => ({
  initial: {
    opacity: 0,
    filter: "blur(5px)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    filter: "blur(5px)",
  },
  transition: {
    delay: delay,
  },
}));
