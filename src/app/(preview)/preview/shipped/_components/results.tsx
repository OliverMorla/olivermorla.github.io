import { outcomes } from "../_lib/content";

export default function Results() {
  return (
    <section id="results" className="pt-24 pb-24 md:pt-32 md:pb-32">
      <div className="wrap grid gap-x-6 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="type-h2 max-w-[12ch]">Results clients can measure</h2>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <dl className="border-b border-line">
            {outcomes.map((outcome) => (
              <div
                key={outcome.label}
                className="grid grid-cols-[8.5rem_1fr] items-baseline gap-x-5 border-t border-line py-5 sm:grid-cols-[11.5rem_1fr]"
              >
                <dt className="type-figure">{outcome.figure}</dt>
                <dd className="text-slate">{outcome.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
