import React from 'react'
import Welcome from './Welcome'
import Highlight from './Highlight'

export default function Home() {
  const stats = [
    { title: 'Current GPA', value: '3.8', icon: '📊', color: 'bg-blue-500' },
    { title: 'Classes Today', value: '4', icon: '📚', color: 'bg-green-500' },
    { title: 'Pending Homework', value: '3', icon: '📝', color: 'bg-yellow-500' },
    { title: 'Upcoming Exams', value: '2', icon: '📋', color: 'bg-red-500' }
  ]

  const recentActivities = [
    { action: 'Submitted Math homework', time: '2 hours ago', type: 'homework' },
    { action: 'New grade posted for Physics', time: '4 hours ago', type: 'grade' },
    { action: 'New announcement from teacher', time: '1 day ago', type: 'announcement' },
    { action: 'Exam schedule updated', time: '2 days ago', type: 'exam' }
  ]

  return (
    <div className='flex flex-col gap-6 animate-fadeIn'>
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

      <Welcome />
      <Highlight />

      {/* Recent Activities */}
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
    </div>
  )
}
