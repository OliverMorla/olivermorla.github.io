import { portfolioImages } from "@/constants";
import Carousel from "@/components/ui/Carousel";
import SectionTitle from "@/components/ui/SectionTitle";

const PortfolioSection = () => {
  return (
    <section
      className="h-screen bg-[--color-dark-gray] text-white flex flex-col justify-center items-center"
      id="portfolio"
    >
      <SectionTitle
        title={"Portfolio"}
        desc={
          "Showcasing a range of projects that highlight my full-stack development expertise, from innovative designs to complex problem-solving."
        }
      />
      <div className="w-full h-full">
        <Carousel images={portfolioImages} />
      </div>
    </section>
  );
};

export default PortfolioSection;
