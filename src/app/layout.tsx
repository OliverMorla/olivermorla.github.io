// Type Definitions
import type { Metadata, Viewport } from "next";

// Google Font Imports
import { Roboto } from "next/font/google";

// Component Imports
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

// Third-Party Utilities
// import { GoogleAnalytics } from "@next/third-parties/google";

// Provider Imports
import { ThemeProvider } from "next-themes";

// Global Stylesheet Import
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["100", "300", "400", "500", "700", "900"],
  fallback: ["sans-serif", "serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Oliver Morla - Software Engineer & Full Stack Developer",
  abstract:
    "Empowering your business with reliable, scalable digital solutions",
  description:
    "Experienced full stack developer specializing in building scalable and efficient web applications. Skilled in both front-end and back-end technologies, delivering optimized solutions for modern digital needs.",
  metadataBase: new URL("https://www.olivermorla.com"),
  manifest: "/manifest.json",
  generator: "Next.js",
  alternates: {
    canonical: "https://www.olivermorla.com",
  },
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "Web Development",
    "JavaScript",
    "React",
    "Scalable Applications",
    "Web Solutions",
    "Next.js",
    "Node.js",
    "Express",
    "HTML",
    "CSS",
    "Oliver Morla",
  ],
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/favicon-32x32.png",
  },
  authors: [{ name: "Oliver Morla", url: "https://www.olivermorla.com" }],
  applicationName: "Oliver Morla - Software Engineer & Full Stack Developer",
  category: "Software Development",
  bookmarks: "https://www.olivermorla.com",
  creator: "Oliver Morla",
  publisher: "Oliver Morla",

  // Open Graph Meta Tags for Social Media Sharing
  openGraph: {
    title: "Oliver Morla - Software Engineer & Full Stack Developer",
    description:
      "Experienced full stack developer specializing in building scalable and efficient web applications. Skilled in both front-end and back-end technologies, delivering optimized solutions for modern digital needs.",
    type: "website",
    url: "https://www.olivermorla.com",
    siteName: "Oliver Morla",
    locale: "en_US",
    images: [
      {
        url: "https://www.olivermorla.com/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Photo of Oliver Morla - Software Engineer & Full Stack Developer",
      },
    ],
  },

  // Twitter Card Meta Tags
  twitter: {
    card: "summary_large_image",
    site: "@olivermorlax",
    creator: "@OliverMorlaX",
    title: "Oliver Morla - Software Engineer & Full Stack Developer",
    description:
      "Experienced full stack developer specializing in building scalable and efficient web applications. Skilled in both front-end and back-end technologies, delivering optimized solutions for modern digital needs.",
    images: [
      {
        url: "https://www.olivermorla.com/images/twitter-card.webp",
        width: 1200,
        height: 630,
        alt: "Photo of Oliver Morla - Software Engineer & Full Stack Developer",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  viewportFit: "cover",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return null;

  // const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Header />
          {children}
          <Footer />
          {/* <GoogleAnalytics gaId={measurementId} /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
