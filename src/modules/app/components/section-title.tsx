import {
  BlurLazyMotionProps,
  MotionInViewDiv,
} from "@/components/helpers/blur-lazy-motion";
import { cn } from "@/utils/classNames";

export type SectionTitleProps = BlurLazyMotionProps<"div"> & {
  title: string;
  tagline?: string;
  subtitle?: string;
  description?: string;
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
    <MotionInViewDiv
      delay={0.2}
      className={cn(
        "flex flex-col gap-6 items-center max-w-xl text-center",
        className,
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
      {description && <p className="text-muted">{description}</p>}
    </MotionInViewDiv>
  );
};

export default SectionTitle;
