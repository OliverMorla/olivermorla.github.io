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
      className={`relative w-full min-h-screen dark:bg-[var(--color-tertiary-darker)] dark:text-[var(--color-text-primary)] text-[var(--color-tertiary)] flex items-center justify-evenly gap-6 max-lg:flex-col max-lg:justify-center py-32 px-8 max-sm:px-4`}
    >
      <div className="w-full flex flex-col gap-4 max-w-xl">
        <div className="flex flex-col gap-2">
          <AnimatedText
            y={-40}
            className="text-sm bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg px-3 py-1 w-fit font-medium"
          >
            Ready to start your next project? Let's make it happen together.
          </AnimatedText>
          <div className="flex items-center gap-2">
            <AnimatedText className="font-light" x={-40} delay={0.4}>
              Hey There! I'm
            </AnimatedText>
            <AnimatedHeading
              className="font-bold text-7xl max-sm:text-6xl"
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
            className="text-6xl max-sm:text-5xl"
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
          <ButtonLink
            href="mailto:olivermorla3@gmail.com"
            faPresetIcon="paperPlane"
            className="sm:w-48"
          >
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
              <FontAwesomeIcon
                icon={item.iconUrl}
                className="hover:text-[var(--color-primary)] active:text-[var(--color-primary-dark)] transition-all duration-300 ease-in-out"
              />
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
          style={
            {
              // boxShadow: "0 2px 8px var(--color-electric-purple)",
            }
          }
          alt="self-portrait-1"
        />
      </motion.div>

      <motion.div
        className={`w-full bottom-0 z-30 absolute bg-neutral-200 dark:bg-neutral-900 py-6 cursor-pointer transition-all text-neutral-800 dark:text-neutral-100`}
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
