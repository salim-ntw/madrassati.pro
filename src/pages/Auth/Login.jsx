import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/no-bg-logo.png";
import { useLanguage } from "../../contexts/LanguageContext";
import { authAPI, storage, getRedirectPath } from "../../utils/auth";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
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

  // Forgot password modal state
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    // Log what we're about to send
    console.log("🚀 Frontend: About to send login request");
    console.log("📧 Email from form:", loginData.email);
    console.log("🔑 Password from form:", loginData.password ? "***" : "undefined");
    console.log("📋 Full loginData:", loginData);

    try {
      const response = await authAPI.login(loginData.email, loginData.password);
      
      if (response.success) {
        // Save user data to storage
        storage.saveUser(response.data.token, response.data.user, loginData.rememberMe);
        
        // Enhanced logging for debugging
        console.log('✅ Login successful!');
        console.log('📋 Full response:', response);
        console.log('👤 User data:', response.data.user);
        console.log('🎭 Detected role:', response.data.user.role);
        console.log('🆔 User ID:', response.data.user.id);
        console.log('🔑 Role Specific ID:', response.data.user.roleSpecificId);
        
        // Redirect based on role using the user object
        const redirectPath = getRedirectPath(response.data.user);
        console.log('🔄 Redirecting to:', redirectPath);
        
        // Force navigation with a small delay to ensure state is saved
        setTimeout(() => {
          console.log('🚀 Executing navigate to:', redirectPath);
          navigate(redirectPath);
        }, 100);
      }
    } catch (error) {
      console.error('❌ Login failed:', error);
      setLoginError('Wrong email or password');
    } finally {
      setLoginLoading(false);
    }
  };

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');

    // Check if all fields are filled
    const requiredFields = ['name', 'email', 'password', 'confirmPassword', 'phone', 'gender', 'role'];
    
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
        classes: registerData.classes
          ? registerData.classes.split(",").map(c => c.trim())
          : [],
        childrenEmails: registerData.role === 'parent' 
          ? registerData.childrenEmails.filter(email => email.trim() !== '')
          : undefined
      };

      const response = await authAPI.register(payload);
      
      if (response.success) {
        setRegisterSuccess('Registration successful!');
        // Redirect to login after 2 seconds
        setTimeout(() => {
          setIsLogin(true);
          setRegisterSuccess('');
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

  // Input change handlers
  const handleLoginInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (loginError) setLoginError('');
  };

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
            <form onSubmit={handleLogin} className="flex flex-col w-full max-w-md gap-6 animate-slideInUp">
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
                    name="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={handleLoginInputChange}
                    className="w-full border-2 border-gray-200 p-4 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginInputChange}
                    className="w-full border-2 border-gray-200 p-4 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {loginError && (
                <div className="text-red-600 text-sm text-center animate-slideInUp">
                  {loginError}
                </div>
              )}
              
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input 
                    type="checkbox" 
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={handleLoginInputChange}
                    className="w-4 h-4 rounded border-gray-300" 
                  /> 
                  Remember me
                </label>
                <button 
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                >
                  Forgot password?
                </button>
              </div>
              
              <button
                type="submit"
                disabled={loginLoading}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginLoading ? 'Signing In...' : 'Sign In'}
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
            <form onSubmit={handleRegister} className="flex flex-col w-full max-w-md gap-4 animate-slideInUp max-h-[80vh] overflow-y-auto">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600 text-sm">Join our educational community today</p>
              </div>
              
              <div className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={registerData.name}
                  onChange={handleRegisterInputChange}
                  className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={registerData.email}
                  onChange={handleRegisterInputChange}
                  className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={handleRegisterInputChange}
                    className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterInputChange}
                    className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={registerData.phone}
                  onChange={handleRegisterInputChange}
                  className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select 
                    name="gender"
                    value={registerData.gender}
                    onChange={handleRegisterInputChange}
                    className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <select 
                    name="role"
                    value={registerData.role}
                    onChange={handleRegisterInputChange}
                    className="w-full border-2 border-gray-200 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Register as</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="parent">Parent</option>
                  </select>
                </div>

                {/* Teacher-specific fields - only show when role is teacher */}
                {registerData.role === 'teacher' && (
                  <div className="border-2 border-blue-500 bg-blue-50 p-4 rounded-xl mt-4">
                    <h3 className="text-lg font-bold text-blue-800 mb-3">Teacher Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-blue-700">Subject *</label>
                        <input
                          type="text"
                          name="subject"
                          placeholder="Enter subject (e.g. Math)"
                          value={registerData.subject}
                          onChange={handleRegisterInputChange}
                          className="w-full border-2 border-blue-300 p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-blue-700">Classes *</label>
                        <input
                          type="text"
                          name="classes"
                          placeholder="Enter classes (comma-separated, e.g. 3A,3B)"
                          value={registerData.classes}
                          onChange={handleRegisterInputChange}
                          className="w-full border-2 border-blue-300 p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Student-specific fields - only show when role is student */}
                {registerData.role === 'student' && (
                  <div className="border-2 border-purple-500 bg-purple-50 p-4 rounded-xl mt-4">
                    <h3 className="text-lg font-bold text-purple-800 mb-3">Student Information</h3>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-purple-700">Class Name</label>
                      <input
                        type="text"
                        name="className"
                        placeholder="Enter your class (e.g. 2AM1, 3AM2, etc.)"
                        value={registerData.className}
                        onChange={handleRegisterInputChange}
                        className="w-full border-2 border-purple-300 p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      />
                      <p className="text-xs text-purple-600 mt-1">
                        💡 This is optional - you can be assigned to a class later by your teacher
                      </p>
                    </div>
                  </div>
                )}

                {/* Parent-specific fields - only show when role is parent */}
                {registerData.role === 'parent' && (
                  <div className="border-2 border-green-500 bg-green-50 p-4 rounded-xl mt-4">
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
                            className="flex-1 border-2 border-green-300 p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                          />
                          {registerData.childrenEmails.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeChildEmailField(index)}
                              className="bg-red-500 text-white px-3 py-3 rounded-xl hover:bg-red-600 transition-colors duration-300"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={addChildEmailField}
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600 transition-colors duration-300 text-sm"
                      >
                        + Add Another Child
                      </button>
                    </div>
                    
                    <p className="text-xs text-green-600 mt-3">
                      💡 Make sure your children are already registered as students in the system
                    </p>
                  </div>
                )}
              </div>

              {registerError && (
                <div className="text-red-600 text-sm text-center animate-slideInUp">
                  {registerError}
                </div>
              )}

              {registerSuccess && (
                <div className="text-green-600 text-sm text-center animate-slideInUp">
                  {registerSuccess}
                </div>
              )}
              
              <button
                type="submit"
                disabled={registerLoading}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6 sticky bottom-0 z-10"
              >
                {registerLoading ? 'Creating Account...' : 'Create Account'}
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

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={showForgotPassword} 
        onClose={() => setShowForgotPassword(false)} 
      />
    </div>
  );
};

export default Auth;