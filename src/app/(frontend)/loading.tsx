import { Skeleton } from "@/components/skeletons";

// Mirrors the hero so navigating home doesn't flash an empty page.
export default function Loading() {
  return (
    <div
      role="status"
      aria-busy
      aria-label="Loading"
      className="bg-gradient-none-inverted flex min-h-svh flex-col justify-center px-4 pt-28 pb-32 sm:px-8"
    >
      <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-12 md:flex-row">
        <div className="flex w-full max-w-2xl flex-col gap-6">
          <Skeleton className="h-5 w-56" />
          <Skeleton className="h-10 w-full max-w-lg" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
          <div className="flex max-w-md gap-3">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>
        <Skeleton className="aspect-[7/9] w-full max-w-xs rounded-[40%] sm:max-w-sm md:max-w-md" />
      </div>
    </div>
  );
}
