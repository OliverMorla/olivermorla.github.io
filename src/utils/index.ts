import { Media } from "@/payload-types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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


export const getImageUrl = (image: Media | number | undefined) => {
  if (!image) return "/assets/images/placeholder.jpg";

  if (typeof image !== "object") return "/assets/images/placeholder.jpg";

  return image.url ?? "/assets/images/placeholder.jpg";
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
