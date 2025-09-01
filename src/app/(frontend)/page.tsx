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
import TrustBar from "@/modules/home/components/trust-bar";
import ScrollTrackingContainer from "@/modules/home/components/scroll-tracking-container";

const Home = () => {
  return (
    <main className="relative overflow-x-hidden">
      <Hero />
      <TrustBar />
      <Services />
      <Portfolio />
      <Process />
      <ScrollTrackingContainer>
        <Testimonials />
        <Contact />
      </ScrollTrackingContainer>
    </main>
  );
};

export default Home;
