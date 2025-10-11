import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { studentAPI } from "../../api/student";
import profPic from "../../assets/graduated.png";

export default function Profile() {
  const { id: studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('👤 Fetching profile for student:', studentId);
        setLoading(true);
        const response = await studentAPI.getProfile(studentId);
        console.log('✅ Profile data received:', response.data);
        setStudent(response.data.data);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching profile:', err);
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchProfile();
    }
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center m-6">
        <p className="text-red-600 font-semibold">⚠️ {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center m-6">
        <p className="text-yellow-600">No profile data available</p>
      </div>
    );
  }

  const academicStats = [
    { label: "Current GPA", value: student.gpa, color: "bg-blue-500", icon: "📊" },
    { label: "Attendance", value: student.attendance, color: "bg-green-500", icon: "📈" },
    { label: "Classes", value: student.classCount || "6", color: "bg-purple-500", icon: "📚" },
    { label: "Credits", value: student.totalCredits || "24", color: "bg-orange-500", icon: "🎓" }
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
                  src={student.profilePicture || profPic}
                  alt="profile"
                  onError={(e) => { e.target.src = profPic; }}
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white animate-pulse"></div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{student.name}</h2>
              <p className="text-gray-600 mb-4">{student.class}</p>
              
              <div className="w-full space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Student ID:</span>
                  <span className="font-semibold text-gray-800 text-xs">{student.id.slice(-8)}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Email:</span>
                  <span className="font-semibold text-gray-800 text-xs break-all">{student.email}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Phone:</span>
                  <span className="font-semibold text-gray-800 text-sm">{student.phone}</span>
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
                    {stat.icon}
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
        </div>
      </div>
    </div>
  );
}