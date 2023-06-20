import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom"
import "./style.scss"

const Footer = () => {
    return (
        <footer className="footer-w">
            <div className="section-one">
                <div className="about-us-w">
                    <h3 className="heading">About Me</h3>
                    <p className="info">
                        Passionate Full Stack Developer with over 2 years of experience specializing in Node.js, Express.js, Next.js,
                        React.js, JavaScript, SCSS, HTML, and SQL. Thrives in collaborative environments, bringing a team-oriented mindset
                        and a detail-oriented approach to every project.
                    </p>
                </div>
                <div className="social-icon-w">
                    <h3 className="heading">Contact Me</h3>
                    <div className="icon-w">
                        <a href={'https://github.com/OliverMorla'}>
                            <FontAwesomeIcon icon={faGithub} className='socials-btn' />
                        </a>
                        <a href={'https://twitter.com/Oliver1129'}>
                            <FontAwesomeIcon icon={faTwitter} className='socials-btn' />
                        </a>
                        <a href={'https://www.instagram.com/oliverm11_/'}>
                            <FontAwesomeIcon icon={faInstagram} className='socials-btn' />
                        </a>
                        <a href={'https://www.linkedin.com/in/oliver-morla/'}>
                            <FontAwesomeIcon icon={faLinkedin} className='socials-btn' />
                        </a>
                    </div>
                </div>
                <div className="info-w">
                    <h3>Contact info:</h3>
                    <address>
                        <fieldset>
                            <legend> Info </legend>
                            <p> <b> Email: </b> olivermorla3@gmail.com </p>
                            <p> <b> GitHub: </b> OliverMorla </p>
                            <p> <b> Linkedin: </b> OliverMorla </p>
                        </fieldset>
                    </address>
                </div>
                <div className="email-contact-w">
                    <h3 className="heading">Have Questions?</h3>
                    <form>
                        <input type="text" name="email" id="email-n" placeholder='Enter Email' className='newsletter-textbox' />
                        <button type="submit" className='send-btn'>Send</button>
                    </form>
                </div>
            </div>
            <div className="section-two">
                <div className="copyright-w">
                    Copyright ©2023 All rights reserved
                </div>
            </div>
        </footer>
    );
}

export default Footer;