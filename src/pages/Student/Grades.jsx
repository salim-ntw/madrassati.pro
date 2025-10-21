import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { studentAPI } from "../../api/student";

export default function Grades({ studentId: propStudentId }) {
  const { id: paramStudentId } = useParams();
  const studentId = propStudentId || paramStudentId; // Use prop if provided, otherwise use URL param
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        console.log('📊 Fetching grades for student:', studentId);
        setLoading(true);
        const response = await studentAPI.getGrades(studentId);
        console.log('✅ Grades data received:', response.data);
        setGrades(response.data.data.grades || []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching grades:', err);
        setError(err.message || 'Failed to load grades');
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchGrades();
    }
  }, [studentId]);

  const getGradeColor = (grade) => {
    if (grade >= 16) return 'bg-green-100 text-green-800 border-green-200'; // 16/20 = 80%
    if (grade >= 12) return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // 12/20 = 60%
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getGradeIcon = (grade) => {
    if (grade >= 16) return '🟢'; // 16/20 = 80%
    if (grade >= 12) return '🟡'; // 12/20 = 60%
    return '🔴';
  };

  const overallGPA = grades.length > 0 ? 
    (grades.reduce((sum, g) => sum + g.finalGrade, 0) / grades.length).toFixed(2) : 0;

  const bestSubject = grades.length > 0 ?
    grades.reduce((best, current) => current.finalGrade > best.finalGrade ? current : best, grades[0]) : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading grades...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
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
              <p className="text-sm font-medium text-gray-600">Overall Average</p>
              <p className="text-2xl font-bold text-gray-900">{overallGPA}%</p>
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
              <p className="text-lg font-bold text-gray-900">{bestSubject?.subject || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              ✅
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Status</p>
              <p className="text-lg font-bold text-gray-900">{grades.filter(g => g.status === 'Pass').length} Passing</p>
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
              {grades.map((g, index) => (
                <div key={g._id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-800">{g.subject}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getGradeColor(g.finalGrade)}`}>
                        {getGradeIcon(g.finalGrade)} {g.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800">{g.finalGrade}/20</div>
                      <div className="text-sm text-gray-500">Final Grade</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Homework</div>
                      <div className="text-lg font-semibold text-gray-800">{g.homework}/20</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Test</div>
                      <div className="text-lg font-semibold text-gray-800">{g.test}/20</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Exam</div>
                      <div className="text-lg font-semibold text-gray-800">{g.exam}/20</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}