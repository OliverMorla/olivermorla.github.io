import { inter } from "@/lib/fonts";
import Footer from "@/modules/app/components/footer";
import Header from "@/modules/app/components/header";
import { PHProvider } from "@/providers/posthog-provider";
import ThemeProvider from "@/providers/theme-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import "./global.css";

const siteUrl = "https://www.olivermorla.com";
const title = "Oliver Morla | Senior Full Stack Developer";
const description =
  "Senior full-stack developer in New York building fast, scalable web and mobile apps for startups and small businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Oliver Morla",
  },
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
  alternates: { canonical: "/" },
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // next-themes sets the theme class on <html> before hydration.
    <html
      lang="en-US"
      className={inter.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <PHProvider>
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
          </PHProvider>
        </ThemeProvider>
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
