// Home Page - Main Page of the Application

// Sections Components
import HeroSection from "@/components/containers/Hero";
import AboutSection from "@/components/containers/About";
import ExperiencesSection from "@/components/containers/Experiences";
import SkillsSection from "@/components/containers/Skills";
import PortfolioSection from "@/components/containers/Portfolio";
import CertificationsSection from "@/components/containers/Certifications";
import ServicesSection from "@/components/containers/Services";
import ContactSection from "@/components/containers/Contact";

// UI Components
import BackgroundLines from "@/components/ui/BackgroundLines";

const Home = () => {
  return (
    <main className="h-full">
      {/* Home Page Sections */}
      <HeroSection />
      <AboutSection />
      <ExperiencesSection />
      <ServicesSection />
      <SkillsSection />
      <PortfolioSection />
      <CertificationsSection />
      <ContactSection />

      {/* UI Components - Background Lines */}
      <BackgroundLines />
    </main>
  );
};

export default Home;
