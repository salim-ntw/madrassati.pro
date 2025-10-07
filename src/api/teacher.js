import api from './axios.js';

// Teacher API endpoints
export const teacherAPI = {
  // GET /teacher/profile
  getProfile: () => api.get('/teacher/profile'),
  
  // GET /teacher/dashboard
  getDashboard: () => api.get('/teacher/dashboard'),
  
  // GET /teacher/schedule
  getSchedule: () => api.get('/teacher/schedule'),
  
  // GET /teacher/classes
  getClasses: () => api.get('/teacher/classes'),
  
  // GET /teacher/grades
  getGrades: () => api.get('/teacher/grades'),
  
  // GET /teacher/grades/:classId
  getGradesByClass: (classId) => api.get(`/teacher/grades/${classId}`),
  
  // GET /teacher/homework
  getHomework: () => api.get('/teacher/homework'),
  
  // GET /teacher/homework/:classId
  getHomeworkByClass: (classId) => api.get(`/teacher/homework/${classId}`),
  
  // GET /teacher/exams
  getExams: () => api.get('/teacher/exams'),
  
  // GET /teacher/announcement
  getAnnouncement: () => api.get('/teacher/announcement'),
  
  // GET /teacher/messages
  getMessages: () => api.get('/teacher/messages'),
  
  // GET /teacher/messages/:tokenOrUser
  getMessagesByToken: (tokenOrUser) => api.get(`/teacher/messages/${tokenOrUser}`),
  
  // GET /teacher/attendance
  getAttendance: () => api.get('/teacher/attendance'),
  
  // GET /teacher/attendance/:classId
  getAttendanceByClass: (classId) => api.get(`/teacher/attendance/${classId}`),
};
