"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const RepositoryCard = ({
  name,
  html_url,
  homepage,
  description,
}: RepositoryCardProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -100,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      className="bg-[--color-electric-purple] p-4 rounded-lg "
    >
      <Link href={html_url} className="flex flex-col">
        <h3 className="text-white font-bold">{name}</h3>
        <p className="text-white opacity-80">{description}</p>
      </Link>
    </motion.div>
  );
};

export default RepositoryCard;
