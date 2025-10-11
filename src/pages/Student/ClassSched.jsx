import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { studentAPI } from "../../api/student";

export default function ClassSched() {
  const { id: studentId } = useParams();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        console.log('📅 Fetching schedule for student:', studentId);
        setLoading(true);
        const response = await studentAPI.getSchedule(studentId);
        console.log('✅ Schedule data received:', response.data);
        setSchedule(response.data.data.schedule || []);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching schedule:', err);
        setError(err.message || 'Failed to load schedule');
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchSchedule();
    }
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading schedule...</p>
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
  const totalClasses = schedule.length;
  const uniqueSubjects = [...new Set(schedule.map(s => s.subject))].length;
  // Calculate total hours (estimate 1.5 hours per class)
  const totalHours = Math.round(totalClasses * 1.5);

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInDown">📅 My Class Schedule</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              📚
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-gray-900">{totalClasses}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              ⏰
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Hours per Week</p>
              <p className="text-2xl font-bold text-gray-900">{totalHours}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              🏫
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Subjects</p>
              <p className="text-2xl font-bold text-gray-900">{uniqueSubjects}</p>
            </div>
          </div>
        </div>
      </div>

      {schedule.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center animate-slideInUp" style={{animationDelay: '0.4s'}}>
          <div className="text-6xl mb-4">📅</div>
          <p className="text-gray-500 text-lg">No schedule available yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-slideInUp" style={{animationDelay: '0.4s'}}>
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
            <h2 className="text-xl font-semibold">Weekly Class Schedule</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-700">Day</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Time</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Subject</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Room</th>
                  <th className="p-4 text-center font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((session, index) => (
                  <tr key={session._id || index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                    <td className="p-4 font-semibold text-gray-800">{session.day}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {session.startTime} – {session.endTime}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-gray-800">
                      {session.subject}
                    </td>
                    <td className="p-4 text-gray-600">
                      {session.room}
                    </td>
                    <td className="p-4 text-center">
                      <div className={`w-3 h-3 rounded-full mx-auto ${
                        session.status === 'scheduled' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                      }`}></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}