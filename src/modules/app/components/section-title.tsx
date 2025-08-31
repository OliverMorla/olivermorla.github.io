import { ComponentProps } from "react";
import { cn } from "@/utils/classNames";

export type SectionTitleProps = ComponentProps<"div"> & {
  title: string;
  tagline?: string;
  subtitle?: string;
  description: string;
};

const SectionTitle = ({
  title,
  tagline,
  subtitle,
  description,
  className,
  ...props
}: SectionTitleProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 items-center max-w-xl text-center",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-2">
        {tagline && <p className="text-gradient-normal">{tagline}</p>}

        <div className="flex flex-col gap-2">
          <h2 className="title uppercase">{title}</h2>
          {subtitle && <span className="text-lg font-light">{subtitle}</span>}
        </div>
      </div>
      <p className="text-muted">{description}</p>
    </div>
  );
};

export default SectionTitle;
