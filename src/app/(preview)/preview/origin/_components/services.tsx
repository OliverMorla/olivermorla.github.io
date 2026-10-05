import { AppWindow, ArrowUpRight, Smartphone, Workflow } from "lucide-react";
import Image from "next/image";
import { links, services, type ServiceIcon } from "../_lib/content";
import { Reveal } from "./reveal";
import { Spotlight } from "./spotlight";

const icons: Record<ServiceIcon, typeof AppWindow> = {
  web: AppWindow,
  mobile: Smartphone,
  software: Workflow,
};

export default function Services() {
  return (
    <section id="services" className="wrap pt-24 md:pt-32">
      <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="type-eyebrow text-gradient">Outcomes over outputs</p>
          <h2 className="type-title mt-5">What I build</h2>
        </div>
        <p className="max-w-[24rem] text-[1.0625rem] text-ash lg:col-span-5 lg:justify-self-end">
          From first prototype to production, on a stack built to last.
        </p>
      </Reveal>

      <Spotlight className="mt-14 grid gap-3 md:mt-16 md:grid-cols-3">
        {services.map((service) => {
          const Icon = icons[service.icon];
          return (
            <article
              key={service.title}
              className="spot flex min-h-[19rem] flex-col rounded-[1.5rem] bg-graphite p-7 ring-1 ring-white/[0.07] md:p-8"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-white/[0.05] text-violet ring-1 ring-white/10">
                <Icon aria-hidden className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="type-h3 mt-10">{service.title}</h3>
              <p className="mt-2 text-ash">{service.body}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-8">
                {service.stack.map((tool) => (
                  <li
                    key={tool}
                    className="type-chip bg-white/[0.05] text-bone/80 ring-1 ring-white/[0.08]"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </Spotlight>

      <a
        href={links.studio}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-3 flex flex-col gap-4 rounded-[1.5rem] bg-graphite/60 px-7 py-6 ring-1 ring-white/[0.07] transition-colors duration-200 ease-[ease] hover:bg-graphite sm:flex-row sm:items-center sm:justify-between md:px-8"
      >
        <span className="flex items-center gap-4">
          <Image
            src="/assets/media/partners/appify-visions.webp"
            alt=""
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-full ring-1 ring-white/10"
          />
          <span>
            <span className="font-semibold text-bone">Need a bigger team?</span>{" "}
            <span className="text-ash">
              Appify Visions, my studio, adds design, AI and more hands.
            </span>
          </span>
        </span>
        <span className="type-eyebrow flex shrink-0 items-center gap-1.5 text-bone">
          appifyvisions.com
          <ArrowUpRight
            aria-hidden
            className="size-3.5 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </a>
    </section>
  );
}
