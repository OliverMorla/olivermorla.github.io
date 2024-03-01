// Type Definitions
import type { Metadata } from "next";

// Google Font Imports
import { Roboto } from "next/font/google";

// Component Imports
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

// Third-Party Utilities
import { GoogleAnalytics } from "@next/third-parties/google";

// Provider Imports
import { ThemeProvider } from "@/providers/theme-provider";

// Global Stylesheet Import
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["100", "300", "400", "500", "700", "900"],
  adjustFontFallback: true,
  fallback: ["sans-serif", "serif"],
});

export const metadata: Metadata = {
  title: "Oliver Morla",
  description:
    "Oliver Morla's personal full-stack web app built with Next.js, TypeScript, and Tailwind CSS.",
  keywords: [
    "Oliver Morla",
    "Oliver",
    "Morla",
    "Porfolio",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ],
  category: "Personal",
  publisher: "Oliver Morla",
  creator: "Oliver Morla",
  icons: {
    icon: "/assets/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return null;

  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={roboto.className}>
          <Header />
          {children}
          <Footer />
          <GoogleAnalytics gaId={measurementId} />
        </body>
      </ThemeProvider>
    </html>
  );
}
