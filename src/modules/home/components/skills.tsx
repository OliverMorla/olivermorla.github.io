import WheelOfFortune from "@/modules/skills/components/wheel-of-fortune";

const Skills = () => {
  return (
    <section
      id="skills"
      className="h-screen flex justify-center items-center flex-col p-8 max-sm:p-4 overflow-hidden"
    >
      <WheelOfFortune />
    </section>
  );
};

export default Skills;
