import { PHProvider } from "@/providers/posthog-provider";
import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./origin.css";

// Its own root layout, so the preview doesn't inherit the current site's
// header, footer or global styles. Inter is the live site's face; Geist Mono
// replaces the system monospace the typewriter fell back to, so it renders
// the same on every OS.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.olivermorla.com"),
  title: "Oliver Morla | Senior Full-Stack Developer",
  description:
    "Senior full-stack developer in New York. I design, build and launch web and mobile apps for founders and small businesses.",
  robots: { index: false, follow: false },
  icons: { icon: "/assets/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  viewportFit: "cover",
  themeColor: "#050506",
};

export default function OriginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-US"
      className={`${inter.variable} ${mono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <PHProvider>{children}</PHProvider>
      </body>
    </html>
  );
}
