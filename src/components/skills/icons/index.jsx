import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCode,
  faCodeBranch,
  faCodePullRequest,
  faDatabase,
  faMemory,
  faMicrochip,
  faServer,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";

import {
  faPython,
  faHtml5,
  faWordpress,
  faJs,
  faCss3,
  faReact,
  faNodeJs,
  faSass,
  faJava,
  faGit,
  faGithub,
  faMicrosoft,
  faGoogle,
  faFigma,
  faElementor,
} from "@fortawesome/free-brands-svg-icons";

const Icons = () => {
  return (
    <>
      <FontAwesomeIcon icon={faHtml5} className="skill-icon" />
      <FontAwesomeIcon icon={faPython} className="skill-icon" />
      <FontAwesomeIcon icon={faCss3} className="skill-icon" />
      <FontAwesomeIcon icon={faJava} className="skill-icon" />
      <FontAwesomeIcon icon={faNodeJs} className="skill-icon" />
      <FontAwesomeIcon icon={faSass} className="skill-icon" />
      <FontAwesomeIcon icon={faReact} className="skill-icon" />
      <FontAwesomeIcon icon={faJs} className="skill-icon" />
      <FontAwesomeIcon icon={faDatabase} className="skill-icon" />
      <FontAwesomeIcon icon={faGit} className="skill-icon" />
      <FontAwesomeIcon icon={faGithub} className="skill-icon" />
      <FontAwesomeIcon icon={faMicrosoft} className="skill-icon" />
      <FontAwesomeIcon icon={faMicrochip} className="skill-icon" />
      <FontAwesomeIcon icon={faMemory} className="skill-icon" />
      <FontAwesomeIcon icon={faWordpress} className="skill-icon" />
      <FontAwesomeIcon icon={faGoogle} className="skill-icon" />
      <FontAwesomeIcon icon={faCodeBranch} className="skill-icon" />
      <FontAwesomeIcon icon={faServer} className="skill-icon" />
      <FontAwesomeIcon icon={faTerminal} className="skill-icon" />
      <FontAwesomeIcon icon={faCode} className="skill-icon" />
      <FontAwesomeIcon icon={faCodePullRequest} className="skill-icon" />
      <FontAwesomeIcon icon={faFigma} className="skill-icon" />
      <FontAwesomeIcon icon={faElementor} className="skill-icon" />
    </>
  );
};

export default Icons;
