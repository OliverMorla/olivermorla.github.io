"use client";

import { MotionSection } from "@/components/helpers/basic-lazy-motion";
// import { getTestimonials } from "@/lib/payload/server/queries";
import { getTestimonials } from "@/lib/payload/server/actions";
import CTAButtons from "@/modules/app/components/cta-buttons";
import SectionTitle from "@/modules/app/components/section-title";
import { pages } from "@/modules/app/lib/constants";
import { cn } from "@/utils/classNames";
import { useQuery } from "@tanstack/react-query";
import { useTransform } from "framer-motion";
import { ComponentProps } from "react";
import { useScrollTracking } from "./scroll-tracking-container";
import { TestimonialCard } from "@/modules/testimonial/components/card";

export type TestimonialsProps = ComponentProps<"section">;

export default function Testimonials({
  className,
  ...props
}: TestimonialsProps) {
  // get the data from the cache
  // const testimonials = await getTestimonials();

  const { data, error } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
  });

  const { smoothYProgress } = useScrollTracking();

  const scale = useTransform(smoothYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(smoothYProgress, [0, 1], [0, -10]);

  return (
    <MotionSection
      id="testimonials"
      className={cn(
        "sm:sticky sm:top-0 relative py-24 px-8 flex flex-col gap-12 max-sm:px-4 bg-gradient-none overflow-hidden",
        className,
      )}
      style={{ scale, rotate, willChange: "transform", transformOrigin: "50% 50%" }}
    >
      <div className="relative container mx-auto flex flex-col items-center gap-12">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/2 -right-40 w-80 h-80 bg-neutral-500 dark:bg-neutral-800 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-1/2 -left-40 w-80 h-80 bg-neutral-500 dark:bg-neutral-800 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
        <SectionTitle
          tagline={pages.testimonials.tagline}
          title={pages.testimonials.title}
          description={pages.testimonials.description}
          subtitle={pages.testimonials.subtitle}
          className="text-center max-w-4xl mx-auto items-center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.docs.map((testimonial, idx) => (
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
    </MotionSection>
  );
}
