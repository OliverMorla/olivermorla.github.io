import { clients, stats } from "../_lib/content";
import { CountUp } from "./count-up";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

export default function Proof() {
  return (
    <section
      aria-label="Track record"
      className="pt-20 pb-24 md:pt-28 md:pb-32"
    >
      <dl className="wrap grid grid-cols-2 gap-y-12 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse justify-end border-l border-white/10 pr-4 pl-5 md:pl-7"
          >
            <dt className="mt-3 max-w-[12rem] text-[0.9375rem] leading-snug text-ash">
              {stat.label}
            </dt>
            <dd className="text-[clamp(3rem,2rem+3.2vw,5rem)] leading-none font-semibold tracking-[-0.055em]">
              <CountUp to={stat.value} />
              {stat.suffix && (
                <span aria-hidden className="text-gradient">
                  {stat.suffix}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div className="wrap mt-20 flex flex-col gap-6 md:mt-28 md:flex-row md:items-center md:gap-10">
        <p className="type-eyebrow shrink-0 text-ash md:max-w-[12rem]">
          Trusted by startups &amp; small businesses
        </p>
        <div className="marquee min-w-0 flex-1">
          <ul
            className="marquee-track"
            style={{ "--duration": `${clients.length * 4}s` } as CSSVars}
          >
            {[0, 1].map((copy) =>
              clients.map((client) => (
                <li
                  key={`${copy}-${client}`}
                  aria-hidden={copy === 1 || undefined}
                  className="flex shrink-0 items-center gap-10 pr-10 text-[1.375rem] font-semibold tracking-[-0.035em] whitespace-nowrap text-bone/45"
                >
                  {client}
                  <span
                    aria-hidden
                    className="bg-gradient size-1.5 rounded-full opacity-60"
                  />
                </li>
              )),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
