import type { Media } from "@/payload-types";

const PLACEHOLDER = { src: "/placeholder.svg", width: 1200, height: 1200 };

export type MediaImage = { src: string; width: number; height: number };

/**
 * Resolves a Payload upload (populated doc or bare ID) to `next/image` props.
 * Intrinsic dimensions come from the upload so the browser can reserve space
 * before the image loads (no layout shift).
 */
export const getMediaImage = (
  image: Media | number | null | undefined,
): MediaImage => {
  if (!image || typeof image === "number" || !image.url) return PLACEHOLDER;

  return {
    src: image.url,
    width: image.width ?? PLACEHOLDER.width,
    height: image.height ?? PLACEHOLDER.height,
  };
};

export const getImageMediaUrl = (image: Media | number | null | undefined) =>
  getMediaImage(image).src;

export const payloadKeyBuilder = ({
  collection,
  filename,
}: {
  collection: string;
  filename: string;
}) => {
  return `/api/${collection}/file/${filename}`;
};
