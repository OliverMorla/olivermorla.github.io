"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { skillsIcons } from "@/constants";
import ProgresBar from "../ProgressBar";

const WheelOfFortune = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full h-full flex justify-center">
      {skillsIcons.map((icon, index) => (
        <motion.div
          key={index}
          className="text-4xl text-white mb-4"
          initial={{
            opacity: 0,
          }}
          animate={{
            rotate: 360,
            opacity: 1,
            transition: {
              duration: skillsIcons.length,
              delay: index * 1,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <FontAwesomeIcon icon={icon.fontAwesomeIconUrl} />
        </motion.div>
      ))}
      <div className="absolute self-center flex flex-col justify-center items-center gap-4">
        {children}
        {skillsIcons.map((skill, index) => (
          <div
            key={index}
            className="block max-w-2xl w-full h-[20px] relative rounded-full bg-black"
          >
            <ProgresBar progress={skill.progress} transitionDelay={index} />
            <h2 className="ml-2 font-bold absolute text-sm top-0">
              {skill.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WheelOfFortune;
