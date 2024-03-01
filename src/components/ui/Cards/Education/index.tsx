"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EducationCard = ({
  educationInstitution,
  educationDegree,
  fontAwesomeIconUrl,
}: EducationCardProps) => {
  return (
    <motion.div
      className="flex flex-col text-[--text-color]"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.3 },
      }}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <motion.span className="flex bg-gradient-to-r from-indigo-500 to to-blue-500 p-4 rounded-2xl font-semibold text-white items-center gap-2">
            <FontAwesomeIcon
              icon={fontAwesomeIconUrl}
              className="text-4xl text-[--tertiary]"
            />

            {educationInstitution}
          </motion.span>
          /<span className="opacity-80">{educationDegree}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationCard;
