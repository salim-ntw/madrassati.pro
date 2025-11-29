/**
 * API Client Helper (TypeScript)
 * Centralized API URL management using environment variables
 * 
 * This helper automatically prepends the backend API URL from environment variables
 * to all API requests, making it easy to switch between development and production.
 * 
 * Environment Variable Priority:
 * 1. REACT_APP_API_URL (user preference)
 * 2. VITE_API_URL (Vite standard)
 * 3. Development fallback (only if env vars are not set - will log warning)
 * 
 * Usage:
 *   import { apiClient } from './api/apiClient';
 *   const url = apiClient.url('/messages');
 *   const response = await fetch(url);
 * 
 * Or use with axios (already configured):
 *   import api from './api/axios';
 *   api.get('/messages'); // Automatically uses the correct base URL
 */

// Get API base URL from environment variable
const getApiBaseUrl = (): string => {
  // Note: In Vite, we use import.meta.env (not process.env)
  // Vite requires VITE_ prefix, but we also support REACT_APP_API_URL for compatibility
  // Priority: REACT_APP_API_URL > VITE_API_URL > fallback
  const apiUrl = 
    import.meta.env.REACT_APP_API_URL || 
    import.meta.env.VITE_API_URL;
  
  // If no environment variable is set, log a warning and use development fallback
  if (!apiUrl) {
    console.warn(
      '⚠️  No API URL environment variable found (REACT_APP_API_URL or VITE_API_URL).\n' +
      '   Using development fallback: http://localhost:4000\n' +
      '   Please set REACT_APP_API_URL or VITE_API_URL in your .env file.'
    );
    return 'http://localhost:4000';
  }
  
  // Ensure URL doesn't end with a slash
  return String(apiUrl).replace(/\/$/, '');
};

// Get Socket.IO URL (same as API URL but without /api path)
const getSocketUrl = (): string => {
  return getApiBaseUrl();
};

/**
 * API Client helper functions
 */
export const apiClient = {
  /**
   * Get the base API URL (without /api suffix)
   * @returns {string} Base API URL
   */
  getBaseUrl: (): string => getApiBaseUrl(),

  /**
   * Get the full API URL with /api prefix
   * @returns {string} Full API URL
   */
  getApiUrl: (): string => `${getApiBaseUrl()}/api`,

  /**
   * Get Socket.IO URL
   * @returns {string} Socket.IO URL
   */
  getSocketUrl: (): string => getSocketUrl(),

  /**
   * Build a full API endpoint URL
   * @param {string} endpoint - API endpoint (e.g., '/messages' or 'messages')
   * @returns {string} Full URL
   */
  url: (endpoint: string): string => {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${getApiBaseUrl()}/api${cleanEndpoint}`;
  },
};

// Export constants for backward compatibility
export const BASE_URL: string = apiClient.getApiUrl();
export const SOCKET_URL: string = apiClient.getSocketUrl();

// Default export
export default apiClient;


