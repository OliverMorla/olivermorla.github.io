import React, { useRef, lazy, Suspense, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// import Typewriter from "typewriter-effect";

const Typewriter = lazy(() => import('typewriter-effect'));

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faPython, faHtml5, faWordpress } from '@fortawesome/free-brands-svg-icons';

import "./style.scss"
import "@/styles/spacing.scss"


const Home = () => {
  window.scrollTo(0, 0);

  const fadeIn = {
    hidden: {
      x: -80,
      opacity: 0,
      transition: {
        delay: .6
      },
    },

    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: .4
      },
    },

    visible2: {
      x: 0,
      opacity: 1,
      transition: {
        delay: .6
      }
    },

  }

  const topSection = useRef(null)
  const middleSection = useRef(null)
  const bottomSection = useRef(null)

  const typewriterInit = useCallback(
    (typewriter) => {
      typewriter
        .pauseFor(500)
        .typeString("Oliver")
        .pauseFor(3000)
        .deleteAll()
        .pauseFor(1000)
        .typeString("a")
        .start();
    },
    []
  );

  return (
    <main className="home-w">

      {/* Top Section */}
      <motion.div
        className="top-section"
        ref={topSection}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >

        <section className="left-section">

          <div className="heading-w">
            <p className='heading-p'> Hey There! I'm </p>
            <Suspense fallback={<div>Loading...</div>}>
              <Typewriter onInit={typewriterInit} />
            </Suspense>
          </div>

          <Typewriter
            options={{
              strings: ['Web Developer', 'UI/UX Designer', 'Software Engineer'],
              autoStart: true,
              loop: true,
              delay: 100,
            }}
          />

          <div className="stats-w" >

            <Link to={"/contact"}>
              <button id="hire-me-btn">Hire me</button>
            </Link>
            <div className="info-wrapper">
              <h3> 3 Yrs </h3>
              <p> Experience </p>
            </div>
            <div className="info-wrapper">
              <h3> 17 </h3>
              <p> Projects </p>
            </div>
            <div className="info-wrapper">
              <h3> 22 </h3>
              <p> Age </p>
            </div>

          </div>

          <motion.div
            className="socials-btn-w"
            variants={fadeIn}
            initial="hidden"
            animate="visible2"
          >

            <a href={'https://github.com/OliverMorla'} aria-label="GitHub" target='_blank'>
              <FontAwesomeIcon icon={faGithub} className='socials-btn' />
            </a>
            <a href={'https://twitter.com/Oliver1129'} aria-label="Twitter" target='_blank'>
              <FontAwesomeIcon icon={faTwitter} className='socials-btn' />
            </a>
            <a href={'https://www.instagram.com/oliverm11_/'} aria-label="Instagram" target='_blank'>
              <FontAwesomeIcon icon={faInstagram} className='socials-btn' />
            </a>
            <a href={'https://www.linkedin.com/in/oliver-morla/'} aria-label="LinkedIn" target='_blank'>
              <FontAwesomeIcon icon={faLinkedin} className='socials-btn' />
            </a>

          </motion.div>

        </section>

        <section className="right-section">
          <img src="/assets/portrait/portrait2.webp" alt="" className="section-img" />
        </section>

        <section className="services-section">
          <div className="service-card">
            <aside>
              <FontAwesomeIcon icon={faHtml5} className='service-logo' />
              <div className="service-title"> Web Development </div>
            </aside>
            <motion.p
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ margin: "-50px -50px -50px -50px", once: true }}
            >
              Expert web developer who specializes
              <br />in building and maintaining high-quality
              <br />websites and web-based applications.
            </motion.p>
          </div>
          <div className="service-card">
            <aside>
              <FontAwesomeIcon icon={faPython} className='service-logo' />
              <div className="service-title"> Application Development </div>
            </aside>
            <motion.p
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ margin: "-50px -50px -50px -50px", once: true }}
            >
              Experienced application developer who
              <br />specializes in creating custom software
              <br />solutions for businesses.
            </motion.p>
          </div>
          <div className="service-card">
            <aside>
              <FontAwesomeIcon icon={faWordpress} className='service-logo' />
              <div className="service-title"> UI/UX Web Design </div>
            </aside>
            <motion.p
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ margin: "-50px -50px -50px -50px", once: true }}
            >
              Pro designer who specializes in creating
              <br />intuitive, visually appealing websites.
            </motion.p>
          </div>
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-100px -100px -100px -100px", once: true }}> Services </motion.h2>

        </section>

      </motion.div>

      {/* Middle Section */}
      <div ref={middleSection} className="middle-section">
        <motion.section
          className="about-section"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-400px -400px -400px -400px", once: true }}
        >
          <div className="about-content">
            <h2> Statement </h2>
            <p>
              With a relentless focus on creating simple and intuitive user experiences, my work always puts the consumer at the forefront.
              I firmly believe in the power of technology to simplify lives and make complex processes seamless. This conviction drives me
              to continually hone my skills, stay abreast of emerging technologies, and create innovative solutions. In every role, I bring
              my dedication to clear communication, problem-solving, and service. Helping others, whether it's my team, stakeholders, or the
              end users of the products I work on, is always a top priority. Ready to bring my skills and passion to new challenges. Let's
              connect and explore how we can build the future together.
              <a href="">
                <button> Hire Me </button>
              </a>
            </p>
          </div>
          <div className="about-img-w">
            <section>
              <Suspense fallback={<div> Loading! </div>}>
                <img src="/assets/portrait/portrait3.webp" alt="" className="about-img" />
              </Suspense>
            </section>
            <fieldset>
              <legend> About me </legend>
              <p>
                Hello there! I'm a dedicated Full Stack Web Developer and Software Engineer with a
                Bachelor of Technology in Computer Information Systems from the City University of
                New York, New York City College of Technology. Over the past three years, I've
                gained extensive experience in building, optimizing, and maintaining web applications
                using cutting-edge technologies.
              </p>
            </fieldset>
          </div>
        </motion.section>

        <section className="skills-section">
          <h2> Technical Skills </h2>
          <ul>
            <li>Languages & Libraries: C/C++, C#, Java, Python, HTML, CSS, JavaScript, Express.js, Mongoose.js, Node.js, React.js, Redux.js, JWT, Git</li>
            <li>Frameworks: Next.js, React-Router, Bootstrap, Tailwind, SCSS</li>
            <li>Databases & Tools: MongoDB, SQL/MySQL Workbench, Strapi CMS, EJS, Figma, GitHub, WordPress, RESTful API</li>
            <li>Applications & Cloud Platform: NetBeans, Visual Studio Code/Studio, Code::Blocks, Eclipse, Office, Teams, Azure, IBM, Any Desk, TeamViewer</li>
            <li>OS & Virtualizations: Windows 7, 8, 10, 11; Windows Server 2012/2019, Mac OS, IOS, Android, Virtual Box, VMware, Hyper-V</li>
          </ul>
        </section>

      </div>

      {/* Bottom Section */}
      <motion.div
        className="bottom-section"
        ref={bottomSection}
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ margin: "-100px -100px -100px -100px", once: true }}
      >
        <h2 className="mb-8"> Certifications </h2>
        <div className="cert-content">
          <div className="cert-card">
            <h2> Coursera </h2>
            <img src="/assets/brands/coursera-white.svg" alt="" />
            <p> Git and GitHub Essentials </p>
          </div>
          <div className="cert-card">
            <h2> Coursera </h2>
            <img src="/assets/brands/coursera-white.svg" alt="" />
            <p> Intro To Cloud Computing </p>
          </div>
          <div className="cert-card">
            <h2> Coursera </h2>
            <img src="/assets/brands/coursera-white.svg" alt="" />
            <p> Web Development with HTML, CSS, Javascript </p>
          </div>
          <div className="cert-card">
            <h2> Coursera </h2>
            <img src="/assets/brands/coursera-white.svg" alt="" />
            <p> Web Development with React.js </p>
          </div>
        </div>

      </motion.div>

    </main>
  );
}

export default Home;