import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/no-bg-logo.png";
import { authAPI } from "../../utils/auth";

const Register = () => {
  const navigate = useNavigate();
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    role: ''
  });
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');

    // Check if all fields are filled
    const requiredFields = ['name', 'email', 'password', 'confirmPassword', 'phone', 'gender', 'role'];
    const emptyFields = requiredFields.filter(field => !registerData[field]);
    
    if (emptyFields.length > 0) {
      setRegisterError('Please fill in all fields.');
      return;
    }

    // Check password confirmation
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('Passwords do not match.');
      return;
    }

    setRegisterLoading(true);

    try {
      const response = await authAPI.register(registerData);
      
      if (response.success) {
        setRegisterSuccess('Registration successful!');
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      if (error.response?.data?.error?.includes('exists')) {
        setRegisterError('Email already exists.');
      } else {
        setRegisterError(error.response?.data?.error || 'Registration failed.');
      }
    } finally {
      setRegisterLoading(false);
    }
  };

  // Input change handler
  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
    if (registerError) setRegisterError('');
    if (registerSuccess) setRegisterSuccess('');
  };

  return (
    <div className="bg-gradient-to-br from-blue-950 to-gray-400 flex items-center justify-center min-h-screen w-screen">
      <div className="bg-white w-[90%] max-w-5xl flex rounded-xl shadow-lg overflow-hidden">
        {/* left Side - Form */}
        <div className="w-1/2 flex items-center justify-center p-6 md:p-8">
          <form onSubmit={handleRegister} className="flex flex-col w-full max-w-sm gap-3 md:gap-4">
            <h2 className="text-2xl font-bold text-blue-950 text-center mb-1 md:mb-2">
              Register
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={registerData.name}
              onChange={handleRegisterInputChange}
              className="border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterInputChange}
              className="border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={handleRegisterInputChange}
                className="w-1/2 border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={registerData.confirmPassword}
                onChange={handleRegisterInputChange}
                className="w-1/2 border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={registerData.phone}
              onChange={handleRegisterInputChange}
              className="border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-3 md:gap-4">
              <select 
                name="gender"
                value={registerData.gender}
                onChange={handleRegisterInputChange}
                className="w-1/2 border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <select 
                name="role"
                value={registerData.role}
                onChange={handleRegisterInputChange}
                className="w-1/2 border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Register as</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
              </select>
            </div>

            {registerError && (
              <div className="text-red-600 text-sm text-center">
                {registerError}
              </div>
            )}

            {registerSuccess && (
              <div className="text-green-600 text-sm text-center">
                {registerSuccess}
              </div>
            )}

            <button
              type="submit"
              disabled={registerLoading}
              className="bg-blue-950 text-white py-2 rounded font-semibold hover:bg-blue-800 transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {registerLoading ? 'Creating Account...' : 'Register'}
            </button>
          </form>
        </div>

        {/* right Side */}
        <div className="flex flex-col bg-gray-400 w-1/2 items-center justify-center gap-4 md:gap-6 p-6 md:p-10">
          <img src={logo} alt="logo" className="w-32 md:w-40" />
          <div className="flex flex-col items-center text-center gap-1 md:gap-2">
            <h1 className="text-white font-bold text-2xl md:text-3xl">
              Welcome to Madrassati,
            </h1>
            <p className="text-blue-950 text-xs md:text-sm">Already have an account?</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-950 text-white px-4 py-2 rounded-lg text-xs md:text-sm hover:bg-blue-800 transition duration-300 cursor-pointer"
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
