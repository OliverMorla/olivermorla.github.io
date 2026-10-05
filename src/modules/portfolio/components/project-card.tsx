import { getMediaImage } from "@/lib/payload/client/utils";
import type { ProjectSummary } from "@/lib/payload/server/queries";
import { cn } from "@/utils/classNames";
import { formatYear } from "@/utils/date";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

type ProjectCardProps = {
  project: ProjectSummary;
  sizes: string;
  className?: string;
};

/**
 * A project with its screenshot. The whole card is one link when the
 * project has a live URL, so there is a single, generous click target.
 */
const ProjectCard = ({ project, sizes, className }: ProjectCardProps) => {
  const image = project.images?.[0];
  const year = formatYear(project.startedAt);
  const title = project.title ?? "Untitled project";

  const content = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800">
        {image && (
          <Image
            {...getMediaImage(image)}
            alt={`${title} screenshot`}
            sizes={sizes}
            className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex items-center gap-1.5 text-lg font-semibold">
            {title}
            {project.link && (
              <ArrowUpRight aria-hidden className="text-muted size-4" />
            )}
          </h3>
          {project.status && (
            <span className="shrink-0 rounded-md border border-neutral-300 px-2 py-0.5 text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
              {project.status}
            </span>
          )}
        </div>
        {project.description && (
          <p className="text-muted line-clamp-2 text-sm">
            {project.description}
          </p>
        )}
        <p className="text-muted mt-auto flex gap-2 pt-2 text-xs">
          {project.category && <span>{project.category}</span>}
          {project.category && year && <span aria-hidden>/</span>}
          {year && <span>{year}</span>}
        </p>
      </div>
    </>
  );

  const cardClassName = cn(
    "group flex h-full flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-3 transition-colors dark:border-neutral-800 dark:bg-neutral-900",
    project.link &&
      "outline-none hover:border-neutral-400 focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:hover:border-neutral-600",
    className,
  );

  return project.link ? (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClassName}
    >
      {content}
    </a>
  ) : (
    <div className={cardClassName}>{content}</div>
  );
};

export default ProjectCard;
