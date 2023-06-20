import React from 'react';
import { NavLink } from "react-router-dom";
import "./style.scss"

const Header = () => {
    return (
        <header className="header-w">
            <nav className="nav-w">
                <div className="nav-menu-w">
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink to={"/about"}>About</NavLink>
                    <NavLink to={"/skills"}>Skills</NavLink>
                    <NavLink to={"/blog"}>Blog</NavLink>
                    <NavLink to={"/portfolio"}>Portfolio</NavLink>
                    <NavLink to={"/services"}>Services</NavLink>
                    <NavLink to={"/contact"}>Contact</NavLink>
                </div>
            </nav>
        </header>
    );
}

export default Header;