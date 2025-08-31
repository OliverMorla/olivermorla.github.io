import { ComponentProps } from "react";
import { cn } from "@/utils/classNames";
import { pages } from "@/modules/app/lib/constants";
import CTAButtons from "@/modules/app/components/cta-buttons";
import { getTestimonials } from "@/lib/payload/server/queries";
import SectionTitle from "@/modules/app/components/section-title";
import { TestimonialCard } from "@/modules/testimonial/components/card";

export type TestimonialsProps = ComponentProps<"section">;

export default async function Testimonials({
  className,
  ...props
}: TestimonialsProps) {
  // get the data from the cache
  const testimonials = await getTestimonials();

  return (
    <section
      id="testimonials"
      className={cn(
        "relative py-24 px-8 flex flex-col gap-12 max-sm:px-4 bg-gradient-none overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-neutral-500 dark:bg-neutral-800 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-1/2 -left-40 w-80 h-80 bg-neutral-500 dark:bg-neutral-800 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="relative container mx-auto flex flex-col items-center gap-12">
        <SectionTitle
          tagline={pages.testimonials.tagline}
          title={pages.testimonials.title}
          description={pages.testimonials.description}
          subtitle={pages.testimonials.subtitle}
          className="text-center max-w-4xl mx-auto items-center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.docs.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className="flex justify-center items-center"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
        <CTAButtons />
      </div>
    </section>
  );
}
