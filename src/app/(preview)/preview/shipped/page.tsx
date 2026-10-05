import Contact from "./_components/contact";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Nav from "./_components/nav";
import Process from "./_components/process";
import Results from "./_components/results";
import Services from "./_components/services";
import Work from "./_components/work";

export default function ShippedPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        {/* Light sheet that slides back over the dark work band. */}
        <div className="relative -mt-10 rounded-t-[32px] bg-canvas md:-mt-12 md:rounded-t-[44px]">
          <Services />
          <Process />
          <Results />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
