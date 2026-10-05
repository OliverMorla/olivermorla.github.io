import type { Metadata } from "next";
import Approach from "./_components/approach";
import BackToTop from "./_components/back-to-top";
import Closing from "./_components/closing";
import Experience from "./_components/experience";
import Footer from "./_components/footer";
import Intro from "./_components/intro";
import LiveHero from "./_components/live-hero/live-hero";
import Metrics from "./_components/metrics";
import Nav from "./_components/nav";
import Process from "./_components/process";
import Services from "./_components/services";
import ThemeToggle from "./_components/theme-toggle";
import Voices from "./_components/voices";
import Work from "./_components/work";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Intro />
      <Nav />
      <ThemeToggle />
      <BackToTop />
      <main>
        <LiveHero />
        <Metrics />
        <Work />
        <Approach />
        <Services />
        <Experience />
        <Process />
        <Voices />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
