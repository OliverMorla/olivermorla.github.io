import Hero from "@/modules/home/components/hero";
// import About from "@/modules/home/components/about";
// import Skills from "@/modules/home/components/skills";
import Contact from "@/modules/home/components/contact";
import Services from "@/modules/home/components/services";
import Portfolio from "@/modules/home/components/portfolio";
// import Experiences from "@/modules/home/components/experiences";
import Testimonials from "@/modules/home/components/testimonials";
// import Certifications from "@/modules/home/components/certifications";
import TrustBar from "@/modules/home/components/trust-bar";
import Process from "@/modules/home/components/process";

const Home = () => {
  return (
    <main className="relative">
      <Hero />
      <TrustBar />
      <Services />
      <Portfolio />
      <Process />
      <Testimonials />

      {/* <About /> */}
      {/* <Experiences /> */}
      {/* <Skills /> */}
      {/* <Certifications /> */}
      <Contact />
    </main>
  );
};

export default Home;
