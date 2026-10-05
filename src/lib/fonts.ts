import { Inter } from "next/font/google";

// Shared by the site layout and the global 404 so both load one font file.
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
