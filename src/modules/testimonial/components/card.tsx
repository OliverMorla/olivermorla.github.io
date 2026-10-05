import { getMediaImage } from "@/lib/payload/client/utils";
import type { TestimonialSummary } from "@/lib/payload/server/queries";
import { cn } from "@/utils/classNames";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

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

export function TestimonialAuthor({
  testimonial,
}: {
  testimonial: TestimonialSummary;
}) {
  const role = [testimonial.role, testimonial.company]
    .filter(Boolean)
    .join(", ");

  return (
    <figcaption className="flex items-center gap-4 border-t border-neutral-200 pt-6 dark:border-neutral-800">
      <div className="size-12 shrink-0 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
        {testimonial.image && (
          <Image
            {...getMediaImage(testimonial.image)}
            alt=""
            sizes="48px"
            className="size-full object-cover grayscale"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-wrap items-start justify-between gap-x-4">
        <div className="min-w-0">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            {testimonial.name}
          </p>
          {role && <p className="text-muted text-sm">{role}</p>}
        </div>
        <p className="text-muted text-sm">{testimonial.location}</p>
      </div>
    </figcaption>
  );
}

export function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialSummary;
}) {
  return (
    <figure className="relative flex h-full flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:p-8 dark:border-neutral-800 dark:bg-neutral-900">
      <Quote
        aria-hidden
        className="absolute top-6 right-6 size-6 text-neutral-200 sm:top-8 sm:right-8 dark:text-neutral-800"
      />
      <Rating value={testimonial.rating} />
      <blockquote className="flex-1 leading-relaxed text-neutral-600 dark:text-neutral-300">
        <p className="line-clamp-6">{testimonial.message}</p>
      </blockquote>
      <TestimonialAuthor testimonial={testimonial} />
    </figure>
  );
}
