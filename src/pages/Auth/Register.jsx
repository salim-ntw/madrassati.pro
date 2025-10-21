import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/no-bg-logo.png";
import { authAPI } from "../../utils/auth";

const Register = () => {
  const navigate = useNavigate();
  
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    role: '',
    subject: '',
    classes: '',
    className: '',
    childrenEmails: ['']
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
    const requiredFields = ['fullName', 'email', 'password', 'confirmPassword', 'phone', 'gender', 'role'];
    
    // Add teacher-specific fields if role is teacher
    if (registerData.role === 'teacher') {
      requiredFields.push('subject', 'classes');
    }
    
    // Add parent-specific validation if role is parent
    if (registerData.role === 'parent') {
      // Check if at least one child email is provided
      const validChildEmails = registerData.childrenEmails.filter(email => email.trim() !== '');
      if (validChildEmails.length === 0) {
        setRegisterError('Please provide at least one child email address.');
        return;
      }
    }
    
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
      // Prepare registration data
      const payload = {
        ...registerData,
        name: registerData.fullName, // Map fullName to name for backend
        classes: registerData.classes
          ? registerData.classes.split(",").map(c => c.trim())
          : [],
        childrenEmails: registerData.role === 'parent' 
          ? registerData.childrenEmails.filter(email => email.trim() !== '')
          : undefined
      };

      const response = await authAPI.register(payload);
      
      if (response.success) {
        setRegisterSuccess('Registration successful! Redirecting...');
        
        // Save user data and token
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Redirect based on role
        setTimeout(() => {
          if (user.role === 'parent') {
            // Redirect to parent portal with roleSpecificId (parent document ID)
            navigate(`/parent/${user.roleSpecificId || user.id}`);
          } else if (user.role === 'student') {
            // Redirect to student portal
            navigate(`/student/${user.roleSpecificId || user.id}/dashboard`);
          } else if (user.role === 'teacher') {
            // Redirect to teacher portal
            navigate(`/teacher/${user.roleSpecificId || user.id}/dashboard`);
          } else {
            // Default to login
            navigate('/login');
          }
        }, 1500);
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

  // Handle child email input changes
  const handleChildEmailChange = (index, value) => {
    setRegisterData(prev => ({
      ...prev,
      childrenEmails: prev.childrenEmails.map((email, i) => 
        i === index ? value : email
      )
    }));
    if (registerError) setRegisterError('');
    if (registerSuccess) setRegisterSuccess('');
  };

  // Add new child email field
  const addChildEmailField = () => {
    setRegisterData(prev => ({
      ...prev,
      childrenEmails: [...prev.childrenEmails, '']
    }));
  };

  // Remove child email field
  const removeChildEmailField = (index) => {
    if (registerData.childrenEmails.length > 1) {
      setRegisterData(prev => ({
        ...prev,
        childrenEmails: prev.childrenEmails.filter((_, i) => i !== index)
      }));
    }
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
              name="fullName"
              placeholder="Full name"
              value={registerData.fullName}
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

            {/* Teacher-specific fields - only show when role is teacher */}
            {registerData.role === 'teacher' && (
              <div className="border-2 border-blue-500 bg-blue-50 p-4 rounded-lg mt-4">
                <h3 className="text-lg font-bold text-blue-800 mb-3">Teacher Information</h3>
                <div className="form-group mb-3">
                  <label className="block text-sm font-medium mb-1 text-blue-700">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Enter subject (e.g. Math)"
                    value={registerData.subject}
                    onChange={handleRegisterInputChange}
                    className="border-2 border-blue-300 p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium mb-1 text-blue-700">Classes *</label>
                  <input
                    type="text"
                    name="classes"
                    placeholder="Enter classes (comma-separated, e.g. 3A,3B)"
                    value={registerData.classes}
                    onChange={handleRegisterInputChange}
                    className="border-2 border-blue-300 p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    required
                  />
                </div>
              </div>
            )}

            {/* Student-specific fields - only show when role is student */}
            {registerData.role === 'student' && (
              <div className="border-2 border-purple-500 bg-purple-50 p-4 rounded-lg mt-4">
                <h3 className="text-lg font-bold text-purple-800 mb-3">Student Information</h3>
                <div className="form-group">
                  <label className="block text-sm font-medium mb-1 text-purple-700">Class Name</label>
                  <input
                    type="text"
                    name="className"
                    placeholder="Enter your class (e.g. 2AM1, 3AM2, etc.)"
                    value={registerData.className}
                    onChange={handleRegisterInputChange}
                    className="border-2 border-purple-300 p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                  />
                  <p className="text-xs text-purple-600 mt-1">
                    💡 This is optional - you can be assigned to a class later by your teacher
                  </p>
                </div>
              </div>
            )}

            {/* Parent-specific fields - only show when role is parent */}
            {registerData.role === 'parent' && (
              <div className="border-2 border-green-500 bg-green-50 p-4 rounded-lg mt-4">
                <h3 className="text-lg font-bold text-green-800 mb-3">Children Information</h3>
                <p className="text-sm text-green-700 mb-3">Enter your children's email addresses (must be registered students)</p>
                
                <div className="space-y-3">
                  {registerData.childrenEmails.map((email, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="email"
                        placeholder={`Child ${index + 1} email address`}
                        value={email}
                        onChange={(e) => handleChildEmailChange(index, e.target.value)}
                        className="flex-1 border-2 border-green-300 p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                      />
                      {registerData.childrenEmails.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeChildEmailField(index)}
                          className="bg-red-500 text-white px-3 py-3 rounded-md hover:bg-red-600 transition-colors duration-300"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addChildEmailField}
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300 text-sm"
                  >
                    + Add Another Child
                  </button>
                </div>
                
                <p className="text-xs text-green-600 mt-3">
                  💡 Make sure your children are already registered as students in the system
                </p>
              </div>
            )}

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
              className="bg-blue-950 text-white py-2 rounded font-semibold hover:bg-blue-800 transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-6"
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
