import React from "react";
import facebook from "../assets/icons/communication.png";
import instagram from "../assets/icons/instagram.png";

export default function Footer() {
  return (
    <footer className="bg-[#0a1b4f] text-white py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Madrassati</h2>
          <p className="text-gray-300">
            Making school management simple and effective for everyone.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/About" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="/pricing" className="hover:text-white transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:scale-110 transition">
              <img src={facebook} alt="Facebook" className="w-8 h-8" />
            </a>
            <a href="#" className="hover:scale-110 transition">
              <img src={instagram} alt="Instagram" className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm mt-10 border-t border-gray-600 pt-4">
        © {new Date().getFullYear()} Madrassati. All Rights Reserved.
      </div>
    </footer>
  );
}
