import React from "react";
import skills from "./skills";

const Cards = () => {
  return (
    <>
      {skills.map((skill) => (
        <div className="skill-card" key={skill.id}>
          <h2>{skill.title}</h2>
          <h4>{skill.years}+ years</h4>
          <button> Preview </button>
        </div>
      ))}
    </>
  );
};

export default Cards;
