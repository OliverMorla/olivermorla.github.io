import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import skills from './skills';

import {
    faPython,
    faHtml5,
    faWordpress,
    faJs,
    faCss3,
    faReact,
    faNodeJs,
    faSass,
    faJava,
    faGit,
    faGithub,
} from '@fortawesome/free-brands-svg-icons';

const Cards = () => {
    return (
        <>
            {skills.map((skill) =>
            (<div className="skill-card" key={skill.id}>
                <h2>{skill.title}</h2>
                <h4>{skill.years}+ years</h4>
                <button> Preview </button>
            </div>
            ))}
        </>
    );
}

export default Cards;