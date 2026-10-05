import { cn } from "@/utils/classNames";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { featured, links, wall, type Project } from "../_lib/content";
import { Reveal } from "./reveal";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

// Grid placement for each featured tile, in `featured` order.
const tiles = [
  {
    span: "md:col-span-2 md:row-span-2",
    sizes: "(min-width: 768px) 66vw, 100vw",
  },
  { span: "", sizes: "(min-width: 768px) 33vw, 100vw" },
  { span: "", sizes: "(min-width: 768px) 33vw, 100vw" },
  { span: "", sizes: "(min-width: 768px) 33vw, 100vw" },
  { span: "md:col-span-2", sizes: "(min-width: 768px) 66vw, 100vw" },
];

const COLUMNS = 5;
const columns = Array.from({ length: COLUMNS }, (_, c) =>
  wall.filter((_, i) => i % COLUMNS === c),
);

export default function Work() {
  return (
    <section id="work" className="pt-28 md:pt-36">
      <div className="wrap">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="type-h2">Selected work</h2>
          <p className="max-w-[24rem] text-slate">
            From fintech to a family bakery: a few of the 20+ products
            I&rsquo;ve shipped since 2020.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-3 md:auto-rows-[16rem] md:grid-cols-3 lg:auto-rows-[18rem]">
          {featured.map((project, i) => (
            <Tile key={project.name} project={project} {...tiles[i]!} />
          ))}
        </ul>
      </div>

      <div className="mt-24 md:mt-32">
        <div className="wrap flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="type-h3 max-w-[26ch]">
            And 15 more, from fractional real estate to a player-built online
            world.
          </p>
          <a
            href={links.portfolio}
            className="btn h-11 shrink-0 self-start bg-mist px-5 text-[0.9375rem] text-ink hover:bg-line md:self-auto"
          >
            All projects
          </a>
        </div>

        <div className="wall relative mt-4 h-[30rem] overflow-clip md:h-[40rem]">
          <div className="wall-plane absolute inset-x-[-18%] top-[-30%] grid grid-cols-3 gap-4 md:inset-x-[-6%] md:grid-cols-5">
            {columns.map((column, c) => (
              <div
                key={c}
                data-reverse={c % 2 === 1}
                className={cn(
                  "wall-col flex flex-col",
                  c > 2 && "hidden md:flex",
                )}
                style={{ "--duration": `${64 + c * 9}s` } as CSSVars}
              >
                {[0, 1].map((copy) =>
                  column.map((shot) => (
                    <figure
                      key={`${copy}-${shot.image}`}
                      aria-hidden={copy === 1 || undefined}
                      className="pb-4"
                    >
                      <div className="relative aspect-[16/10] overflow-clip rounded-xl bg-mist shadow-[0_1px_0_rgb(255_255_255/0.6)_inset,0_18px_40px_-20px_rgb(10_22_48/0.35)] ring-1 ring-ink/8">
                        <Image
                          src={shot.image}
                          alt={copy === 0 ? shot.name : ""}
                          fill
                          sizes="(min-width: 768px) 22vw, 36vw"
                          className="object-cover object-top"
                        />
                      </div>
                    </figure>
                  )),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({
  project,
  span,
  sizes,
}: {
  project: Project;
  span: string;
  sizes: string;
}) {
  return (
    <li
      className={cn(
        "group relative aspect-[4/3] overflow-clip rounded-[1.25rem] bg-mist ring-1 ring-ink/6 md:aspect-auto",
        span,
      )}
    >
      <Image
        src={project.image}
        alt=""
        fill
        sizes={sizes}
        style={{ objectPosition: project.focus }}
        className="object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.03]"
      />

      <div className="glass glass-day absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-4 rounded-[0.875rem] py-3 pr-3 pl-4">
        <div className="min-w-0">
          <h3 className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em]">
            {project.name}
          </h3>
          <p className="text-[0.875rem] text-slate sm:truncate">
            {project.summary}
          </p>
        </div>

        {project.domain ? (
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-page transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <ArrowUpRight className="size-4" strokeWidth={2.25} />
          </span>
        ) : (
          <span className="hidden shrink-0 text-[0.8125rem] text-slate sm:inline">
            {project.sector}
          </span>
        )}
      </div>

      {/* The whole tile is the link when the site is live. */}
      {project.domain && (
        <a
          href={`https://${project.domain}`}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0 z-10 rounded-[1.25rem]"
        >
          <span className="sr-only">
            Visit {project.name} ({project.domain})
          </span>
        </a>
      )}
    </li>
  );
}
