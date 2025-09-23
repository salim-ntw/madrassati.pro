import React from "react";
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
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          {/* Add other routes as needed */}
          <Route path="/Login" element={<Login />} />
          {/* Example: <Route path="/profile" element={<Profile />} /> */}
          <Route path="/student" element={<Student />} />
          <Route path="/parent" element={<Parent />} />
          <Route path="/teacher" element={<Teacher />} />

          {/* default page when visiting /student */}
          {/* <Route index element={<div>Welcome + Highlights</div>} /> */}
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/schedule" element={<ClassSchedule />} />
          <Route path="/student/grades" element={<Grades />} />
          <Route path="/student/homework" element={<Homework />} />
          <Route path="/student/exams" element={<Exams />} />
          <Route path="/student/announcements" element={<Announcements />} />

          {/* teacher sub pages */}
          <Route path="/teacher/profile" element={<TeacherProfile />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
