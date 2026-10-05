import {
  PortfolioSkeleton,
  TestimonialsSkeleton,
  TrustBarSkeleton,
} from "@/components/skeletons";
import Contact from "@/modules/home/components/contact";
import Hero from "@/modules/home/components/hero";
import Portfolio from "@/modules/home/components/portfolio";
import Process from "@/modules/home/components/process";
import Services from "@/modules/home/components/services";
import Testimonials from "@/modules/home/components/testimonials";
import TrustBar from "@/modules/home/components/trust-bar";
import { Suspense } from "react";

// Statically generated. CMS edits revalidate this page on save (see the
// collection hooks); this is the fallback refresh window.
export const revalidate = 14400; // 4 hours

/**
 * Static sections render immediately; each CMS-backed section streams in
 * behind its own boundary so one slow query never blocks the others.
 */
export default function Home() {
  return (
    <div className="relative overflow-x-clip">
      <Hero />
      <Suspense fallback={<TrustBarSkeleton />}>
        <TrustBar />
      </Suspense>
      <Services />
      <Suspense fallback={<PortfolioSkeleton />}>
        <Portfolio />
      </Suspense>
      <Process />
      <div className="stack-scroll">
        <Suspense fallback={<TestimonialsSkeleton />}>
          <Testimonials />
        </Suspense>
        <Contact />
      </div>
    </div>
  );
}
