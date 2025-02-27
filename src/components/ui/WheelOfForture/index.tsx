import { skillsIcons } from "@/constants";
import ProgresBar from "@/components/ui/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MotionDiv } from "@/components/helpers/dynamic/Motion";

const WheelOfFortune = () => {
  return (
    <div className="relative w-full h-full flex justify-center">
      {skillsIcons.map((icon, index) => (
        <MotionDiv
          key={index}
          initial={{
            opacity: 0,
          }}
          animate={{
            rotate: 360,
            opacity: 1,
            transition: {
              duration: skillsIcons.length,
              delay: index * 1,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          exit={{
            opacity: 0,
          }}
        >
          <FontAwesomeIcon icon={icon.fontAwesomeIconUrl} />
        </MotionDiv>
      ))}
      <div className="absolute self-center flex flex-col justify-center items-center gap-6 w-full max-w-xl">
        {skillsIcons.map((skill, index) => (
          <div
            key={index}
            className="block max-w-2xl w-full h-[20px] relative rounded-full bg-neutral-800 dark:bg-neutral-200 text-white"
          >
            <ProgresBar progress={skill.progress} />
            <h2 className="ml-2 font-medium absolute text-sm top-0">
              {skill.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WheelOfFortune;
