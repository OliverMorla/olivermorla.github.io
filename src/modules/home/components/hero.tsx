import Image from "next/image";
import Particles from "@/modules/app/components/particles";
import {
  MotionDiv,
  MotionH2,
  MotionText,
} from "@/components/helpers/blur-lazy-motion";
import Counter from "@/components/ui/counter";
import { pages } from "@/modules/app/lib/constants";
import CTAButtons from "@/modules/app/components/cta-buttons";
import ParallaxText from "@/modules/app/components/parallel-text";
// import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import Typewriter from "@/modules/app/components/typewriter"; 

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-center bg-gradient-none py-24 px-8 max-sm:px-4 overflow-x-hidden"
    >
      <section className="mx-auto container flex flex-col-reverse md:flex-row justify-between items-center gap-12">
        <div className="w-full flex flex-col gap-6 max-w-2xl">
          <div className="flex flex-col gap-2">
            <MotionText delay={0.2} className="flex items-center gap-2">
              <span className="text-gradient-normal">——</span>
              {pages.home.tagline}
            </MotionText>
            {/* <MotionH1 delay={0.4} className="text-2xl font-light">
              {pages.home.title}
            </MotionH1> */}
            <MotionH2
              delay={0.4}
              className="flex items-center gap-2 text-4xl max-lg:text-2xl max-sm:text-xl"
            >
              <span className="text-4xl max-lg:text-2xl max-sm:text-xl font-light leading-none">
                Hi, I&apos;m Oliver ——
              </span>
              <Typewriter
                animationDelayMs={2000}
                className="font-bold text-gradient-normal"
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
                <h1 className="text-lg sm:text-xl font-bold flex">
                  <Counter targetCount={stat.value} duration={1000} />
                  <span>+</span>
                </h1>
                <p className="opacity-60 font-light text-xs sm:text-sm">
                  {stat.title}
                </p>
              </MotionDiv>
            ))}
          </div>
          <MotionDiv delay={1}>
            <CTAButtons />
          </MotionDiv>

          {/* 
          <ul className="flex justify-center md:justify-between text-3xl sm:text-4xl gap-6">
            {socialMediaLinks.map((item, idx) => (
              <li
                key={idx}
                className="hover:text-indigo-300/75 active:text-indigo-600/75 transition-colors ease-in cursor-pointer"
              >
                <Link href={item.href} aria-label={item.title}>
                  <Icon icon={item.iconUrl} />
                </Link>
              </li>
            ))}
          </ul> */}
        </div>

        <MotionDiv
          delay={1.2}
          className="relative w-full max-w-md h-full image-morph"
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

      <MotionDiv className="absolute bottom-0 w-full">
        <ParallaxText baseVelocity={-2}>
          Web Development. Mobile Development. UI/UX Web Design.
        </ParallaxText>
      </MotionDiv>

      <Particles />
    </section>
  );
};

export default Hero;
