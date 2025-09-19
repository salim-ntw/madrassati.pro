import React from "react";

export default function Exams() {
  const tests = [
    { 
      id: "T001",
      title: "Mathematics Quiz", 
      subject: "Mathematics", 
      date: "2025-01-25", 
      time: "09:00 - 10:30", 
      room: "A101",
      duration: "90 min",
      type: "quiz"
    },
    { 
      id: "T002",
      title: "Physics Midterm", 
      subject: "Physics", 
      date: "2025-01-28", 
      time: "11:00 - 12:30", 
      room: "B203",
      duration: "90 min",
      type: "midterm"
    },
    { 
      id: "T003",
      title: "Programming Test", 
      subject: "Computer Science", 
      date: "2025-01-30", 
      time: "14:00 - 15:30", 
      room: "Lab 2",
      duration: "90 min",
      type: "practical"
    }
  ];

  const exams = [
    { 
      id: "E001",
      title: "Final Mathematics Exam", 
      subject: "Mathematics", 
      date: "2025-02-15", 
      time: "09:00 - 12:00", 
      room: "A101",
      duration: "3 hours",
      type: "final"
    },
    { 
      id: "E002",
      title: "Physics Final Exam", 
      subject: "Physics", 
      date: "2025-02-18", 
      time: "09:00 - 12:00", 
      room: "B203",
      duration: "3 hours",
      type: "final"
    }
  ];

  const getDaysUntil = (date) => {
    const today = new Date()
    const target = new Date(date)
    const diffTime = target - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'quiz': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'midterm': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'practical': return 'bg-green-100 text-green-800 border-green-200'
      case 'final': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'quiz': return '📝'
      case 'midterm': return '📊'
      case 'practical': return '💻'
      case 'final': return '🎯'
      default: return '📋'
    }
  }

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInDown">📝 Tests & Exams Schedule</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              📝
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Tests</p>
              <p className="text-2xl font-bold text-gray-900">{tests.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              🎯
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Final Exams</p>
              <p className="text-2xl font-bold text-gray-900">{exams.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              ⏰
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Next Test</p>
              <p className="text-lg font-bold text-gray-900">Math Quiz</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              📚
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Subjects</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tests Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 animate-slideInUp" style={{animationDelay: '0.5s'}}>
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
          <h2 className="text-xl font-semibold">📝 Tests ({tests.length})</h2>
        </div>
        
        <div className="p-6">
          {tests.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📝</div>
              <p className="text-gray-500">No tests scheduled.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {tests.map((test, index) => {
                const daysUntil = getDaysUntil(test.date)
                return (
                  <div key={test.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{test.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(test.type)}`}>
                            {getTypeIcon(test.type)} {test.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          <span>📚 {test.subject}</span>
                          <span>📅 {new Date(test.date).toLocaleDateString()}</span>
                          <span>⏰ {test.time}</span>
                          <span>🏫 {test.room}</span>
                          <span>⏱️ {test.duration}</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm text-gray-500 mb-1">Days left</div>
                        <div className={`text-lg font-bold ${
                          daysUntil < 0 ? 'text-red-600' : 
                          daysUntil <= 7 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {daysUntil < 0 ? 'Past' : daysUntil}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">ID: {test.id}</div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Exams Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-slideInUp" style={{animationDelay: '0.6s'}}>
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-4">
          <h2 className="text-xl font-semibold">🎯 Final Exams ({exams.length})</h2>
        </div>
        
        <div className="p-6">
          {exams.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-gray-500">No final exams scheduled.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {exams.map((exam, index) => {
                const daysUntil = getDaysUntil(exam.date)
                return (
                  <div key={exam.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{exam.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(exam.type)}`}>
                            {getTypeIcon(exam.type)} {exam.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          <span>📚 {exam.subject}</span>
                          <span>📅 {new Date(exam.date).toLocaleDateString()}</span>
                          <span>⏰ {exam.time}</span>
                          <span>🏫 {exam.room}</span>
                          <span>⏱️ {exam.duration}</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm text-gray-500 mb-1">Days left</div>
                        <div className={`text-lg font-bold ${
                          daysUntil < 0 ? 'text-red-600' : 
                          daysUntil <= 7 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {daysUntil < 0 ? 'Past' : daysUntil}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">ID: {exam.id}</div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
