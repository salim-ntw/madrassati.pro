import React, { useState } from "react";
import logo from "../../assets/no-bg-logo.png";
import { useLanguage } from "../../contexts/LanguageContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { t, language } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center min-h-screen w-full overflow-hidden px-4 relative">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative bg-white/95 backdrop-blur-md w-full max-w-5xl h-auto md:h-[550px] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fadeIn">
        {/* Left Side - Image and Text */}
        <div
          className={`relative md:absolute top-0 md:h-full w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center gap-6 p-8 md:p-12 transition-transform duration-700 ease-in-out
          ${isLogin ? "translate-x-0" : "md:translate-x-full"}`}
        >
          <div className="transform hover:scale-105 transition-transform duration-300">
            <img src={logo} alt="logo" className="w-32 md:w-40 drop-shadow-lg" />
          </div>
          {isLogin ? (
            <div className="flex flex-col items-center text-center gap-4 animate-slideInUp">
              <h1 className="text-white font-bold text-3xl md:text-4xl drop-shadow-lg">
                Welcome Back!
              </h1>
              <p className="text-blue-100 text-base md:text-lg max-w-sm">
                Sign in to continue your educational journey with Madrassati
              </p>
              <button
                onClick={() => setIsLogin(false)}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 mt-4 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 border border-white/30"
              >
                Create Account
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-4 animate-slideInUp">
              <h1 className="text-white font-bold text-3xl md:text-4xl drop-shadow-lg">
                Join Madrassati!
              </h1>
              <p className="text-blue-100 text-base md:text-lg max-w-sm">
                Start your educational journey with our comprehensive school management platform
              </p>
              <button
                onClick={() => setIsLogin(true)}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 border border-white/30"
              >
                Sign In
              </button>
            </div>
          )}
        </div>

        {/* Forms Container */}
        <div
          className={`relative md:absolute top-0 md:h-full w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 transition-all duration-700 ease-in-out
          ${isLogin ? "md:left-1/2" : "md:left-0"}`}
        >
          {isLogin ? (
            <form className="flex flex-col w-full max-w-md gap-6 animate-slideInUp">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600">Enter your credentials to access your account</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border-2 border-gray-200 p-4 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full border-2 border-gray-200 p-4 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" /> Remember me
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
              
              <div className="text-center text-sm text-gray-600">
                Don't have an account? 
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 hover:text-blue-800 font-semibold ml-1 transition-colors duration-300"
                >
                  Sign up here
                </button>
              </div>
            </form>
          ) : (
            <form className="flex flex-col w-full max-w-md gap-4 animate-slideInUp">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600 text-sm">Join our educational community today</p>
              </div>
              
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <select className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                    <option value="">Register as</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="parent">Parent</option>
                  </select>
                </div>
              </div>
              
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Create Account
              </button>
              
              <div className="text-center text-sm text-gray-600">
                Already have an account? 
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 hover:text-blue-800 font-semibold ml-1 transition-colors duration-300"
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;