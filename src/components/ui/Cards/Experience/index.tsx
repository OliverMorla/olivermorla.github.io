"use client";
import { motion } from "framer-motion";

const ExperienceCard = ({
  companyName,
  jobPosition,
  jobLocation,
  jobStartDate,
  jobEndDate,
  jobResponsibilities,
}: ExperienceCardProps) => {
  return (
    <motion.div
      className="flex justify-center max-sm:flex-col"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.3 },
      }}
    >
      <div className="flex flex-col items-center min-w-[250px]">
        <h2 className="font-bold text-xl text-white">{companyName}</h2>
        {companyName !== "SR Tech" && (
          <div className="h-full w-[1px] bg-[--color-electric-purple]"></div>
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="italic font-bold">
          <span>{jobPosition} / </span>
          <span className="text-xs font-normal"> {jobLocation}</span>
        </h3>
        <p className="opacity-40 text-xs">
          {jobStartDate} - {jobEndDate}
        </p>
        <ul className="opacity-80 list-disc w-[800px] max-lg:w-full">
          {jobResponsibilities.map((desc: string, index: number) => (
            <li className="ml-10" key={index}>
              {desc}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
