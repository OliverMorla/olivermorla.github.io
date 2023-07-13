import { faPython } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ServiceOne = () => {
  const fadeEffect = {
    hidden: { opacity: 0, transform: "translateY(80px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: { delay: 0.2 },
    },
  };

  const serviceOneRef = useRef(null);
  const isInView = useInView(serviceOneRef, {
    margin: "-300px 0px -300px 0px",
    once: true,
  });

  return (
    <section className="app-dev-wrapper">
      <motion.div
        className="app-dev-content"
        ref={serviceOneRef}
        variants={fadeEffect}
        initial="hidden"
        animate={isInView && "visible"}
      >
        <div className="icon-w">
          <h1> App Development </h1>
          <FontAwesomeIcon icon={faPython} className="service-icon" />
          <h2 className="icon-text">Python</h2>
        </div>
      </motion.div>
    </section>
  );
};

export default ServiceOne;
