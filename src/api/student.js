import api from './axios.js';

// Student API endpoints
export const studentAPI = {
  // GET /student/:id/profile
  getProfile: (studentId) => api.get(`/student/${studentId}/profile`),
  
  // GET /student/:id/dashboard
  getDashboard: (studentId) => api.get(`/student/${studentId}/dashboard`),
  
  // GET /student/:id/schedule
  getSchedule: (studentId) => api.get(`/student/${studentId}/schedule`),
  
  // GET /student/:id/grades
  getGrades: (studentId) => api.get(`/student/${studentId}/grades`),
  
  // GET /student/:id/homework
  getHomework: (studentId) => api.get(`/student/${studentId}/homework`),
  
  // GET /student/:id/exams
  getExams: (studentId) => api.get(`/student/${studentId}/exams`),
  
  // GET /student/:id/announcements
  getAnnouncements: (studentId) => api.get(`/student/${studentId}/announcements`),
};