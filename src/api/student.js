import api from './axios.js';

// Student API endpoints
export const studentAPI = {
  // GET /student/profile
  getProfile: () => api.get('/student/profile'),
  
  // GET /student/dashboard
  getDashboard: () => api.get('/student/dashboard'),
  
  // GET /student/schedule
  getSchedule: () => api.get('/student/schedule'),
  
  // GET /student/grades
  getGrades: () => api.get('/student/grades'),
  
  // GET /student/homework
  getHomework: () => api.get('/student/homework'),
  
  // GET /student/exams
  getExams: () => api.get('/student/exams'),
  
  // GET /student/announcement
  getAnnouncement: () => api.get('/student/announcement'),
};
