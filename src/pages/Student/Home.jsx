import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { studentAPI } from '../../api/student';
import Welcome from './Welcome';
import Highlight from './Highlight';

export default function Home() {
  const { id: studentId } = useParams();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log('🔄 Fetching dashboard data for student:', studentId);
        setLoading(true);
        const response = await studentAPI.getDashboard(studentId);
        console.log('✅ Dashboard data received:', response.data);
        setDashboardData(response.data.data);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching dashboard data:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchDashboardData();
    }
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
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

  if (!dashboardData) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p className="text-yellow-600">No dashboard data available</p>
      </div>
    );
  }

  const stats = [
    { 
      title: 'Current GPA', 
      value: dashboardData.student?.gpa?.toFixed(1) || '0.0', 
      icon: '📊', 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Pending Homework', 
      value: dashboardData.counts?.pendingHomework || '0', 
      icon: '📝', 
      color: 'bg-yellow-500' 
    },
    { 
      title: 'Upcoming Exams', 
      value: dashboardData.counts?.upcomingExams || '0', 
      icon: '📋', 
      color: 'bg-red-500' 
    },
    { 
      title: 'New Announcements', 
      value: dashboardData.counts?.newAnnouncements || '0', 
      icon: '📢', 
      color: 'bg-green-500' 
    }
  ];

  // Build recent activities from API data
  const recentActivities = [];
  
  // Add recent announcements
  if (dashboardData.recentActivities?.announcements) {
    dashboardData.recentActivities.announcements.slice(0, 2).forEach(ann => {
      const date = new Date(ann.date);
      const timeDiff = Date.now() - date.getTime();
      const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
      const daysAgo = Math.floor(hoursAgo / 24);
      const timeStr = daysAgo > 0 ? `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago` : `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
      
      recentActivities.push({
        action: `📢 ${ann.title}`,
        time: timeStr,
        type: 'announcement'
      });
    });
  }

  // Add recent grades
  if (dashboardData.recentActivities?.grades) {
    dashboardData.recentActivities.grades.slice(0, 2).forEach(grade => {
      recentActivities.push({
        action: `📊 New grade posted for ${grade.subject}: ${grade.finalGrade}%`,
        time: 'Recently',
        type: 'grade'
      });
    });
  }

  // Add recent homework
  if (dashboardData.recentActivities?.homework) {
    dashboardData.recentActivities.homework.slice(0, 2).forEach(hw => {
      const dueDate = new Date(hw.dueDate);
      const daysUntilDue = Math.ceil((dueDate - Date.now()) / (1000 * 60 * 60 * 24));
      
      recentActivities.push({
        action: `📝 ${hw.title} (Due in ${daysUntilDue} days)`,
        time: hw.status === 'active' ? 'Active' : hw.status,
        type: 'homework'
      });
    });
  }

  return (
    <div className='flex flex-col gap-6 animate-fadeIn'>
      {/* Welcome Component */}
      <Welcome />

      {/* Student Info Header - Optional, can be removed if redundant */}
      {/* <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold">{dashboardData.student?.name || 'Student'}</h1>
        <p className="text-blue-100 mt-2">{dashboardData.student?.gradeLevel || 'Grade Level'}</p>
      </div> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: `${index * 0.1}s`}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next Class/Exam Info */}
      {(dashboardData.nextClass || dashboardData.nextExam) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboardData.nextClass && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📚 Next Class</h3>
              <div className="space-y-2">
                <p className="text-xl font-bold text-blue-600">{dashboardData.nextClass.subject}</p>
                <p className="text-sm text-gray-600">{dashboardData.nextClass.day}</p>
                <p className="text-sm text-gray-600">
                  🕐 {dashboardData.nextClass.startTime} - {dashboardData.nextClass.endTime}
                </p>
                <p className="text-sm text-gray-600">📍 {dashboardData.nextClass.room}</p>
              </div>
            </div>
          )}

          {dashboardData.nextExam && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📋 Next Exam</h3>
              <div className="space-y-2">
                <p className="text-xl font-bold text-red-600">{dashboardData.nextExam.title}</p>
                <p className="text-sm text-gray-600">{dashboardData.nextExam.subject}</p>
                <p className="text-sm text-gray-600">
                  📅 {new Date(dashboardData.nextExam.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  🕐 {dashboardData.nextExam.startTime}
                </p>
                <p className="text-sm text-gray-600">📍 {dashboardData.nextExam.room}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recent Activities */}
      {recentActivities.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 animate-slideInUp" style={{animationDelay: '0.4s'}}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02]">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}