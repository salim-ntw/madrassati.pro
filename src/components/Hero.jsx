import React from "react";

import mainBg from "../assets/mainBg.jpg";
function Hero() {
  return (
    <div className="h-screen w-full ">
      <section id="#hero">
        <img src={mainBg} alt="main backgound" className="relative " />
      </section>
    </div>
  );
}

export default Hero;
