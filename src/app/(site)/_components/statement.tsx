"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

/**
 * A sentence that fills in word by word as it scrolls up through the
 * viewport. Scroll position drives it directly, so scrolling back un-reads
 * it. The full text is always in the DOM for screen readers, and reduced
 * motion shows it fully inked (see `.statement-word` in site.css).
 */
export default function Statement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className="type-statement max-w-[22ch] text-ink">
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);

  return (
    <>
      <motion.span className="statement-word" style={{ opacity }}>
        {children}
      </motion.span>{" "}
    </>
  );
}
