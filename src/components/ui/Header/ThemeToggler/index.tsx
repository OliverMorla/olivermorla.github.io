"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/providers/theme-provider";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ThemeToggler = () => {
  const { currentTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    const currentBackgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-dark-gray")
      .trim();

    // Assuming you have two colors to toggle between
    const newBackgroundColor = currentTheme !== "dark" ? "#171717" : "#E1E1E8";
    const newTextColor = currentTheme !== "dark" ? "#E1E1E8" : "#171717";

    document.documentElement.style.setProperty(
      "--color-dark-gray",
      newBackgroundColor
    );
    document.documentElement.style.setProperty("--text-color", newTextColor);
  };

  return (
    <motion.li
      className="absolute right-0 p-4"
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: 1.2 },
      }}
    >
      <div className="bg-[--color-slate-gray] p-2 rounded-full flex items-center justify-center w-[35px] h-[35px]">
        {currentTheme === "dark" && (
          <motion.button
            onClick={() => {
              toggleTheme();
              setTheme("light");
            }}
            initial={{
              y: 40,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
          >
            <FontAwesomeIcon icon={faSun} width={25} height={25} />
          </motion.button>
        )}
        {currentTheme === "light" && (
          <motion.button
            onClick={() => {
              toggleTheme();
              setTheme("dark");
            }}
            initial={{
              y: 40,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
          >
            <FontAwesomeIcon icon={faMoon} width={25} height={25} />
          </motion.button>
        )}
      </div>
    </motion.li>
  );
};

export default ThemeToggler;
