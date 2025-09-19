import React from "react";

export default function ClassSched() {
  // Example weekly timetable data
  const timetable = {
    Monday: [
      { start: "08:00", end: "10:00", subject: "Mathematics" },
      { start: "10:00", end: "10:30", subject: "Break" },
      { start: "10:30", end: "12:00", subject: "Physics" },
      { start: "12:00", end: "13:00", subject: "Lunch" },
      { start: "13:00", end: "16:00", subject: "Computer Science" },
    ],
    Tuesday: [
      { start: "08:30", end: "10:00", subject: "Algorithms" },
      { start: "10:00", end: "10:30", subject: "Break" },
      { start: "10:30", end: "12:30", subject: "English" },
      { start: "13:30", end: "15:30", subject: "Databases" },
    ],
    Wednesday: [
      { start: "08:00", end: "10:00", subject: "Statistics" },
      { start: "10:00", end: "10:30", subject: "Break" },
      { start: "10:30", end: "12:00", subject: "Operating Systems" },
      { start: "13:00", end: "14:30", subject: "Networks" },
    ],
  };

  // Flatten all sessions into one array with day information
  const allSessions = [];
  Object.entries(timetable).forEach(([day, sessions]) => {
    sessions.forEach(session => {
      allSessions.push({
        ...session,
        day,
        isBreak: session.subject === "Break" || session.subject === "Lunch"
      });
    });
  });

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
              <p className="text-2xl font-bold text-gray-900">12</p>
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
              <p className="text-2xl font-bold text-gray-900">24</p>
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
              <p className="text-2xl font-bold text-gray-900">6</p>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Schedule Table */}
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
              {allSessions.map((session, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                  <td className="p-4 font-semibold text-gray-800">{session.day}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      session.isBreak ? 'bg-gray-200 text-gray-600' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {session.start} – {session.end}
                    </span>
                  </td>
                  <td className={`p-4 font-semibold ${
                    session.isBreak ? 'text-gray-600 italic' : 'text-gray-800'
                  }`}>
                    {session.subject}
                  </td>
                  <td className="p-4 text-gray-600">
                    {session.isBreak ? '-' : 'Room 101'}
                  </td>
                  <td className="p-4 text-center">
                    <div className={`w-3 h-3 rounded-full mx-auto ${
                      session.isBreak ? 'bg-gray-400' : 'bg-green-500 animate-pulse'
                    }`}></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
