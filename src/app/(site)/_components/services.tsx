"use client";

import { cn } from "@/utils/classNames";
import { useEffect, useRef, useState } from "react";
import { services } from "../_lib/content";
import { Reveal } from "./reveal";

const MS_PER_CHAR = 45;

/**
 * Services as rows, with a small terminal in the sticky column. Whichever
 * row crosses the middle of the viewport (or is hovered) comes into focus,
 * and the terminal types that row's command, then prints its result.
 */
export default function Services() {
  const [active, setActive] = useState(0);
  const rowsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const rows = rowsRef.current?.querySelectorAll<HTMLElement>(
      ":scope > li[data-index]",
    );
    if (!rows) return;
    // A thin band across the middle of the viewport picks the focused row.
    const focus = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    rows.forEach((row) => focus.observe(row));
    return () => focus.disconnect();
  }, []);

  const current = services[active]!;
  const typing = current.command.length * MS_PER_CHAR;

  return (
    <section id="services" className="wrap pb-28 md:pb-40">
      <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
        <Reveal className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <h2 className="type-h2">What I build</h2>
          <p className="mt-4 max-w-[22rem] text-slate">
            Design, code and launch, handled end to end.
          </p>

          {/* Decorative: the same information is in the rows. */}
          <div
            aria-hidden="true"
            className="mt-8 max-w-[22rem] overflow-hidden rounded-2xl bg-mist ring-1 ring-line"
          >
            <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
              <span className="size-2.5 rounded-full bg-ghost" />
              <span className="size-2.5 rounded-full bg-ghost" />
              <span className="size-2.5 rounded-full bg-ghost" />
              <span className="ml-auto font-mono text-[0.75rem] text-slate">
                ~/{current.dir}
              </span>
            </div>
            <div className="px-4 py-4 font-mono text-[0.8125rem] leading-[1.7]">
              <p className="whitespace-nowrap">
                <span className="text-violet-500">$</span>{" "}
                <span className="typewriter-wrapper">
                  <span
                    key={active}
                    className="typewriter text-ink"
                    style={
                      {
                        "--characters": current.command.length,
                        "--type-duration": `${typing}ms`,
                        "--animation-start-delay": "150ms",
                      } as React.CSSProperties
                    }
                  >
                    {current.command}
                  </span>
                </span>
              </p>
              <p
                key={`result-${active}`}
                className="terminal-out text-slate"
                style={{ animationDelay: `${typing + 350}ms` }}
              >
                <span className="text-emerald-500">✓</span> {current.result}
              </p>
            </div>
          </div>
        </Reveal>

        <ul ref={rowsRef} className="border-b border-line lg:col-span-8">
          {services.map((service, i) => (
            <li
              key={service.title}
              data-index={i}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "grid gap-x-8 gap-y-3 border-t border-line py-7 transition-opacity duration-300 ease-[ease] md:grid-cols-[13rem_1fr]",
                i !== active && "lg:opacity-45",
              )}
            >
              <h3 className="type-h3">{service.title}</h3>
              <div>
                <p className="text-ink">{service.body}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {service.stack.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full bg-mist px-3 py-1 text-[0.8125rem] text-slate"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
