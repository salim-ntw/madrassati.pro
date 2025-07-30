import React from "react";
import Nav from "../../components/Nav";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Testimonials from "../../components/Testimonials";

export default function index() {
  return (
    <div>
      <Nav />
      <Hero />
      <About />
      <Testimonials />
    </div>
  );
}
