import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import type { Variants } from "framer-motion";
// import type { User } from "next-auth";

// Default spring animation configuration for framer-motion
const spring = {
  type: "spring",
  damping: 10,
  stiffness: 100,
};

/**
 * Merges an array of class names using clsx and twMerge.
 *
 * @param {...ClassValue} inputs - Array of classnames to be merged
 * @returns {string} - Merged classnames
 */
function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Constructs an absolute URL by appending the given path to the base URL.
 *
 * @param {string} path - String value to be appended to the base URL
 * @returns {string} - The complete URL
 * @throws {Error} - If the base URL is not defined in the environment variables
 */
function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl)
    throw new Error("Base URL is not defined in the environment variables");
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Toggles the overflow style on the body based on the condition.
 *
 * @param {boolean} condition - Boolean value to check if overflow should be hidden
 * @returns {void}
 */
function overflowHandler(condition: boolean): void {
  if (typeof document !== "undefined") {
    document.body.style.overflow = condition ? "hidden" : "auto";
  }
}

/**
 * Converts a measurement in feet and inches to centimeters.
 *
 * @param {number} feet - The number of feet.
 * @param {number} inches - The number of inches.
 * @returns {number} The equivalent measurement in centimeters.
 */
const convertFtAndInToCm = (feet: number, inches: number): number => {
  if (feet < 0 || inches < 0) {
    throw new Error("Feet and inches must be non-negative numbers");
  }
  return feet * 30.48 + inches * 2.54;
};

/**
 * Converts a measurement in cm to feet and inches.
 *
 * @param {number} cm - The measurement in centimeters
 * @returns {{feet: number, inches: number}} - The equivalent measurement in feet and inches
 */
const convertCmToFtAndIn = (cm: number): { feet: number; inches: number } => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return { feet, inches };
};

/**
 * Converts a measurement from cm to inches.
 *
 * @param {number} cm - The measurement in centimeters
 * @returns {number} - The equivalent measurement in inches
 */
const convertCmToIn = (cm: number): number => cm / 2.54;

/**
 * Utility function to create fade-in animations with delay.
 *
 * @param {number} delay - Delay time in seconds
 * @returns {Variants} - Animation variants
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

/**
 * Utility function to convert pounds (lb) to kilograms (kg).
 *
 * @param {number} lb - Weight in pounds
 * @returns {number} - Weight in kilograms
 */
const convertLbToKg = (lb: number): number => lb * 0.453592;

/**
 * Utility function to convert kilograms (kg) to pounds (lb).
 *
 * @param {number} kg - Weight in kilograms
 * @returns {number} - Weight in pounds
 */
const convertKgToLb = (kg: number): number => kg / 0.453592;

/**
 * Utility function to convert weight between kg and lb.
 *
 * @param {number} weight - Weight in kg or lb
 * @param {"kg" | "lb"} fromUnit - Current unit of the weight
 * @param {"kg" | "lb"} toUnit - Unit to convert to ("kg" or "lb")
 * @returns {number} - Converted weight
 */
const convertWeight = (
  weight: number,
  fromUnit: "kg" | "lb",
  toUnit: "kg" | "lb"
): number => {
  if (fromUnit === toUnit) return weight;
  return fromUnit === "kg" ? convertKgToLb(weight) : convertLbToKg(weight);
};

/**
 * Checks if the given date of birth (dob) is today's date.
 *
 * @param {Date | string} dob - The date of birth to check. Can be a Date object or a string.
 * @returns {boolean} - Returns true if the dob is today's date, otherwise false.
 * @throws {Error} - If dob is an invalid date
 */
const isBirthday = (dob: Date | string): boolean => {
  const dobDate = new Date(dob);
  if (isNaN(dobDate.getTime())) {
    throw new Error("Invalid date of birth");
  }
  const today = new Date();
  return (
    dobDate.getMonth() === today.getMonth() &&
    dobDate.getDate() === today.getDate()
  );
};

/**
 * Calculates the age based on the date of birth.
 *
 * @param {Date | string} dob - The date of birth as a Date object or a string.
 * @returns {number} - The calculated age.
 * @throws {Error} - If dob is an invalid date
 */
const getAge = (dob: Date | string): number => {
  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) {
    throw new Error("Invalid date of birth");
  }
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

/**
 * Converts Prisma enum values to human-readable strings.
 *
 * @param {string} str - The enum value to convert
 * @returns {string} - The human-readable string
 */
