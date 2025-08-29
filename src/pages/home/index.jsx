import React from "react";
import Nav from "../../components/Nav";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Testimonials from "../../components/Testimonials";
import Pricing from "../../components/Pricing";

export default function index() {
  return (
    <div>
      <Nav />
      <Hero />
      <About />
      <Pricing />
      <Testimonials />
    </div>
  );
}
