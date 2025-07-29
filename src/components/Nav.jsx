import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/mdr.png";
function Nav() {
  return (
    <div className="flex flex-row justify-between w-full items-center bg-amber-300 p-4 shadow-md">
      <a href="#hero">
        <img src={logo} alt="logo" className="w-28 h-16" />
      </a>
      <div>
        <ul className="flex flex-row gap-4 text-lg font-semibold">
          <li>
            <a href="#hero">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <a href="#testimonials">Testimonials</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
