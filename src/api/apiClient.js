/**
 * API Client Helper
 * Centralized API URL management using environment variables
 * 
 * Usage:
 *   import { apiClient } from './api/apiClient';
 *   const response = await fetch(apiClient('/messages'));
 */

// Get API base URL from environment variable, fallback to localhost for development
const getApiBaseUrl = () => {
  // For Vite apps, environment variables must be prefixed with VITE_
  // We support both VITE_API_URL (Vite standard) and REACT_APP_API_URL (for compatibility)
  // Access via import.meta.env in Vite (not process.env)
  const apiUrl = 
    import.meta.env.VITE_API_URL || 
    import.meta.env.REACT_APP_API_URL || 
    'http://localhost:4000';
  
  // Ensure URL doesn't end with a slash
  return apiUrl.replace(/\/$/, '');
};

// Get Socket.IO URL (same as API URL but without /api path)
const getSocketUrl = () => {
  return getApiBaseUrl();
};

/**
 * API Client helper functions
 */
export const apiClient = {
  /**
   * Get the base API URL
   * @returns {string} Base API URL
   */
  getBaseUrl: () => getApiBaseUrl(),

  /**
   * Get the full API URL with /api prefix
   * @returns {string} Full API URL
   */
  getApiUrl: () => `${getApiBaseUrl()}/api`,

  /**
   * Get Socket.IO URL
   * @returns {string} Socket.IO URL
   */
  getSocketUrl: () => getSocketUrl(),

  /**
   * Build a full API endpoint URL
   * @param {string} endpoint - API endpoint (e.g., '/messages' or 'messages')
   * @returns {string} Full URL
   */
  url: (endpoint) => {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${getApiBaseUrl()}/api${cleanEndpoint}`;
  },
};

// Export constants for backward compatibility
export const BASE_URL = apiClient.getApiUrl();
export const SOCKET_URL = apiClient.getSocketUrl();

// Default export
export default apiClient;

