import CTAButtons from "@/modules/app/components/cta-buttons";
import SectionTitle from "@/modules/app/components/section-title";
import { listOfServices, pages } from "@/modules/app/lib/constants";
import ServiceCard from "@/modules/services/components/card";
import { cn } from "@/utils/classNames";

const Services = () => (
  <section
    id="services"
    className="bg-gradient-none-inverted flex flex-col gap-12 px-4 py-24 sm:px-8"
  >
    <SectionTitle
      className="mx-auto max-w-2xl text-center"
      title={pages.services.title}
      description={pages.services.description}
      subtitle={pages.services.subtitle}
      tagline={pages.services.tagline}
    />

    <ul className="container mx-auto grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:pb-10">
      {listOfServices.map((service, idx) => (
        <li
          key={service.title}
          // Offset the outer cards on wide screens for a staggered rhythm.
          className={cn(idx % 2 === 0 && "xl:translate-y-10")}
        >
          <ServiceCard service={service} />
        </li>
      ))}
    </ul>

    <div className="mx-auto mt-2 flex max-w-lg flex-col items-center gap-3 text-center">
      <CTAButtons />
      <p className="text-muted text-sm">
        Prices may vary depending on the complexity of the project. Please
        contact me for more information.
      </p>
    </div>
  </section>
);

export default Services;
