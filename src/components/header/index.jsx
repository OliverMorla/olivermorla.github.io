import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const Header = () => {
  const menuRef = useRef(null);
  return (
    <header className="header-w">
      <nav className="nav-w">
        <div className="menu-w" ref={menuRef}>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/about"}>About</NavLink>
          <NavLink to={"/skills"}>Skills</NavLink>
          <NavLink to={"/blog"}>Blog</NavLink>
          <NavLink to={"/portfolio"}>Portfolio</NavLink>
          <NavLink to={"/services"}>Services</NavLink>
          <NavLink to={"/contact"}>Contact</NavLink>
        </div>
        <div className="mobile-menu-w">
          <FontAwesomeIcon
            icon={faBars}
            className="menu-icon"
            onClick={(e) => {
              menuRef.current.classList.toggle("open");
              e.currentTarget.classList.toggle("rotate");
            }}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
