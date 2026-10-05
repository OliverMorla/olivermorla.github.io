import Image from "next/image";
import Link from "next/link";
import { hero, links } from "../../_lib/content";
import PaperPlane from "../paper-plane";
import WordSwap from "../word-swap";
import { MotionDiv, MotionH1, MotionText } from "./motion";
import ParallaxText from "./parallax-text";
import Particles from "./particles";

/**
 * The live site's hero layout (portrait in the morphing frame on the right,
 * particles, the scroll-driven marquee) at its 15px root size (see
 * `.live-hero` in site.css), with a rewritten left side: a headline whose
 * key word soft-blurs between options,
 * one line of copy, two calls to action and a row of client logos. The
 * stats moved to their own band below (see metrics.tsx).
 */
export default function LiveHero() {
  return (
    <section
      id="top"
      // Dark only in dark mode; the nav reads this to pick its style.
      data-night="dark"
      className="live-hero bg-gradient-none-inverted relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-8 py-24 max-sm:px-4"
    >
      <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-12 md:flex-row">
        <div className="flex w-full max-w-2xl flex-col">
          <MotionText
            delay={0.2}
            className="flex items-center gap-3 text-[0.9375rem] text-neutral-600 dark:text-neutral-300"
          >
            <span
              aria-hidden="true"
              className="h-px w-8 bg-gradient-to-r from-indigo-400 to-violet-400"
            />
            {hero.greeting}
          </MotionText>

          <MotionH1
            delay={0.35}
            className="mt-5 text-[clamp(2.25rem,1rem+3.4vw,4.25rem)] leading-[1.1] font-semibold tracking-[-0.04em] text-neutral-900 dark:text-white"
          >
            {/* Screen readers get one steady sentence, not every swap. */}
            <span className="sr-only">
              {hero.lead} {hero.words[0]} {hero.tail}
            </span>
            <span aria-hidden="true">
              <span className="block">{hero.lead}</span>
              {/* The pill resizes in place, so "to life." glides with it. */}
              <span className="block">
                <WordSwap words={hero.words} startDelayMs={550} /> {hero.tail}
              </span>
            </span>
          </MotionH1>

          <MotionText
            delay={0.5}
            className="mt-6 max-w-[31rem] text-[1.0625rem] leading-[1.6] text-neutral-600 dark:text-neutral-400"
          >
            {hero.body}
          </MotionText>

          <MotionDiv delay={0.65} className="mt-9 flex flex-wrap gap-3">
            <Link
              href={links.schedule}
              className="inline-flex h-12 items-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 px-6 text-[0.9375rem] font-semibold text-white shadow-[0_14px_32px_-14px_rgb(129_140_248/0.8)] transition-[transform,background-color] duration-200 ease-out hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98]"
            >
              Book a 15-min call
              <PaperPlane />
            </Link>
            <a
              href="#work"
              className="inline-flex h-12 items-center rounded-full border border-neutral-900/10 bg-white/60 px-6 text-[0.9375rem] font-semibold text-neutral-900 backdrop-blur-md transition-[transform,background-color] duration-200 ease-out hover:bg-white active:scale-[0.98] dark:border-white/12 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              See the work
            </a>
          </MotionDiv>

          <MotionDiv delay={0.8} className="mt-10 flex items-center gap-4">
            <ul className="flex -space-x-2.5">
              {hero.logos.map((logo) => (
                <li key={logo.name}>
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={36}
                    height={36}
                    className="size-9 rounded-full bg-white object-cover ring-2 ring-white dark:ring-black"
                  />
                </li>
              ))}
            </ul>
            <p className="max-w-[16rem] text-[0.875rem] leading-snug text-neutral-600 dark:text-neutral-400">
              {hero.trust}
            </p>
          </MotionDiv>
        </div>

        <MotionDiv
          delay={1.2}
          className="image-morph relative h-full w-full max-w-md"
        >
          <Image
            src="/assets/media/portrait_1.webp"
            preload
            width={1792}
            height={2304}
            sizes="(max-width: 768px) 100vw, 448px"
            alt="Portrait of Oliver Morla"
            className="object-cover grayscale"
          />
        </MotionDiv>
      </div>

      <MotionDiv delay={1.4} className="absolute bottom-0 left-0 w-full">
        <ParallaxText baseVelocity={-2}>{hero.marquee}</ParallaxText>
      </MotionDiv>

      <Particles />
    </section>
  );
}
