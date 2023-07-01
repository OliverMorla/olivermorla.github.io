import React, { useRef, lazy, Suspense, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, LazyMotion, domAnimation, m } from 'framer-motion';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Counter } from '../../components/counter';

const Typewriter = lazy(() => import('typewriter-effect'));

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faPython, faHtml5, faWordpress } from '@fortawesome/free-brands-svg-icons';

import "./style.scss"
import "@/styles/spacing.scss"

const Home = () => {
  window.scrollTo(0, 0);

  const topSection = useRef(null)
  const middleSection = useRef(null)
  const bottomSection = useRef(null)

  const middleObserver = useInView(middleSection, { margin: "-300px 0px -300px 0px", once: true })
  const bottomObserver = useInView(bottomSection, { margin: "-300px 0px -300px 0px", once: true })

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
    }, []);

  const fade = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,
    },
  }

  return (
    <main className="home-w">

      {/* Top Section */}
      <motion.div
        className="top-section"
        ref={topSection}
        variants={fade}
        initial="hidden"
        animate="visible"
      >

        <section className="left-section">

          <div className="heading-w">
            <p className='heading-text'> Hey There! I'm </p>

            <Suspense fallback={<h2 style={{ color: "#282828" }}>...</h2>}>
              <Typewriter onInit={typewriterInit} />
            </Suspense>

          </div>

          <Suspense fallback={<h2 style={{ color: '#282828' }}>...</h2>}>
            <Typewriter
              options={{
                strings: ['Web Developer', 'UI/UX Designer', 'Software Engineer'],
                autoStart: true,
                loop: true,
                delay: 100,
              }}
            />
          </Suspense>

          <div className="stats-w" >

            <Link to={"/contact"}>
              <button id="hire-me-btn">Hire me</button>
            </Link>
            <div className="info-wrapper">
              <h3> <Counter targetCount={3} duration={900} /> <span>+ Yrs</span> </h3>
              <p> Experience </p>
            </div>
            <div className="info-wrapper">
              <h3> <Counter targetCount={17} duration={150} /> <span> + </span> </h3>
              <p> Projects </p>
            </div>
            <div className="info-wrapper">
              <h3> <Counter targetCount={22} duration={150} /> </h3>
              <p> Age </p>
            </div>

          </div>

          <div className="socials-btn-w">

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

          </div>

        </section>

        <section className="right-section">

          <LazyLoadImage src={"/assets/portrait/portrait2.webp"}
            className="section-img"
            alt="Image Alt"
          />

        </section>

        <section className="services-section">

          <div className="service-card">
            <aside>
              <FontAwesomeIcon icon={faHtml5} className='service-logo' />
              <div className="service-title"> Web Development </div>
            </aside>
            
            <LazyMotion features={domAnimation}>
              <m.p
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ margin: "-50px -50px -50px -50px", once: true }}
              >
                Expert web developer who specializes
                <br />in building and maintaining high-quality
                <br />websites and web-based applications.
              </m.p>
            </LazyMotion>

          </div>
          <div className="service-card">
            <aside>
              <FontAwesomeIcon icon={faPython} className='service-logo' />
              <div className="service-title"> Application Development </div>
            </aside>

            <LazyMotion features={domAnimation}>
              <m.p
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ margin: "-50px -50px -50px -50px", once: true }}
              >
                Experienced application developer who
                <br />specializes in creating custom software
                <br />solutions for businesses.
              </m.p>
            </LazyMotion>

          </div>
          <div className="service-card">
            <aside>
              <FontAwesomeIcon icon={faWordpress} className='service-logo' />
              <div className="service-title"> UI/UX Web Design </div>
            </aside>

            <LazyMotion features={domAnimation}>
              <m.p
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ margin: "-50px -50px -50px -50px", once: true }}
              >
                Pro designer who specializes in creating
                <br />intuitive, visually appealing websites.
              </m.p>
            </LazyMotion>

          </div>
          <motion.h2
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-100px -100px -100px -100px", once: true }}
          >
            Services
          </motion.h2>

        </section>

      </motion.div>

      {/* Middle Section */}
      <div ref={middleSection} className="middle-section">
        <motion.section
          className="about-section"
          variants={fade}
          initial="hidden"
          animate={middleObserver ? "visible" : ""}
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
              <Link to={"/contact"}>
                <button> Hire Me </button>
              </Link>
            </p>
          </div>
          <div className="about-image-w">
            <section>
              <LazyLoadImage src={"/assets/portrait/portrait3.webp"}
                className="about-image"
                alt="about-image"
              />
            </section>
            <section className='summary-section'>
              <fieldset>
                <p>
                  Hello there! I'm a dedicated Full Stack Web Developer and Software Engineer with a
                  Bachelor of Technology in Computer Information Systems from the City University of
                  New York, New York City College of Technology. Over the past three years, I've
                  gained extensive experience in building, optimizing, and maintaining web applications
                  using cutting-edge technologies.
                  <Link to={"/about"}>
                    <button> View Resume </button>
                  </Link>
                </p>
              </fieldset>
              <h2> Summary </h2>
            </section>
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

      </div >

      {/* Bottom Section */}
      < motion.div
        className="bottom-section"
        ref={bottomSection}
        variants={fade}
        initial="hidden"
        animate={bottomObserver ? "visible" : ""}
      >
        
        <h2 className="title mb-8"> Certifications </h2>
        <div className="cert-content">
          <div className="cert-card">
            <h2> Coursera </h2>
            <img src="/assets/brands/coursera-white.svg" alt="coursera-white.svg" />
            <p> Git and GitHub Essentials </p>
          </div>
          <div className="cert-card">
            <h2> Coursera </h2>
            <img src="/assets/brands/coursera-white.svg" alt="coursera-white.svg" />
            <p> Intro To Cloud Computing </p>
          </div>
          <div className="cert-card">
            <h2> Coursera </h2>
            <img src="/assets/brands/coursera-white.svg" alt="coursera-white.svg" />
            <p> Web Development with HTML, CSS, Javascript </p>
          </div>
          <div className="cert-card">
            <h2> Coursera </h2>
            <img src="/assets/brands/coursera-white.svg" alt="coursera-white.svg" />
            <p> Web Development with React.js </p>
          </div>
        </div>

      </motion.div >

    </main >
  );
}

export default Home;