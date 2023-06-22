import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faMemory, faMicrochip, faServer } from '@fortawesome/free-solid-svg-icons';
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
} from '@fortawesome/free-brands-svg-icons';

import { motion } from "framer-motion";

import Cards from '@/components/skills/cards/index';
import Icons from '@/components/skills/icons/index';

import "./style.scss"

const Skills = () => {
    return (
        <motion.main
            className="skills-w"
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: {
                    delay: 0.2,
                }
            }}>
            <div className="skill-bars-w">
                <div className="skill-title">HTML</div>
                <div className="skill-bar">
                    <div className="skill-progress" data-per="90%" style={{ maxWidth: '90%' }}></div>
                </div>
                <div className="skill-title">CSS</div>
                <div className="skill-bar">
                    <div className="skill-progress" data-per="85%" style={{ maxWidth: '85%' }}></div>
                </div>
                <div className="skill-title">JS</div>
                <div className="skill-bar">
                    <div className="skill-progress" data-per="80%" style={{ maxWidth: '80%' }}></div>
                </div>
                <div className="skill-title">Node.js</div>
                <div className="skill-bar">
                    <div className="skill-progress" data-per="65%" style={{ maxWidth: '65%' }}></div>
                </div>
                <div className="skill-title">React.js</div>
                <div className="skill-bar">
                    <div className="skill-progress" data-per="75%" style={{ maxWidth: '75%' }}></div>
                </div>
                <div className="skill-title">Express.js</div>
                <div className="skill-bar">
                    <div className="skill-progress" data-per="65%" style={{ maxWidth: '65%' }}></div>
                </div>
                <div className="skill-title">Next.js</div>
                <div className="skill-bar">
                    <div className="skill-progress" data-per="65%" style={{ maxWidth: '65%' }}></div>
                </div>
                <div className="skill-title">Python</div>
                <div className="skill-bar">
                    <div className="skill-progress" data-per="65%" style={{ maxWidth: '65%' }}></div>
                </div>
                <div className="skill-title">MySQL/SQL</div>
                <div className="skill-bar">
                    <div className="skill-progress" data-per="80%" style={{ maxWidth: '80%' }}></div>
                </div>
            </div>
            <div className="skill-icon-w">
                <div className="skill-scroller">
                    <Icons />
                </div>
            </div>
            <div className="skill-cards">
                <Cards />
            </div>
        </motion.main>
    );
}

export default Skills;