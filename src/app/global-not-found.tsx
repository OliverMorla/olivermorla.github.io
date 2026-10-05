import "./(frontend)/global.css";

import { inter } from "@/lib/fonts";
import Footer from "@/modules/app/components/footer";
import Header from "@/modules/app/components/header";
import NotFoundContent from "@/modules/app/components/not-found-content";
import ThemeProvider from "@/providers/theme-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | Oliver Morla",
  description: "This page doesn't exist.",
  robots: { index: false },
};

/**
 * 404 for URLs that match no route. The app has several root layouts, so this
 * file renders the whole document itself (Next skips layouts for it) and
 * reuses the site's header, footer, font and theme.
 */
export default function GlobalNotFound() {
  return (
    <html
      lang="en-US"
      className={inter.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            <NotFoundContent />
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
