import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: { 
    "Content-Type": "application/json" 
  },
});

// Add JWT token automatically to all requests
api.interceptors.request.use((config) => {
  console.log("🔄 Axios: Request interceptor triggered");
  console.log("📡 Request URL:", config.baseURL + config.url);
  console.log("📋 Request method:", config.method);
  console.log("📦 Request data:", config.data);
  console.log("📋 Request headers:", config.headers);
  
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("🔑 Added Authorization header");
  } else {
    console.log("❌ No token found, proceeding without Authorization header");
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => {
    console.log("📥 Axios: Response received");
    console.log("📊 Status:", response.status);
    console.log("📦 Response data:", response.data);
    return response;
  },
  (error) => {
    console.log("❌ Axios: Response error");
    console.log("📊 Error status:", error.response?.status);
    console.log("📦 Error data:", error.response?.data);
    console.log("🔍 Full error:", error);
    
    if (error.response?.status === 401) {
      // Clear expired token and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
