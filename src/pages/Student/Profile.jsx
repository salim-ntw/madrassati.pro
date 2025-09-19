import React from "react";
import profPic from "../../assets/graduated.png";

export default function Profile() {
  const student = {
    name: "Alex Johnson",
    class: "Grade 10 - Computer Science",
    id: "S001",
    email: "alex.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Student Street, City, State 12345",
    parentName: "John & Sarah Johnson",
    parentPhone: "+1 (555) 987-6543",
    enrollmentDate: "September 2023",
    gpa: "3.8",
    attendance: "95%"
  };

  const academicStats = [
    { label: "Current GPA", value: student.gpa, color: "bg-blue-500" },
    { label: "Attendance", value: student.attendance, color: "bg-green-500" },
    { label: "Classes", value: "6", color: "bg-purple-500" },
    { label: "Credits", value: "24", color: "bg-orange-500" }
  ];

  const recentAchievements = [
    { title: "Honor Roll", date: "Fall 2024", icon: "🏆" },
    { title: "Math Competition", date: "October 2024", icon: "🥇" },
    { title: "Perfect Attendance", date: "September 2024", icon: "⭐" }
  ];

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInDown">👤 My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg animate-slideInUp" style={{animationDelay: '0.1s'}}>
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                  src={profPic}
                  alt="profile"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white animate-pulse"></div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{student.name}</h2>
              <p className="text-gray-600 mb-4">{student.class}</p>
              
              <div className="w-full space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Student ID:</span>
                  <span className="font-semibold text-gray-800">{student.id}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Email:</span>
                  <span className="font-semibold text-gray-800 text-sm">{student.email}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Phone:</span>
                  <span className="font-semibold text-gray-800">{student.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Stats */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-lg animate-slideInUp" style={{animationDelay: '0.2s'}}>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">📊 Academic Statistics</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {academicStats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl mx-auto mb-2`}>
                    {stat.label === "Current GPA" && "📊"}
                    {stat.label === "Attendance" && "📈"}
                    {stat.label === "Classes" && "📚"}
                    {stat.label === "Credits" && "🎓"}
                  </div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">📋 Personal Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Address:</span>
                    <span className="font-semibold text-gray-800 text-sm text-right">{student.address}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Enrollment Date:</span>
                    <span className="font-semibold text-gray-800">{student.enrollmentDate}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">👨‍👩‍👧‍👦 Parent Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Parents:</span>
                    <span className="font-semibold text-gray-800 text-sm text-right">{student.parentName}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Parent Phone:</span>
                    <span className="font-semibold text-gray-800">{student.parentPhone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white p-6 rounded-xl shadow-lg mt-6 animate-slideInUp" style={{animationDelay: '0.3s'}}>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">🏆 Recent Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{achievement.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
