import React from 'react'

export default function Home() {
  const stats = [
    { title: 'Total Students', value: '156', icon: '👥', color: 'bg-blue-500' },
    { title: 'Active Classes', value: '8', icon: '🏫', color: 'bg-green-500' },
    { title: 'Pending Homework', value: '12', icon: '📝', color: 'bg-yellow-500' },
    { title: 'Upcoming Exams', value: '5', icon: '📊', color: 'bg-red-500' }
  ]

  const recentActivities = [
    { action: 'Graded homework for Class 1A', time: '2 hours ago', type: 'grade' },
    { action: 'New message from Sarah\'s parent', time: '4 hours ago', type: 'message' },
    { action: 'Created new homework assignment', time: '1 day ago', type: 'homework' },
    { action: 'Updated exam schedule', time: '2 days ago', type: 'exam' }
  ]

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="mb-8 animate-slideInDown">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Teacher!</h1>
        <p className="text-gray-600">Here's what's happening in your classes today.</p>
      </div>

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

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 animate-slideInUp" style={{animationDelay: '0.4s'}}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
            <span className="text-2xl mr-3">📝</span>
            <div className="text-left">
              <p className="font-medium">Add Homework</p>
              <p className="text-sm text-gray-600">Create new assignment</p>
            </div>
          </button>
          <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-300 transform hover:scale-105">
            <span className="text-2xl mr-3">📊</span>
            <div className="text-left">
              <p className="font-medium">Grade Students</p>
              <p className="text-sm text-gray-600">Enter grades</p>
            </div>
          </button>
          <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105">
            <span className="text-2xl mr-3">📢</span>
            <div className="text-left">
              <p className="font-medium">Send Announcement</p>
              <p className="text-sm text-gray-600">Notify students</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-lg p-6 animate-slideInUp" style={{animationDelay: '0.5s'}}>
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

      {/* Today's Schedule Preview */}
      <div className="bg-white rounded-xl shadow-lg p-6 animate-slideInUp" style={{animationDelay: '0.6s'}}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Schedule</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300 transform hover:scale-[1.02]">
            <div>
              <p className="font-medium text-blue-900">Class 1A</p>
              <p className="text-sm text-blue-700">Room 101</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-blue-900">08:00 - 09:00</p>
              <p className="text-sm text-blue-700">1 hour</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-300 transform hover:scale-[1.02]">
            <div>
              <p className="font-medium text-green-900">Class 2B</p>
              <p className="text-sm text-green-700">Room 205</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-green-900">10:00 - 11:00</p>
              <p className="text-sm text-green-700">1 hour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
