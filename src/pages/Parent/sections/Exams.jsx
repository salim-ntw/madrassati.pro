import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { parentAPI } from '../../../api/parent';

export default function Exams() {
  const outletContext = useOutletContext();
  const { selectedChild: child } = outletContext || {};
  const { childId, parentId } = useParams();
  const [exams, setExams] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamsAndTests = async () => {
      if (!parentId || !childId) {
        setError('Missing parent or child ID');
        setLoading(false);
        return;
      }

      try {
        console.log('📋 Fetching exams and tests for parent:', parentId, 'child:', childId);
        setLoading(true);
        
        // Fetch both exams and tests
        const [examsResponse, testsResponse] = await Promise.all([
          parentAPI.getChildExams(parentId, childId),
          parentAPI.getChildTests(parentId, childId)
        ]);
        
        console.log('✅ Exams data received:', examsResponse.data);
        console.log('✅ Tests data received:', testsResponse.data);
        
        setExams(examsResponse.data.data.exams || []);
        setTests(testsResponse.data.data.tests || []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching exams/tests:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load exams and tests');
      } finally {
        setLoading(false);
      }
    };

    fetchExamsAndTests();
  }, [parentId, childId]);

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
      case 'test': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'midterm': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'exam': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'final': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'quiz': return '📝';
      case 'test': return '📄';
      case 'midterm': return '📊';
      case 'exam': return '📋';
      case 'final': return '🎯';
      default: return '📋';
    }
  };

  // Calculate stats
  const allAssessments = [...exams, ...tests];
  const upcomingCount = allAssessments.filter(e => new Date(e.date) >= new Date()).length;
  const uniqueSubjects = [...new Set(allAssessments.map(e => e.subject))].length;

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInDown">
        📋 {child?.name || 'Child'}'s Tests & Exams
      </h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              🎯
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Exams</p>
              <p className="text-2xl font-bold text-gray-900">{exams.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              📝
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Tests</p>
              <p className="text-2xl font-bold text-gray-900">{tests.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              📅
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingCount}</p>
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

      {/* EXAMS Table (final, exam) */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 animate-slideInUp" style={{animationDelay: '0.5s'}}>
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-4">
          <h2 className="text-xl font-semibold">🎯 Exams ({exams.length})</h2>
        </div>
        
        <div className="p-6">
          {exams.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-gray-500">No exams scheduled.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {exams.map((exam, index) => {
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
                          <span>⏱️ {exam.durationMinutes || exam.duration} min</span>
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
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* TESTS Table (quiz, test, midterm) */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-slideInUp" style={{animationDelay: '0.6s'}}>
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
          <h2 className="text-xl font-semibold">📝 Tests & Quizzes ({tests.length})</h2>
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
                const daysUntil = getDaysUntil(test.date);
                return (
                  <div key={test._id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
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
                          <span>⏰ {test.startTime} - {test.endTime}</span>
                          <span>🏫 {test.room}</span>
                          <span>⏱️ {test.durationMinutes || test.duration} min</span>
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
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

