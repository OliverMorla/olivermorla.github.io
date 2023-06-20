import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer } from '@fortawesome/free-solid-svg-icons';
import "./style.scss"

const Error = () => {
    return (
        <motion.main className='error-w'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h1> Error Page / 404 </h1>
            <p> This page under construction <FontAwesomeIcon icon={faHammer} /></p>
        </motion.main>
    );
}

export default Error;