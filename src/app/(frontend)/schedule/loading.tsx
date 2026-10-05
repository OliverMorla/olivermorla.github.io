import { Skeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div
      role="status"
      aria-busy
      aria-label="Loading"
      className="bg-gradient-none min-h-svh px-4 pt-28 pb-24 sm:px-8"
    >
      <div className="container mx-auto flex max-w-5xl flex-col gap-10">
        <div className="flex max-w-2xl flex-col gap-3">
          <Skeleton className="h-10 w-full max-w-md" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="grid min-h-[40rem] gap-6 md:grid-cols-[1fr_2fr]">
          <Skeleton className="h-48 rounded-xl md:h-full" />
          <div className="grid grid-cols-7 content-start gap-2">
            {Array.from({ length: 35 }, (_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
