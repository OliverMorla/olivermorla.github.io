import { motion } from "framer-motion";
import "./style.scss";

const About = () => {
  return (
    <motion.main
      className="about-w">
      <iframe src="/assets/resume/OliverResume.pdf" className="resume" />
    </motion.main>
  );
}

export default About;