import { Skeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div
      role="status"
      aria-busy
      aria-label="Loading"
      className="bg-gradient-none px-4 pt-28 pb-24 sm:px-8"
    >
      <div className="container mx-auto grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="flex flex-col gap-5 lg:col-span-7">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="mt-10 h-8 w-40" />
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
