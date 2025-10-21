import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { teacherAPI } from '../../../api/teacher';

export default function Schedule() {
  const { teacherId } = useParams();
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        console.log('📅 Fetching schedule for teacher:', teacherId);
        setLoading(true);
        const response = await teacherAPI.getSchedule(teacherId);
        console.log('✅ Schedule data received:', response.data);
        setSchedule(response.data.data.schedule || {});
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching schedule:', err);
        setError(err.response?.data?.error || err.message || 'Failed to load schedule');
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchSchedule();
    }
  }, [teacherId]);

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

  // Convert API data to the format expected by the UI
  const scheduleData = Object.keys(schedule).map(day => ({
    day,
    slots: schedule[day].map(slot => ({
      id: slot.id,
      time: `${slot.startTime} - ${slot.endTime}`,
      class: slot.subject || 'Class',
      room: slot.room || 'Room TBD',
      subject: slot.subject,
      status: slot.status,
      student: slot.student
    }))
  }));

  // Calculate stats from actual data
  const totalClasses = scheduleData.reduce((total, day) => total + day.slots.length, 0);
  const uniqueRooms = new Set(scheduleData.flatMap(day => day.slots.map(slot => slot.room))).size;

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInDown">🗓️ My Teaching Schedule</h1>
      
      {scheduleData.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">📅</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Schedule Found</h2>
          <p className="text-gray-600">Your teaching schedule will appear here once it's been set up.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {scheduleData.map((daySchedule, dayIndex) => (
            <div key={dayIndex} className="bg-white rounded-xl shadow-lg overflow-hidden animate-slideInUp" style={{animationDelay: `${dayIndex * 0.1}s`}}>
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
                <h2 className="text-xl font-semibold">{daySchedule.day}</h2>
                <p className="text-blue-100 text-sm">{daySchedule.slots.length} class{daySchedule.slots.length !== 1 ? 'es' : ''}</p>
              </div>
              
              <div className="p-6">
                <div className="grid gap-4">
                  {daySchedule.slots.map((slot, slotIndex) => (
                    <div key={slot.id || slotIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {slot.time}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{slot.subject || slot.class}</h3>
                          <p className="text-sm text-gray-600">{slot.room}</p>
                          {slot.student && (
                            <p className="text-xs text-gray-500">Student: {slot.student.name}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`w-3 h-3 rounded-full animate-pulse ${
                          slot.status === 'scheduled' ? 'bg-green-500' : 
                          slot.status === 'completed' ? 'bg-blue-500' : 
                          'bg-gray-400'
                        }`}></div>
                        <p className="text-xs text-gray-500 mt-1 capitalize">{slot.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {scheduleData.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.6s'}}>
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
          
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.7s'}}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
                📅
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Days</p>
                <p className="text-2xl font-bold text-gray-900">{scheduleData.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.8s'}}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
                🏫
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Different Rooms</p>
                <p className="text-2xl font-bold text-gray-900">{uniqueRooms}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


