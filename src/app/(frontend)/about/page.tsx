import { MotionDiv } from "@/components/helpers/basic-lazy-motion";
import SectionTitle from "@/modules/app/components/section-title";
import { pages } from "@/modules/app/lib/constants";

const About = () => {
  return (
    <main className="w-full min-h-screen flex flex-col flex-grow items-center justify-center py-24 px-8 max-sm:px-4 bg-gradient-none">
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto container flex flex-col"
      >
        <div className="flex flex-col gap-6 py-48">
          <SectionTitle
            title={pages.about.title}
            tagline={pages.about.tagline}
            subtitle={pages.about.subtitle}
            className="text-center mx-auto items-center"
          />
        </div>
        {/* <AboutSection /> */}
        <h1 className="text-2xl font-light text-center">
          No content yet, come back later.
        </h1>
      </MotionDiv>
    </main>
  );
};

export default About;
