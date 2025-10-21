import api from './axios.js';

// Parent API endpoints with proper REST structure matching backend
export const parentAPI = {
  // GET /parents/:parentId → Get all children (for child selection)
  getChildren: (parentId) => api.get(`/parents/${parentId}`),
  
  // GET /parents/:parentId/profile → Get parent profile
  getProfile: (parentId) => api.get(`/parents/${parentId}/profile`),
  
  // GET /parents/:parentId/child/:childId/schedule → Get child's schedule
  getChildSchedule: (parentId, childId) => api.get(`/parents/${parentId}/child/${childId}/schedule`),
  
  // GET /parents/:parentId/child/:childId/grades → Get child's grades
  getChildGrades: (parentId, childId) => api.get(`/parents/${parentId}/child/${childId}/grades`),
  
  // GET /parents/:parentId/child/:childId/homework → Get child's homework
  getChildHomework: (parentId, childId) => api.get(`/parents/${parentId}/child/${childId}/homework`),
  
  // GET /parents/:parentId/child/:childId/exams → Get child's exams
  getChildExams: (parentId, childId) => api.get(`/parents/${parentId}/child/${childId}/exams`),
  
  // GET /parents/:parentId/child/:childId/tests → Get child's tests
  getChildTests: (parentId, childId) => api.get(`/parents/${parentId}/child/${childId}/tests`),
  
  // GET /parents/:parentId/child/:childId/announcements → Get child's announcements
  getChildAnnouncements: (parentId, childId) => api.get(`/parents/${parentId}/child/${childId}/announcements`),
  
  // GET /parents/:parentId/child/:childId/attendance → Get child's attendance
  getChildAttendance: (parentId, childId) => api.get(`/parents/${parentId}/child/${childId}/attendance`),
  
  // GET /parents/:parentId/messages → Get parent's messages
  getMessages: (parentId) => api.get(`/parents/${parentId}/messages`),
};
