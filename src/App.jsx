import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/index.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import Student from "./pages/Student/index.jsx";

//student sub pages
import ClassSchedule from "./pages/Student/ClassSched.jsx";
import Grades from "./pages/Student/Grades.jsx";
import Homework from "./pages/Student/Homework.jsx";
import Exams from "./pages/Student/Exams.jsx";
import Announcements from "./pages/Student/Announcement.jsx";
import Profile from "./pages/Student/Profile.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        {/* Add other routes as needed */}
        <Route path="/Login" element={<Login />} />
        {/* Example: <Route path="/profile" element={<Profile />} /> */}
        <Route path ="/student" element={<Student />} />

         {/* default page when visiting /student */}
          {/* <Route index element={<div>Welcome + Highlights</div>} /> */}
          <Route path="/student/profile" element={<Profile />} />
          <Route path="/student/schedule" element={<ClassSchedule />} />
          <Route path="/student/grades" element={<Grades />} />
          <Route path="/student/homework" element={<Homework />} />
          <Route path="/student/exams" element={<Exams />} />
          <Route path="/student/announcements" element={<Announcements />} />
      </Routes>
    </Router>
  );
};

export default App;
