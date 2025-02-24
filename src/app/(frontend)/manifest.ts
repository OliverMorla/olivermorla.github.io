import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oliver Morla",
    short_name: "Oliver Morla",
    description: "Oliver Morla",
    categories: ["developer", "full stack", "software engineer"],
    shortcuts: [
      {
        name: "Home",
        url: "/",
        icons: [{ src: "/assets/favicon.ico", sizes: "any" }],
      },
    ],
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/assets/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
