import { cn } from "@/utils/classNames";
import Image from "next/image";
import { outcomes } from "../_lib/content";
import { getQuotes } from "../_lib/testimonials";

export default async function Results() {
  const quotes = await getQuotes();
  const hasQuotes = quotes.length > 0;

  const figures = (
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
  );

  return (
    <section id="results" className="pt-24 pb-24 md:pt-32 md:pb-32">
      <div className="wrap grid gap-x-6 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="type-h2 max-w-[12ch]">Results clients can measure</h2>
          {hasQuotes && <div className="mt-12">{figures}</div>}
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {hasQuotes ? (
            <div className="flex flex-col">
              {quotes.map((quote, i) => (
                <figure
                  key={quote.id}
                  className={cn(i > 0 && "mt-10 border-t border-line pt-10")}
                >
                  <blockquote
                    className={cn(
                      "text-pretty text-ink",
                      i === 0
                        ? "text-[1.25rem] leading-[1.5] tracking-[-0.015em] md:text-[1.375rem]"
                        : "text-[1.0625rem] text-ink-soft",
                    )}
                  >
                    &ldquo;{quote.message}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    {quote.image && (
                      <Image
                        src={quote.image}
                        alt=""
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover"
                      />
                    )}
                    <span className="flex flex-col leading-tight">
                      <span className="text-[0.9375rem] font-[600]">
                        {quote.name}
                      </span>
                      <span className="text-[0.875rem] text-slate">
                        {quote.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            figures
          )}
        </div>
      </div>
    </section>
  );
}
