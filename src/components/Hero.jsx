import React from "react";
import mainBg from "../assets/new-bg-hero.jpg";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={mainBg}
        alt="Main background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-70 z-0"
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl">
        <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl font-poppins mb-4 text-[#100071] drop-shadow-lg">
          Madrassati
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-cairo text-[#100071] drop-shadow-md mb-6">
          Stay connected to your child's school life anytime, anywhere.
        </p>
        <Link
          to="/login"
          className="bg-gray-500 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 cursor-pointer active:opacity-70"
        >
          Join Us
        </Link>
      </div>
    </section>
  );
}

export default Hero;
