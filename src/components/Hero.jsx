import React from "react";
import mainBg from "../assets/new-bg-hero.jpg";
import { Link } from "react-router-dom";
import "../index.css"; 

function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <img
        src={mainBg}
        alt="Main background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-70 z-0"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10 text-[#100071]   h-[40%] top-1/2  right-[60%] ">
        <h1 className="font-extrabold text-5xl md:text-6xl font-poppins mb-4 drop-shadow-lg">
          Madrassati
        </h1>
        <p className="max-w-2xl text-lg md:text-xl font-cairo drop-shadow-md text-[#100071] ">
          Stay connected to your child's school life anytime, anywhere.
        </p>
        <Link
          to="/auth"
          className="mt-6 bg-gray-500 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 cursor-pointer active:opacity-70"
        >
          Join Us
        </Link>
      </div>
    </section>
  );
}

export default Hero;
