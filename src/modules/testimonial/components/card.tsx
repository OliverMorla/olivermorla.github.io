import Image from "next/image";
import { getImageUrl } from "@/utils";
import { Quote, Star } from "lucide-react";
import { Media, Testimonial } from "@/payload-types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300 border border-neutral-200/50 dark:border-neutral-800/50">
      <div className="absolute right-8 top-8">
        <Quote className="w-6 h-6 text-neutral-200 dark:text-neutral-800" />
      </div>

      <div>
        {testimonial.rating && (
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className="w-4 h-4 text-yellow-500 fill-yellow-500"
              />
            ))}
          </div>
        )}
      </div>
      <blockquote className="mb-8 pt-8">
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-4">
          {testimonial.message}
        </p>
      </blockquote>

      <div className="flex items-center pt-6 border-t border-neutral-100 dark:border-neutral-800">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <Image
              src={getImageUrl(testimonial.image as Media)}
              alt={testimonial.name}
              width={256}
              height={256}
              className="w-full h-full object-cover filter grayscale contrast-100 rounded-full"
            />
          </div>
        </div>
        <div className="ml-4 flex items-start justify-between w-full">
          <div>
            <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
              {testimonial.name}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {testimonial.role}
            </p>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  );
}
