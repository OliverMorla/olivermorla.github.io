/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { motion } from "framer-motion";

import Image from "next/image";

import { socialMediaLinks } from "@/constants";

import ParallaxText from "@/components/ui/ParallelText";
import { Counter } from "@/components/helpers/Counter";

import Typewriter from "typewriter-effect";
import ButtonLink from "@/components/shared/ui/ButtonLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimatedText from "@/components/helpers/AnimatedText";
import AnimatedHeading from "@/components/helpers/AnimatedHeading";
import Link from "next/link";
import AnimatedDiv from "@/components/helpers/AnimatedDiv";
import AnimatedUl from "@/components/helpers/AnimatedUl";

const HeroSection = () => {
  return (
    <section
      id="home"
      className={`relative min-h-screen dark:bg-[var(--color-tertiary-darker)] dark:text-[var(--color-text-primary)] text-[var(--color-tertiary)] flex items-center justify-evenly gap-6 max-lg:flex-col p-8 max-sm:p-4 max-lg:gap-10 max-lg:justify-center`}
    >
      <div className="w-full flex flex-col gap-4 max-w-xl">
        <div className="flex flex-col gap-2">
          <AnimatedText y={-40} className="text-sm bg-blue-100 dark:bg-blue-900 rounded-lg px-3 py-1 w-fit font-medium">
            Ready to start your next project? Let's make it happen together.
          </AnimatedText>
          <div className="flex items-center gap-2">
            <AnimatedText className="font-light" x={-40} delay={0.4}>
              Here There! I'm
            </AnimatedText>
            <AnimatedHeading
              className="font-bold text-6xl max-sm:text-4xl"
              x={40}
              delay={0.6}
            >
              <Typewriter
                onInit={(typewriter) => {
                  typewriter.pauseFor(1200).typeString("Oliver").start();
                }}
              />
            </AnimatedHeading>
            <AnimatedText className="font-light" x={-40} delay={2}>
              And I'm a
            </AnimatedText>
          </div>
          <AnimatedHeading
            className="text-5xl max-sm:text-4xl"
            x={40}
            delay={2.4}
          >
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .pauseFor(2200)
                  .typeString("Web Developer")
                  .pauseFor(300)
                  .deleteAll()
                  .typeString("UI/UX Designer")
                  .pauseFor(300)
                  .deleteAll()
                  .typeString("Software Engineer")
                  .start();
              }}
              options={{
                loop: true,
              }}
            />
          </AnimatedHeading>
        </div>

        <AnimatedDiv x={40} className="flex justify-between" delay={0.8}>
          <ButtonLink href="#contact" faPresetIcon="paperPlane">
            Hire me
          </ButtonLink>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold flex max-sm:text-base">
              <Counter targetCount={4} duration={900} /> <span>+ Yrs</span>
            </h1>
            <p className="opacity-60 font-light max-sm:text-xs">Experience</p>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold flex max-sm:text-base">
              <Counter targetCount={18} duration={150} /> <span> + </span>
            </h1>
            <p className="opacity-60 font-light max-sm:text-xs">Projects</p>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold flex max-sm:text-base">
              <Counter targetCount={23} duration={150} />
            </h1>
            <p className="opacity-60 font-light max-sm:text-xs">Age</p>
          </div>
        </AnimatedDiv>
        <AnimatedUl y={40} delay={1} className="flex justify-between text-4xl">
          {socialMediaLinks.map((item, index) => (
            <Link key={index} href={item.href}>
              <FontAwesomeIcon icon={item.iconUrl} />
            </Link>
          ))}
        </AnimatedUl>
      </div>

      <motion.div
        initial={{
          x: 100,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            duration: 1,
            delay: 0.9,
          },
        }}
      >
        <Image
          src={"/assets/images/portrait/2.webp"}
          width={500}
          height={500}
          className="rounded-full"
          style={{
            boxShadow: "0 2px 8px var(--color-electric-purple)",
          }}
          alt="self-portrait-1"
        />
      </motion.div>

      <motion.div
        className={`w-full bottom-0 z-30 absolute bg-neutral-900 py-6 cursor-pointer transition-all text-white`}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 1,
            delay: 1,
          },
        }}
      >
        <ParallaxText baseVelocity={-2}>
          Web Development. Mobile Development. UI/UX Web Design.
        </ParallaxText>
      </motion.div>
    </section>
  );
};

export default HeroSection;
