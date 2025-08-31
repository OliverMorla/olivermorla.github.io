"use client";

import { cn } from "@/utils/classNames";
import { useEffect, useMemo, useRef, useState, CSSProperties } from "react";

interface TypewriterProps extends React.ComponentPropsWithRef<"span"> {
  text: string | string[];
  typeDurationMs?: number;
  eraseDurationMs?: number;
  pauseAfterTypeMs?: number;
  loop?: boolean;
  animationDelayMs?: number;
}

const Typewriter = ({
  text,
  typeDurationMs = 2000,
  eraseDurationMs = 2000,
  pauseAfterTypeMs = 2000,
  animationDelayMs = 0,
  loop = Array.isArray(text),
  style,
  className,
  ...props
}: TypewriterProps) => {
  const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const textsKey = useMemo(() => texts.join("|"), [texts]);

  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setIndex(0);
    setKey((k) => k + 1);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [textsKey]);

  useEffect(() => {
    if (texts.length <= 1 && !loop) return;
    if (!loop && index === texts.length - 1) return;

    const cycleMs = typeDurationMs + pauseAfterTypeMs + eraseDurationMs;
    const startDelayThisCycle = index === 0 ? animationDelayMs : 0;

    timerRef.current = window.setTimeout(() => {
      setIndex((prev) => {
        const next = loop
          ? (prev + 1) % texts.length
          : Math.min(prev + 1, texts.length - 1);
        setKey((k) => k + 1);
        return next;
      });
    }, cycleMs + startDelayThisCycle);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [
    index,
    texts,
    loop,
    typeDurationMs,
    eraseDurationMs,
    pauseAfterTypeMs,
    animationDelayMs,
  ]);

  const displayText = texts[index];

  return (
    <div className="typewriter-wrapper leading-0">
      <span
        {...props}
        key={key}
        className={cn("typewriter leading-none", className)}
        aria-live="off"
        style={
          {
            "--characters": displayText.length,
            "--type-duration": `${typeDurationMs}ms`,
            "--erase-duration": `${eraseDurationMs}ms`,
            "--pause-after-type": `${pauseAfterTypeMs}ms`,
            "--animation-start-delay": `${index === 0 ? animationDelayMs : 0}ms`,
          } as CSSProperties
        }
      >
        {displayText}
      </span>
    </div>
  );
};

export default Typewriter;
