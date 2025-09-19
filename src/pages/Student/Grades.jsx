import React from "react";

export default function Grades() {
  // Example grades data
  const grades = [
    { subject: "Mathematics", homework: 15, test: 14, exam: 16 },
    { subject: "Physics", homework: 13, test: 12, exam: 9 },
    { subject: "Computer Science", homework: 17, test: 18, exam: 19 },
    { subject: "Algorithms", homework: 12, test: 8, exam: 9 },
    { subject: "English", homework: 16, test: 15, exam: 14 },
    { subject: "Databases", homework: 14, test: 16, exam: 18 },
  ];

  // Weighted average (20% homework, 30% test, 50% exam)
  const calculateFinal = (hw, test, exam) => {
    return parseFloat(((hw * 0.2) + (test * 0.3) + (exam * 0.5)).toFixed(2));
  };

  const getGradeColor = (grade) => {
    if (grade >= 16) return 'bg-green-100 text-green-800 border-green-200'
    if (grade >= 12) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return 'bg-red-100 text-red-800 border-red-200'
  }

  const getGradeIcon = (grade) => {
    if (grade >= 16) return '🟢'
    if (grade >= 12) return '🟡'
    return '🔴'
  }

  const overallGPA = grades.length > 0 ? 
    (grades.reduce((sum, g) => sum + calculateFinal(g.homework, g.test, g.exam), 0) / grades.length).toFixed(2) : 0

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInDown">📊 My Grades</h1>

      {/* GPA Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              📊
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Overall GPA</p>
              <p className="text-2xl font-bold text-gray-900">{overallGPA}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              📚
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Subjects</p>
              <p className="text-2xl font-bold text-gray-900">{grades.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              🏆
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Best Subject</p>
              <p className="text-lg font-bold text-gray-900">Computer Science</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              📈
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Improvement</p>
              <p className="text-lg font-bold text-gray-900">+0.3</p>
            </div>
          </div>
        </div>
      </div>

      {grades.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center animate-slideInUp" style={{animationDelay: '0.5s'}}>
          <div className="text-6xl mb-4">📊</div>
          <p className="text-gray-500 text-lg">No grades available yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-slideInUp" style={{animationDelay: '0.5s'}}>
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-4">
            <h2 className="text-xl font-semibold">Subject Grades</h2>
          </div>
          
          <div className="p-6">
            <div className="grid gap-4">
              {grades.map((g, index) => {
                const finalGrade = calculateFinal(g.homework, g.test, g.exam);
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-800">{g.subject}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getGradeColor(finalGrade)}`}>
                          {getGradeIcon(finalGrade)} {finalGrade >= 12 ? 'Pass' : 'Needs Improvement'}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-800">{finalGrade}/20</div>
                        <div className="text-sm text-gray-500">Final Grade</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Homework (20%)</div>
                        <div className="text-lg font-semibold text-gray-800">{g.homework}/20</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Test (30%)</div>
                        <div className="text-lg font-semibold text-gray-800">{g.test}/20</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Exam (50%)</div>
                        <div className="text-lg font-semibold text-gray-800">{g.exam}/20</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
