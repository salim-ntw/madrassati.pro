import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { studentAPI } from "../../api/student";

export default function Exams() {
  const { id: studentId } = useParams();
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [completedExams, setCompletedExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        console.log('📋 Fetching exams for student:', studentId);
        setLoading(true);
        const response = await studentAPI.getExams(studentId);
        console.log('✅ Exams data received:', response.data);
        setUpcomingExams(response.data.data.upcoming || []);
        setCompletedExams(response.data.data.completed || []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching exams:', err);
        setError(err.message || 'Failed to load exams');
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchExams();
    }
  }, [studentId]);

  const getDaysUntil = (date) => {
    const today = new Date();
    const target = new Date(date);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'quiz': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'midterm': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'practical': return 'bg-green-100 text-green-800 border-green-200';
      case 'final': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'quiz': return '📝';
      case 'midterm': return '📊';
      case 'practical': return '💻';
      case 'final': return '🎯';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading exams...</p>
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
  const quizzes = upcomingExams.filter(e => e.type === 'quiz').length;
  const midterms = upcomingExams.filter(e => e.type === 'midterm').length;
  const finals = upcomingExams.filter(e => e.type === 'final').length;
  const practicals = upcomingExams.filter(e => e.type === 'practical').length;
  const uniqueSubjects = [...new Set(upcomingExams.map(e => e.subject))].length;

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
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingExams.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              🎯
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Finals</p>
              <p className="text-2xl font-bold text-gray-900">{finals}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              ⏰
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Next Exam</p>
              <p className="text-sm font-bold text-gray-900">{upcomingExams[0]?.title.slice(0, 15) || 'None'}</p>
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
              <p className="text-2xl font-bold text-gray-900">{uniqueSubjects}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Exams Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 animate-slideInUp" style={{animationDelay: '0.5s'}}>
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
          <h2 className="text-xl font-semibold">📝 Upcoming Exams ({upcomingExams.length})</h2>
        </div>
        
        <div className="p-6">
          {upcomingExams.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📝</div>
              <p className="text-gray-500">No upcoming exams scheduled.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {upcomingExams.map((exam, index) => {
                const daysUntil = getDaysUntil(exam.date);
                return (
                  <div key={exam._id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
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
                          <span>⏰ {exam.startTime} - {exam.endTime}</span>
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
                    <div className="text-xs text-gray-500">ID: {exam.examId}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Completed Exams Section */}
      {completedExams.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-slideInUp" style={{animationDelay: '0.6s'}}>
          <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white p-4">
            <h2 className="text-xl font-semibold">✅ Completed Exams ({completedExams.length})</h2>
          </div>
          
          <div className="p-6">
            <div className="grid gap-4">
              {completedExams.map((exam, index) => (
                <div key={exam._id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] opacity-75">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-600">{exam.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(exam.type)}`}>
                          {getTypeIcon(exam.type)} {exam.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                        <span>📚 {exam.subject}</span>
                        <span>📅 {new Date(exam.date).toLocaleDateString()}</span>
                        <span>🏫 {exam.room}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">ID: {exam.examId}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}