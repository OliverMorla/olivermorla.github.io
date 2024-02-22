import HeroSection from "@/components/containers/Hero";
import AboutSection from "@/components/containers/About";
import ExperiencesSection from "@/components/containers/Experiences";
import SkillsSection from "@/components/containers/Skills";
import PortfolioSection from "@/components/containers/Portfolio";
import CertificationsSection from "@/components/containers/Certifications";
import ServicesSection from "@/components/containers/Services";
import ContactSection from "@/components/containers/Contact";
import BackgroundLines from "@/components/ui/BackgroundLines";

const App = () => {
  return (
    <main className="h-full">
      <HeroSection />
      <AboutSection />
      <ExperiencesSection />
      <ServicesSection />
      <SkillsSection />
      <PortfolioSection />
      <CertificationsSection />
      <ContactSection />
      <BackgroundLines />
    </main>
  );
};

export default App;
