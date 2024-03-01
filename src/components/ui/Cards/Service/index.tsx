"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServiceCard = ({
  title,
  description,
  fontAwesomeIconUrl,
  transitionDelay,
}: ServiceCardProps) => {
  return (
    <motion.div
      className="flex flex-col w-[525px] max-sm:w-full items-center cursor-pointer p-[20px] rounded-[10px] gap-2"
      style={{
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: transitionDelay,
        },
      }}
      whileHover={{
        scale: 1.05,
        transition: {
          duration: 0.25,
        },
        boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.5)",
      }}
    >
      <h1 className="text-6xl font-bold text-center tracking-tighter max-sm:text-4xl">
        {title}
      </h1>
      <p className="opacity-80 text-base">{description}</p>
      <FontAwesomeIcon icon={fontAwesomeIconUrl} className="text-9xl" />
    </motion.div>
  );
};

export default ServiceCard;
