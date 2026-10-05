import { cn } from "@/utils/classNames";
import type { ComponentProps } from "react";

export type SectionTitleProps = ComponentProps<"div"> & {
  title: string;
  tagline?: string;
  subtitle?: string;
  description?: string;
  /** Heading level; one <h1> per page, sections default to <h2>. */
  as?: "h1" | "h2";
};

const SectionTitle = ({
  title,
  tagline,
  subtitle,
  description,
  as: Heading = "h2",
  className,
  ...props
}: SectionTitleProps) => (
  <div
    className={cn(
      "flex max-w-xl flex-col items-center gap-6 text-center",
      className,
    )}
    {...props}
  >
    <div className="flex flex-col gap-2">
      {tagline && <p className="text-gradient-normal">{tagline}</p>}
      <Heading className="title uppercase">{title}</Heading>
      {subtitle && <p className="text-lg font-light">{subtitle}</p>}
    </div>
    {description && <p className="text-muted text-pretty">{description}</p>}
  </div>
);

export default SectionTitle;
