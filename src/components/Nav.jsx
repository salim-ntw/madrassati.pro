import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/no-bg-logo.png";
import { Menu, X } from "lucide-react"; // For hamburger icons

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between items-center w-full bg-white px-6 shadow-sm h-[80px] fixed top-0 z-50">
      {/* Logo */}
      <a href="#">
        <img src={logo} alt="logo" className="w-24 h-auto" />
      </a>

      {/* Desktop Menu */}
      <ul className="hidden md:flex flex-row gap-12 text-lg font-semibold">
        <li>
          <a
            href="#hero"
            className="text-gray-800 hover:text-[#0a1b4f] border-b-2 border-transparent hover:border-[#0a1b4f] transition duration-300"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="text-gray-800 hover:text-[#0a1b4f] border-b-2 border-transparent hover:border-[#0a1b4f] transition duration-300"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#pricing"
            className="text-gray-800 hover:text-[#0a1b4f] border-b-2 border-transparent hover:border-[#0a1b4f] transition duration-300"
          >
            Pricing
          </a>
        </li>
        <li>
          <a
            href="#testimonials"
            className="text-gray-800 hover:text-[#0a1b4f] border-b-2 border-transparent hover:border-[#0a1b4f] transition duration-300"
          >
            Testimonials
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="text-gray-800 hover:text-[#0a1b4f] border-b-2 border-transparent hover:border-[#0a1b4f] transition duration-300"
          >
            Contact
          </a>
        </li>
        <li>
          <Link
            to="/login"
            className="bg-[#0a1b4f] text-white px-4 py-2 rounded-xl hover:bg-gray-500 transition duration-300"
          >
            Login
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-white shadow-lg md:hidden transition-all duration-300">
          <ul className="flex flex-col items-center gap-6 py-6 text-lg font-semibold">
            <li>
              <a href="#hero" onClick={() => setIsOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setIsOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#pricing" onClick={() => setIsOpen(false)}>
                Pricing
              </a>
            </li>
            <li>
              <a href="#testimonials" onClick={() => setIsOpen(false)}>
                Testimonials
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setIsOpen(false)}>
                Contact
              </a>
            </li>
            <li>
              <Link
                to="/login"
                className="bg-[#0a1b4f] text-white px-4 py-2 rounded-xl hover:bg-gray-500 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Nav;
