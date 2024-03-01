import SectionTitle from "@/components/ui/SectionTitle";
import WheelOfFortune from "@/components/ui/WheelOfFortune";

const SkillsSection = () => {
  return (
    <section
      className="h-screen bg-[--color-dark-gray] text-[--text-color] flex justify-center items-center flex-col p-10 overflow-hidden"
      id="skills"
    >
      <WheelOfFortune>
        <SectionTitle
          title={"Skills"}
          desc={
            "An overview of my technical and interpersonal skills, demonstrating a well-rounded proficiency in full-stack development."
          }
        />
      </WheelOfFortune>
    </section>
  );
};

export default SkillsSection;
