import { cn } from "@/utils/classNames";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { featured, index, type Project } from "../_lib/content";
import ProjectIndex from "./project-index";

// Grid placement for the featured tiles: wide, narrow / narrow, wide.
const layout = [
  { span: "md:col-span-7", narrow: false },
  { span: "md:col-span-5", narrow: true },
  { span: "md:col-span-5", narrow: true },
  { span: "md:col-span-7", narrow: false },
];

export default function Work() {
  return (
    <section
      id="work"
      className="on-dark relative rounded-t-[32px] bg-ink pt-20 pb-34 text-canvas md:rounded-t-[44px] md:pt-28 md:pb-44"
    >
      <div className="wrap">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <h2 className="type-h2 lg:col-span-7">Selected work</h2>
          <p className="max-w-[24rem] text-band-muted lg:col-span-5 lg:justify-self-end">
            20+ products live across fitness, fintech, gaming and the trades.
          </p>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-12 md:mt-16 md:grid-cols-12">
          {featured.map((project, i) => (
            <Tile key={project.slug} project={project} {...layout[i]} />
          ))}
        </div>

        <div className="mt-24 md:mt-32">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h3 className="type-h3">More projects</h3>
            <Link
              href="/portfolio"
              className="text-[0.9375rem] text-band-muted underline decoration-white/25 underline-offset-4 transition-colors duration-150 ease-[ease] hover:text-canvas"
            >
              Full portfolio
            </Link>
          </div>
          <ProjectIndex projects={index} />
        </div>
      </div>
    </section>
  );
}

type TileProps = {
  project: Project;
  span: string;
  narrow: boolean;
};

function Tile({ project, span, narrow }: TileProps) {
  const body = (
    <>
      <div
        className={cn(
          "relative aspect-[16/11] overflow-hidden rounded-[20px] bg-band-panel ring-1 ring-white/[0.06] ring-inset",
          narrow && "md:aspect-auto md:flex-1",
        )}
      >
        <div
          className={cn(
            "tile-shot absolute top-[9%] left-[7%] aspect-[16/9] w-[108%] overflow-hidden rounded-tl-[10px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_60px_-20px_rgba(0,0,0,0.7)]",
            narrow && "md:w-[150%]",
          )}
        >
          <Image
            src={project.image}
            alt={`${project.name} homepage`}
            fill
            sizes={
              narrow
                ? "(min-width: 768px) 720px, 100vw"
                : "(min-width: 768px) 760px, 100vw"
            }
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[1.125rem] font-[600] tracking-[-0.02em] [font-stretch:110%]">
            {project.name}
            {project.domain && (
              <ArrowUpRight className="size-4 text-band-muted" aria-hidden />
            )}
          </p>
          <p className="mt-0.5 text-[0.9375rem] text-band-muted">
            {project.summary}
          </p>
        </div>
        <p className="shrink-0 pt-1 text-[0.875rem] text-band-muted">
          {project.industry}
        </p>
      </div>
    </>
  );

  const className = cn("tile flex flex-col", span);

  return project.domain ? (
    <a
      href={`https://${project.domain}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  );
}
