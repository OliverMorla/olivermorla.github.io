import { motion } from "framer-motion";

import ServiceOne from "./components/services/app-development";
import ServiceTwo from "./components/services/web-development";
import ServiceThree from "./components/services/ux-design";

import { Link } from "react-router-dom";
import "./style.scss";

const Services = () => {
  const fadeEffect = {
    hidden: { opacity: 0, transform: "translateY(20px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  };

  return (
    <main className="services-w">
      <ServiceOne />
      <ServiceTwo />
      <ServiceThree />
      <motion.section className="bottom-content">
        <section className="card-section">
          <div className="service-card">
            <h1> App Development </h1>
          </div>
          <div className="service-card">
            <h1> Web Development </h1>
          </div>
          <div className="service-card">
            <h1> UX/UI Design </h1>
          </div>
        </section>
        <section className="contact-section">
          <h1> Feel Free to Contact me for more information! </h1>
          <Link to={"/contact"}>
            <button className="contact-btn">Contact me</button>
          </Link>
        </section>
      </motion.section>
    </main>
  );
};

export default Services;
