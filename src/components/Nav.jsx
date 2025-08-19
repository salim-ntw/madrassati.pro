import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/no-bg-logo.png"; 
import "../app.css"; 

function Nav() {
  return (
    <nav class="navbar">
      <a href="#">
        <img src={logo} alt="logo" class="logo" />
      </a>
      <ul class="nav-links">
        <li>
          <a href="#hero" class="nav-link">
            Home
          </a>
        </li>
        <li>
          <a href="#about" class="nav-link">
            About
          </a>
        </li>
        <li>
          <a href="#pricing" class="nav-link">
            Pricing
          </a>
        </li>
        <li>
          <a href="#testimonials" class="nav-link">
            Testimonials
          </a>
        </li>
        <li>
          <a href="#contact" class="nav-link">
            Contact
          </a>
        </li>
        <li>
          <a href="/auth" class="btn-login">
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
