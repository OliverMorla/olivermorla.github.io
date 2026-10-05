import { steps } from "../_lib/content";
import { InView, Reveal } from "./reveal";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

export default function Process() {
  return (
    <section id="process" className="panel bg-mist py-24 md:py-32">
      <div className="wrap">
        <Reveal>
          <h2 className="type-h2">How a project runs</h2>
          <p className="mt-4 max-w-[26rem] text-slate">
            About eight weeks from first call to launch for a typical MVP.
          </p>
        </Reveal>

        {/* The track draws itself once, left to right, as the steps arrive. */}
        <InView className="relative mt-14 md:mt-20">
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[7px] w-px bg-line md:top-[7px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto"
          >
            <div className="track-fill h-full w-full bg-ink" />
          </div>

          <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
            {steps.map((step, i) => (
              <li key={step.name} className="relative pl-10 md:pl-0">
                <span
                  aria-hidden="true"
                  className="step-dot absolute top-0.5 left-0 block size-[15px] rounded-full bg-ink ring-[5px] ring-mist md:static"
                  style={{ "--i": i } as CSSVars}
                />
                <p className="text-[0.9375rem] text-slate md:mt-7">
                  {step.when}
                </p>
                <h3 className="type-h3 mt-1">{step.name}</h3>
                <p className="mt-2 max-w-[17rem] text-ink">{step.body}</p>
              </li>
            ))}
          </ol>
        </InView>
      </div>
    </section>
  );
}
