// Types
import type { Metadata } from "next";

// Fonts
import { Roboto } from "next/font/google";

// Components
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

// Styles
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
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
