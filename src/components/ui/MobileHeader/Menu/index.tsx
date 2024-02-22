"use client";

import { motion } from "framer-motion";

const MenuButton = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
  return (
    <div className="flex flex-col h-[20px] justify-between w-[30px] cursor-pointer">
      <motion.div
        className="bg-white full min-h-[1px]"
        initial={{
          rotate: 0,
        }}
        animate={{
          transformOrigin: "0% 50%",
          rotate: isMenuOpen ? 40 : 0,
        }}
      ></motion.div>
      {!isMenuOpen && <div className="bg-white w-full min-h-[1px]"></div>}
      <motion.div
        initial={{
          rotate: 0,
        }}
        animate={{
          transformOrigin: "0% 50%",
          rotate: isMenuOpen ? -40 : 0,
        }}
        className="bg-white w-full min-h-[1px]"
      ></motion.div>
    </div>
  );
};

export default MenuButton;
