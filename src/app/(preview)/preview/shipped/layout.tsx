import { PHProvider } from "@/providers/posthog-provider";
import type { Metadata, Viewport } from "next";
import { Mona_Sans } from "next/font/google";
import "./shipped.css";

// Its own root layout, so the preview doesn't inherit the current site's
// header, footer, fonts or global styles.
const mona = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.olivermorla.com"),
  title: "Oliver Morla | Senior Full-Stack Developer",
  description:
    "Senior full-stack developer in New York. I design, build and launch web and mobile apps for startups and small businesses.",
  robots: { index: false, follow: false },
  icons: { icon: "/assets/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  viewportFit: "cover",
  themeColor: "#f3f4f6",
};

export default function ShippedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={mona.variable} data-scroll-behavior="smooth">
      <body>
        <PHProvider>{children}</PHProvider>
      </body>
    </html>
  );
}
