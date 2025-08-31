import Footer from "@/modules/app/components/footer";
import Header from "@/modules/app/components/header";
import MotionProvider from "@/providers/motion-provider";
import { PHProvider } from "@/providers/posthog-provider";
import QueryProvider from "@/providers/query-provider";
import ThemeProvider from "@/providers/theme-provider";
import { cn } from "@/utils/classNames";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster as ToasterProvider } from "sonner";
import "./global.css";

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
    images: "/assets/media/og_2.webp",
    card: "summary_large_image",
    creator: "@OliverMorlaX",
    site: "@OliverMorlaX",
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  fallback: ["sans-serif"],
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body className={cn(inter.variable, "antialiased bg-gradient-none")}>
        <QueryProvider>
          <MotionProvider>
            <ThemeProvider>
              <PHProvider>
                <Header />
                {children}
                <Footer />
              </PHProvider>
            </ThemeProvider>
          </MotionProvider>
        </QueryProvider>
        <ToasterProvider position="bottom-right" duration={3000} richColors />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID!} />
    </html>
  );
}

export const viewport: Viewport = {
  width: "device-width",
  viewportFit: "cover",
};
