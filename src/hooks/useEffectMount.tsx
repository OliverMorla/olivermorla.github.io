import { useEffect, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Hook to handle component mounting state with proper cleanup
 * @param callback Optional callback function to execute after mount
 * @returns boolean indicating if component is mounted
 */
const useEffectMount = (callback?: () => void | (() => void)) => {
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (!mounted) {
      return;
    }

    return callback?.();
  }, [mounted, callback]);

  return mounted;
};

export default useEffectMount;
