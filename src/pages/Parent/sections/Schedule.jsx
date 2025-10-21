import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { parentAPI } from '../../../api/parent';

export default function Schedule() {
  const outletContext = useOutletContext();
  const { selectedChild: child } = outletContext || {};
  const { childId, parentId } = useParams();
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchSchedule = async () => {
      if (!parentId || !childId) {
        setError('Missing parent or child ID');
        setLoading(false);
        return;
      }

      try {
        console.log('📅 Fetching schedule for parent:', parentId, 'child:', childId);
        setLoading(true);
        const response = await parentAPI.getChildSchedule(parentId, childId);
        console.log('✅ Schedule data received:', response.data);
        
        let scheduleData = response.data.data.schedule || {};
        
        // If schedule is an array, group it by day
        if (Array.isArray(scheduleData)) {
          console.log('📋 Schedule is array, grouping by day...');
          const grouped = {};
          const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
          
          // Initialize all days
          daysOrder.forEach(day => {
            grouped[day] = [];
          });
          
          // Group by day
          scheduleData.forEach(item => {
            const dayKey = item.day ? 
              item.day.charAt(0).toUpperCase() + item.day.slice(1).toLowerCase() 
              : null;
            
            if (dayKey && grouped[dayKey]) {
              grouped[dayKey].push(item);
            }
          });
          
          scheduleData = grouped;
          console.log('✅ Grouped schedule:', grouped);
        }
        
        setSchedule(scheduleData);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching schedule:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load schedule');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [parentId, childId]);

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

  console.log('📊 Schedule data:', schedule);
  console.log('📊 Schedule type:', typeof schedule);
  console.log('📊 Schedule keys:', Object.keys(schedule));
  console.log('📊 Schedule JSON:', JSON.stringify(schedule, null, 2));

  // Calculate stats with safety checks
  const allClasses = schedule && typeof schedule === 'object' 
    ? Object.values(schedule).flat().filter(Boolean)
    : [];
  
  const totalClasses = allClasses.length;
  const uniqueSubjects = totalClasses > 0 
    ? [...new Set(allClasses.map(s => s?.subject).filter(Boolean))].length 
    : 0;
  
  const totalHours = allClasses.reduce((total, session) => {
    if (session?.startTime && session?.endTime) {
      try {
        const [startHour, startMin] = session.startTime.split(':').map(Number);
        const [endHour, endMin] = session.endTime.split(':').map(Number);
        const hours = (endHour * 60 + endMin - startHour * 60 - startMin) / 60;
        return total + (isNaN(hours) ? 0 : hours);
      } catch (e) {
        return total;
      }
    }
    return total;
  }, 0).toFixed(1);

  console.log('📊 Stats - Total classes:', totalClasses, 'Subjects:', uniqueSubjects, 'Hours:', totalHours);

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInDown">
        📅 {child?.name || 'Child'}'s Class Schedule
      </h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-gray-800">{totalClasses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📖</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Subjects</p>
              <p className="text-2xl font-bold text-gray-800">{uniqueSubjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏰</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Weekly Hours</p>
              <p className="text-2xl font-bold text-gray-800">{totalHours}h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Table - EXACT SAME AS STUDENT */}
      {totalClasses === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center animate-slideInUp" style={{animationDelay: '0.4s'}}>
          <div className="text-6xl mb-4">📅</div>
          <p className="text-gray-500 text-lg">No schedule available yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-slideInUp" style={{animationDelay: '0.4s'}}>
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
            <h2 className="text-xl font-semibold">📚 Weekly Schedule ({totalClasses} Classes)</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Day</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Class</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Room</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                  const dayClasses = schedule[day] || [];
                  console.log(`Table rendering ${day}:`, dayClasses, `(length: ${dayClasses.length})`);
                  
                  if (dayClasses.length === 0) return null;
                  
                  return dayClasses.map((session, index) => {
                    console.log(`  Row ${index}:`, session);
                    
                    return (
                      <tr key={`${day}-${index}`} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          {/* Show day name only for first class of the day */}
                          {index === 0 ? (
                            <span className="font-semibold text-gray-800">{day}</span>
                          ) : (
                            <span className="text-gray-400 text-sm">↳</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-800 font-medium">{session?.subject || 'N/A'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-600">{session?.startTime || 'N/A'} - {session?.endTime || 'N/A'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-600">{session?.room || 'N/A'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            session?.status === 'Completed' ? 'bg-gray-100 text-gray-600' :
                            session?.status === 'Scheduled' ? 'bg-green-100 text-green-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {session?.status || 'Scheduled'}
                          </span>
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

