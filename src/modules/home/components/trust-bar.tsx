import { Marquee } from "@/components/helpers/marquee";
import { getTestimonials } from "@/lib/payload/server/queries";
import CTAButtons from "@/modules/app/components/cta-buttons";
import SectionTitle from "@/modules/app/components/section-title";
import {
  Rating,
  TestimonialAuthor,
} from "@/modules/testimonial/components/card";
import Image from "next/image";

const partners = [
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
  {
    src: "/assets/media/partners/mirzas-construction.webp",
    alt: "Mirzas Construction",
    href: "https://www.mirzasconstruction.com/",
  },
  {
    src: "/assets/media/partners/crunch-fitness.webp",
    alt: "Crunch Fitness Utilities",
    href: "https://www.crunchfitness.app/",
  },
];

const achievements = [
  { label: "Clients", value: "25+" },
  { label: "Years", value: "5+" },
  { label: "Delivery", value: "4–8 weeks" },
  { label: "NPS", value: "72" },
];

const TrustBar = async () => {
  const [testimonial] = await getTestimonials();

  return (
    <section
      id="trust-bar"
      className="bg-gradient-none px-4 pt-24 pb-16 sm:px-8 sm:pt-36"
    >
      <div className="relative container mx-auto flex flex-col gap-12">
        <div
          aria-hidden
          className="bg-grid-pattern bg-grid-pattern-lg pointer-events-none absolute inset-0 opacity-5"
        />

        <SectionTitle
          className="ml-auto max-w-3xl items-end text-end"
          title="Trusted by Startups & SMBs"
          description="25+ Clients. 5+ Years. 0 Drama."
          subtitle="Logos, ratings, and one-line outcomes."
          tagline="Proof you can bank on"
        />

        <Marquee aria-label="Clients">
          {partners.map((partner) => (
            <a
              key={partner.href}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-6 shrink-0 rounded-full transition-opacity hover:opacity-80 active:opacity-60"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={96}
                height={96}
                sizes="96px"
                className="aspect-square size-24 rounded-full border border-neutral-300 object-contain dark:border-neutral-700"
              />
            </a>
          ))}
        </Marquee>

        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {achievements.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse items-center text-center"
            >
              <dt className="text-muted text-sm">{stat.label}</dt>
              <dd className="text-lg font-bold sm:text-xl">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="relative z-10 flex flex-col gap-6 rounded-xl border border-neutral-300/60 bg-neutral-200/50 p-4 backdrop-blur sm:p-6 dark:border-neutral-700/60 dark:bg-neutral-800/50">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <SectionTitle
              title="What clients say"
              description="See what our clients have to say about our services"
              subtitle="Specific, credible, metric-backed quotes"
              tagline="All in one place"
              className="mr-auto items-start text-start"
            />
            <CTAButtons className="lg:max-w-md" />
          </div>

          {testimonial && (
            <figure className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900">
              <Rating value={testimonial.rating} />
              <blockquote>
                <p className="line-clamp-4 font-light">
                  &ldquo;{testimonial.message}&rdquo;
                </p>
              </blockquote>
              <TestimonialAuthor testimonial={testimonial} />
            </figure>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
