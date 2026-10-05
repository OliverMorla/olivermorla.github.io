import { cn } from "@/utils/classNames";
import Image from "next/image";
import { featured, links, wall } from "../_lib/content";
import { Reveal } from "./reveal";
import WorkBrowser from "./work-browser";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

const COLUMNS = 5;
const columns = Array.from({ length: COLUMNS }, (_, c) =>
  wall.filter((_, i) => i % COLUMNS === c),
);

export default function Work() {
  return (
    <section
      id="work"
      className="sheet sheet-light on-light pt-24 pb-[calc(var(--sheet-overlap)+4rem)] md:pt-32"
    >
      <div className="wrap">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="type-eyebrow text-gradient-deep">
              Results that speak
            </p>
            <h2 className="type-title mt-5">Selected work</h2>
          </div>
          <p className="max-w-[24rem] text-[1.0625rem] text-slate lg:col-span-5 lg:justify-self-end">
            20+ products live across fintech, health, gaming and the trades.
          </p>
        </Reveal>

        <WorkBrowser projects={featured} />
      </div>

      <div className="mt-28 md:mt-40">
        <Reveal className="wrap flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[24ch] text-[clamp(1.5rem,1.1rem+1.2vw,2.125rem)] leading-[1.15] font-semibold tracking-[-0.035em]">
            And 15 more, from payments in Peru to a player-built online world.
          </p>
          <a
            href={links.portfolio}
            className="btn h-11 shrink-0 self-start bg-ink px-5 text-[0.9375rem] text-bone hover:bg-ink/85 md:self-auto"
          >
            All projects
          </a>
        </Reveal>

        <div className="wall relative mt-4 h-[28rem] overflow-clip md:h-[40rem]">
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
                      <div className="relative aspect-[16/10] overflow-clip rounded-xl bg-line shadow-[0_1px_0_rgb(255_255_255/0.6)_inset,0_18px_40px_-20px_rgb(11_11_13/0.35)] ring-1 ring-ink/8">
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
