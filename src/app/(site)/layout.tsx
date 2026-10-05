import { PHProvider } from "@/providers/posthog-provider";
import ThemeProvider from "@/providers/theme-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./site.css";

// Root layout for the home page and /portfolio. The other public pages
// (about, résumé, schedule) still use the (frontend) layout.
//
// One family throughout; the optical-size axis keeps the large headings
// tight and the small text open.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const siteUrl = "https://www.olivermorla.com";
const title = "Oliver Morla | Senior Full-Stack Developer";
const description =
  "Senior full-stack developer in New York. I design, build and launch web and mobile apps for founders and small businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Oliver Morla" },
  description,
  applicationName: "Oliver Morla",
  authors: [{ name: "Oliver Morla", url: "https://github.com/OliverMorla" }],
  creator: "Oliver Morla",
  publisher: "Oliver Morla",
  keywords: [
    "Oliver Morla",
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "freelance web developer New York",
  ],
  category: "technology",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Oliver Morla",
    title,
    description,
    locale: "en_US",
    images: [
      {
        url: "/assets/media/og_2.webp",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: "/assets/media/og_2.webp",
    creator: "@OliverMorlaX",
    site: "@OliverMorlaX",
  },
  icons: {
    icon: [
      { url: "/assets/favicon.ico", sizes: "any" },
      { url: "/assets/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

const gaId = process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID;

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // next-themes sets the theme class on <html> before hydration. Same
    // provider as the rest of the site: dark by default, remembered per
    // visitor.
    <html
      lang="en-US"
      className={inter.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <PHProvider>{children}</PHProvider>
        </ThemeProvider>
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
