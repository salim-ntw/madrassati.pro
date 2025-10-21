import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/home/index.jsx";
import { useScrollReveal } from "./hooks/useScrollReveal";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import Student from "./pages/Student/index.jsx";
import Parent from "./pages/Parent/index.jsx";
import Teacher from "./pages/Teacher/index.jsx";
import { printEndpointVerification } from "./api/endpoints.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

//student sub pages
import StudentHome from "./pages/Student/Home.jsx";
import ClassSchedule from "./pages/Student/ClassSched.jsx";
import Grades from "./pages/Student/Grades.jsx";
import Homework from "./pages/Student/Homework.jsx";
import Exams from "./pages/Student/Exams.jsx";
import Announcements from "./pages/Student/Announcement.jsx";
import StudentProfile from "./pages/Student/Profile.jsx";

//teacher sub pages
import TeacherProfile from "./pages/Teacher/sections/Profile.jsx";
import TeacherHome from "./pages/Teacher/sections/Home.jsx";
import TeacherSchedule from "./pages/Teacher/sections/Schedule.jsx";
import TeacherClasses from "./pages/Teacher/sections/Classes.jsx";
import TeacherManageGrades from "./pages/Teacher/sections/ManageGrades.jsx";
import TeacherManageHomework from "./pages/Teacher/sections/ManageHomework.jsx";
import TeacherExams from "./pages/Teacher/sections/Exams.jsx";
import AddTestExam from "./pages/Teacher/sections/AddTestExam.jsx";
import TeacherAnnouncements from "./pages/Teacher/sections/Announcements.jsx";
import TeacherMessages from "./pages/Teacher/sections/Messages.jsx";
import TeacherAttendance from "./pages/Teacher/sections/Attendance.jsx";

//parent sub pages
import ParentHome from "./pages/Parent/sections/Home.jsx";
import ParentProfile from "./pages/Parent/sections/Profile.jsx";
import ParentSchedule from "./pages/Parent/sections/Schedule.jsx";
import ParentGrades from "./pages/Parent/sections/Grades.jsx";
import ParentHomework from "./pages/Parent/sections/Homework.jsx";
import ParentExams from "./pages/Parent/sections/Exams.jsx";
import ParentAnnouncements from "./pages/Parent/sections/Announcements.jsx";
import ParentMessages from "./pages/Parent/sections/Messages.jsx";
import ParentAttendance from "./pages/Parent/sections/Attendance.jsx";

const App = () => {
  useScrollReveal();
  
  // Print API endpoints verification on app load
  useEffect(() => {
    printEndpointVerification();
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          {/* Add other routes as needed */}
          <Route path="/Login" element={<Login />} />
          {/* Example: <Route path="/profile" element={<Profile />} /> */}
          {/* Student routes with dynamic ID - Protected and nested */}
          <Route path="/student/:id" element={
            <ProtectedRoute allowedRoles={['student']}>
              <Student />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<StudentHome />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="schedule" element={<ClassSchedule />} />
            <Route path="grades" element={<Grades />} />
            <Route path="homework" element={<Homework />} />
            <Route path="exams" element={<Exams />} />
            <Route path="announcements" element={<Announcements />} />
          </Route>

          {/* Parent routes with child selection - Protected and nested */}
          <Route path="/parent/:parentId" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <Parent />
            </ProtectedRoute>
          }>
            {/* Parent's own profile route (accessible without child selection) */}
            <Route path="profile" element={<ParentProfile />} />
            
            {/* Child-specific routes */}
            <Route path="child/:childId/dashboard" element={<ParentHome />} />
            <Route path="child/:childId/schedule" element={<ParentSchedule />} />
            <Route path="child/:childId/grades" element={<ParentGrades />} />
            <Route path="child/:childId/homework" element={<ParentHomework />} />
            <Route path="child/:childId/exams" element={<ParentExams />} />
            <Route path="child/:childId/announcements" element={<ParentAnnouncements />} />
            <Route path="child/:childId/attendance" element={<ParentAttendance />} />
            <Route path="child/:childId/messages" element={<ParentMessages />} />
          </Route>

          {/* Teacher routes with dynamic ID - Protected and nested */}
          <Route path="/teacher/:teacherId" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <Teacher />
            </ProtectedRoute>
          }>
            <Route index element={<TeacherHome />} />
            <Route path="dashboard" element={<TeacherHome />} />
            <Route path="profile" element={<TeacherProfile />} />
            <Route path="schedule" element={<TeacherSchedule />} />
            <Route path="classes" element={<TeacherClasses />} />
            <Route path="manage-grades" element={<TeacherManageGrades />} />
            <Route path="manage-homework" element={<TeacherManageHomework />} />
            <Route path="exams" element={<TeacherExams />} />
            <Route path="add-test-exam" element={<AddTestExam />} />
            <Route path="announcements" element={<TeacherAnnouncements />} />
            <Route path="messages" element={<TeacherMessages />} />
            <Route path="attendance" element={<TeacherAttendance />} />
            {/* removed create-students route */}
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
