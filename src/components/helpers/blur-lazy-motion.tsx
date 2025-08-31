"use client";

import { blurInViewVariant, blurVariant } from "@/lib/motion/utils";
import { HTMLMotionProps, MotionProps } from "framer-motion";
import * as motion from "motion/react-m";
import { memo, useMemo } from "react";

export type BlurLazyMotionProps<T extends keyof HTMLElementTagNameMap> =
  HTMLMotionProps<T> &
    MotionProps &
    Readonly<{
      delay?: number;
      once?: boolean;
    }>;

export const MotionDiv = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"div">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.div {...rest} {...props}>
        {children}
      </motion.div>
    );
  },
);

MotionDiv.displayName = "MotionDiv";

export const MotionAside = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"aside">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.aside {...rest} {...props}>
        {children}
      </motion.aside>
    );
  },
);

MotionAside.displayName = "MotionAside";

export const MotionIframe = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"iframe">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.iframe {...rest} {...props}>
        {children}
      </motion.iframe>
    );
  },
);

MotionIframe.displayName = "MotionIframe";

export const MotionImg = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"img">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.img {...rest} {...props}>
        {children}
      </motion.img>
    );
  },
);

MotionImg.displayName = "MotionImg";

export const MotionLi = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"li">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.li {...rest} {...props}>
        {children}
      </motion.li>
    );
  },
);

MotionLi.displayName = "MotionLi";

export const MotionInViewImg = memo(
  ({ delay, children, once, ...props }: BlurLazyMotionProps<"img">) => {
    const rest = useMemo(() => blurInViewVariant(delay, once), [delay, once]);
    return (
      <motion.img {...rest} {...props}>
        {children}
      </motion.img>
    );
  },
);

MotionInViewImg.displayName = "MotionInViewImg";

export const MotionInViewDiv = memo(
  ({ delay, children, once, ...props }: BlurLazyMotionProps<"div">) => {
    const rest = useMemo(() => blurInViewVariant(delay, once), [delay, once]);
    return (
      <motion.div {...rest} {...props}>
        {children}
      </motion.div>
    );
  },
);

MotionInViewDiv.displayName = "MotionInViewDiv";

export const MotionButton = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"button">) => {
    const rest = useMemo(() => blurInViewVariant(delay), [delay]);
    return (
      <motion.button {...rest} {...props}>
        {children}
      </motion.button>
    );
  },
);

MotionButton.displayName = "MotionButton";

export const MotionHeader = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"header">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.header {...rest} {...props}>
        {children}
      </motion.header>
    );
  },
);

MotionHeader.displayName = "MotionHeader";

export const MotionSection = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"section">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.section {...rest} {...props}>
        {children}
      </motion.section>
    );
  },
);

MotionSection.displayName = "MotionSection";

export const MotionMain = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"main">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.main {...rest} {...props}>
        {children}
      </motion.main>
    );
  },
);

MotionMain.displayName = "MotionMain";

export const MotionNav = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"nav">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.nav {...rest} {...props}>
        {children}
      </motion.nav>
    );
  },
);

MotionNav.displayName = "MotionNav";

export const MotionVideo = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"video">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.video {...rest} {...props}>
        {children}
      </motion.video>
    );
  },
);

MotionVideo.displayName = "MotionVideo";

export const MotionH1 = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"h1">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.h1 {...rest} {...props}>
        {children}
      </motion.h1>
    );
  },
);

MotionH1.displayName = "MotionH1";

export const MotionH2 = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"h2">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.h2 {...rest} {...props}>
        {children}
      </motion.h2>
    );
  },
);

MotionH2.displayName = "MotionH2";

export const MotionH3 = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"h3">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.h3 {...rest} {...props}>
        {children}
      </motion.h3>
    );
  },
);

MotionH3.displayName = "MotionH3";

export const MotionH4 = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"h4">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.h4 {...rest} {...props}>
        {children}
      </motion.h4>
    );
  },
);

MotionH4.displayName = "MotionH4";

export const MotionText = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"p">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.p {...rest} {...props}>
        {children}
      </motion.p>
    );
  },
);

MotionText.displayName = "MotionText";

export const MotionSpan = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"span">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.span {...rest} {...props}>
        {children}
      </motion.span>
    );
  },
);

MotionSpan.displayName = "MotionSpan";

export const MotionForm = memo(
  ({ delay, children, ...props }: BlurLazyMotionProps<"form">) => {
    const rest = useMemo(() => blurVariant(delay), [delay]);
    return (
      <motion.form {...rest} {...props}>
        {children}
      </motion.form>
    );
  },
);

MotionForm.displayName = "MotionForm";
