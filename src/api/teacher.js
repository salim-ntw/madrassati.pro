import api from './axios.js';

// Teacher API endpoints
export const teacherAPI = {
  // GET /teacher/:teacherId/profile
  getProfile: (teacherId) => api.get(`/teacher/${teacherId}/profile`),
  
  // GET /teacher/:teacherId/dashboard
  getDashboard: (teacherId) => api.get(`/teacher/${teacherId}/dashboard`),
  
  // GET /teacher/:teacherId/schedule
  getSchedule: (teacherId) => api.get(`/teacher/${teacherId}/schedule`),
  
  // GET /teacher/:teacherId/classes
  getClasses: (teacherId) => api.get(`/teacher/${teacherId}/classes`),
  
  // GET /teacher/:teacherId/students
  getStudents: (teacherId) => api.get(`/teacher/${teacherId}/students`),
  
  // GET /teacher/:teacherId/students/:className
  getStudentsByClass: (teacherId, className) => api.get(`/teacher/${teacherId}/students/${className}`),
  
  // POST /teacher/:teacherId/students
  addStudent: (teacherId, studentData) => api.post(`/teacher/${teacherId}/students`, studentData),
  
  // PUT /teacher/:teacherId/students/:studentId
  updateStudent: (teacherId, studentId, updateData) => api.put(`/teacher/${teacherId}/students/${studentId}`, updateData),
  
  // DELETE /teacher/:teacherId/students/:studentId
  deleteStudent: (teacherId, studentId) => api.delete(`/teacher/${teacherId}/students/${studentId}`),
  
  // GET /teacher/:teacherId/grades
  getGrades: (teacherId) => api.get(`/teacher/${teacherId}/grades`),
  
  // GET /teacher/:teacherId/grades/:className
  getGradesByClass: (teacherId, className) => api.get(`/teacher/${teacherId}/grades/${className}`),
  
  // POST /teacher/:teacherId/grades
  addGrade: (teacherId, gradeData) => api.post(`/teacher/${teacherId}/grades`, gradeData),
  
  // PUT /teacher/:teacherId/grades/:gradeId
  updateGrade: (teacherId, gradeId, gradeData) => api.put(`/teacher/${teacherId}/grades/${gradeId}`, gradeData),
  
  // DELETE /teacher/:teacherId/grades/:gradeId
  deleteGrade: (teacherId, gradeId) => api.delete(`/teacher/${teacherId}/grades/${gradeId}`),
  
  // GET /teacher/:teacherId/homework
  getHomework: (teacherId) => api.get(`/teacher/${teacherId}/homework`),
  
  // GET /teacher/:teacherId/homework/:classId
  getHomeworkByClass: (teacherId, classId) => api.get(`/teacher/${teacherId}/homework/${classId}`),
  
  // GET /teacher/:teacherId/homeworks
  getHomeworks: (teacherId) => api.get(`/teacher/${teacherId}/homeworks`),
  
  // GET /teacher/:teacherId/homeworks/:className
  getHomeworksByClass: (teacherId, className) => api.get(`/teacher/${teacherId}/homeworks/${className}`),
  
  // POST /teacher/:teacherId/homeworks
  addHomework: (teacherId, homeworkData) => api.post(`/teacher/${teacherId}/homeworks`, homeworkData),
  
  // PUT /teacher/:teacherId/homeworks/:homeworkId
  updateHomework: (teacherId, homeworkId, homeworkData) => api.put(`/teacher/${teacherId}/homeworks/${homeworkId}`, homeworkData),
  
  // DELETE /teacher/:teacherId/homeworks/:homeworkId
  deleteHomework: (teacherId, homeworkId) => api.delete(`/teacher/${teacherId}/homeworks/${homeworkId}`),
  
  // GET /teacher/:teacherId/exams
  getExams: (teacherId) => api.get(`/teacher/${teacherId}/exams`),
  
  // POST /teacher/:teacherId/exam
  addExam: (teacherId, examData) => api.post(`/teacher/${teacherId}/exam`, examData),
  
  // POST /teacher/:teacherId/test
  addTest: (teacherId, testData) => api.post(`/teacher/${teacherId}/test`, testData),
  
  // PUT /teacher/:teacherId/test/:testId
  updateTest: (teacherId, testId, updateData) => api.put(`/teacher/${teacherId}/test/${testId}`, updateData),
  
  // DELETE /teacher/:teacherId/test/:testId
  deleteTest: (teacherId, testId) => api.delete(`/teacher/${teacherId}/test/${testId}`),
  
  // PUT /teacher/:teacherId/exam/:examId
  updateExam: (teacherId, examId, updateData) => api.put(`/teacher/${teacherId}/exam/${examId}`, updateData),
  
  // DELETE /teacher/:teacherId/exam/:examId
  deleteExam: (teacherId, examId) => api.delete(`/teacher/${teacherId}/exam/${examId}`),
  
  // POST /teacher/:teacherId/announcement
  addAnnouncement: (teacherId, announcementData) => api.post(`/teacher/${teacherId}/announcement`, announcementData),
  
  // GET /teacher/:teacherId/announcement
  getAnnouncement: (teacherId) => api.get(`/teacher/${teacherId}/announcement`),
  
  // GET /teacher/:teacherId/messages
  getMessages: (teacherId) => api.get(`/teacher/${teacherId}/messages`),
  
  // GET /teacher/:teacherId/messages/:tokenOrUser
  getMessagesByToken: (teacherId, tokenOrUser) => api.get(`/teacher/${teacherId}/messages/${tokenOrUser}`),
  
  // GET /teacher/:teacherId/attendance
  getAttendance: (teacherId) => api.get(`/teacher/${teacherId}/attendance`),
  
  // GET /teacher/:teacherId/attendance/:className
  getAttendanceByClass: (teacherId, className) => api.get(`/teacher/${teacherId}/attendance/${className}`),

  // POST /attendance/mark (new unified endpoint)
  markAttendance: (payload) => api.post(`/attendance/mark`, payload),

  // GET /attendance/class/:className
  getAttendanceByClassName: (className) => api.get(`/attendance/class/${className}`),
};







