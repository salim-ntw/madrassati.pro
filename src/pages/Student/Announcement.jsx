import React from "react";

export default function Announcement() {
  const announcements = [
    {
      id: "A001",
      title: "Exam Schedule Released",
      date: "2025-01-20",
      content: "The exam timetable for the Spring semester has been published. Please check the Exams section for your schedule and prepare accordingly.",
      type: "info",
      priority: "medium",
      author: "Academic Office"
    },
    {
      id: "A002",
      title: "Holiday Notice",
      date: "2025-01-18",
      content: "School will be closed on January 25th for National Day. Classes will resume on January 26th. Enjoy your holiday!",
      type: "info",
      priority: "low",
      author: "Administration"
    },
    {
      id: "A003",
      title: "Urgent: Room Change",
      date: "2025-01-19",
      content: "The Computer Science class on Monday has been moved to Room B203 due to maintenance work in Lab 2. Please update your schedules.",
      type: "urgent",
      priority: "high",
      author: "IT Department"
    },
    {
      id: "A004",
      title: "Library Extended Hours",
      date: "2025-01-17",
      content: "The library will be open until 10 PM during exam period (January 20-30) to help students with their studies.",
      type: "info",
      priority: "low",
      author: "Library Staff"
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200'
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'urgent': return '🚨'
      case 'info': return 'ℹ️'
      default: return '📢'
    }
  }

  const urgentCount = announcements.filter(a => a.type === 'urgent').length
  const infoCount = announcements.filter(a => a.type === 'info').length

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
              <p className="text-2xl font-bold text-gray-900">4</p>
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
                <div key={announcement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
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
                        <span>👤 {announcement.author}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">ID: {announcement.id}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
