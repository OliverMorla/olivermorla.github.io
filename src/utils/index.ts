import { Media } from "@/payload-types";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

/**
 * Merges an array of class names using clsx and twMerge.
 *
 * @param {...ClassValue} inputs - Array of classnames to be merged
 * @returns {string} - Merged classnames
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function cnNoTwMerge(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Returns the URL of an image (Payload Media).
 *
 * @param {Media | number | undefined} image - The image to get the URL of
 * @returns {string} - The URL of the image
 */
export const getImageUrl = (image: Media | number | undefined) => {
  if (!image) return "/assets/images/placeholder.jpg";

  if (typeof image !== "object") return "/assets/images/placeholder.jpg";

  return image.url ?? "/assets/images/placeholder.jpg";
};

/**
 * Formats a date string to a human-readable date string.
 *
 * @param {string} date - The date to format
 * @returns {string} - The formatted date
 */
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
