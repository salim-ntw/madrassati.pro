import React from "react";
import check from "../assets/icons/check.png";

export default function Plan({ title, description, price }) {
  return (
    <div className="flex flex-col bg-gradient-to-r from-blue-800/80 to-gray-500/80 gap-6 p-8 rounded-2xl text-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 max-w-sm">
     
      <h2 className="text-center font-bold text-3xl tracking-wide">{title}</h2>
      <p className="text-center text-gray-100 text-lg">{description}</p>
      <p className="text-center text-2xl font-semibold">
        <span className="text-yellow-400">{price}</span>
        <span className="text-sm text-gray-200"> /month</span>
      </p>
      <button className="mt-4 bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded-full shadow-md hover:bg-yellow-300 transition cursor-pointer">
        Get Started
      </button>

     
      <ul className="list-none space-y-3 mt-6">
        <li className="flex items-center gap-3">
          <img className="w-6" src={check} alt="✔" />
          Real-time chat
        </li>
        <li className="flex items-center gap-3">
          <img className="w-6" src={check} alt="✔" />
          Grades & attendance tracking
        </li>
        <li className="flex items-center gap-3">
          <img className="w-6" src={check} alt="✔" />
          Secure data access
        </li>
        <li className="flex items-center gap-3">
          <img className="w-6" src={check} alt="✔" />
          School announcements
        </li>
      </ul>
    </div>
  );
}
