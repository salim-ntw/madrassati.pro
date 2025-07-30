import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/no-bg-logo.png";

function Nav() {
  return (
    <div className="flex justify-between items-center w-full bg-white px-6 shadow-sm h-[80px] fixed top-0 z-50 pt-5">
      <a href="#">
        <img src={logo} alt="logo" className="w-35 h-35" />
      </a>
      <div>
        <ul className="flex flex-row gap-12 text-lg font-semibold">
          <li>
            <a
              href="#hero"
              className="text-gray-800 hover:text-[#0a1b4f] border-b-2 border-transparent hover:border-[#0a1b4f] transition duration-300  active:text-gray-500"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-gray-800 hover:text-[#0a1b4f] border-b-2 border-transparent hover:border-[#0a1b4f] transition duration-300 active:text-gray-500"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className="text-gray-800 hover:text-[#0a1b4f] border-b-2 border-transparent hover:border-[#0a1b4f] transition duration-300 active:text-gray-500"
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              className="text-gray-800 hover:text-[#0a1b4f] border-b-2 border-transparent hover:border-[#0a1b4f] transition duration-300 active:text-gray-500"
            >
              Testimonials
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-gray-800 hover:text-[#0a1b4f] border-b-2 border-transparent hover:border-[#0a1b4f] transition duration-300 active:text-gray-500"
            >
              Contact
            </a>
          </li>
          <li>
            <Link
              to="/login"
              className="bg-[#0a1b4f] text-white px-4 py-2 rounded-xl hover:bg-gray-500 active:opacity-70 transition duration-300"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
