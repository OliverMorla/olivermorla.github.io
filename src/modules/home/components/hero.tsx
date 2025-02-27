import Link from "next/link";
import Image from "next/image";

import { media, socialMediaLinks } from "@/constants";

import ParallaxText from "@/components/ui/ParallelText";
import { Counter } from "@/components/helpers/Counter";

import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionLi,
  MotionText,
} from "@/components/helpers/dynamic/Motion";
import ButtonLink from "@/components/shared/ui/dynamic/ButtonLink";
import Particles from "@/modules/app/components/particles";
import Typewriter from "@/modules/app/components/typewriter";
import FontAwesomeIcon from "@/modules/app/components/dynamic/font-awesome-icon";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen py-16 sm:py-32 px-4 sm:px-8 flex flex-col justify-center"
    >
      <div className="w-full h-full flex flex-col-reverse md:flex-row items-center justify-evenly gap-8 md:gap-6 z-20">
        <div className="w-full flex flex-col gap-6 md:gap-4 max-w-xl max-lg:max-w-full text-center md:text-left">
          <div className="flex flex-col gap-2">
            <MotionH1
              delay={0.2}
              className="flex items-center gap-2 text-xl sm:text-2xl font-light justify-center md:justify-start flex-wrap"
            >
              Hey There! I&apos;m <span className="font-bold">Oliver</span>
              And I&apos;m a
            </MotionH1>
            <MotionH2
              delay={0.4}
              className="font-bold text-5xl max-lg:text-4xl max-sm:text-3xl leading-16"
            >
              <Typewriter
                text={[
                  "Software Developer",
                  "Web Developer",
                  "Mobile Developer",
                ]}
              />
            </MotionH2>
            <MotionText delay={0.6} className="text-neutral-500">
              With a passion for building scalable and efficient web
              applications. I&apos;m also a full stack developer with a passion
              for building scalable and efficient web applications.
            </MotionText>
          </div>

          <MotionDiv
            y={40}
            className="flex max-sm:flex-col justify-center md:justify-between gap-6"
          >
            <ButtonLink
              href="mailto:olivermorla3@gmail.com"
              faPresetIcon="paperPlane"
              className="w-full sm:w-48"
            >
              Hire me
            </ButtonLink>
            <div className="flex flex-col items-center">
              <h1 className="text-lg sm:text-xl font-bold flex">
                <Counter targetCount={4} duration={1000} /> <span>+</span>
              </h1>
              <p className="opacity-60 font-light text-xs sm:text-sm">
                Experience
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-lg sm:text-xl font-bold flex">
                <Counter targetCount={18} duration={1000} /> <span> + </span>
              </h1>
              <p className="opacity-60 font-light text-xs sm:text-sm">
                Projects
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-lg sm:text-xl font-bold flex">
                <Counter targetCount={24} duration={1000} />
              </h1>
              <p className="opacity-60 font-light text-xs sm:text-sm">Age</p>
            </div>
          </MotionDiv>

          <ul className="flex justify-center md:justify-between text-3xl sm:text-4xl gap-6">
            {socialMediaLinks.map((item, index) => (
              <MotionLi
                y={40}
                key={index}
                delay={index * 0.2}
                aria-label={item.title}
                className="hover:text-blue-300 active:text-blue-600 transition-colors ease-in cursor-pointer"
              >
                <Link href={item.href} aria-label={item.title}>
                  <FontAwesomeIcon icon={item.iconUrl} />
                </Link>
              </MotionLi>
            ))}
          </ul>
        </div>

        <MotionDiv
          x={40}
          delay={0.4}
          className="relative w-48 h-48 sm:w-80 sm:h-80 md:w-[500px] md:h-[500px] image-morph"
        >
          <Image
            src={media.portrait}
            width={500}
            height={500}
            className="object-cover"
            alt={Object.keys(media)[0]}
            priority
          />
        </MotionDiv>
      </div>

      <MotionDiv scale={false} className="absolute bottom-0 left-0 w-full">
        <ParallaxText baseVelocity={-2}>
          Web Development. Mobile Development. UI/UX Web Design.
        </ParallaxText>
      </MotionDiv>

      <Particles />
    </section>
  );
};

export default Hero;
