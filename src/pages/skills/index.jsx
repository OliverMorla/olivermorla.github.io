import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
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
                <div className="skill-title">Typescript</div>
                <div className="skill-bar">
                    <div className="skill-progress" data-per="55%" style={{ maxWidth: '55%' }}></div>
                </div>
            </div>
            <Marquee
                className="skill-icon-w"
                pauseOnHover={true}
            >
                <Icons />
            </Marquee>
        </motion.main>
    );
}

export default Skills;