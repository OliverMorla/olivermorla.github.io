import { useRef, useState } from "react"
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";
import "./style.scss"

const Contact = () => {
    const formRef = useRef()

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const [isDisabled, setDisabled] = useState(false)

    async function sendForm(e) {
        e.preventDefault();

        try {
            setError(false)
            setLoading(true)
            const res = await emailjs.sendForm(import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID, import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID, formRef.current, import.meta.env.VITE_REACT_APP_EMAILJS_PUBLIC_KEY)
            setData(res)
            setLoading(false)
            setDisabled(true)
            alert('Your email was sent!')
        } catch (err) {
            setDisabled(false)
            setLoading(false)
            setError(true)
            alert(JSON.stringify(err))
        }
    }
    return (
        <motion.main
            className="contact-w"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

        >
            <div className="details-section">
                <h3 className="heading mb-4">Let's talk about everything!</h3>
                <p>Let's connect and explore how we can build the future together.</p>
                <img src="/assets/" alt="" className='contact-img' />
            </div>
            <div className="form-section">

                <form className="form-w" id="contactForm" name="contactForm" ref={formRef} onSubmit={sendForm}>
                    <div className="row">
                        <div className="wrapper">
                            <input type="name" className="form-control" name="from_name" id="name" placeholder="Your name" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="wrapper">
                            <input type="email" className="form-control" name="from_email" id="email" placeholder="Email" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="wrapper">
                            <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="wrapper">
                            <textarea className="form-control" name="message" id="message" cols="30" rows="7" placeholder="Write your message"></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="wrapper">
                            <input type="submit" value="Send Message" className="" disabled={isDisabled} />
                        </div>
                    </div>
                </form>
            </div>
        </motion.main>
    );
}

export default Contact;