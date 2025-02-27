import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import { cn } from "@/utils";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/providers/theme-provider";
import PostHogProvider from "@/providers/dynamic/posthog-provider";

import Footer from "@/modules/app/components/footer";
import Header from "@/modules/app/components/header";
import ThemeScript from "@/components/theme-script";

import "@/app/(frontend)/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  fallback: ["sans-serif"],
  preload: true,
});

// const montserrat = Montserrat({
//   variable: "--font-montserrat",
//   subsets: ["latin"],
//   fallback: ["sans-serif"],
//   preload: true,
// });

export const metadata: Metadata = {
  title: {
    default: "Oliver Morla | Full Stack Developer",
    template: "%s | Oliver Morla",
  },
  abstract:
    "Empowering your business with reliable, scalable digital solutions",
  description:
    "Experienced full stack developer specializing in building scalable and efficient web applications. Skilled in both front-end and back-end technologies, delivering optimized solutions for modern digital needs.",
  creator: "OliverMorla",
  applicationName: "Oliver Morla | Full Stack Developer",
  authors: [{ name: "OliverMorla", url: "https://github.com/OliverMorla" }],
  keywords: ["Next.js", "React", "Tailwind CSS"],
  category: "technology",
  generator: "Next.js",
  metadataBase: new URL("https://www.olivermorla.com"),
  publisher: "OliverMorla",
  bookmarks: "https://www.olivermorla.com",
  openGraph: {
    title: "Oliver Morla | Full Stack Developer",
    description:
      "Experienced full stack developer specializing in building scalable and efficient web applications. Skilled in both front-end and back-end technologies, delivering optimized solutions for modern digital needs.",
    url: "https://www.olivermorla.com",
    siteName: "Oliver Morla | Full Stack Developer",
    images: [
      {
        url: "/assets/media/og.webp",
        width: 1200,
        height: 630,
        alt: "Oliver Morla | Full Stack Developer",
      },
    ],
    type: "website",
    phoneNumbers: ["+3473020492"],
    emails: ["no-reply@olivermorla.com"],
    locale: "en_US",
    countryName: "United States",
    faxNumbers: ["+3473020492"],
    alternateLocale: ["en_ES", "en_US"],
  },
  icons: {
    icon: "/assets/favicon.ico",
    apple: "/assets/apple-icon.png",
    shortcut: "/assets/shortcut-icon.png",
    other: {
      rel: "icon",
      url: "/assets/favicon.ico",
    },
  },

  twitter: {
    title: "Oliver Morla | Full Stack Developer",
    description:
      "Experienced full stack developer specializing in building scalable and efficient web applications. Skilled in both front-end and back-end technologies, delivering optimized solutions for modern digital needs.",
    images: "/assets/media/og.webp",
    card: "summary_large_image",
    creator: "@OliverMorlaX",
    site: "@OliverMorlaX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      style={{
        transitionProperty: "none",
        marginRight: "0px",
        colorScheme: "light",
      }}
    >
      {/* Might remove this script if it's not needed */}
      <head>
        <ThemeScript />
      </head>
      <body
        className={cn(
          inter.variable,
          // montserrat.variable,
          "antialiased bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100"
        )}
      >
        <ThemeProvider>
          <Header />
          <PostHogProvider>{children}</PostHogProvider>
          <Footer />
        </ThemeProvider>
        {/* Sonner Toaster - Notifications */}
        <Toaster />
      </body>

      {/* Google Tag Manager - Tag Manager */}
      {/* <GoogleTagManager
        gtmId={
          process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID ?? "GTM-K234567890"
        }
      /> */}

      {/* Google Analytics - Analytics */}
      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "GA-1234567890"}
      />
    </html>
  );
}

export const viewport: Viewport = {
  width: "device-width",
  viewportFit: "cover",
};
