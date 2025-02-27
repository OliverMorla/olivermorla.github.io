import WheelOfFortune from "@/modules/skills/components/wheel-of-fortune";

const Skills = () => {
  return (
    <section
      className="h-screen flex justify-center items-center flex-col p-8 overflow-hidden"
      id="skills"
    >
      <WheelOfFortune />
    </section>
  );
};

export default Skills;
