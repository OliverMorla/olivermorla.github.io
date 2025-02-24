import Hero from "@/modules/home/components/hero";
import About from "@/modules/home/components/about";
import Skills from "@/modules/home/components/skills";
import Contact from "@/modules/home/components/contact";
import Services from "@/modules/home/components/services";
import Portfolio from "@/modules/home/components/portfolio";
import Experiences from "@/modules/home/components/experiences";
import Certifications from "@/modules/home/components/certifications";
import Testimonials from "@/modules/home/components/testimonials";

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
      <Portfolio />
      <Certifications />
      {/* <Contact /> */}
    </main>
  );
};

export default Home;
