import React from "react";

export default function Homework() {
  // Example homework data
  const homework = [
    {
      id: "HW001",
      title: "Algebra Problems",
      subject: "Mathematics",
      description: "Complete exercises 1-20 from Chapter 3",
      start: "2025-01-15",
      deadline: "2025-01-20",
      status: "active",
      priority: "high"
    },
    {
      id: "HW002",
      title: "Physics Lab Report",
      subject: "Physics",
      description: "Write a detailed report on the pendulum experiment",
      start: "2025-01-10",
      deadline: "2025-01-16",
      status: "overdue",
      priority: "high"
    },
    {
      id: "HW003",
      title: "Programming Assignment",
      subject: "Computer Science",
      description: "Create a simple calculator using Python",
      start: "2025-01-18",
      deadline: "2025-01-25",
      status: "active",
      priority: "medium"
    },
    {
      id: "HW004",
      title: "Essay on Climate Change",
      subject: "English",
      description: "Write a 500-word essay discussing climate change impacts",
      start: "2025-01-20",
      deadline: "2025-01-30",
      status: "upcoming",
      priority: "low"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200'
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200'
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

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date()
    const due = new Date(deadline)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const activeHomework = homework.filter(hw => hw.status === 'active').length
  const overdueHomework = homework.filter(hw => hw.status === 'overdue').length
  const upcomingHomework = homework.filter(hw => hw.status === 'upcoming').length

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInDown">📝 My Homework</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              📝
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assignments</p>
              <p className="text-2xl font-bold text-gray-900">{homework.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              ✅
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{activeHomework}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              ⚠️
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{overdueHomework}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              📅
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingHomework}</p>
            </div>
          </div>
        </div>
      </div>

      {homework.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center animate-slideInUp" style={{animationDelay: '0.5s'}}>
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-500 text-lg">No homework assigned.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-slideInUp" style={{animationDelay: '0.5s'}}>
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
            <h2 className="text-xl font-semibold">Homework Assignments</h2>
          </div>
          
          <div className="p-6">
            <div className="grid gap-4">
              {homework.map((hw, index) => {
                const daysUntilDeadline = getDaysUntilDeadline(hw.deadline)
                return (
                  <div key={hw.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{hw.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(hw.status)}`}>
                            {hw.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(hw.priority)}`}>
                            {hw.priority} priority
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{hw.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>📚 {hw.subject}</span>
                          <span>📅 Start: {new Date(hw.start).toLocaleDateString()}</span>
                          <span>⏰ Due: {new Date(hw.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm text-gray-500 mb-1">Days left</div>
                        <div className={`text-lg font-bold ${
                          daysUntilDeadline < 0 ? 'text-red-600' : 
                          daysUntilDeadline <= 3 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {daysUntilDeadline < 0 ? 'Overdue' : daysUntilDeadline}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>ID: {hw.id}</span>
                      <span>Duration: {Math.ceil((new Date(hw.deadline) - new Date(hw.start)) / (1000 * 60 * 60 * 24))} days</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
