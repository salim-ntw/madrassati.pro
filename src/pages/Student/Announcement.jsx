import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { studentAPI } from "../../api/student";

export default function Announcement({ studentId: propStudentId }) {
  const { id: paramStudentId } = useParams();
  const studentId = propStudentId || paramStudentId; // Use prop if provided, otherwise use URL param
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        console.log('📢 Fetching announcements for student:', studentId);
        setLoading(true);
        const response = await studentAPI.getAnnouncements(studentId);
        console.log('✅ Announcements data received:', response.data);
        setAnnouncements(response.data.data.announcements || []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching announcements:', err);
        setError(err.message || 'Failed to load announcements');
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchAnnouncements();
    }
  }, [studentId]);

  const getTypeColor = (type) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'urgent': return '🚨';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading announcements...</p>
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

  // Calculate stats
  const urgentCount = announcements.filter(a => a.type === 'urgent').length;
  const infoCount = announcements.filter(a => a.type === 'info').length;
  
  // Count announcements from last 7 days
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const thisWeekCount = announcements.filter(a => new Date(a.date) >= weekAgo).length;

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInDown">📢 Announcements</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              📢
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Announcements</p>
              <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              🚨
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-gray-900">{urgentCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              ℹ️
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Information</p>
              <p className="text-2xl font-bold text-gray-900">{infoCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              📅
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">{thisWeekCount}</p>
            </div>
          </div>
        </div>
      </div>

      {announcements.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center animate-slideInUp" style={{animationDelay: '0.5s'}}>
          <div className="text-6xl mb-4">📢</div>
          <p className="text-gray-500 text-lg">No announcements at the moment.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-slideInUp" style={{animationDelay: '0.5s'}}>
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-4">
            <h2 className="text-xl font-semibold">Latest Announcements</h2>
          </div>
          
          <div className="p-6">
            <div className="grid gap-4">
              {announcements.map((announcement, index) => (
                <div key={announcement._id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(announcement.type)}`}>
                          {getTypeIcon(announcement.type)} {announcement.type}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority} priority
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{announcement.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>📅 {new Date(announcement.date).toLocaleDateString()}</span>
                        <span>👤 {announcement.postedBy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">ID: {announcement.announcementId}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}