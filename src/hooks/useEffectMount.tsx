import { useEffect, useState } from "react";

/**
 * Hook to handle component mounting state with proper cleanup
 * @param callback Optional callback function to execute after mount
 * @returns boolean indicating if component is mounted
 */
const useEffectMount = (callback?: () => void | (() => void)) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Mark component as mounted

    const cleanup = callback?.(); // Execute callback and store any returned cleanup function

    return () => {
      setMounted(false); // Mark component as unmounted

      // Execute cleanup if it exists
      if (cleanup) {
        cleanup();
      }
    };
  }, [callback]); // Only re-run if callback changes

  return mounted;
};

export default useEffectMount;
