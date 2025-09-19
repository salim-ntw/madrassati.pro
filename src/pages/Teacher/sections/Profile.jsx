import React from "react";
import profPic from "../../../assets/graduated.png";

export default function Profile() {
  const teacher = {
    name: "Ms. Sarah Johnson",
    position: "Mathematics Teacher",
    id: "T001",
    email: "sarah.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    address: "456 Teacher Lane, City, State 12345",
    department: "Mathematics Department",
    experience: "8 years",
    education: "Master's in Mathematics Education",
    specialization: "Algebra & Calculus",
    hireDate: "September 2016",
    salary: "Competitive",
    classes: "4",
    students: "156"
  };

  const professionalStats = [
    { label: "Years Experience", value: teacher.experience, color: "bg-blue-500" },
    { label: "Active Classes", value: teacher.classes, color: "bg-green-500" },
    { label: "Total Students", value: teacher.students, color: "bg-purple-500" },
    { label: "Department", value: "Math", color: "bg-orange-500" }
  ];

  const recentAchievements = [
    { title: "Teacher of the Year", date: "2024", icon: "🏆" },
    { title: "Excellence in Education", date: "2023", icon: "⭐" },
    { title: "Student Satisfaction Award", date: "2022", icon: "👨‍🎓" }
  ];

  const upcomingEvents = [
    { title: "Parent-Teacher Conference", date: "2025-02-15", time: "2:00 PM" },
    { title: "Department Meeting", date: "2025-02-18", time: "3:30 PM" },
    { title: "Professional Development", date: "2025-02-20", time: "9:00 AM" }
  ];

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInDown">👩‍🏫 My Profile</h1>

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
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{teacher.name}</h2>
              <p className="text-gray-600 mb-4">{teacher.position}</p>
              
              <div className="w-full space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Teacher ID:</span>
                  <span className="font-semibold text-gray-800">{teacher.id}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Email:</span>
                  <span className="font-semibold text-gray-800 text-sm">{teacher.email}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Phone:</span>
                  <span className="font-semibold text-gray-800">{teacher.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-lg animate-slideInUp" style={{animationDelay: '0.2s'}}>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">📊 Professional Information</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {professionalStats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl mx-auto mb-2`}>
                    {stat.label === "Years Experience" && "📅"}
                    {stat.label === "Active Classes" && "🏫"}
                    {stat.label === "Total Students" && "👥"}
                    {stat.label === "Department" && "📚"}
                  </div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Professional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">📋 Professional Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Department:</span>
                    <span className="font-semibold text-gray-800">{teacher.department}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Education:</span>
                    <span className="font-semibold text-gray-800 text-sm text-right">{teacher.education}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Specialization:</span>
                    <span className="font-semibold text-gray-800">{teacher.specialization}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Hire Date:</span>
                    <span className="font-semibold text-gray-800">{teacher.hireDate}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">📍 Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Address:</span>
                    <span className="font-semibold text-gray-800 text-sm text-right">{teacher.address}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Experience:</span>
                    <span className="font-semibold text-gray-800">{teacher.experience}</span>
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

          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-xl shadow-lg mt-6 animate-slideInUp" style={{animationDelay: '0.4s'}}>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">📅 Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-medium text-gray-800">{event.title}</p>
                      <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