const prismaConversions = (str: string): string => {
  const enumValues: { [key: string]: string } = {
    MALE: "Male",
    FEMALE: "Female",
    NOT_SPECIFIED: "N/A",
    PHASE_ONE: "Phase One",
    PHASE_TWO: "Phase Two",
    PHASE_THREE: "Phase Three",
    PHASE_FOUR: "Phase Four",
    PHASE_FIVE: "Phase Five",
    ONGOING: "Ongoing",
    COMPLETED: "Completed",
    FAILED: "Failed",
    NOT_STARTED: "Not Started",
    IN_PROGRESS: "In Progress",
    MAINTAIN: "Maintain",
    LOSE: "Lose",
    GAIN: "Gain",
    KG: "kg",
    LB: "lb",
    CM: "cm",
    IN: "in",
    WEEK_ONE: "Week One",
    WEEK_TWO: "Week Two",
    WEEK_THREE: "Week Three",
    WEEK_FOUR: "Week Four",
    WEEK_FIVE: "Week Five",
    DREAM_PHYSIQUE: "Dream Physique",
    PHYSIQUE_AIM: "Physique Aim",
    PHYSIQUE_GOAL: "Physique Goal",
  };
  return enumValues[str] || str;
};

/**
 * Calculates the ideal weight based on height and gender.
 *
 * @param {number} heightIn - Height in inches
 * @param {"male" | "female"} gender - Gender
 * @returns {number} - The ideal weight in kilograms
 */
const getIdealWeight = (heightIn: number, gender: "male" | "female") => {
  const standard = {
    male: 50,
    female: 45.5,
  };

  return standard[gender] + 2.3 * (heightIn - 60);
};

/**
 * Gets the first letter of a string.
 *
 * @param {string} str - The input string
 * @returns {string} - The first letter of the string or an empty string
 */
const getFirstLetter = (str: string): string => str.charAt(0) || "";

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The input string
 * @returns {string} - The capitalized string
 */
const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Converts data to a specified type.
 *
 * @param {any} data - The data to convert
 * @param {"string" | "number" | "date" | "boolean"} [type] - The type to convert to
 * @returns {any} - The converted data
 */
const dataConverter = (
  data: any,
  type?: "string" | "number" | "date" | "boolean"
): any => {
  switch (data) {
    case "true":
      return true;
    case "false":
      return false;
    case "null":
      return null;
    default:
      if (type === "number" && typeof data === "string")
        return parseFloat(data);
      if (type === "boolean" && typeof data === "string")
        return data === "true";
      if (type === "date" && typeof data === "string") return new Date(data);
      return data;
  }
};

/**
 * Converts a date to a specified format.
 *
 * @param {Date} date - The date to convert
 * @param {"date" | "all" | "time"} [type="date"] - The format type
 * @returns {string} - The formatted date
 * @throws {Error} - If date is invalid
 */
const convertDate = (
  date: Date,
  type: "date" | "all" | "time" = "date"
): string => {
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }
  switch (type) {
    case "date":
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    case "time":
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    default:
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
  }
};

/**
 * Checks if a value is infinity.
 *
 * @param {number} value - The value to check
 * @returns {boolean} - True if the value is infinity, otherwise false
 */
function isInfinity(value: number): boolean {
  return value === Infinity || value === -Infinity;
}

/**
 * Checks if a value is numeric.
 *
 * @param {any} value - The value to check
 * @returns {boolean} - True if the value is numeric, otherwise false
 */
function isNumeric(value: any): boolean {
  return typeof value === "number" && !isNaN(value);
}

/**
 * Checks if a value is numeric and positive.
 *
 * @param {any} value - The value to check
 * @returns {boolean} - True if the value is numeric and positive, otherwise false
 */
function isNumericAndPositive(value: any): boolean {
  return typeof value === "number" && !isNaN(value) && value > 0;
}

/**
 * Checks if a number is valid (not NaN, not positive infinity, and not negative infinity).
 *
 * @param {any} value - The value to check
 * @returns {boolean} - True if the number is valid, otherwise false
 */
function isValidNum(value: any): boolean {
  return typeof value === "number" && isFinite(value);
}

/**
 * Checks if a user is an admin.
 *
 * @param {User} session - The user session
 * @returns {boolean} - True if the user is an admin, otherwise false
 */
// const isAdmin = (session: User | undefined): boolean | undefined =>
//   session?.role === process.env.ADMIN_ROLE &&
//   session?.email?.includes(process.env.ADMIN_AUDIENCE!);

/**
 * Converts height to different units.
 *
 * @param {string} height - The height value
 * @param {string} unit - The unit of the height value
 * @returns {{heightCm?: number, heightIn?: number, heightFt?: number}} - The converted height
 * @throws {Error} - If the height format is invalid
 */
