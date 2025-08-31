import React, { useState } from "react";
import logo from "../../assets/no-bg-logo.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-gradient-to-br from-blue-950 to-gray-400 flex items-center justify-center min-h-screen w-screen overflow-hidden px-4">
      <div className="relative bg-white w-full max-w-5xl h-auto md:h-[500px] rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Right Side - Image and Text */}
        <div
          className={`relative md:absolute top-0 md:h-full w-full md:w-1/2 bg-gray-400 flex flex-col items-center justify-center gap-4 p-8 md:p-10 transition-transform duration-700 ease-in-out
          ${isLogin ? "translate-x-0" : "md:translate-x-full"}`}
        >
          <img src={logo} alt="logo" className="w-32 md:w-40" />
          {isLogin ? (
            <div className="flex flex-col items-center text-center gap-2">
              <h1 className="text-white font-bold text-2xl md:text-3xl">
                Welcome Back,
              </h1>
              <p className="text-blue-950 text-sm md:text-base">
                Don't have an account?
              </p>
              <button
                onClick={() => setIsLogin(false)}
                className="bg-blue-950 text-white px-4 py-2 mt-2 rounded-lg text-sm hover:bg-blue-800 transition duration-300 cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-2">
              <h1 className="text-white font-bold text-2xl md:text-3xl">
                Welcome to Madrassati,
              </h1>
              <p className="text-blue-950 text-sm md:text-base">
                Already have an account?
              </p>
              <button
                onClick={() => setIsLogin(true)}
                className="bg-blue-950 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition duration-300 cursor-pointer"
              >
                Login
              </button>
            </div>
          )}
        </div>

        {/* Forms Container */}
        <div
          className={`relative md:absolute top-0 md:h-full w-full md:w-1/2 flex items-center justify-center p-6 md:p-10 transition-all duration-700 ease-in-out
          ${isLogin ? "md:left-1/2" : "md:left-0"}`}
        >
          {isLogin ? (
            <form className="flex flex-col w-full max-w-sm gap-4">
              <h2 className="text-2xl font-bold text-blue-950 text-center mb-4">
                Login
              </h2>
              <input
                type="text"
                placeholder="Enter your email"
                className="border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between items-center text-sm flex-wrap gap-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" /> Remember me
                </label>
                <a href="#" className="text-blue-700 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="bg-blue-950 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition duration-300 cursor-pointer"
              >
                Login
              </button>
            </form>
          ) : (
            <form className="flex flex-col w-full max-w-sm gap-4">
              <h2 className="text-2xl font-bold text-blue-950 text-center mb-2">
                Register
              </h2>
              <input
                type="text"
                placeholder="Full name"
                className="border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-4 flex-col sm:flex-row">
                <input
                  type="password"
                  placeholder="Password"
                  className="sm:w-1/2 border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="sm:w-1/2 border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="tel"
                placeholder="Phone number"
                className="border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-4 flex-col sm:flex-row">
                <select className="sm:w-1/2 border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <select className="sm:w-1/2 border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Register as</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="parent">Parent</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-950 text-white py-2 rounded font-semibold hover:bg-blue-800 transition duration-300 cursor-pointer"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
