import api from '../api/axios.js';

// Authentication functions
export const authAPI = {
  // Login user
  login: async (email, password) => {
    console.log("🌐 API: Making login request to /auth/login");
    console.log("📧 Email:", email);
    console.log("🔑 Password:", password ? "***" : "undefined");
    
    const response = await api.post('/auth/login', { email, password });
    
    console.log("📥 API: Received response:", response.data);
    return response.data;
  },

  // Register user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },
};

// Local storage utilities
export const storage = {
  // Save user data to localStorage
  saveUser: (token, user, rememberMe = false) => {
    if (rememberMe) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  },

  // Get user data from storage
  getUser: () => {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get token from storage
  getToken: () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  },

  // Clear user data
  clearUser: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return !!token;
  },
};

// Role-based redirect helper
export const getRedirectPath = (role, userId) => {
  console.log('🔍 getRedirectPath called with:', { role, userId });
  
  let path;
  switch (role) {
    case 'student':
      path = `/student/${userId}/dashboard`;
      break;
    case 'parent':
      path = `/parent/${userId}/dashboard`;
      break;
    case 'teacher':
      path = `/teacher/${userId}/dashboard`;
      break;
    default:
      path = '/login';
      break;
  }
  
  console.log('📍 Generated redirect path:', path);
  return path;
};

export default api;

