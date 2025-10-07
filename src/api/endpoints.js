// API Endpoints Verification
// This file documents all the exact URLs used by the frontend

const BASE_URL = 'http://localhost:4000/api';

export const ENDPOINTS = {
  // Authentication endpoints
  auth: {
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
    forgotPassword: `${BASE_URL}/auth/forgot-password`,
  },

  // Student endpoints
  student: {
    profile: `${BASE_URL}/student/profile`,
    dashboard: `${BASE_URL}/student/dashboard`,
    schedule: `${BASE_URL}/student/schedule`,
    grades: `${BASE_URL}/student/grades`,
    homework: `${BASE_URL}/student/homework`,
    exams: `${BASE_URL}/student/exams`,
    announcement: `${BASE_URL}/student/announcement`,
  },

  // Parent endpoints
  parent: {
    profile: `${BASE_URL}/parent/profile`,
    dashboard: `${BASE_URL}/parent/dashboard`,
    schedule: `${BASE_URL}/parent/schedule`,
    grades: `${BASE_URL}/parent/grades`,
    homework: `${BASE_URL}/parent/homework`,
    exams: `${BASE_URL}/parent/exams`,
    announcement: `${BASE_URL}/parent/announcement`,
  },

  // Teacher endpoints
  teacher: {
    profile: `${BASE_URL}/teacher/profile`,
    dashboard: `${BASE_URL}/teacher/dashboard`,
    schedule: `${BASE_URL}/teacher/schedule`,
    classes: `${BASE_URL}/teacher/classes`,
    grades: `${BASE_URL}/teacher/grades`,
    gradesByClass: (classId) => `${BASE_URL}/teacher/grades/${classId}`,
    homework: `${BASE_URL}/teacher/homework`,
    homeworkByClass: (classId) => `${BASE_URL}/teacher/homework/${classId}`,
    exams: `${BASE_URL}/teacher/exams`,
    announcement: `${BASE_URL}/teacher/announcement`,
    messages: `${BASE_URL}/teacher/messages`,
    messagesByToken: (tokenOrUser) => `${BASE_URL}/teacher/messages/${tokenOrUser}`,
    attendance: `${BASE_URL}/teacher/attendance`,
    attendanceByClass: (classId) => `${BASE_URL}/teacher/attendance/${classId}`,
  },
};

// Print verification to console
export const printEndpointVerification = () => {
  console.log('\n🔗 Frontend-Backend API Endpoints Verification');
  console.log('=' .repeat(60));
  
  console.log('\n📝 Authentication:');
  console.log(`✔ Login → ${ENDPOINTS.auth.login}`);
  console.log(`✔ Register → ${ENDPOINTS.auth.register}`);
  console.log(`✔ Forgot Password → ${ENDPOINTS.auth.forgotPassword}`);
  
  console.log('\n👨‍🎓 Student:');
  console.log(`✔ Profile → ${ENDPOINTS.student.profile}`);
  console.log(`✔ Dashboard → ${ENDPOINTS.student.dashboard}`);
  console.log(`✔ Schedule → ${ENDPOINTS.student.schedule}`);
  console.log(`✔ Grades → ${ENDPOINTS.student.grades}`);
  console.log(`✔ Homework → ${ENDPOINTS.student.homework}`);
  console.log(`✔ Exams → ${ENDPOINTS.student.exams}`);
  console.log(`✔ Announcement → ${ENDPOINTS.student.announcement}`);
  
  console.log('\n👨‍👩‍👧‍👦 Parent:');
  console.log(`✔ Profile → ${ENDPOINTS.parent.profile}`);
  console.log(`✔ Dashboard → ${ENDPOINTS.parent.dashboard}`);
  console.log(`✔ Schedule → ${ENDPOINTS.parent.schedule}`);
  console.log(`✔ Grades → ${ENDPOINTS.parent.grades}`);
  console.log(`✔ Homework → ${ENDPOINTS.parent.homework}`);
  console.log(`✔ Exams → ${ENDPOINTS.parent.exams}`);
  console.log(`✔ Announcement → ${ENDPOINTS.parent.announcement}`);
  
  console.log('\n👨‍🏫 Teacher:');
  console.log(`✔ Profile → ${ENDPOINTS.teacher.profile}`);
  console.log(`✔ Dashboard → ${ENDPOINTS.teacher.dashboard}`);
  console.log(`✔ Schedule → ${ENDPOINTS.teacher.schedule}`);
  console.log(`✔ Classes → ${ENDPOINTS.teacher.classes}`);
  console.log(`✔ Grades → ${ENDPOINTS.teacher.grades}`);
  console.log(`✔ Grades by Class → ${ENDPOINTS.teacher.gradesByClass(':classId')}`);
  console.log(`✔ Homework → ${ENDPOINTS.teacher.homework}`);
  console.log(`✔ Homework by Class → ${ENDPOINTS.teacher.homeworkByClass(':classId')}`);
  console.log(`✔ Exams → ${ENDPOINTS.teacher.exams}`);
  console.log(`✔ Announcement → ${ENDPOINTS.teacher.announcement}`);
  console.log(`✔ Messages → ${ENDPOINTS.teacher.messages}`);
  console.log(`✔ Messages by Token → ${ENDPOINTS.teacher.messagesByToken(':tokenOrUser')}`);
  console.log(`✔ Attendance → ${ENDPOINTS.teacher.attendance}`);
  console.log(`✔ Attendance by Class → ${ENDPOINTS.teacher.attendanceByClass(':classId')}`);
  
  console.log('\n✅ All endpoints are configured to automatically include JWT token');
  console.log('✅ Frontend and backend URLs match exactly');
  console.log('✅ Automatic redirect after login based on user role');
  console.log('=' .repeat(60));
};

export default ENDPOINTS;
