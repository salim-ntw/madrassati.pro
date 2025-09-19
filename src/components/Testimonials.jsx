import React, { useState } from "react";
import leftArrow from "../assets/icons/left-arrow.png";
import rightArrow from "../assets/icons/arrow-right.png";
import userImg from "../assets/icons/user.png";
import { useLanguage } from "../contexts/LanguageContext";

function Testimonials() {
  const { t, language } = useLanguage();
  
  const usersPov = [
    {
      img: userImg,
      name: "Sarah M.",
      role: t('parent'),
      text: "This platform makes it so easy to stay updated with my child's progress.",
    },
    {
      img: userImg,
      name: "Ali B.",
      role: t('teacher'),
      text: "Managing classes and sharing updates has never been smoother!",
    },
    {
      img: userImg,
      name: "Nadia K.",
      role: t('parent'),
      text: "Finally a tool that connects parents and teachers in real time.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? usersPov.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === usersPov.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      id="testimonials"
      className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex flex-col items-center py-16 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className={`text-4xl md:text-5xl font-bold text-white mb-4 animate-slideInDown ${language === 'ar' ? 'font-arabic' : ''}`}>
            {t('testimonialsTitle')}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-6 animate-slideInUp" style={{animationDelay: '0.2s'}}></div>
          <p className={`text-blue-100 text-lg md:text-xl max-w-2xl mx-auto animate-slideInUp ${language === 'ar' ? 'font-arabic' : ''}`} style={{animationDelay: '0.3s'}}>
            {t('testimonialsSubtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 w-full justify-center animate-slideInUp" style={{animationDelay: '0.4s'}}>
          {/* Left Arrow */}
          <button
            onClick={goToPrev}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-white/30"
          >
            <img src={leftArrow} alt="left arrow" className="w-6 h-6" />
          </button>

          {/* Active Testimonial Card */}
          <div
            key={currentIndex}
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-lg text-center transition-all duration-500 ease-in-out transform hover:scale-105 border border-white/20"
          >
            <div className="relative mb-6">
              <img
                src={usersPov[currentIndex].img}
                alt={usersPov[currentIndex].name}
                className="w-20 h-20 rounded-full mx-auto border-4 border-blue-500 shadow-lg"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 text-xl mb-2">
                {usersPov[currentIndex].name}
              </h3>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
                {usersPov[currentIndex].role}
              </p>
            </div>
            
            <div className="relative">
              <div className="text-4xl text-blue-200 absolute -top-4 -left-2">"</div>
              <p className="text-gray-700 text-lg leading-relaxed italic relative z-10">
                {usersPov[currentIndex].text}
              </p>
              <div className="text-4xl text-blue-200 absolute -bottom-4 -right-2">"</div>
            </div>
            
            {/* Rating Stars */}
            <div className="flex justify-center mt-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">⭐</span>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-white/30"
          >
            <img src={rightArrow} alt="right arrow" className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {usersPov.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
