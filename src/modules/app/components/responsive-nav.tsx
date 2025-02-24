import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { MotionButton, MotionDiv, MotionLi } from "@/components/helpers/Motion";
import Portal from "@/components/helpers/Portal";
import { AnimatePresence } from "motion/react";
import { headerPrimaryLinks } from "@/constants";
const ResponsiveNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="lg:hidden fixed top-0 right-0 z-50">
      <MotionButton
        rotate={isOpen ? 90 : 0}
        onClick={handleClick}
        className="bg-neutral-200/25 dark:bg-neutral-700/25 backdrop-blur-sm m-2 cursor-pointer hover:bg-neutral-300/50 dark:hover:bg-neutral-800/50 active:bg-neutral-400/75 dark:active:bg-neutral-700/75"
      >
        <Menu width={50} height={50} className="p-0 m-0" />
      </MotionButton>

      <Portal>
        <AnimatePresence mode="wait">
          {isOpen && (
            <MotionDiv
              scale={false}
              transition={{
                type: "tween",
                duration: 0.2,
              }}
              onClick={handleClick}
              className="fixed top-0 right-0 z-40 w-full h-full bg-black/50 dark:bg-neutral-950/50 backdrop-blur-sm"
            >
              <ul className="flex flex-col gap-6 items-center justify-center h-full">
                {headerPrimaryLinks.map((link, index) => (
                  <MotionLi
                    y={20}
                    key={index}
                    type="tween"
                    scale={false}
                    className="hover:bg-neutral-300/50 dark:hover:bg-neutral-800/50 active:bg-neutral-400/75 dark:active:bg-neutral-700/75 px-4 py-2 rounded-md transition-colors"
                  >
                    <Link href={link.href} className="text-neutral-50">{link.title}</Link>
                  </MotionLi>
                ))}
              </ul>
            </MotionDiv>
          )}
        </AnimatePresence>
      </Portal>
    </nav>
  );
};

export default ResponsiveNav;
