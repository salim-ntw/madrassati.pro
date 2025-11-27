// Export all API services
export { authAPI } from '../utils/auth.js';
export { studentAPI } from './student.js';
export { parentAPI } from './parent.js';
export { teacherAPI } from './teacher.js';
export { default as api } from './axios.js';

// Base URL constant for reference (uses environment variable)
import { apiClient } from './apiClient.js';
export const BASE_URL = apiClient.getApiUrl();


