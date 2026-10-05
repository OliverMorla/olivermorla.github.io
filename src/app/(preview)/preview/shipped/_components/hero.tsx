import Image from "next/image";
import { heroStack, links } from "../_lib/content";
import LaunchStack from "./launch-stack";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-x-clip pt-10 pb-48 md:pt-14 lg:pb-52"
    >
      <div className="wrap grid items-center gap-y-14 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-7 lg:pr-4">
          <h1 className="type-display">
            <span className="line-mask" style={{ "--i": 0 } as CSSVars}>
              <span>Your product,</span>
            </span>
            <span className="line-mask" style={{ "--i": 1 } as CSSVars}>
              <span>live in weeks.</span>
            </span>
          </h1>

          <p
            className="type-lede load-up mt-7 max-w-[29rem] text-ink-soft"
            style={{ "--d": "380ms" } as CSSVars}
          >
            I&rsquo;m Oliver, a senior full&#8209;stack developer in New York. I
            design, build and launch web and mobile apps for startups and small
            businesses.
          </p>

          <div
            className="load-up mt-9 flex flex-wrap gap-3"
            style={{ "--d": "460ms" } as CSSVars}
          >
            <a
              href={links.schedule}
              className="btn h-12 bg-ink px-6 text-[0.9375rem] text-canvas hover:bg-ink-soft"
            >
              Book a 15-min call
            </a>
            <a
              href="#work"
              className="btn h-12 px-6 text-[0.9375rem] text-ink ring-1 ring-line ring-inset hover:bg-paper"
            >
              See the work
            </a>
          </div>

          <p
            className="load-up mt-10 text-[0.875rem] text-slate"
            style={{ "--d": "540ms" } as CSSVars}
          >
            25+ startups and small businesses served since 2020.
          </p>
        </div>

        <div className="relative w-full max-w-[30rem] lg:col-span-5 lg:max-w-none">
          <div
            className="load-settle relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[radial-gradient(120%_80%_at_50%_22%,#fbfbfc_0%,#e9ecf0_48%,#d6dbe2_100%)]"
            style={{ "--d": "120ms" } as CSSVars}
          >
            <div className="absolute top-[9%] right-[-2%] bottom-0 left-[12%]">
              <Image
                src="/assets/media/portrait_1_nobg.webp"
                alt="Oliver Morla"
                fill
                preload
                sizes="(min-width: 1024px) 500px, 92vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div
            className="load-up absolute -bottom-32 inset-x-0 sm:inset-x-[4%] lg:right-[50%] lg:left-[-46%]"
            style={{ "--d": "620ms" } as CSSVars}
          >
            <LaunchStack projects={heroStack} />
          </div>
        </div>
      </div>
    </section>
  );
}
