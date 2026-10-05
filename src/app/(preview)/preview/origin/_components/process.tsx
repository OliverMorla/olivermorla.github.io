import { steps } from "../_lib/content";
import { Reveal } from "./reveal";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

export default function Process() {
  return (
    <section
      id="process"
      className="wrap grid gap-12 pt-28 pb-[calc(var(--sheet-overlap)+6rem)] md:pt-40 lg:grid-cols-12 lg:gap-8"
    >
      <div className="lg:col-span-5">
        <Reveal className="lg:sticky lg:top-28">
          <p className="type-eyebrow text-gradient">No guesswork</p>
          <h2 className="type-title mt-5 max-w-[10ch]">
            Plan. Prototype. Build. Launch.
          </h2>
          <p className="mt-6 max-w-[22rem] text-[1.0625rem] text-ash">
            Eight weeks, start to finish, with a live preview link every week.
          </p>
        </Reveal>
      </div>

      <ol className="flex flex-col gap-4 lg:col-span-7 lg:gap-[18vh]">
        {steps.map((step, i) => (
          <li
            key={step.name}
            className="step-card"
            style={{ "--i": i } as CSSVars}
          >
            <article className="rounded-[1.75rem] bg-graphite p-7 shadow-[0_-24px_48px_-24px_rgb(0_0_0/0.9)] ring-1 ring-white/[0.08] md:p-9">
              <div className="flex items-center justify-between gap-4">
                <span className="type-eyebrow text-gradient">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <span className="type-chip bg-white/[0.05] text-bone/80 ring-1 ring-white/[0.08]">
                  {step.when}
                </span>
              </div>
              <h3 className="mt-10 text-[clamp(2rem,1.5rem+1.6vw,2.75rem)] leading-none font-extrabold tracking-[-0.045em] uppercase md:mt-12">
                {step.name}
              </h3>
              <p className="type-lede mt-3 text-ash">{step.body}</p>
              <ul className="mt-8 flex flex-wrap gap-1.5">
                {step.deliverables.map((item) => (
                  <li
                    key={item}
                    className="type-chip bg-white/[0.04] text-ash ring-1 ring-white/[0.07]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
