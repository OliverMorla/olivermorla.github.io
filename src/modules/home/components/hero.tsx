import CTAButtons from "@/modules/app/components/cta-buttons";
import ParallaxText from "@/modules/app/components/parallel-text";
import Particles from "@/modules/app/components/particles";
import Typewriter from "@/modules/app/components/typewriter";
import { pages } from "@/modules/app/lib/constants";
import Image from "next/image";
import type { CSSProperties } from "react";

const roles = ["Software Developer", "Web Developer", "Mobile Developer"];

// Staggers the CSS load sequence (see `.load-up` in global.css).
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const Hero = () => (
  <section
    id="home"
    className="bg-gradient-none-inverted relative flex min-h-svh w-full flex-col justify-center overflow-hidden px-4 pt-28 pb-32 sm:px-8"
  >
    <Particles />

    <div className="relative container mx-auto flex flex-col-reverse items-center justify-between gap-12 md:flex-row">
      <div className="flex w-full max-w-2xl flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="load-up flex items-center gap-2" style={delay(100)}>
            <span aria-hidden className="text-gradient-normal">
              ——
            </span>
            {pages.home.tagline}
          </p>
          <h1
            className="load-up flex flex-wrap items-baseline gap-x-2 gap-y-1 text-2xl sm:text-3xl lg:text-4xl"
            style={delay(180)}
          >
            <span className="font-light">{pages.home.byline}</span>
            <Typewriter
              words={roles}
              animationDelayMs={900}
              className="text-gradient-normal font-bold"
            />
          </h1>
        </div>

        <p
          className="load-up text-muted max-w-xl text-pretty"
          style={delay(260)}
        >
          {pages.home.description}
        </p>

        <dl
          className="load-up grid grid-cols-2 gap-4 sm:grid-cols-4"
          style={delay(340)}
        >
          {pages.home.stats.map((stat) => (
            <div key={stat.title} className="flex flex-col-reverse">
              <dt className="text-muted text-xs font-light sm:text-sm">
                {stat.title}
              </dt>
              <dd className="text-lg font-bold tabular-nums sm:text-xl">
                {stat.value}
                {stat.title !== "Age" && "+"}
              </dd>
            </div>
          ))}
        </dl>

        <div className="load-up" style={delay(420)}>
          <CTAButtons className="max-w-md" />
        </div>
      </div>

      {/* The portrait is the LCP element: preloaded and never faded in. */}
      <div className="image-morph relative w-full max-w-xs sm:max-w-sm md:max-w-md">
        <Image
          src="/assets/media/portrait_1.webp"
          preload
          width={1792}
          height={2304}
          sizes="(min-width: 768px) 448px, (min-width: 640px) 384px, 320px"
          alt="Portrait of Oliver Morla"
          className="h-auto w-full object-cover grayscale"
        />
      </div>
    </div>

    <div className="absolute bottom-0 left-0 w-full">
      <ParallaxText>
        Web Development. Mobile Development. UI/UX Web Design.
      </ParallaxText>
    </div>
  </section>
);

export default Hero;
