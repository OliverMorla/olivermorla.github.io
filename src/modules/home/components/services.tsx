import { pages } from "@/modules/app/lib/constants";
import { listOfServices } from "@/modules/app/lib/constants";
import ServiceCard from "@/modules/services/components/card";
import CTAButtons from "@/modules/app/components/cta-buttons";
import SectionTitle from "@/modules/app/components/section-title";

const Services = () => {
  return (
    <section
      id="services"
      className="py-24 px-8 max-sm:px-4 bg-gradient-none-inverted flex flex-col gap-12"
    >
      <SectionTitle
        className="max-w-2xl mx-auto text-center"
        title={pages.services.title}
        description={pages.services.description}
        subtitle={pages.services.subtitle}
        tagline={pages.services.tagline}
      />
      <div className="flex justify-center flex-wrap gap-12 max-sm:h-full">
        {listOfServices.map((service, index) => (
          <ServiceCard
            key={index}
            index={index}
            title={service.title}
            price={service.price}
            libraries={service.libraries}
            faIconUrl={service.faIconUrl}
            description={service.description}
            features={service.features}
            totalServices={listOfServices.length}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 justify-center items-center max-w-lg mx-auto text-center">
        <CTAButtons />
        <p className="text-muted">
          Prices may vary depending on the complexity of the project. Please
          contact me for more information.
        </p>
      </div>
    </section>
  );
};

export default Services;
