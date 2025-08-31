import { useEffect } from "react";

/**
 * A hook that locks/unlocks body scroll by adding/removing CSS classes
 * @param isLocked - Whether scroll should be locked
 */
export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      const scrollPosition = window.scrollY;
      // Add scroll lock class
      document.body.style.top = `-${scrollPosition}px`;
      document.body.classList.add("scroll-lock");
    } else {
      const scrollPosition = Math.abs(
        Number(document.body.style.top.split("px")[0])
      );

      // Remove scroll lock class
      document.body.style.removeProperty("top");
      document.body.classList.remove("scroll-lock");

      if (scrollPosition) {
        window.scrollTo({
          top: scrollPosition,
          behavior: "instant",
        });
      }
    }

    // Cleanup function to ensure scroll is restored when component unmounts
    return () => {
      document.body.classList.remove("scroll-lock");
    };
  }, [isLocked]);
}

export default useScrollLock;
