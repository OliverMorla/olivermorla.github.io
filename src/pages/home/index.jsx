import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import Typewriter from "typewriter-effect"
import { motion } from 'framer-motion';

import { ScrollTrigger } from "@/components/scroll/ScrollTrigger"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faPython, faHtml5, faWordpress } from '@fortawesome/free-brands-svg-icons';

import "./style.scss"
import "@/styles/spacing.scss"

const Home = () => {
  window.scrollTo(0, 0);
  const parentContainer = useRef()

  return (
    <motion.main className="home-w"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="top-section">


        <section className="h-left-side">
          <ScrollTrigger
            initial={{ opacity: 0, transform: "translateX(-15px)" }}
            animate={{ opacity: 1, transform: "translateX(0)" }}
            transition={{
              ease: "linear",
              duration: .4,
              delay: .4
            }}
          >
            <div className="heading-w">
              <p className='heading-p'> Hey There! I'm </p>
              <Typewriter
                options={{
                  strings: ['Oliver'],
                  autoStart: true,
                  loop: false,
                  pauseFor: 20000,
                }} />
            </div>


            <Typewriter
              options={{
                strings: ['Web Developer', 'UI/UX Designer', 'Software Engineer'],
                autoStart: true,
                loop: true,
                delay: 50,
              }} />

            <div className="stats-w">
              <Link to={"/contact"}>
                <button id="hire-me-btn">Hire me</button>
              </Link>
              <div className="info-wrapper">
                <h3> 3 Yrs </h3>
                <p> Experience </p>
              </div>
              <div className="info-wrapper">
                <h3> 11 </h3>
                <p> Projects </p>
              </div>
              <div className="info-wrapper">
                <h3> 22 </h3>
                <p> Age </p>
              </div>
            </div>
          </ScrollTrigger>


          <motion.div className="socials-btn-w"
            initial={{ opacity: 0, x: -40 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                delay: .6,
              }
            }}
          >
            <a href={'https://github.com/OliverMorla'} target='_blank'>
              <FontAwesomeIcon icon={faGithub} className='socials-btn' />
            </a>
            <a href={'https://twitter.com/Oliver1129'} target='_blank'>
              <FontAwesomeIcon icon={faTwitter} className='socials-btn' />
            </a>
            <a href={'https://www.instagram.com/oliverm11_/'} target='_blank'>
              <FontAwesomeIcon icon={faInstagram} className='socials-btn' />
            </a>
            <a href={'https://www.linkedin.com/in/oliver-morla/'} target='_blank'>
              <FontAwesomeIcon icon={faLinkedin} className='socials-btn' />
            </a>
          </motion.div>
        </section>

        <motion.section className="right-section"
          initial={{ opacity: 0, x: -40 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              delay: .6,
              staggerChildren: 0.2,
              delayChildren: 0.5
            }
          }}
        >
          <img src="/assets/portrait/portrait2.png" alt="" className="section-img" />
        </motion.section>

        <motion.section className="services-section">

          <div className="service-card">
            <aside>
              <FontAwesomeIcon icon={faHtml5} className='service-logo' />
              <div className="service-title"> Web Development </div>
            </aside>
            <p>
              Expert web developer who specializes
              <br />in building and maintaining high-quality
              <br />websites and web-based applications.
            </p>
          </div>
          <div className="service-card">
            <aside>
              <FontAwesomeIcon icon={faPython} className='service-logo' />
              <div className="service-title"> Application Development </div>
            </aside>
            <p>
              Experienced application developer who
              <br />specializes in creating custom software
              <br />solutions for businesses.
            </p>
          </div>
          <div className="service-card">
            <aside>
              <FontAwesomeIcon icon={faWordpress} className='service-logo' />
              <div className="service-title"> UI/UX Design </div>
            </aside>
            <p>
              Pro designer who specializes in creating
              <br />intuitive, visually appealing websites.
            </p>
          </div>

        </motion.section>

      </div>

      <motion.div
        className="middle-section"
        ref={parentContainer}
      >
        <ScrollTrigger
          initial={{ opacity: 0, transform: "translateX(-15px)" }}
          animate={{ opacity: 1, transform: "translateX(0)" }}
          transition={{
            ease: "linear",
            duration: .4,
            delay: .4

          }}
        >
          <section className="about-section">
            <div className="about-content">
              <h2> Positioning Statement </h2>
              <p>
                With a relentless focus on creating simple and intuitive user experiences, my work always puts the consumer at the forefront.
                I firmly believe in the power of technology to simplify lives and make complex processes seamless. This conviction drives me
                to continually hone my skills, stay abreast of emerging technologies, and create innovative solutions.

                In every role, I bring my dedication to clear communication, problem-solving, and service. Helping others, whether it's my team,
                stakeholders, or the end users of the products I work on, is always a top priority.

                Ready to bring my skills and passion to new challenges. Let's connect and explore how we can build the future together.
              </p>
            </div>
            <div className="about-img-w">
              <img src="/assets/portrait/portrait3.png" alt="" className="about-img" />
              <fieldset>
                <legend> Oliver Morla </legend>
                <p> - Full Stack Developer </p>
                <p> - Bachelors of Technology in Computer Science </p>
                <p> - 3+ Years of Experience </p>
              </fieldset>
            </div>
          </section>
        </ScrollTrigger>
        <section className="skills-section">
          <h2> <u> T </u> echnical Skills </h2>
          <ul>
            <li>Languages & Libraries: C/C++, C#, Java, Python, HTML, CSS, JavaScript, Express.js, Mongoose.js, Node.js, React.js, Redux.js, JWT </li>
            <li>Frameworks: Next.js, React-Router, Bootstrap, Tailwind, SCSS</li>
            <li>Databases & Tools: MongoDB, SQL/MySQL Workbench, Strapi CMS, EJS, Figma</li>
            <li>Applications & Cloud Platform: NetBeans, Visual Studio Code/Studio, Code::Blocks, Eclipse, Office, Teams, Azure, IBM, Any Desk, TeamViewer</li>
            <li>OS & Virtualizations: Windows 7, 8, 10, 11; Windows Server 2012/2019, Mac OS, IOS, Android, Virtual Box, VMware, Hyper-V</li>
          </ul>
        </section>
      </motion.div>

      {/* Home Page Bottom Section */}
      <div className="bottom-section">
        <ScrollTrigger
          initial={{ opacity: 0, transform: "translateX(-15px)" }}
          animate={{ opacity: 1, transform: "translateX(0)" }}
          transition={{
            ease: "linear",
            duration: .4,
            delay: .4

          }}
        >
          <h2 className="mb-8"><u>C</u>ertifications </h2>
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
          </div>
        </ScrollTrigger>
      </div>
    </motion.main>
  );
}

export default Home;