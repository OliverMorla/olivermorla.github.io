import Hero from "@/modules/home/components/hero";
import About from "@/modules/home/components/about";
import Skills from "@/modules/home/components/skills";
import Services from "@/modules/home/components/services";
import Portfolio from "@/modules/home/components/portfolio";
import Experiences from "@/modules/home/components/experiences";
import Testimonials from "@/modules/home/components/testimonials";
import Certifications from "@/modules/home/components/certifications";

const Home = () => {
  return (
    <main className="w-full min-h-screen flex flex-col overflow-x-hidden">
      {/* Home Page Sections */}
      <Hero />
      <About />
      <Experiences />
      <Services />
      <Testimonials />
      <Skills />
      <div id="portfolio" />
      <Portfolio />
      <Certifications />
    </main>
  );
};

export default Home;

export const revalidate = 86400; // 24 hours (24 * 60 * 60 = 86400 seconds)
