import { listOfServices } from "@/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/ui/Cards/Service";

const ServicesSection = () => {
  return (
    <section
      className="h-auto bg-[--color-dark-gray] text-[--text-color] flex flex-col p-10"
      id="services"
    >
      <SectionTitle
        title={"Services"}
        desc={
          "Offering tailored full-stack development services from concept to deployment, focusing on web, app, and system solutions."
        }
      />
      <div className="flex justify-center max-sm:items-center flex-wrap gap-10">
        {listOfServices.map((service, index) => (
          <ServiceCard
            transitionDelay={index}
            title={service.title}
            description={service.description}
            fontAwesomeIconUrl={service.fontAwesomeIconUrl}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
