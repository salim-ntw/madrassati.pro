import React from "react";
import check from "../assets/icons/check.png";

export default function Plan({ title, description, price, popular = false }) {
  return (
    <div className={`relative flex flex-col gap-8 p-8 rounded-2xl text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 max-w-sm ${
      popular 
        ? 'bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-yellow-400' 
        : 'bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-600'
    }`}>
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
            Most Popular
          </div>
        </div>
      )}
     
      <div className="text-center">
        <h2 className="font-bold text-3xl tracking-wide mb-4">{title}</h2>
        <p className="text-gray-200 text-base leading-relaxed mb-6">{description}</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-yellow-400">{price} DA</span>
          <span className="text-sm text-gray-300 ml-2">/month</span>
        </div>
      </div>

      <button className={`w-full font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
        popular 
          ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-300 hover:to-yellow-400' 
          : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500'
      }`}>
        Get Started
      </button>

      <ul className="list-none space-y-4 mt-6">
        <li className="flex items-center gap-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <img className="w-4" src={check} alt="✔" />
          </div>
          <span className="text-gray-200">Real-time chat</span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <img className="w-4" src={check} alt="✔" />
          </div>
          <span className="text-gray-200">Grades & attendance tracking</span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <img className="w-4" src={check} alt="✔" />
          </div>
          <span className="text-gray-200">Secure data access</span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <img className="w-4" src={check} alt="✔" />
          </div>
          <span className="text-gray-200">School announcements</span>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <img className="w-4" src={check} alt="✔" />
          </div>
          <span className="text-gray-200">24/7 Support</span>
        </li>
      </ul>
    </div>
  );
}
