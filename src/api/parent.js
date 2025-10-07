import api from './axios.js';

// Parent API endpoints
export const parentAPI = {
  // GET /parent/profile
  getProfile: () => api.get('/parent/profile'),
  
  // GET /parent/dashboard
  getDashboard: () => api.get('/parent/dashboard'),
  
  // GET /parent/schedule
  getSchedule: () => api.get('/parent/schedule'),
  
  // GET /parent/grades
  getGrades: () => api.get('/parent/grades'),
  
  // GET /parent/homework
  getHomework: () => api.get('/parent/homework'),
  
  // GET /parent/exams
  getExams: () => api.get('/parent/exams'),
  
  // GET /parent/announcement
  getAnnouncement: () => api.get('/parent/announcement'),
};
