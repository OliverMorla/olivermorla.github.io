import Carousel from "@/components/ui/Carousel";
import SectionTitle from "@/components/ui/SectionTitle";

const PortfolioSection = () => {
  return (
    <section
      className="min-h-screen h-auto flex flex-col gap-6 justify-center items-center p-8 max-sm:p-4"
      id="portfolio"
    >
      <SectionTitle
        title={"Portfolio"}
        desc={
          "Showcasing a range of projects that highlight my full-stack development expertise, from innovative designs to complex problem-solving."
        }
      />
      <div className="max-w-[1280px] w-full">
        <Carousel />
      </div>
    </section>
  );
};

export default PortfolioSection;
