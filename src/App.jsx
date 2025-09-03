import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/index.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import Student from "./pages/Student/index.jsx";
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
      </Routes>
    </Router>
  );
};

export default App;
