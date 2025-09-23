import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/no-bg-logo.png";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher"; 

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`flex justify-between items-center w-full px-6 h-[80px] fixed top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white shadow-sm'
    }`}>
      {/* Logo */}
      <a href="#" className="transform hover:scale-105 transition-transform duration-300">
        <img src={logo} alt="logo" className="w-24 h-auto" />
      </a>

      {/* Desktop Menu */}
      <ul className="hidden md:flex flex-row gap-6 text-lg font-semibold items-center">
        <li>
          <a
            href="#hero"
            className="text-gray-800 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            {t('home')}
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="text-gray-800 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            {t('about')}
          </a>
        </li>
        <li>
          <a
            href="#pricing"
            className="text-gray-800 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            {t('pricing')}
          </a>
        </li>
        <li>
          <a
            href="#testimonials"
            className="text-gray-800 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            {t('testimonials')}
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="text-gray-800 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            {t('contact')}
          </a>
        </li>
        <li>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white text-gray-800 border border-gray-200 hover:border-blue-300 transition-colors duration-200"
          >
            <option value="ar">العربية</option>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </li>
        <li>
          <Link
            to="/login"
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t('login')}
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
        >
          {isOpen ? <X size={28} className="text-gray-800" /> : <Menu size={28} className="text-gray-800" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`absolute top-[80px] left-0 w-full bg-white/95 backdrop-blur-md shadow-lg md:hidden transition-all duration-300 transform ${
        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <ul className="flex flex-col items-center gap-6 py-6 text-lg font-semibold">
          <li>
            <a 
              href="#hero" 
              onClick={() => setIsOpen(false)}
              className="text-gray-800 hover:text-blue-600 transition-colors duration-300 transform hover:scale-105"
            >
              {t('home')}
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              onClick={() => setIsOpen(false)}
              className="text-gray-800 hover:text-blue-600 transition-colors duration-300 transform hover:scale-105"
            >
              {t('about')}
            </a>
          </li>
          <li>
            <a 
              href="#pricing" 
              onClick={() => setIsOpen(false)}
              className="text-gray-800 hover:text-blue-600 transition-colors duration-300 transform hover:scale-105"
            >
              {t('pricing')}
            </a>
          </li>
          <li>
            <a 
              href="#testimonials" 
              onClick={() => setIsOpen(false)}
              className="text-gray-800 hover:text-blue-600 transition-colors duration-300 transform hover:scale-105"
            >
              {t('testimonials')}
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="text-gray-800 hover:text-blue-600 transition-colors duration-300 transform hover:scale-105"
            >
              {t('contact')}
            </a>
          </li>
          <li className="w-full px-6">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white text-gray-800 border border-gray-200"
            >
              <option value="ar">العربية</option>
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </li>
          <li>
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              {t('login')}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
