import { faHtml5 } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";

const ServiceThree = () => {
  const fadeEffect = {
    hidden: { opacity: 0, transform: "translateY(80px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: { delay: 0.2 },
    },
  };

  const serviceThreeRef = useRef(null);
  const isInView = useInView(serviceThreeRef, {
    margin: "-300px 0px -300px 0px",
    once: true,
  });

  return (
    <section className="web-dev-wrapper">
      <motion.div
        className="web-dev-content"
        ref={serviceThreeRef}
        variants={fadeEffect}
        initial="hidden"
        animate={isInView && "visible"}
      >
        <h1> Web Development </h1>
        <div className="icon-w">
          <FontAwesomeIcon icon={faHtml5} className="service-icon" />
          <h2 className="icon-text">HTML</h2>
        </div>
      </motion.div>
    </section>
  );
};

export default ServiceThree;
