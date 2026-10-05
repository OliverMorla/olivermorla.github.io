"use client";

import { animate, cubicBezier, stagger } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { introHoldMs } from "./live-hero/motion";

// animate-text "soft-blur-in" (per character), at the catalog's website
// timing: durations and stagger ×0.72, vertical travel ×0.58. The hold is
// longer than the catalog's 550ms demo so a hero word can actually be read.
const ENTER = {
  duration: 0.648,
  stagger: 0.018,
  ease: cubicBezier(0.22, 1, 0.36, 1),
};
const EXIT = {
  duration: 0.432,
  stagger: 0.011,
  ease: cubicBezier(0.64, 0, 0.78, 0),
};
const TRAVEL = 16 * 0.58;
const BLUR = 12;
const GAP_MS = 320;

const frame = (opacity: number, y: number, blur: number) => ({
  opacity,
  transform: `translate3d(0, ${y}px, 0)`,
  filter: `blur(${blur}px)`,
});
const HIDDEN_BELOW = frame(0, TRAVEL, BLUR);
const SHOWN = frame(1, 0, 0);
const HIDDEN_ABOVE = frame(0, -TRAVEL, BLUR);

// One inline-block span per character, spaces included, as the recipe asks.
function split(word: string) {
  return Array.from(word).map((char) => {
    const unit = document.createElement("span");
    unit.textContent = char;
    unit.style.cssText =
      "display:inline-block;white-space:pre;will-change:transform,opacity,filter;backface-visibility:hidden;transform-origin:50% 55%";
    Object.assign(unit.style, HIDDEN_BELOW);
    return unit;
  });
}

function play(
  units: HTMLElement[],
  from: ReturnType<typeof frame>,
  to: ReturnType<typeof frame>,
  timing: typeof ENTER,
) {
  return animate(
    units,
    {
      opacity: [from.opacity, to.opacity],
      transform: [from.transform, to.transform],
      filter: [from.filter, to.filter],
    },
    {
      duration: timing.duration,
      ease: timing.ease,
      delay: stagger(timing.stagger),
    },
  );
}

/**
 * Cycles `words` in a pill that resizes to fit each one. Every letter
 * soft-blurs in, holds, then blurs out before the next word enters. The
 * first word is in the server markup, and with reduced motion it simply
 * stays there.
 */
export default function WordSwap({
  words,
  holdMs = 2400,
  startDelayMs = 0,
}: {
  words: string[];
  holdMs?: number;
  startDelayMs?: number;
}) {
  const stageRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const measurer = measureRef.current;
    if (!stage || !measurer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let alive = true;
    let controls: ReturnType<typeof play> | undefined;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    // Split letters lose kerning, so measure the split version.
    const fit = (word: string) => {
      measurer.replaceChildren(...split(word));
      stage.style.width = `${measurer.getBoundingClientRect().width}px`;
    };

    (async () => {
      let index = 0;
      let units = split(words[0]!);
      fit(words[0]!);
      stage.replaceChildren(...units);

      await sleep(introHoldMs() + startDelayMs);
      if (!alive) return;
      await (controls = play(units, HIDDEN_BELOW, SHOWN, ENTER));

      while (alive) {
        await sleep(holdMs);
        if (!alive) return;
        await (controls = play(units, SHOWN, HIDDEN_ABOVE, EXIT));
        if (!alive) return;

        index = (index + 1) % words.length;
        units = split(words[index]!);
        fit(words[index]!);
        stage.replaceChildren(...units);

        await (controls = play(units, HIDDEN_BELOW, SHOWN, ENTER));
        await sleep(GAP_MS);
      }
    })();

    return () => {
      alive = false;
      controls?.stop();
    };
  }, [words, holdMs, startDelayMs]);

  return (
    <Pill stageRef={stageRef} measureRef={measureRef}>
      {words[0]}
    </Pill>
  );
}

/**
 * The same pill, showing one `word` chosen by the caller. When it changes,
 * the old word blurs out and the new one blurs in; a change mid-animation
 * cuts straight to the newest word. Reduced motion swaps it instantly.
 */
export function SwapTo({ word }: { word: string }) {
  const stageRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const unitsRef = useRef<HTMLElement[] | null>(null);
  const shownRef = useRef(word);
  // React renders only the first word; the effect owns the text after that.
  const [first] = useState(word);

  useEffect(() => {
    const stage = stageRef.current;
    const measurer = measureRef.current;
    if (!stage || !measurer || word === shownRef.current) return;
    shownRef.current = word;

    // Measured split, since split letters lose kerning, then cleared so the
    // heading's text holds only the word once.
    const fit = (next: string) => {
      measurer.replaceChildren(...split(next));
      stage.style.width = `${measurer.getBoundingClientRect().width}px`;
      measurer.replaceChildren();
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fit(word);
      stage.textContent = word;
      return;
    }

    let alive = true;
    let controls: ReturnType<typeof play> | undefined;
    (async () => {
      // The server-rendered word isn't split yet; split it in place first.
      const current =
        unitsRef.current ?? split(stage.textContent ?? "").map(showUnit);
      if (!unitsRef.current) stage.replaceChildren(...current);
      await (controls = play(current, SHOWN, HIDDEN_ABOVE, EXIT));
      if (!alive) return;

      const units = split(word);
      unitsRef.current = units;
      fit(word);
      stage.replaceChildren(...units);
      await (controls = play(units, HIDDEN_BELOW, SHOWN, ENTER));
    })();

    return () => {
      alive = false;
      controls?.stop();
    };
  }, [word]);

  return (
    <Pill stageRef={stageRef} measureRef={measureRef}>
      {first}
    </Pill>
  );
}

const showUnit = (unit: HTMLElement) => {
  Object.assign(unit.style, SHOWN);
  return unit;
};

function Pill({
  stageRef,
  measureRef,
  children,
}: {
  stageRef: React.RefObject<HTMLSpanElement | null>;
  measureRef: React.RefObject<HTMLSpanElement | null>;
  children: React.ReactNode;
}) {
  return (
    <span className="relative inline-block rounded-[0.22em] bg-gradient-to-r from-indigo-500 to-violet-500 px-[0.24em] pb-[0.05em] text-white shadow-[0_18px_44px_-20px_rgb(124_58_237/0.85),inset_0_1px_0_rgb(255_255_255/0.25)]">
      <span
        ref={stageRef}
        className="inline-block whitespace-pre transition-[width] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        {children}
      </span>
      <span
        ref={measureRef}
        aria-hidden="true"
        className="invisible absolute top-0 left-0 whitespace-pre"
      />
    </span>
  );
}
