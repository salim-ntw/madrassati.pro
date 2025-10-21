import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { teacherAPI } from '../../../api/teacher';

export default function Classes() {
  const { teacherId } = useParams();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        console.log('🏫 Fetching classes for teacher:', teacherId);
        setLoading(true);
        const response = await teacherAPI.getClasses(teacherId);
        console.log('✅ Classes data received:', response.data);
        setClasses(response.data.data.classes || []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching classes:', err);
        setError(err.response?.data?.error || err.message || 'Failed to load classes');
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchClasses();
    }
  }, [teacherId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading classes...</p>
        </div>
      </div>
    );
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
    );
  }

  return (
    <div className='p-6 animate-fadeIn'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6 animate-slideInDown'>My Classes</h1>
      
      {classes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🏫</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Classes Found</h2>
          <p className="text-gray-600">You haven't been assigned to any classes yet.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {classes.map((c, idx) => (
            <div key={c.id || c.className} className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp' style={{animationDelay: `${idx * 0.1}s`}}>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl font-bold'>
                  🏫 {c.className}
                </div>
                <div className='text-right'>
                  <div className='text-2xl font-bold text-gray-800'>👩‍🎓 {c.studentsCount}</div>
                  <div className='text-sm text-gray-600'>students</div>
                </div>
              </div>
              
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <span className='text-sm font-medium text-gray-600 w-20'>📚 Subject:</span>
                  <span className='text-gray-800'>{c.subject}</span>
                </div>
                <div className='flex items-center'>
                  <span className='text-sm font-medium text-gray-600 w-20'>🏠 Room:</span>
                  <span className='text-gray-800'>{c.room}</span>
                </div>
              </div>
              
              <div className='mt-4 pt-4 border-t border-gray-200'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-600'>📈 Average Grade</span>
                  <span className='font-semibold text-green-600'>{c.avgGrade}%</span>
                </div>
                <div className='flex items-center justify-between text-sm mt-1'>
                  <span className='text-gray-600'>📅 Average Attendance</span>
                  <span className='font-semibold text-blue-600'>{c.avgAttendance}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {classes.length > 0 && (
        <div className='mt-8 grid grid-cols-1 md:grid-cols-4 gap-6'>
          <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp' style={{animationDelay: '0.4s'}}>
            <div className='flex items-center'>
              <div className='w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl mr-4'>
                🏫
              </div>
              <div>
                <p className='text-sm font-medium text-gray-600'>Total Classes</p>
                <p className='text-2xl font-bold text-gray-900'>{classes.length}</p>
              </div>
            </div>
          </div>
          
          <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp' style={{animationDelay: '0.5s'}}>
            <div className='flex items-center'>
              <div className='w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl mr-4'>
                👥
              </div>
              <div>
                <p className='text-sm font-medium text-gray-600'>Total Students</p>
                <p className='text-2xl font-bold text-gray-900'>{classes.reduce((sum, c) => sum + c.studentsCount, 0)}</p>
              </div>
            </div>
          </div>
          
          <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp' style={{animationDelay: '0.6s'}}>
            <div className='flex items-center'>
              <div className='w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xl mr-4'>
                📚
              </div>
              <div>
                <p className='text-sm font-medium text-gray-600'>Subjects</p>
                <p className='text-2xl font-bold text-gray-900'>{new Set(classes.map(c => c.subject)).size}</p>
              </div>
            </div>
          </div>
          
          <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp' style={{animationDelay: '0.7s'}}>
            <div className='flex items-center'>
              <div className='w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl mr-4'>
                🏠
              </div>
              <div>
                <p className='text-sm font-medium text-gray-600'>Rooms</p>
                <p className='text-2xl font-bold text-gray-900'>{new Set(classes.map(c => c.room)).size}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


