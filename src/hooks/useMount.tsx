import React from "react";

/**
 * Custom hook to track the mount status of a component.
 *
 * @returns {object} - An object containing the `isMounted` ref.
 *                     Use `isMounted.current` to access the current mount status.
 */
const useMount = () => {
  // Create a ref to hold the mounted status.
  const isMounted = React.useRef<boolean>(false);

  React.useEffect(() => {
    // Set isMounted.current to true when the component mounts.
    isMounted.current = true;

    // Cleanup function to set isMounted.current to false when the component unmounts.
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Return the isMounted ref so that it can be accessed in the component.
  return {
    isMounted, // Return the ref, not its current value.
  };
};

export default useMount;
