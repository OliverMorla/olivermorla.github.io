import { MotionDiv } from "@/components/helpers/basic-lazy-motion";

const ProgresBar = ({ progress }: { progress: string }) => {
  return (
    <MotionDiv
      className="h-full absolute top-0 left-0 z-0 rounded-l-full rounded-r-full text-end bg-gradient-to-r from-neutral-600 to-neutral-700 pr-2 text-sm"
      initial={{
        width: "25%",
      }}
      whileInView={{
        width: progress,
        transition: {
          duration: 1,
          ease: "easeInOut",
        },
      }}
    >
      {progress}
    </MotionDiv>
  );
};

export default ProgresBar;
