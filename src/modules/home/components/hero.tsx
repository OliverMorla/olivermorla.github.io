import {
  MotionDiv,
  MotionH2,
  MotionText,
} from "@/components/helpers/blur-lazy-motion";
import Counter from "@/components/ui/counter";
import CTAButtons from "@/modules/app/components/cta-buttons";
import ParallaxText from "@/modules/app/components/parallel-text";
import Particles from "@/modules/app/components/particles";
import Typewriter from "@/modules/app/components/typewriter";
import { pages } from "@/modules/app/lib/constants";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="home"
      className="bg-gradient-none-inverted relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-8 py-24 max-sm:px-4"
    >
      <section className="container mx-auto flex flex-col-reverse items-center justify-between gap-12 md:flex-row">
        <div className="flex w-full max-w-2xl flex-col gap-6">
          <div className="flex flex-col gap-2">
            <MotionText delay={0.2} className="flex items-center gap-2">
              <span className="text-gradient-normal">——</span>
              {pages.home.tagline}
            </MotionText>
            <MotionH2
              delay={0.4}
              className="flex items-center gap-2 text-4xl max-lg:text-2xl max-sm:text-xl"
            >
              <span className="text-4xl leading-none font-light max-lg:text-2xl max-sm:text-xl">
                {pages.home.byline}
              </span>
              <Typewriter
                animationDelayMs={2000}
                className="text-gradient-normal font-bold"
                text={[
                  "Software Developer",
                  "Web Developer",
                  "Mobile Developer",
                ]}
              />
            </MotionH2>
          </div>
          <MotionText delay={0.6} className="text-muted">
            {pages.home.description}
          </MotionText>

          <div className="flex justify-between gap-6">
            {pages.home.stats.map((stat, idx) => (
              <MotionDiv
                key={idx}
                delay={0.1 * idx}
                className="flex flex-col items-center"
              >
                <h1 className="flex text-lg font-bold sm:text-xl">
                  <Counter targetCount={stat.value} duration={1000} />
                  <span>+</span>
                </h1>
                <p className="text-muted text-xs font-light sm:text-sm">
                  {stat.title}
                </p>
              </MotionDiv>
            ))}
          </div>
          <MotionDiv delay={1}>
            <CTAButtons />
          </MotionDiv>
        </div>

        <MotionDiv
          delay={1.2}
          className="image-morph relative h-full w-full max-w-md"
        >
          <Image
            src={"/assets/media/portrait_1.webp"}
            priority
            width={1024}
            height={1024}
            alt="portrait_1"
            className="object-cover grayscale"
          />
        </MotionDiv>
      </section>

      <MotionDiv delay={1.4} className="absolute left-0 bottom-0 w-full">
        <ParallaxText baseVelocity={-2}>
          Web Development. Mobile Development. UI/UX Web Design.
        </ParallaxText>
      </MotionDiv>

      <Particles />
    </section>
  );
};

export default Hero;
