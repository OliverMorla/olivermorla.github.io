/* eslint-disable @next/next/no-img-element */
import { Marquee } from "@/components/helpers/marquee";
import { getImageMediaUrl } from "@/lib/payload/client/utils";
import { getTestimonials } from "@/lib/payload/server/queries";
import CTAButtons from "@/modules/app/components/cta-buttons";
import SectionTitle from "@/modules/app/components/section-title";
import { Quote, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Partners = [
  {
    src: "/assets/media/partners/elemental-roof-solutions.webp",
    alt: "Elemental Roof Solutions",
    href: "https://www.elementalroofsolutions.com/",
  },
  {
    src: "/assets/media/partners/appify-visions.webp",
    alt: "Appify Visions",
    href: "https://www.appifyvisions.com/",
  },
  {
    src: "/assets/media/partners/zpowa-nutrition.webp",
    alt: "Zpowa Nutrition",
    href: "https://www.zpowa.com/",
  },
  {
    src: "/assets/media/partners/mind-body-shift.webp",
    alt: "Mind Body Shift",
    href: "https://www.mindbodyshift.net/",
  },
  {
    src: "/assets/media/partners/nygeneralrenovation.webp",
    alt: "NY General Renovation",
    href: "https://www.nygeneralrenovation.com/",
  },
  {
    src: "/assets/media/partners/around-your-way-fitness.webp",
    alt: "Around Your Way Fitness",
    href: "https://www.aroundyourwayfitness.com/",
  },
];

const Achievements = [
  { label: "Clients", value: "25+" },
  { label: "Years Experience", value: "5+" },
  { label: "Avg Delivery", value: "6–8 weeks" },
  { label: "NPS", value: "72" },
];

const Wins = [
  "Launched MVP (Minimum Viable Product) within 6 weeks",
  "Cut onboarding time by 43%",
  "Reduced infrastructure cost by 28%",
  "Improved Core Web Vitals by 200ms",
];

const TrustBar = async () => {
  const testimonials = await getTestimonials();

  const testimonial = testimonials.docs[0];
  return (
    <section
      id="trust-bar"
      className="py-24 max-sm:py-16 px-8 max-sm:px-4 bg-gradient-none"
    >
      <section className="relative container mx-auto flex flex-col gap-12">
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 bottom-0 bg-grid-pattern bg-grid-pattern-lg opacity-5"
          aria-hidden="true"
        />

        <SectionTitle
          className="text-end items-end ml-auto max-w-3xl"
          title="Trusted by Startups & SMBs"
          description="25+ Clients. 5+ Years. 0 Drama."
          subtitle="Logos, ratings, and one-line outcomes."
          tagline="Proof you can bank on"
        />

        <Marquee className="flex">
          {Partners.map((partner, idx) => (
            <Link href={partner.href} key={idx}>
              <img
                key={idx}
                src={partner.src}
                alt={partner.alt}
                width={256}
                height={256}
                loading="lazy"
                className="w-24 object-contain mx-8 aspect-square border border-neutral-300/75 dark:border-neutral-700/75 rounded-full"
              />
            </Link>
          ))}
        </Marquee>

        <div className="flex justify-between max-sm:flex-wrap gap-2">
          {Achievements.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {stat.label}
              </p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div
          id="testimonials"
          className="relative z-10 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur p-6 flex flex-col gap-6"
        >
          <div className="flex justify-between gap-2">
            <SectionTitle
              title="What clients say"
              description="See what our clients have to say about our services"
              subtitle="Specific, credible, metric-backed quotes"
              tagline="All in one place"
              className="text-start mr-auto items-start"
            />
            <CTAButtons />
          </div>

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
                  {testimonial.image && (
                    <Image
                      src={getImageMediaUrl(testimonial.image)}
                      alt={testimonial.name}
                      width={256}
                      height={256}
                      className="w-full h-full object-cover filter grayscale contrast-100 rounded-full"
                    />
                  )}
                </div>
              </div>
              <div className="ml-4 flex items-start justify-between w-full">
                <div>
                  <h1 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                    {testimonial.name}
                  </h1>
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
        </div>
      </section>
    </section>
  );
};

export default TrustBar;
