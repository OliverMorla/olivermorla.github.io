import { Media } from "@/payload-types";

export const getImageMediaUrl = (image: Media | number) => {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error("Missing Environment Variable: NEXT_PUBLIC_BASE_URL");
  }

  if (typeof image === "number") {
    return `/placeholder.svg`;
  }

  return image.url ?? "/placeholder.svg";
};

// export const getVideoMediaUrl = (video: Video | number) => {
//   if (!process.env.NEXT_PUBLIC_BASE_URL) {
//     throw new Error("Missing Environment Variable: NEXT_PUBLIC_BASE_URL");
//   }

//   if (typeof video === "number") {
//     return `/assets/videos/placeholder.mp4`;
//   }

//   return `${process.env.NEXT_PUBLIC_BASE_URL}${video.url}`;
// };

export const payloadKeyBuilder = ({
  collection,
  filename,
}: {
  collection: string;
  filename: string;
}) => {
  return `/api/${collection}/file/${filename}`;
};
