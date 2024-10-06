import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      writingMode: {
        "vertical-rl": "vertical-rl",
        "vertical-lr": "vertical-lr",
        "horizontal-tb": "horizontal-tb",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
