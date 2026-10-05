import { getTestimonials } from "@/lib/payload/server/queries";
import CTAButtons from "@/modules/app/components/cta-buttons";
import SectionTitle from "@/modules/app/components/section-title";
import { pages } from "@/modules/app/lib/constants";
import { TestimonialCard } from "@/modules/testimonial/components/card";

/**
 * Rendered on the server (deduped with TrustBar's query via React.cache).
 * `stack-out` tilts it away as Contact slides over; see global.css.
 */
const Testimonials = async () => {
  const testimonials = await getTestimonials();
  if (!testimonials.length) return null;

  return (
    <section
      id="testimonials"
      className="stack-out bg-gradient-none relative flex flex-col gap-12 overflow-hidden px-4 py-24 sm:sticky sm:top-0 sm:px-8"
    >
      <div className="relative container mx-auto flex flex-col items-center gap-12">
        <div aria-hidden className="absolute inset-0 opacity-40">
          <div className="absolute top-1/2 -right-40 size-80 rounded-full bg-neutral-500 mix-blend-multiply blur-3xl dark:bg-neutral-800" />
          <div className="absolute bottom-1/2 -left-40 size-80 rounded-full bg-neutral-500 mix-blend-multiply blur-3xl dark:bg-neutral-800" />
        </div>
        <SectionTitle
          tagline={pages.testimonials.tagline}
          title={pages.testimonials.title}
          description={pages.testimonials.description}
          subtitle={pages.testimonials.subtitle}
          className="relative mx-auto max-w-4xl items-center text-center"
        />

        <ul className="relative grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
        <CTAButtons className="relative max-w-md" />
      </div>
    </section>
  );
};

export default Testimonials;
