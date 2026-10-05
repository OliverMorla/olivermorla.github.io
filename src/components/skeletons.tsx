import { cn } from "@/utils/classNames";

/**
 * Loading placeholders shaped like the content they stand in for, so the page
 * doesn't jump when it streams in. All are hidden from assistive tech; the
 * wrapping region announces the busy state instead.
 */

export const Skeleton = ({ className }: { className?: string }) => (
  <div aria-hidden className={cn("skeleton", className)} />
);

const LoadingRegion = ({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div role="status" aria-busy aria-label={label} className={className}>
    {children}
  </div>
);

export const SectionTitleSkeleton = ({
  align = "center",
}: {
  align?: "start" | "center" | "end";
}) => (
  <div
    className={cn(
      "flex w-full max-w-xl flex-col gap-3",
      align === "center" && "mx-auto items-center",
      align === "end" && "ml-auto items-end",
    )}
  >
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-10 w-full max-w-md" />
    <Skeleton className="h-5 w-3/4" />
  </div>
);

export const ProjectCardSkeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex flex-col gap-4 rounded-xl border border-neutral-200 p-3 dark:border-neutral-800",
      className,
    )}
  >
    <Skeleton className="aspect-[16/10] w-full rounded-lg" />
    <Skeleton className="h-5 w-2/3" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-3 w-1/3" />
  </div>
);

export const ProjectGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <LoadingRegion
    label="Loading projects"
    className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3"
  >
    {Array.from({ length: count }, (_, i) => (
      <ProjectCardSkeleton key={i} />
    ))}
  </LoadingRegion>
);

export const TrustBarSkeleton = () => (
  <LoadingRegion
    label="Loading client highlights"
    className="container mx-auto flex flex-col gap-12 px-4 pt-24 pb-16 sm:px-8 sm:pt-36"
  >
    <SectionTitleSkeleton align="end" />
    <div className="flex gap-12 overflow-hidden">
      {Array.from({ length: 8 }, (_, i) => (
        <Skeleton key={i} className="size-24 shrink-0 rounded-full" />
      ))}
    </div>
    <Skeleton className="h-64 w-full rounded-xl" />
  </LoadingRegion>
);

export const PortfolioSkeleton = () => (
  <LoadingRegion
    label="Loading projects"
    className="container mx-auto flex flex-col gap-12 px-4 py-24 sm:px-8"
  >
    <SectionTitleSkeleton align="end" />
    <div className="flex gap-6 overflow-hidden">
      {Array.from({ length: 3 }, (_, i) => (
        <ProjectCardSkeleton
          key={i}
          className="w-[85%] shrink-0 sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
        />
      ))}
    </div>
    <Skeleton className="h-96 w-full rounded-xl" />
  </LoadingRegion>
);

export const TestimonialsSkeleton = () => (
  <LoadingRegion
    label="Loading testimonials"
    className="container mx-auto flex flex-col gap-12 px-4 py-24 sm:px-8"
  >
    <SectionTitleSkeleton />
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, i) => (
        <Skeleton key={i} className="h-72 rounded-2xl" />
      ))}
    </div>
  </LoadingRegion>
);
