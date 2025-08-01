import React from "react";
import logo from "../../assets/no-bg-logo.png";

const Register = () => {
  return (
    <div className="bg-gradient-to-br from-blue-950 to-gray-400 flex items-center justify-center min-h-screen w-screen">
      <div className="bg-white w-[90%] max-w-5xl flex rounded-xl shadow-lg overflow-hidden">
        {/* left Side - Form */}
        <div className="w-1/2 flex items-center justify-center p-8">
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
            <div className="flex gap-4">
              <input
                type="password"
                placeholder="Password"
                className="w-1/2 border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-1/2 border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              type="tel"
              placeholder="Phone number"
              className="border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-4">
              <select className="w-1/2 border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <select className="w-1/2 border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
        </div>

        {/* right Side */}
        <div className="flex flex-col bg-gray-400 w-1/2 items-center justify-center gap-6 p-10">
          <img src={logo} alt="logo" className="w-28" />
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-white font-bold text-3xl">
              Welcome to Madrassati,
            </h1>
            <p className="text-blue-950 text-sm">Already have an account?</p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="bg-blue-950 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition duration-300 cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
