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

//student sub pages
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
          {/* Student routes with dynamic ID */}
          <Route path="/student/:id/dashboard" element={<Student />} />
          <Route path="/student/:id/profile" element={<StudentProfile />} />
          <Route path="/student/:id/schedule" element={<ClassSchedule />} />
          <Route path="/student/:id/grades" element={<Grades />} />
          <Route path="/student/:id/homework" element={<Homework />} />
          <Route path="/student/:id/exams" element={<Exams />} />
          <Route path="/student/:id/announcements" element={<Announcements />} />

          {/* Parent routes with dynamic ID */}
          <Route path="/parent/:id/dashboard" element={<Parent />} />

          {/* Teacher routes with dynamic ID */}
          <Route path="/teacher/:id/dashboard" element={<Teacher />} />
          <Route path="/teacher/:id/profile" element={<TeacherProfile />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
