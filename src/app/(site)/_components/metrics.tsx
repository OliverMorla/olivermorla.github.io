import { metrics } from "../_lib/content";
import CountUp from "./count-up";

// The hero's numbers, given room of their own: four columns, each led by a
// hairline, so they read like a spec sheet rather than a row of badges.
export default function Metrics() {
  return (
    <section aria-label="By the numbers" className="wrap pt-16 md:pt-24">
      <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col gap-3 border-l border-line pr-4 pl-5 md:pl-7"
          >
            <dt className="order-2 max-w-[13rem] text-[0.9375rem] leading-snug text-balance text-slate">
              {metric.label}
            </dt>
            <dd className="order-1 text-[clamp(2.5rem,1.9rem+2.2vw,3.75rem)] leading-none font-semibold tracking-[-0.04em] text-ink">
              <CountUp value={metric.value} />
              {metric.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
