import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/mdr.png";
function Nav() {
  return (
    <div className="flex flex-row justify-between w-full items-center bg-white pl-4 pr-18 shadow-sm h-[80px] fixed top-0 z-50">
      <a href="#hero">
        <img src={logo} alt="logo" className="w-28 h-28" />
      </a>
      <div>
        <ul className="flex flex-row gap-12 text-lg font-semibold ">
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
