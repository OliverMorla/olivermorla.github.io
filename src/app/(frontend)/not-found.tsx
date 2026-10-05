import NotFoundContent from "@/modules/app/components/not-found-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

// Shown when a page in the site calls notFound(). Unmatched URLs are handled
// by app/global-not-found.tsx.
export default function NotFound() {
  return <NotFoundContent />;
}
