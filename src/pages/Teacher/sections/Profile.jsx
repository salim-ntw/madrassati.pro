import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { teacherAPI } from "../../../api/teacher";
import profPic from "../../../assets/graduated.png";

export default function Profile() {
  const { teacherId } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('👨‍🏫 Fetching profile for teacher:', teacherId);
        setLoading(true);
        const response = await teacherAPI.getProfile(teacherId);
        console.log('✅ Profile data received:', response.data);
        setTeacher(response.data.data);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching profile:', err);
        setError(err.response?.data?.error || err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchProfile();
    }
  }, [teacherId]);

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md">
          <p className="text-red-600 font-semibold mb-4">⚠️ {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">No profile data available</p>
        </div>
      </div>
    );
  }

  const professionalStats = [
    { label: "Subject", value: teacher.subject || "N/A", color: "bg-blue-500" },
    { label: "Number of Classes", value: teacher.classes?.length || "0", color: "bg-green-500" },
    { label: "Messages", value: teacher.messagesCount || "0", color: "bg-purple-500" },
    { label: "Meetings", value: teacher.meetingsCount || "0", color: "bg-orange-500" }
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
              <p className="text-gray-600 mb-4">{teacher.subject} Teacher</p>
              
              <div className="w-full space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Teacher ID:</span>
                  <span className="font-semibold text-gray-800 text-xs">{teacher.id.slice(-8)}</span>
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

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Professional Stats */}
          <div className="bg-white p-6 rounded-xl shadow-lg animate-slideInUp" style={{animationDelay: '0.2s'}}>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">📊 Professional Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {professionalStats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <span className="text-white font-bold text-lg">{stat.value}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Details */}
          <div className="bg-white p-6 rounded-xl shadow-lg animate-slideInUp" style={{animationDelay: '0.3s'}}>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">👨‍🏫 Professional Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Subject:</span>
                <span className="font-semibold text-gray-800">{teacher.subject}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Number of Classes:</span>
                <span className="font-semibold text-gray-800">{teacher.classes?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Messages:</span>
                <span className="font-semibold text-gray-800">{teacher.messagesCount || 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Meetings:</span>
                <span className="font-semibold text-gray-800">{teacher.meetingsCount || 0}</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-xl shadow-lg animate-slideInUp" style={{animationDelay: '0.4s'}}>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">📍 Contact Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Phone:</span>
                <span className="font-semibold text-gray-800">{teacher.phone || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Email:</span>
                <span className="font-semibold text-gray-800 text-sm break-all">{teacher.email}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Alerts:</span>
                <span className="font-semibold text-gray-800">{teacher.alertsCount || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}