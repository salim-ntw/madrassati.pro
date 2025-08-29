import React, { useState } from "react";
import leftArrow from "../assets/icons/left-arrow.png";
import rightArrow from "../assets/icons/arrow-right.png";
import userImg from "../assets/icons/user.png";

function Testimonials() {
  const usersPov = [
    {
      img: userImg,
      name: "Sarah M.",
      role: "Parent",
      text: "This platform makes it so easy to stay updated with my child’s progress.",
    },
    {
      img: userImg,
      name: "Ali B.",
      role: "Teacher",
      text: "Managing classes and sharing updates has never been smoother!",
    },
    {
      img: userImg,
      name: "Nadia K.",
      role: "Parent",
      text: "Finally a tool that connects parents and teachers in real time.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0); //index 0

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? usersPov.length - 1 : prev - 1));
  };
  //when click on the left arrow, it goes to prev  'usersPov.length - 1' it goes to the last item in the array  shadow-blue-800/50

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === usersPov.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      id="testimonials"
      className="bg-[#0a1b4f]  flex flex-col items-center py-12 px-6"
    >
      <h1 className="text-3xl font-bold text-gray-200">Testimonials</h1>
      <h3 className="text-gray-400 text-center mt-2 mb-6">
        Trusted by <span className="font-bold text-gray-200">Parents</span> and{" "}
        <span className="font-bold text-gray-200">Teachers</span>
      </h3>

      <div className="flex items-center gap-6">
        {/* Left Arrow */}
        <button
          onClick={goToPrev}
          className="bg-white p-2 rounded-full shadow hover:bg-blue-100"
        >
          <img src={leftArrow} alt="left arrow" className="w-6 h-6" />
        </button>

        {/* Active Testimonial Card */}
        <div
          key={currentIndex}
          className="bg-white rounded-xl shadow-lg  p-8 w-[450px] text-center transition-all duration-500 ease-in-out transform hover:scale-105"
        >
          <img
            src={usersPov[currentIndex].img}
            alt={usersPov[currentIndex].name}
            className="w-[60px] h-[60px] rounded-full mx-auto mb-4"
          />
          <h3 className="font-bold text-blue-900 text-lg">
            {usersPov[currentIndex].name}
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            {usersPov[currentIndex].role}
          </p>
          <p className="text-gray-700 italic text-base">
            “{usersPov[currentIndex].text}”
          </p>
        </div>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="bg-white p-2 rounded-full shadow hover:bg-blue-100"
        >
          <img src={rightArrow} alt="right arrow" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default Testimonials;
