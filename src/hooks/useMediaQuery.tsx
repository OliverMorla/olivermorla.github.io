import React from "react";
const useMediaQuery = (query: string) => {
  const getSnapshot = React.useCallback(() => {
    const doesClientExist = typeof window !== "undefined";
    return doesClientExist ? window.matchMedia(query).matches : false;
  }, [query]);

  const getServerSnapshot = React.useCallback(() => false, [])

  const subscribe = React.useCallback(
    (notify: () => void) => {
      if (typeof window === "undefined") {
        return () => {};
      }

      // Check if the media query list is already defined
      const mediaQueryList = window.matchMedia(query);

      // Define the listener function
      const listener = (e: MediaQueryListEvent) => {
        notify();
      };

      // Add the listener to the media query list
      mediaQueryList.addEventListener("change", listener);

      // Initial check
      notify();

      // Return a function to remove the listener when the subscription is no longer needed
      return () => {
        mediaQueryList.removeEventListener("change", listener);
      };
    },
    [query]
  );

  // Create a subscription to the media query using the external store pattern
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

export default useMediaQuery;
