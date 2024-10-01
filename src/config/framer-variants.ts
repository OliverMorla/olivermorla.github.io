import type { MotionConfigContext, Transition, Variants } from "framer-motion";

// Default spring animation configuration
const spring = {
  type: "spring",
  damping: 10,
  stiffness: 100,
};

// Interface for position properties
interface PositionProps {
  initialX?: number;
  initialY?: number;
  animateX?: number[] | number | string;
  animateY?: number[] | number | string;
}

// Interface for X-axis position properties
interface PositionXProps {
  initialX?: number;
  animateX?: number[] | number | string;
}

// Interface for Y-axis position properties
interface PositionYProps {
  initialY?: number;
  animateY?: number[] | number | string;
}

/**
 * Basic fade in animation with default spring transition
 * - No delay, duration, or custom transition
 */
const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

/**
 * Utility function to create fade-in animations with delay
 * @param delay - Delay time in seconds
 * @returns Variants
 */
const createFadeInDelay = (delay: number): Variants => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay,
      ...spring,
    },
  },
  exit: {
    opacity: 0,
  },
});

// Fade in animations with various delays using the utility function
const fadeInDelay2 = createFadeInDelay(0.2);
const fadeInDelay4 = createFadeInDelay(0.4);
const fadeInDelay6 = createFadeInDelay(0.6);
const fadeInDelay8 = createFadeInDelay(0.8)

/**
 * Custom fade in animation with optional position and transition
 * @param position - Position of the element before and after animation
 * @param transition - Custom transition options
 * @returns Variants
 */
const fadeInCustom = (
  position?: PositionProps,
  transition?: MotionConfigContext["transition"] & Transition
): Variants => ({
  hidden: {
    opacity: 0,
    x: position?.initialX || 0,
    y: position?.initialY || 0,
  },
  visible: {
    opacity: 1,
    x: position?.animateX || 0,
    y: position?.animateY || 0,
    transition: {
      ...(transition || spring),
    },
  },
  exit: {
    opacity: 0,
    x: position?.initialX || 0,
    y: position?.initialY || 0,
    transition: {
      ...(transition || spring),
    },
  },
});

/**
 * Custom fade in animation with slide in X-axis
 * @param position - Position of the element before and after animation
 * @param transition - Custom transition options
 * @returns Variants
 */
const fadeInCustomSlideX = (
  position?: PositionXProps,
  transition?: MotionConfigContext["transition"] & Transition
): Variants => ({
  hidden: {
    opacity: 0,
    x: position?.initialX || 0,
  },
  visible: {
    opacity: 1,
    x: position?.animateX || 0,
    transition: {
      ...(transition || spring),
    },
  },
  exit: {
    opacity: 0,
    x: position?.initialX || 0,
    transition: {
      ...(transition || spring),
    },
  },
});

/**
 * Custom fade in animation with slide in Y-axis
 * @param position - Position of the element before and after animation
 * @param transition - Custom transition options
 * @returns Variants
 */
const fadeInCustomSlideY = (
  position?: PositionYProps,
  transition?: MotionConfigContext["transition"] & Transition
): Variants => ({
  hidden: {
    opacity: 0,
    y: position?.initialY || 0,
  },
  visible: {
    opacity: 1,
    y: position?.animateY || 0,
    transition: {
      ...(transition || spring),
    },
  },
  exit: {
    opacity: 0,
    y: position?.initialY || 0,
    transition: {
      ...(transition || spring),
    },
  },
});

export {
  fadeIn,
  fadeInDelay2,
  fadeInDelay4,
  fadeInDelay6,
  fadeInDelay8,
  fadeInCustom,
  fadeInCustomSlideX,
  fadeInCustomSlideY,
};
