import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuestionForm = () => {
  return (
    <form className="flex items-center">
      <input
        type="text"
        name="email"
        className="bg-transparent border-b-[1px] border-b-[--color-electric-purple]"
        placeholder="Enter your email"
      />
      <button
        className="bg-[--color-electric-purple] border-b-[1px] border-b-[--color-electric-purple]"
        aria-label="Send email"
      >
        <FontAwesomeIcon icon={faPaperPlane} width={25} height={25} />
      </button>
    </form>
  );
};

export default QuestionForm;
