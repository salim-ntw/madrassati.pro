import React from "react";
import mainBg from "../assets/new-bg-hero.jpg";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

function Hero() {
  const { t, language } = useLanguage();
  
  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={mainBg}
          alt="Main background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl animate-fadeIn">
        <div className="mb-8">
          <h1 className={`font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-poppins mb-6 text-white drop-shadow-2xl animate-slideInDown ${language === 'ar' ? 'font-arabic' : ''}`}>
            {t('heroTitle')}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full animate-slideInUp" style={{animationDelay: '0.2s'}}></div>
        </div>
        
        <p className={`text-base sm:text-lg md:text-xl font-cairo text-white/90 drop-shadow-lg mb-10 max-w-2xl mx-auto animate-slideInUp ${language === 'ar' ? 'font-arabic' : ''}`} style={{animationDelay: '0.3s'}}>
          {t('heroSubtitle')}
        </p>
        
        <div className="flex justify-center items-center animate-slideInUp" style={{animationDelay: '0.4s'}}>
          <Link
            to="/login"
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold px-12 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg"
          >
            {t('getStarted')}
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
