import { inter } from "@/lib/fonts";
import ThemeProvider from "@/providers/theme-provider";
import type { Metadata, Viewport } from "next";
import "./dashboard.css";

// Its own root layout: none of the public site's header, footer, analytics
// provider or styles. PostHog also drops events from these paths (see
// src/instrumentation-client.ts).
export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | Oliver Morla" },
  robots: { index: false, follow: false },
  icons: { icon: "/assets/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
