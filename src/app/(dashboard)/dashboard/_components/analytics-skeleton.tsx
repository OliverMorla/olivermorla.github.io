// First load only. Range changes keep the previous numbers on screen instead
// (see RangeFrame), so this never flashes between ranges.
const block = "animate-pulse rounded-md bg-grid motion-reduce:animate-none";

export default function AnalyticsSkeleton() {
  return (
    <div className="space-y-4">
      <p role="status" className="sr-only">
        Loading analytics
      </p>
      <div
        aria-hidden="true"
        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5"
      >
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={`rounded-xl bg-surface p-4 ring-1 ring-line sm:p-5 ${i === 0 ? "col-span-2 lg:col-span-1" : ""}`}
          >
            <div className={`${block} h-4 w-20`} />
            <div className={`${block} mt-3 h-8 w-24`} />
            <div className={`${block} mt-3 h-3.5 w-32`} />
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="rounded-xl bg-surface p-4 ring-1 ring-line sm:p-5"
      >
        <div className={`${block} h-4 w-16`} />
        <div className={`${block} mt-2 h-4 w-56`} />
        <div className={`${block} mt-4 h-[264px]`} />
        <div className="mt-4 h-[1.875rem]" />
      </div>
      <div aria-hidden="true" className="grid gap-3 sm:gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="h-[22rem] rounded-xl bg-surface p-4 ring-1 ring-line sm:p-5"
          >
            <div className={`${block} h-4 w-24`} />
          </div>
        ))}
      </div>
    </div>
  );
}
