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

          {/* Parent routes with dynamic ID - Protected */}
          <Route path="/parent/:id/dashboard" element={
            <ProtectedRoute allowedRoles={['parent']}>
              <Parent />
            </ProtectedRoute>
          } />

          {/* Teacher routes with dynamic ID - Protected */}
          <Route path="/teacher/:id/dashboard" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <Teacher />
            </ProtectedRoute>
          } />
          <Route path="/teacher/:id/profile" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherProfile />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
