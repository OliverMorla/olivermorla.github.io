import { cn } from "@/utils/classNames";
import { Star } from "lucide-react";

export function Rating({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const stars = Math.max(0, Math.min(5, Math.round(value)));

  return (
    <div
      role="img"
      aria-label={`Rated ${stars} out of 5`}
      className={cn("flex items-center gap-1", className)}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            "size-4",
            i < stars
              ? "fill-yellow-500 text-yellow-500"
              : "text-neutral-300 dark:text-neutral-700",
          )}
        />
      ))}
    </div>
  );
}
