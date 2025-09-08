import React from "react";
import profPic from "../../assets/graduated.png"; // same picture as sidebar

export default function Profile() {
  const student = {
    name: "Student name",   // same as in sidebar
    class: "3rd Year - Computer Science", 
    id: "STU123456",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">👤 Profile</h1>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-md flex flex-col items-center">
        {/* Profile Picture */}
        <img
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-900 shadow mb-4"
          src={profPic}
          alt="profile"
        />

        {/* Name */}
        <h2 className="text-xl font-bold mb-2">{student.name}</h2>

        {/* Info */}
        <p className="mb-1"><span className="font-semibold">Class:</span> {student.class}</p>
        <p className="mb-1"><span className="font-semibold">ID:</span> {student.id}</p>
      </div>
    </div>
  );
}
