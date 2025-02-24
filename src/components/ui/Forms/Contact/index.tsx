"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!formInput.email.includes("@") || !formInput.email.includes("."))
      return alert("Please enter a valid email address");

    if (!formInput.name) return alert("Please fill in the name field");

    if (!formInput.message) return alert("Please fill in the message field");

    const res = await fetch("/api/contact/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInput),
    });

    const data = await res.json();

    if (!data.ok) {
      alert(data.message);
      return;
    }

    alert(data.message);
  };

  return (
    <motion.form
      className="flex flex-col w-full max-w-2xl mx-auto"
      style={{
        boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.12)",
        padding: "2.5rem",
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          ease: "easeOut",
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">Get In Touch</h1>
        <div className="block w-24 h-[2px] bg-gradient-to-r from-purple-600 to-transparent"></div>
      </motion.div>
      <div className="flex flex-col gap-6 mt-8">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleInputChange}
            className="w-full p-4 bg-transparent border-b-[1px] border-gray-300/30 focus:border-purple-600 transition-all duration-300 outline-none placeholder:text-gray-500"
          />
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            onChange={handleInputChange}
            className="w-full p-4 bg-transparent border-b-[1px] border-gray-300/30 focus:border-purple-600 transition-all duration-300 outline-none placeholder:text-gray-500"
          />
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <textarea
            name="message"
            placeholder="Enter your message"
            onChange={handleInputChange}
            className="w-full p-4 bg-transparent border-b-[1px] border-gray-300/30 focus:border-purple-600 transition-all duration-300 outline-none placeholder:text-gray-500 min-h-[120px] resize-none"
          />
        </motion.div>
        <motion.button
          className="bg-gray-900 px-8 py-4 font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 hover:transform hover:scale-105 transition-all duration-300 w-full sm:w-fit text-white mt-4"
          onClick={handleFormSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Send Message
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </motion.button>
      </div>
    </motion.form>
  );
};

export default ContactForm;
