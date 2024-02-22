"use client";

import { motion } from "framer-motion";

const AchievementCard = ({
  description,
  impact,
}: {
  description: string;
  impact: string;
}) => {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.3 },
      }}
    >
      <h2 className="font-bold text-xl">{description}</h2>
      <p className="opacity-60">{impact}</p>
    </motion.div>
  );
};

export default AchievementCard;
