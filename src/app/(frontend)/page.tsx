import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import Hero from "@/modules/home/components/hero";
// import About from "@/modules/home/components/about";
// import Skills from "@/modules/home/components/skills";
import Contact from "@/modules/home/components/contact";
import Portfolio from "@/modules/home/components/portfolio";
import Services from "@/modules/home/components/services";
// import Experiences from "@/modules/home/components/experiences";
import Testimonials from "@/modules/home/components/testimonials";
// import Certifications from "@/modules/home/components/certifications";
import Process from "@/modules/home/components/process";
import ScrollTrackingContainer from "@/modules/home/components/scroll-tracking-container";
import TrustBar from "@/modules/home/components/trust-bar";
import { getTestimonials } from "@/lib/payload/server/queries";

const SectionFallback = () => (
  <div className="flex min-h-[50vh] w-full items-center justify-center">
    <LoaderCircle className="animate-spin text-muted" />
  </div>
);

// Server-only wrapper so the testimonials fetch (deduped via React.cache with
// TrustBar's call in the same request) hydrates the client Testimonials
// component instead of it re-fetching over the network after mount.
const TestimonialsSection = async () => {
  const testimonials = await getTestimonials();
  return <Testimonials initialData={testimonials} />;
};

const Home = () => {
  return (
    <main className="relative overflow-x-hidden">
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <TrustBar />
      </Suspense>
      <Services />
      <Suspense fallback={<SectionFallback />}>
        <Portfolio />
      </Suspense>
      <Process />
      <ScrollTrackingContainer>
        <Suspense>
          <TestimonialsSection />
        </Suspense>
        <Contact />
      </ScrollTrackingContainer>
    </main>
  );
};

export default Home;
