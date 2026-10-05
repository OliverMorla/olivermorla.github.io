import { cn } from "@/utils/classNames";
import { phases } from "../_lib/content";
import InView from "./in-view";

const WEEKS = 8;

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

export default function Process() {
  return (
    <section id="process" className="pt-24 md:pt-32">
      <div className="wrap">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <h2 className="type-h2 lg:col-span-7">Live in 4–8 weeks</h2>
          <p className="max-w-[24rem] text-slate lg:col-span-5 lg:justify-self-end">
            A fixed plan, weekly demos and no surprises. Smaller scopes launch
            sooner.
          </p>
        </div>

        <InView className="mt-12 rounded-[24px] bg-paper px-5 py-3 shadow-[0_0_0_1px_var(--color-line)] md:mt-16 md:px-8 md:py-4">
          {/* Week axis */}
          <div className="grid items-end py-3 md:grid-cols-[15rem_1fr] md:gap-x-8">
            <span className="text-[0.8125rem] text-slate max-md:hidden">
              Phase
            </span>
            <div className="grid grid-cols-8 text-[0.75rem] text-slate">
              {Array.from({ length: WEEKS }, (_, week) => (
                <span key={week} className="pl-1.5">
                  <span className="md:hidden">
                    {week === 0 ? "Wk 1" : week + 1}
                  </span>
                  <span className="max-md:hidden">Week {week + 1}</span>
                </span>
              ))}
            </div>
          </div>

          <ol>
            {phases.map((phase, i) => (
              <li
                key={phase.name}
                className="grid gap-y-3 border-t border-line py-5 md:grid-cols-[15rem_1fr] md:items-center md:gap-x-8"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[1.0625rem] font-[600] tracking-[-0.015em]">
                      {phase.name}
                    </h3>
                    <span className="text-[0.8125rem] text-slate">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="mt-1 text-[0.9375rem] leading-snug text-slate">
                    {phase.body}
                  </p>
                </div>

                <div className="relative h-9 bg-[linear-gradient(to_right,#eceef2_1px,transparent_1px)] bg-[length:12.5%_100%]">
                  <div
                    className="absolute inset-y-1.5"
                    style={{
                      left: `${(phase.start / WEEKS) * 100}%`,
                      width: `${((phase.end - phase.start) / WEEKS) * 100}%`,
                    }}
                  >
                    <div
                      className={cn(
                        "phase-bar h-full rounded-full",
                        i === phases.length - 1 ? "bg-live" : "bg-ink",
                      )}
                      style={{ "--i": i } as CSSVars}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </InView>
      </div>
    </section>
  );
}
