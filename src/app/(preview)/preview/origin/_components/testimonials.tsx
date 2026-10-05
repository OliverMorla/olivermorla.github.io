import { ArrowUpRight, Quote } from "lucide-react";
import { links } from "../_lib/content";
import { rows, type Testimonial } from "../_lib/testimonials";
import { Reveal } from "./reveal";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

export default function Testimonials() {
  return (
    <section id="clients" className="pt-24 pb-24 md:pt-32 md:pb-32">
      <Reveal className="wrap grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="type-eyebrow text-gradient-deep">Clients, unfiltered</p>
          <h2 className="type-title mt-5">What clients say</h2>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end lg:text-right">
          <p className="max-w-[24rem] text-[1.0625rem] text-slate">
            Founders and owners I&rsquo;ve built for, in their own words.
          </p>
          <a
            href={links.recommendations}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[0.9375rem] font-medium text-ink underline decoration-ink/20 underline-offset-4 transition-colors duration-150 ease-[ease] hover:decoration-ink"
          >
            Recommendations on LinkedIn
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        </div>
      </Reveal>

      <div className="mt-14 flex flex-col gap-4 md:mt-16">
        {rows.map((row, r) => (
          <div key={r} className="marquee">
            <div
              data-reverse={r === 1}
              className="marquee-track items-stretch"
              style={{ "--duration": `${row.length * 14}s` } as CSSVars}
            >
              {[0, 1].map((copy) =>
                row.map((testimonial) => (
                  <div
                    key={`${copy}-${testimonial.name}`}
                    aria-hidden={copy === 1 || undefined}
                    className="flex shrink-0 pr-4"
                  >
                    <Card testimonial={testimonial} />
                  </div>
                )),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Card({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex w-[19.5rem] flex-col rounded-[1.5rem] bg-card p-6 shadow-[0_1px_2px_rgb(11_11_13/0.04),0_14px_36px_-18px_rgb(11_11_13/0.2)] ring-1 ring-ink/[0.06] sm:w-[25rem] md:p-7">
      <Quote
        aria-hidden
        className="size-5 fill-violet-deep/15 text-violet-deep"
        strokeWidth={1.5}
      />
      <blockquote className="mt-4 mb-6 text-[0.96875rem] leading-[1.62] text-ink/85">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-line pt-5">
        <span
          aria-hidden
          className="bg-gradient grid size-10 shrink-0 place-items-center rounded-full text-[0.8125rem] font-semibold text-white"
        >
          {initials(testimonial.name)}
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block text-[0.9375rem] font-semibold tracking-[-0.01em]">
            {testimonial.name}
          </span>
          <span className="mt-0.5 block truncate text-[0.8125rem] text-slate">
            {testimonial.role}
          </span>
        </span>
        {testimonial.site && (
          <span className="type-chip hidden shrink-0 bg-paper text-slate ring-1 ring-line sm:inline-flex">
            {testimonial.site}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
