/* eslint-disable react/no-unescaped-entities */
"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

import { socialLinks } from "@/constants";

import Button from "@/components/ui/Button";
import SocialMediaButton from "@/components/ui/Button/SocialMedia";
import ParallaxText from "@/components/ui/ParallelText";
import { Counter } from "@/components/helpers/Counter";

import TypewriterComponent from "typewriter-effect";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const HeroSection = () => {
  const typewriterInit = useCallback((typewriter: any) => {
    typewriter
      .pauseFor(700)
      .typeString("Oliver")
      .pauseFor(4000)
      .deleteAll()
      .pauseFor(2000)
      .typeString("a")
      .start();
  }, []);
  return (
    <section
      className="relative h-screen bg-[--color-dark-gray] text-white flex items-center justify-evenly flex-wrap max-sm:p-10 max-lg:pt-[88px]"
      id="home"
    >
      <div className="max-w-[500px] w-full flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <motion.p
              className="font-light"
              initial={{
                x: -100,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 1,
                  delay: 0.5,
                },
              }}
            >
              Here There! I'm
            </motion.p>
            <motion.h1
              className="text-5xl max-sm:text-4xl"
              initial={{
                x: 100,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 1,
                  delay: 0.5,
                },
              }}
            >
              <TypewriterComponent onInit={typewriterInit} />
            </motion.h1>
          </div>
          <motion.h1
            className="text-5xl max-sm:text-4xl"
            initial={{
              x: 100,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                duration: 1,
                delay: 0.7,
              },
            }}
          >
            <TypewriterComponent
              options={{
                strings: [
                  "Web Developer",
                  "UI/UX Designer",
                  "Software Engineer",
                ],
                autoStart: true,
                loop: true,
                delay: 200,
              }}
            />
          </motion.h1>
        </div>

        <motion.div
          className="flex justify-between"
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
          <Link href={"#contact"}>
            <Button title={"Hire me"} fontAwesomeIconUrl={faPaperPlane} />
          </Link>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold flex max-sm:text-base">
              <Counter targetCount={4} duration={900} /> <span>+ Yrs</span>
            </h3>
            <p className="opacity-60 font-light max-sm:text-xs">Experience</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold flex max-sm:text-base">
              <Counter targetCount={18} duration={150} /> <span> + </span>
            </h3>
            <p className="opacity-60 font-light max-sm:text-xs">Projects</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold flex max-sm:text-base">
              <Counter targetCount={23} duration={150} />
            </h3>
            <p className="opacity-60 font-light max-sm:text-xs">Age</p>
          </div>
        </motion.div>

        <div className="text-4xl">
          <ul className="flex justify-between">
            {socialLinks.map((item, index) => (
              <SocialMediaButton
                key={index}
                title={item.title}
                pathUrl={item.pathUrl}
                iconUrl={item.iconUrl}
                transitionDelay={index}
              />
            ))}
          </ul>
        </div>
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
        className="w-full bottom-0 translate-y-[50%] z-30 absolute bg-[var(--color-eerie-black)] py-6 cursor-pointer"
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
          Web Development, App Development, UI/UX Web Design
        </ParallaxText>
      </motion.div>
    </section>
  );
};

export default HeroSection;
