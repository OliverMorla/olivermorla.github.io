import { cache } from "react";
import { payload } from "@/lib/payload";
import { TestimonialCard } from "@/modules/home/components/TestimonialCard";
import {
  MotionInViewDiv,
  MotionInViewH2,
  MotionInViewText,
} from "@/components/helpers/Motion";

const getTestimonials = cache(async () => {
  return payload.find({ collection: "testimonials", limit: 3 });
});

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section className="relative h-auto py-32 bg-gradient-to-b from-neutral-50 via-neutral-100 to-neutral-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-neutral-500 dark:bg-neutral-800 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-1/2 -left-40 w-80 h-80 bg-neutral-500 dark:bg-neutral-800 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <MotionInViewH2
            once
            delay={0.2}
            className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 sm:text-5xl"
          >
            What Clients Say
          </MotionInViewH2>
          <MotionInViewText
            once
            y={40}
            delay={0.2}
            className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
          >
            Don&apos;t just take our word for it - hear from some of our
            satisfied clients
          </MotionInViewText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.docs.map((testimonial, index) => (
            <MotionInViewDiv
              once
              y={40}
              delay={index * 0.1}
              key={testimonial.id}
              className="flex justify-center items-center"
            >
              <TestimonialCard testimonial={testimonial} />
            </MotionInViewDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
