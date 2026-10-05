"use client";

import { cn } from "@/utils/classNames";
import { useEffect, useState, type CSSProperties } from "react";

type TypewriterProps = {
  words: readonly string[];
  className?: string;
  typeDurationMs?: number;
  eraseDurationMs?: number;
  pauseAfterTypeMs?: number;
  /** Delay before the very first word starts typing. */
  animationDelayMs?: number;
};

/**
 * Types and erases each word with CSS steps() animations. JavaScript only
 * advances the word once per cycle; the first word is in the server HTML.
 */
const Typewriter = ({
  words,
  className,
  typeDurationMs = 2000,
  eraseDurationMs = 2000,
  pauseAfterTypeMs = 2000,
  animationDelayMs = 0,
}: TypewriterProps) => {
  const [index, setIndex] = useState(0);
  const isFirstCycle = index === 0;

  useEffect(() => {
    if (words.length < 2) return;

    const cycleMs =
      typeDurationMs +
      pauseAfterTypeMs +
      eraseDurationMs +
      (isFirstCycle ? animationDelayMs : 0);
    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % words.length),
      cycleMs,
    );

    return () => window.clearTimeout(timer);
  }, [
    index,
    isFirstCycle,
    words.length,
    typeDurationMs,
    eraseDurationMs,
    pauseAfterTypeMs,
    animationDelayMs,
  ]);

  const word = words[index];

  return (
    <span className="typewriter-wrapper leading-none">
      <span
        // A new key restarts the CSS animation for each word.
        key={index}
        className={cn("typewriter leading-none", className)}
        style={
          {
            "--characters": word.length,
            "--type-duration": `${typeDurationMs}ms`,
            "--erase-duration": `${eraseDurationMs}ms`,
            "--pause-after-type": `${pauseAfterTypeMs}ms`,
            "--animation-start-delay": `${isFirstCycle ? animationDelayMs : 0}ms`,
          } as CSSProperties
        }
      >
        {word}
      </span>
    </span>
  );
};

export default Typewriter;
