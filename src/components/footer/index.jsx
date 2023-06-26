import { useState, useRef } from "react"
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faTwitter,
    faLinkedin,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import "./style.scss";

const Footer = () => {
    const formRef = useRef()

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const handleEmail = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const res = await emailjs.sendForm(
                import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_REACT_APP_EMAILJS_PUBLIC_KEY
            )
            setData(res)
            setLoading(false)
            alert('Your email was sent!')
        } catch (err) {
            setLoading(false)
            setError(true)
            alert(JSON.stringify(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <footer className="footer-w">
            <div className="top-section">
                <div className="about-us-w">
                    <h3 className="heading">About Me</h3>
                    <p className="info">
                        Passionate Full Stack Developer with over 2 years of experience
                        specializing in Node.js, Express.js, Next.js, React.js, JavaScript,
                        SCSS, HTML, and SQL. Thrives in collaborative environments, bringing
                        a team-oriented mindset and a detail-oriented approach to every
                        project.
                    </p>
                </div>
                <div className="socials-btn-w">
                    <h3 className="heading">Contact Me</h3>
                    <div className="icon-w">
                        <a href={"https://github.com/OliverMorla"} target="_blank">
                            <FontAwesomeIcon icon={faGithub} className="socials-btn" />
                        </a>
                        <a href={"https://twitter.com/Oliver1129"} target="_blank">
                            <FontAwesomeIcon icon={faTwitter} className="socials-btn" />
                        </a>
                        <a href={"https://www.instagram.com/oliverm11_/"} target="_blank">
                            <FontAwesomeIcon icon={faInstagram} className="socials-btn" />
                        </a>
                        <a href={"https://www.linkedin.com/in/oliver-morla/"} target="_blank">
                            <FontAwesomeIcon icon={faLinkedin} className="socials-btn" />
                        </a>
                    </div>
                </div>
                <div className="info-w">
                    <h3>Contact info:</h3>
                    <address>
                        <fieldset>
                            <legend> Info </legend>
                            <p>
                                <b> Email: </b> olivermorla3@gmail.com
                            </p>
                            <p>
                                <b> GitHub: </b> OliverMorla
                            </p>
                            <p>
                                <b> Linkedin: </b> OliverMorla
                            </p>
                        </fieldset>
                    </address>
                </div>
                <div className="email-contact-w">
                    <h3 className="heading">Have Questions?</h3>
                    <form onSubmit={handleEmail} ref={formRef}>
                        <input
                            type="text"
                            name="from_name"
                            id="email"
                            placeholder="Enter Email"
                            className="newsletter-textbox"
                        />
                        <button type="submit" className="send-btn">
                            Send
                        </button>
                    </form>
                </div>
            </div>
            <div className="bottom-section">
                <div className="copyright-text">Copyright ©2023 All rights reserved</div>
            </div>
        </footer>
    );
};

export default Footer;
