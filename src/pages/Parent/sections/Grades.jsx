import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { parentAPI } from '../../../api/parent';

export default function Grades() {
  const outletContext = useOutletContext();
  const { selectedChild: child } = outletContext || {};
  const { childId, parentId } = useParams();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrades = async () => {
      if (!parentId || !childId) {
        setError('Missing parent or child ID');
        setLoading(false);
        return;
      }

      try {
        console.log('📊 Fetching grades for parent:', parentId, 'child:', childId);
        setLoading(true);
        const response = await parentAPI.getChildGrades(parentId, childId);
        console.log('✅ Grades data received:', response.data);
        setGrades(response.data.data.grades || []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching grades:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load grades');
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [parentId, childId]);

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

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInDown">
        📊 {child?.name || 'Child'}'s Grades
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Overall GPA</p>
              <p className="text-3xl font-bold text-gray-800">{overallGPA}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Subjects</p>
              <p className="text-3xl font-bold text-gray-800">{grades.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Best Subject</p>
              <p className="text-lg font-bold text-gray-800">{bestSubject?.subject || 'N/A'}</p>
              <p className="text-sm text-gray-600">{bestSubject?.finalGrade || 0}/20</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grades List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Subjects & Grades</h2>
          
          {grades.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No grades available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {grades.map((grade, idx) => (
                <div key={idx} className={`border-2 rounded-lg p-4 ${getGradeColor(grade.finalGrade)}`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getGradeIcon(grade.finalGrade)}</span>
                      <div>
                        <h3 className="font-semibold text-lg">{grade.subject}</h3>
                        <p className="text-sm opacity-75">Final Grade</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">{grade.finalGrade}/20</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

