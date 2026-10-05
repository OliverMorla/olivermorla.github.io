import Cta from "./_components/cta";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Nav from "./_components/nav";
import Process from "./_components/process";
import Proof from "./_components/proof";
import Services from "./_components/services";
import Testimonials from "./_components/testimonials";
import Work from "./_components/work";

export default function OriginPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Proof />
        {/* Each sheet slides up over the one before it. */}
        <Work />
        <div className="sheet sheet-dark">
          <Services />
          <Process />
        </div>
        <div className="sheet sheet-light on-light">
          <Testimonials />
          <Cta />
        </div>
      </main>
      <Footer />
    </>
  );
}