const heightConverter = (height: string, unit: string) => {
  switch (unit) {
    case "CM":
      return { heightCm: parseFloat(height) };
    case "IN":
      return { heightIn: parseFloat(height) };
    case "FT_IN":
      const [heightFtStr, heightInStr] = height.split("'");
      const heightFt = parseInt(heightFtStr);
      const heightIn = parseInt(heightInStr);
      if (isNaN(heightFt) || isNaN(heightIn)) {
        throw new Error("Invalid height format for FT_IN");
      }
      return { heightFt, heightIn };
    default:
      return { heightCm: 0 };
  }
};

/**
 * Creates a debounced function that delays invoking the provided function until after the specified wait time.
 *
 * @param {(...args: any[]) => void} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {(...args: any[]) => void} - The debounced function
 */
const debounce = (
  func: (...args: any[]) => void,
  wait: number
): ((...args: any[]) => void) => {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * Creates a debounced function that delays invoking the provided function until after the specified wait time.
 *
 * @param {(...args: any[]) => void} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @param {boolean} [immediate=false] - If true, trigger the function on the leading edge, instead of the trailing.
 * @returns {(...args: any[]) => void} - The debounced function
 */
const debounceAdvanced = (
  func: (...args: any[]) => void,
  wait: number,
  immediate: boolean = false
): ((...args: any[]) => void) => {
  let timeout: NodeJS.Timeout | null;

  return function (this: any, ...args: any[]) {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

/**
 * Sort map for different fields.
 */
const sortMap: { [key: string]: { [key: string]: string } } = {
  name: { name: "asc" },
  nameDesc: { name: "desc" },
  price: { price: "asc" },
  priceDesc: { price: "desc" },
  createdAt: { createdAt: "asc" },
  createdAtDesc: { createdAt: "desc" },
  quantity: { quantity: "asc" },
  quantityDesc: { quantity: "desc" },
};

/**
 * Calculates the maximum heart rate based on age.
 *
 * @param {number} age - The age of the person
 * @returns {number} - The maximum heart rate
 * @throws {Error} - If age is invalid
 */
const getMaxHeartRate = (age: number): number => {
  if (age <= 0 || age > 120) {
    throw new Error("Invalid age");
  }
  return 220 - age;
};

/**
 * Calculates the target heart rate based on maximum heart rate and intensity.
 *
 * @param {number} maxHeartRate - The maximum heart rate
 * @param {number} intensity - The intensity level (between 0 and 1)
 * @returns {number} - The target heart rate
 * @throws {Error} - If intensity is out of range
 */
const getTargetHeartRate = (
  maxHeartRate: number,
  intensity: number
): number => {
  if (intensity < 0 || intensity > 1) {
    throw new Error("Intensity must be between 0 and 1");
  }
  return maxHeartRate * intensity;
};

/**
 * Converts an all-uppercase enum value to a human-readable string.
 * It capitalizes the first letter, lowercases the rest, and replaces underscores with spaces.
 *
 * @param {string} str - The enum value to convert
 * @returns {string} - The human-readable string
 */
const enumConverter = (str: string): string =>
  capitalizeEachWord(str.toLowerCase().replace(/_/g, " "));

/**
 * Capitalizes the first letter of each word in a string.
 *
 * @param {string} str - The input string
 * @returns {string} - The capitalized string
 */
const capitalizeEachWord = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Gets query parameters from a URL.
 *
 * @param {string} url - The URL to get query parameters from
 * @returns {{ [key: string]: string }} - The query parameters as an object
 * @throws {Error} - If the URL is invalid
 */
const getQueryParams = (url: string): { [key: string]: string } => {
  try {
    const params = new URLSearchParams(new URL(url).search);
    const result: { [key: string]: string } = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  } catch (error) {
    throw new Error("Invalid URL");
  }
};

/**
 * Generates a UUID.
 *
 * @returns {string} - The generated UUID
 */
const generateUUID = (): string => {
  return uuidv4();
};

export {
  spring,
  cn,
  absoluteUrl,
  overflowHandler,
  convertFtAndInToCm,
  convertCmToFtAndIn,
  convertCmToIn,
  createFadeInDelay,
  convertLbToKg,
  convertKgToLb,
  convertWeight,
  isBirthday,
  getAge,
  prismaConversions,
  getIdealWeight,
  getFirstLetter,
  capitalize,
  dataConverter,
  convertDate,
  isInfinity,
  isNumeric,
  // isAdmin,
  heightConverter,
  isNumericAndPositive,
  isValidNum,
  getMaxHeartRate,
  getTargetHeartRate,
  sortMap,
  enumConverter,
  debounce,
  debounceAdvanced,
  generateUUID,
  getQueryParams,
};
