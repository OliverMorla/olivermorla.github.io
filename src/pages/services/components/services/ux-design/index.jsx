import { faWordpress } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";

const ServiceTwo = () => {
  const fadeEffect = {
    hidden: { opacity: 0, transform: "translateY(80px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: { delay: 0.2 },
    },
  };

  const serviceTwoRef = useRef(null);
  const isInView = useInView(serviceTwoRef, {
    margin: "-300px 0px -300px 0px",
    once: true,
  });

  return (
    <section className="ux-des-wrapper">
      <motion.div
        className="ux-des-content"
        ref={serviceTwoRef}
        variants={fadeEffect}
        initial="hidden"
        animate={isInView && "visible"}
      >
        <h1> UX/UI Designer </h1>
        <div className="icon-w">
          <FontAwesomeIcon icon={faWordpress} className="service-icon" />
          <h2 className="icon-text">Wordpress</h2>
        </div>
      </motion.div>
    </section>
  );
};

export default ServiceTwo;
