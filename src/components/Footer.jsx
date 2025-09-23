import React from "react";
import facebook from "../assets/icons/communication.png";
import instagram from "../assets/icons/instagram.png";
import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();
  
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="animate-slideInUp" style={{animationDelay: '0.1s'}}>
            <h2 className={`text-3xl font-bold tracking-tight mb-6 ${language === 'ar' ? 'font-arabic' : ''}`}>Madrassati</h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-6">
              Making school management simple and effective for everyone. Connect, communicate, and collaborate seamlessly.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
                <img src={facebook} alt="Facebook" className="w-6 h-6 filter brightness-0 invert" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
                <img src={instagram} alt="Instagram" className="w-6 h-6 filter brightness-0 invert" />
              </a>
            </div>
          </div>

          <div className="animate-slideInUp" style={{animationDelay: '0.2s'}}>
            <h3 className={`text-xl font-semibold mb-6 ${language === 'ar' ? 'font-arabic' : ''}`}>{t('quickLinks')}</h3>
            <ul className="space-y-4 text-blue-100">
              <li>
                <a href="#hero" className="hover:text-white transition-all duration-300 transform hover:translate-x-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  {t('home')}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-all duration-300 transform hover:translate-x-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  {t('about')}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-all duration-300 transform hover:translate-x-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  {t('pricing')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-all duration-300 transform hover:translate-x-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  {t('contact')}
                </a>
              </li>
            </ul>
          </div>

          <div className="animate-slideInUp" style={{animationDelay: '0.3s'}}>
            <h3 className={`text-xl font-semibold mb-6 ${language === 'ar' ? 'font-arabic' : ''}`}>{t('contactInfo')}</h3>
            <div className="space-y-4 text-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-sm">📧</span>
                </div>
                <span>madrassati@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-sm">📞</span>
                </div>
                <span>+213 123 456 789</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-sm">📍</span>
                </div>
                <span>Algeria, North Africa</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-200 text-center md:text-left">
              © {new Date().getFullYear()} Madrassati. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-blue-200 text-sm">
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
