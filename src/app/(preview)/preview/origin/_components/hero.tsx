import ParallaxText from "@/modules/app/components/parallel-text";
import Typewriter from "@/modules/app/components/typewriter";
import { Send } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { links, marquee, roles } from "../_lib/content";

// Staggers the CSS load sequence (see `.rise` in origin.css).
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The live site's hero, rebuilt as an inset card: the same greeting and
 * typewriter on the left, and the portrait standing in front of the old
 * morphing frame, now lit, with the scroll band running behind him.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="hero-card flex flex-col"
      aria-label="Introduction"
    >
      <div aria-hidden className="grid-lines" />

      {/* Behind the portrait, in front of the grid. */}
      <div
        className="hero-band fade-in absolute inset-x-0 bottom-[5%] z-10 lg:bottom-[7%]"
        style={delay(500)}
      >
        <ParallaxText baseVelocity={-1.4}>{marquee}</ParallaxText>
      </div>

      <div className="wrap relative z-30 flex flex-1 flex-col justify-center pt-32 pb-10 md:pt-40 lg:pt-28 lg:pb-[clamp(9rem,16vw,15rem)]">
        <div className="max-w-[min(100%,40rem)] lg:max-w-[min(40rem,50vw)]">
          <p
            className="rise type-eyebrow flex items-center gap-3 text-bone/80"
            style={delay(140)}
          >
            <span aria-hidden className="bg-gradient h-px w-8" />
            Build once. Ship everywhere.
          </p>

          <h1 className="type-hero mt-6">
            <span className="rise block font-light" style={delay(220)}>
              Hi, I&rsquo;m Oliver &mdash;
            </span>
            <span className="rise mt-1 block" style={delay(300)}>
              <Typewriter
                words={roles}
                animationDelayMs={1000}
                className="text-gradient"
              />
            </span>
          </h1>

          <p
            className="rise type-lede mt-7 max-w-[30rem] text-ash"
            style={delay(400)}
          >
            I design, build and launch web and mobile apps for founders and
            small businesses. One senior engineer, start to finish.
          </p>

          <div
            className="rise mt-9 flex flex-wrap items-center gap-3"
            style={delay(480)}
          >
            <a
              href={links.schedule}
              className="btn btn-primary h-12 px-6 text-[0.9375rem]"
            >
              Book a 15-min call
              <Send aria-hidden className="size-4" />
            </a>
            <a
              href="#work"
              className="btn btn-ghost h-12 px-6 text-[0.9375rem]"
            >
              See my work
            </a>
          </div>
        </div>
      </div>

      {/* In flow under the copy on phones and tablets; pinned to the card's
          bottom right on wider screens, its right edge clipped by the card. */}
      <div className="pointer-events-none relative z-20 mx-auto mt-2 w-[min(88%,30rem)] lg:absolute lg:right-[-3%] lg:bottom-0 lg:mx-0 lg:mt-0 lg:w-[min(39vw,35rem)]">
        <div
          aria-hidden
          className="bloom-in absolute inset-x-[10%] top-[12%] bottom-[6%]"
          style={delay(0)}
        >
          <div className="morph morph-glow absolute inset-0" />
          <div className="morph morph-shape absolute inset-[5%]" />
        </div>
        <Image
          src="/assets/media/portrait_1_nobg.webp"
          alt="Portrait of Oliver Morla"
          width={1792}
          height={2304}
          preload
          sizes="(min-width: 1024px) 39vw, (min-width: 640px) 480px, 88vw"
          className="portrait-in portrait-fade relative h-auto w-full contrast-[1.05] grayscale"
          style={delay(180)}
        />
      </div>
    </section>
  );
}
