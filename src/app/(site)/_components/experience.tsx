import Image from "next/image";
import { experience, links } from "../_lib/content";
import { Reveal } from "./reveal";

export default function Experience() {
  return (
    <section id="experience" className="wrap pb-28 md:pb-40">
      <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
        <Reveal className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <h2 className="type-h2">Experience</h2>
          <p className="mt-4 max-w-[24rem] text-slate">
            7+ years of professional work: an internship, full-time roles and my
            own studio,{" "}
            <a
              href={links.studio}
              target="_blank"
              rel="noreferrer"
              className="text-ink underline decoration-ink/25 underline-offset-4 transition-colors duration-150 hover:decoration-ink"
            >
              Appify Visions
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            . Writing code since I&nbsp;was&nbsp;14.
          </p>
          <a
            href={links.resume}
            className="btn mt-6 h-11 bg-mist px-5 text-[0.9375rem] text-ink hover:bg-line"
          >
            Full résumé
          </a>
        </Reveal>

        <ol className="border-b border-line lg:col-span-8">
          {experience.map((item) => (
            <li
              key={`${item.org}-${item.years}`}
              className="group grid gap-x-8 gap-y-3 border-t border-line py-7 md:grid-cols-[13rem_1fr]"
            >
              <p className="text-[0.9375rem] text-slate tabular-nums md:pt-0.5">
                {item.years}
              </p>
              <div className="grid grid-cols-[2.5rem_1fr] gap-x-4">
                {item.logo ? (
                  <span className="relative mt-0.5 size-10 overflow-hidden rounded-xl bg-white ring-1 ring-ink/8">
                    <Image
                      src={item.logo}
                      alt=""
                      fill
                      sizes="40px"
                      className="object-contain p-1 grayscale transition-[filter] duration-300 ease-[ease] group-hover:grayscale-0"
                    />
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-10 place-items-center rounded-xl bg-mist text-[0.8125rem] font-semibold tracking-[-0.01em] text-slate ring-1 ring-line"
                  >
                    {item.initials}
                  </span>
                )}
                <div>
                  <h3 className="type-h3">{item.role}</h3>
                  <p className="mt-1 text-[0.9375rem] text-slate">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-ink underline decoration-ink/25 underline-offset-4 transition-colors duration-150 hover:decoration-ink"
                      >
                        {item.org}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      item.org
                    )}
                    , {item.place}
                  </p>
                  {item.body && (
                    <p className="mt-3 max-w-[34rem] text-ink">{item.body}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
