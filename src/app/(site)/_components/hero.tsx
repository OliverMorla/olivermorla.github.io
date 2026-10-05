import Image from "next/image";
import { clients, links } from "../_lib/content";
import Globe from "./globe";
import NewYorkTime from "./new-york-time";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSVars;

export default function Hero() {
  return (
    <section
      id="top"
      data-night
      className="panel on-night relative isolate flex flex-col overflow-clip bg-night text-paper lg:block lg:min-h-[max(42rem,calc(100svh-var(--gutter)*2))]"
    >
      {/* Light falling on the globe from the upper left. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_78%_58%,#1b3470_0%,rgb(27_52_112/0)_70%),radial-gradient(40%_50%_at_10%_100%,#122a5c_0%,rgb(18_42_92/0)_70%)]"
      />

      <div className="wrap relative z-10 pt-28 sm:pt-36 lg:absolute lg:inset-x-0 lg:bottom-0 lg:pt-0 lg:pb-32">
        <h1 className="type-display max-w-[12ch] lg:max-w-[11.5ch]">
          <span className="line-mask" style={delay(0)}>
            <span className="text-balance">You bring the idea.</span>
          </span>
          <span className="line-mask" style={delay(90)}>
            <span className="text-balance">I ship the product.</span>
          </span>
        </h1>

        <p
          className="hero-in type-lede mt-5 max-w-[29rem] text-ice-soft max-sm:text-[1.0625rem] sm:mt-6"
          style={delay(260)}
        >
          Senior full&#8209;stack developer in New York, designing and building
          web and mobile apps for founders and small businesses.
        </p>

        <div
          className="hero-in mt-7 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3"
          style={delay(340)}
        >
          <a
            href={links.schedule}
            className="btn h-11 bg-paper px-5 text-[0.9375rem] text-night hover:bg-ice sm:h-12 sm:px-6"
          >
            Book a 15-min call
          </a>
          <a
            href="#work"
            className="btn glass glass-night h-11 px-5 text-[0.9375rem] text-paper hover:bg-white/15 sm:h-12 sm:px-6"
          >
            See the work
          </a>
        </div>
      </div>

      {/* Portrait in front of a slowly turning globe, New York marked. */}
      <div className="relative mt-4 h-[min(140vw,40rem)] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[56%]">
        <div
          aria-hidden="true"
          className="globe-in absolute top-[2%] left-1/2 aspect-square w-[min(150vw,46rem)] -translate-x-1/2 lg:top-[6%] lg:left-[66%] lg:w-[min(64vw,60rem)]"
        >
          <Globe motion="drift" phi={5.12}>
            {/* On large screens the time rides along with New York. */}
            <div className="hidden lg:block">
              <span className="nyc-pulse" />
              <span className="absolute top-0 right-[5px] h-px w-[10px] bg-ice/45" />
              <TimeChip className="absolute top-0 right-[15px] -translate-y-1/2" />
            </div>
          </Globe>
        </div>

        <div
          className="portrait-in portrait-fade absolute bottom-0 left-1/2 aspect-[1792/2304] h-[94%] -translate-x-1/2 lg:left-[70%] lg:h-[92%]"
          style={delay(80)}
        >
          <Image
            src="/assets/media/portrait_1_nobg.webp"
            alt="Oliver Morla"
            fill
            preload
            sizes="(min-width: 1024px) 44vw, 90vw"
            className="object-contain object-bottom"
          />
        </div>

        <div
          className="hero-in absolute bottom-[5.5rem] left-[clamp(1rem,4vw,2.5rem)] z-10 lg:hidden"
          style={delay(520)}
        >
          <TimeChip />
        </div>
      </div>

      {/* Clients, on a glass band the portrait blurs through. */}
      <div
        className="hero-in glass glass-night absolute inset-x-2 bottom-2 z-20 bg-night/50 rounded-[calc(var(--panel-radius)-0.5rem)] md:inset-x-3 md:bottom-3 md:rounded-[calc(var(--panel-radius)-0.75rem)]"
        style={delay(440)}
      >
        <p className="sr-only">Clients include {clients.join(", ")}.</p>
        <div aria-hidden="true" className="marquee py-4.5">
          <div
            className="marquee-track"
            style={{ "--duration": "70s" } as CSSVars}
          >
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 items-center">
                {clients.map((client) => (
                  <li
                    key={client}
                    className="flex items-center font-display text-[1.0625rem] font-semibold tracking-[-0.02em] whitespace-nowrap text-ice-soft"
                  >
                    {client}
                    <span className="mx-7 size-1 rounded-full bg-ice/35" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimeChip({ className }: { className?: string }) {
  return (
    <div
      className={`glass glass-night flex w-max items-center gap-3 rounded-full py-2 pr-4 pl-2 text-[0.875rem] ${className ?? ""}`}
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-full bg-ice/15"
      >
        <span className="size-2 rounded-full bg-ice shadow-[0_0_0_4px_rgb(201_216_255/0.18)]" />
      </span>
      <span className="leading-tight">
        <span className="block font-semibold text-paper">
          <NewYorkTime />
        </span>
        <span className="block text-ice-soft">in New York</span>
      </span>
    </div>
  );
}
