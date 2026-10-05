import { Skeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div
      role="status"
      aria-busy
      aria-label="Loading resume"
      className="bg-gradient-none min-h-svh px-4 pt-28 pb-24 sm:px-8"
    >
      <div className="container mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-full sm:w-44" />
        </div>
        <Skeleton className="h-[80svh] w-full rounded-xl" />
      </div>
    </div>
  );
}
