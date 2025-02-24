import { listOfServices } from "@/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/ui/Cards/Service";
import ButtonLink from "@/components/shared/ui/ButtonLink";

const Services = () => {
  return (
    <section
      id="services"
      className="h-auto flex flex-col gap-6 py-24 px-8 max-sm:px-4 xl:gap-24"
    >
      <SectionTitle
        title={"Services"}
        desc={
          "Offering tailored full-stack development services from concept to deployment, focusing on web, app, and system solutions."
        }
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
            delay={index * 0.2}
            totalServices={listOfServices.length}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 justify-center items-center max-w-lg mx-auto text-center">
        <ButtonLink
          faPresetIcon="paperPlane"
          href="mailto:olivermorla3@gmail.com"
        >
          Get Started
        </ButtonLink>
        <p className="font-medium">
          Prices may vary depending on the complexity of the project. Please
          contact me for more information.
        </p>
      </div>
    </section>
  );
};

export default Services;
