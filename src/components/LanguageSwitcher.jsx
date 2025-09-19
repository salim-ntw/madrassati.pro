import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = ({ className = "" }) => {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languageNames = {
    en: 'English',
    ar: 'العربية',
    fr: 'Français'
  };

  const languageFlags = {
    en: '🇺🇸',
    ar: '🇸🇦',
    fr: '🇫🇷'
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 border border-white/30 text-white font-medium"
      >
        <span className="text-lg">{languageFlags[language]}</span>
        <span className="text-sm hidden sm:inline">{languageNames[language]}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-white/30 overflow-hidden z-50">
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLanguage(lang);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-200 ${
                language === lang ? 'bg-blue-100 text-blue-800' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{languageFlags[lang]}</span>
              <span className="font-medium">{languageNames[lang]}</span>
              {language === lang && (
                <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSwitcher;
