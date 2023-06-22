import { motion } from "framer-motion";
import "./style.scss";

const About = () => {
  return (
    <motion.main
      className="about-w">
      <iframe src="/assets/resume/OliverResume.pdf" className="resume" frameBorder={0}/>
    </motion.main>
  );
}

export default About;