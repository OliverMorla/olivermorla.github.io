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

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!formInput.email.includes("@") || !formInput.email.includes("."))
      return alert("Please enter a valid email address");

    if (!formInput.name) return alert("Please fill in the name field");

    if (!formInput.message) return alert("Please fill in the message field");

    alert("Form submitted (not really)!");
  };

  return (
    <motion.form
      className="flex flex-col w-full"
      style={{
        boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.1)",
        padding: "20px",
        borderRadius: "10px",
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: 0.8,
        },
      }}
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tighter">Get In Touch</h1>
        <div className="block w-20 h-[1px] bg-[--tertiary]"></div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={handleInputChange}
          className="p-4 border-b-gray bg-transparent border-b-[1px]"
        />
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          onChange={handleInputChange}
          className="p-4 border-b-gray bg-transparent border-b-[1px]"
        />
        <textarea
          name="message"
          placeholder="Enter your message"
          onChange={handleInputChange}
          className="p-4 border-b-gray bg-transparent border-b-[1px]"
        />
        <button
          className="bg-[--color-dark-gray] px-6 py-4 font-bold rounded-2xl flex gap-2 mr-2 hover:bg-[--tertiary-hover] transition-all w-fit text-[--text-color]"
          onClick={handleFormSubmit}
        >
          Send Message
        </button>
      </div>
    </motion.form>
  );
};

export default ContactForm;
