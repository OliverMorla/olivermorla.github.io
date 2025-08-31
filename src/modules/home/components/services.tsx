import { MotionInViewDiv } from "@/components/helpers/blur-lazy-motion";
import CTAButtons from "@/modules/app/components/cta-buttons";
import SectionTitle from "@/modules/app/components/section-title";
import { listOfServices, pages } from "@/modules/app/lib/constants";
import ServiceCard from "@/modules/services/components/card";
import { cn } from "@/utils/classNames";

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
        {listOfServices.map((service, idx) => (
          <MotionInViewDiv key={idx} delay={idx * 0.2}>
            <ServiceCard
              service={service}
              className={cn(
                idx % 2 === 0 ? "sm:translate-y-10" : "sm:translate-y-0",
              )}
            />
          </MotionInViewDiv>
        ))}
      </div>
      <MotionInViewDiv
        delay={0.2}
        className="flex flex-col gap-2 justify-center items-center max-w-lg mx-auto text-center"
      >
        <CTAButtons />
        <p className="text-muted">
          Prices may vary depending on the complexity of the project. Please
          contact me for more information.
        </p>
      </MotionInViewDiv>
    </section>
  );
};

export default Services;
