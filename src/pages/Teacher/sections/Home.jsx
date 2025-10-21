import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { teacherAPI } from '../../../api/teacher'

export default function Home() {
  const { teacherId } = useParams()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log('📊 Fetching dashboard data for teacher:', teacherId)
        setLoading(true)
        
        // Fetch multiple data sources in parallel
        const [profileRes, classesRes, homeworkRes, examsRes, messagesRes] = await Promise.allSettled([
          teacherAPI.getProfile(teacherId),
          teacherAPI.getClasses(teacherId),
          teacherAPI.getHomework(teacherId),
          teacherAPI.getExams(teacherId),
          teacherAPI.getMessages(teacherId)
        ])

        const profile = profileRes.status === 'fulfilled' ? profileRes.value.data.data : null
        const classes = classesRes.status === 'fulfilled' ? classesRes.value.data.data.classes : []
        const homework = homeworkRes.status === 'fulfilled' ? homeworkRes.value.data.data.homework : []
        const exams = examsRes.status === 'fulfilled' ? examsRes.value.data.data.exams : []
        const messages = messagesRes.status === 'fulfilled' ? messagesRes.value.data.data.conversations : []

        // Calculate stats from real data
        const totalStudents = classes.reduce((sum, cls) => sum + (cls.students?.length || 0), 0)
        const activeClasses = classes.length
        const pendingHomework = homework.filter(hw => !hw.graded).length
        const upcomingExams = exams.filter(exam => new Date(exam.date) > new Date()).length

        const stats = [
          { title: 'Total Students', value: totalStudents.toString(), icon: '👥', color: 'bg-blue-500' },
          { title: 'Active Classes', value: activeClasses.toString(), icon: '🏫', color: 'bg-green-500' },
          { title: 'Pending Homework', value: pendingHomework.toString(), icon: '📝', color: 'bg-yellow-500' },
          { title: 'Upcoming Exams', value: upcomingExams.toString(), icon: '📊', color: 'bg-red-500' }
        ]

        // Generate recent activities from real data
        const recentActivities = [
          ...homework.slice(0, 2).map(hw => ({
            action: `Graded homework for ${hw.className || 'Class'}`,
            time: new Date(hw.updatedAt || hw.createdAt).toLocaleString(),
            type: 'grade'
          })),
          ...messages.slice(0, 2).map(msg => ({
            action: `New message from ${msg.senderName || 'Parent'}`,
            time: new Date(msg.createdAt).toLocaleString(),
            type: 'message'
          }))
        ].slice(0, 4)

        setDashboardData({
          stats,
          recentActivities,
          classes,
          profile
        })
        setError(null)
      } catch (err) {
        console.error('❌ Error fetching dashboard data:', err)
        setError(err.response?.data?.error || err.message || 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    if (teacherId) {
      fetchDashboardData()
    }
  }, [teacherId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
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
    )
  }

  const { stats, recentActivities, classes, profile } = dashboardData || {
    stats: [
      { title: 'Total Students', value: '0', icon: '👥', color: 'bg-blue-500' },
      { title: 'Active Classes', value: '0', icon: '🏫', color: 'bg-green-500' },
      { title: 'Pending Homework', value: '0', icon: '📝', color: 'bg-yellow-500' },
      { title: 'Upcoming Exams', value: '0', icon: '📊', color: 'bg-red-500' }
    ],
    recentActivities: [],
    classes: [],
    profile: null
  }

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 animate-fadeIn mobile-padding">
      <div className="mb-6 md:mb-8 animate-slideInDown">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {profile?.name || 'Teacher'}!
        </h1>
        <p className="text-sm md:text-base text-gray-600">Here's what's happening in your classes today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mobile-grid-2">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp mobile-card" style={{animationDelay: `${index * 0.1}s`}}>
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                <p className="text-xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.color} rounded-lg flex items-center justify-center text-xl md:text-2xl flex-shrink-0`}>
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
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Classes</h2>
        <div className="space-y-3">
          {classes && classes.length > 0 ? (
            classes.slice(0, 3).map((cls, index) => (
              <div key={cls._id || index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300 transform hover:scale-[1.02]">
                <div>
                  <p className="font-medium text-blue-900">{cls.name || cls.className || `Class ${index + 1}`}</p>
                  <p className="text-sm text-blue-700">{cls.room || 'Room TBD'}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-900">{cls.students?.length || 0} students</p>
                  <p className="text-sm text-blue-700">{cls.subject || profile?.subject || 'Subject'}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No classes assigned yet</p>
              <p className="text-sm">Contact administration to get assigned to classes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
