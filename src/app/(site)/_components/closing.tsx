import { links } from "../_lib/content";
import Globe from "./globe";

// Bookends the hero: the same midnight panel and globe, now a horizon.
export default function Closing() {
  return (
    <section
      id="contact"
      data-night
      className="panel on-night relative isolate overflow-clip bg-night text-paper"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_50%_100%,#1b3470_0%,rgb(27_52_112/0)_75%)]"
      />

      <div className="wrap relative z-10 flex flex-col items-center pt-28 pb-[min(52vw,22rem)] text-center md:pt-36">
        <h2 className="type-h2 max-w-[14ch] text-[clamp(2.5rem,1.4rem+4vw,4.75rem)]">
          Have something to build?
        </h2>
        <p className="type-lede mt-5 max-w-[28rem] text-ice-soft">
          Book a free 15-minute call and tell me about it. Prefer email? That
          works too.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={links.schedule}
            className="btn h-12 bg-paper px-6 text-[0.9375rem] text-night hover:bg-ice"
          >
            Book a 15-min call
          </a>
          <a
            href={links.email}
            className="btn glass glass-night h-12 px-6 text-[0.9375rem] text-paper hover:bg-white/15"
          >
            Email me
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute top-[calc(100%-min(48vw,20rem))] left-1/2 aspect-square w-[max(130vw,40rem)] -translate-x-1/2 md:w-[min(110vw,72rem)]"
      >
        <Globe phi={4.4} theta={0.18} />
      </div>
    </section>
  );
}
