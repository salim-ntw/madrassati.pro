import React from 'react'

export default function Schedule() {
  const schedule = [
    { 
      day: 'Monday', 
      slots: [
        { time: '08:00 - 09:00', class: '1A', room: 'Room 101' },
        { time: '09:00 - 10:00', class: '2B', room: 'Room 205' },
        { time: '10:00 - 11:00', class: '3A', room: 'Room 301' },
        { time: '11:00 - 12:00', class: '1C', room: 'Room 103' }
      ]
    },
    { 
      day: 'Tuesday', 
      slots: [
        { time: '08:00 - 09:00', class: '2A', room: 'Room 201' },
        { time: '09:00 - 10:00', class: '3B', room: 'Room 302' },
        { time: '10:00 - 11:00', class: '1B', room: 'Room 102' },
        { time: '11:00 - 12:00', class: '2C', room: 'Room 203' }
      ]
    },
    { 
      day: 'Wednesday', 
      slots: [
        { time: '08:00 - 09:00', class: '3C', room: 'Room 303' },
        { time: '09:00 - 10:00', class: '1A', room: 'Room 101' },
        { time: '10:00 - 11:00', class: '2B', room: 'Room 205' }
      ]
    },
    { 
      day: 'Thursday', 
      slots: [
        { time: '08:00 - 09:00', class: '1B', room: 'Room 102' },
        { time: '09:00 - 10:00', class: '3A', room: 'Room 301' },
        { time: '10:00 - 11:00', class: '2A', room: 'Room 201' },
        { time: '11:00 - 12:00', class: '1C', room: 'Room 103' }
      ]
    },
    { 
      day: 'Friday', 
      slots: [
        { time: '08:00 - 09:00', class: '2C', room: 'Room 203' },
        { time: '09:00 - 10:00', class: '3B', room: 'Room 302' },
        { time: '10:00 - 11:00', class: '1A', room: 'Room 101' }
      ]
    }
  ]

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInDown">🗓️ My Teaching Schedule</h1>
      
      <div className="space-y-6">
        {schedule.map((daySchedule, dayIndex) => (
          <div key={dayIndex} className="bg-white rounded-xl shadow-lg overflow-hidden animate-slideInUp" style={{animationDelay: `${dayIndex * 0.1}s`}}>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
              <h2 className="text-xl font-semibold">{daySchedule.day}</h2>
            </div>
            
            <div className="p-6">
              <div className="grid gap-4">
                {daySchedule.slots.map((slot, slotIndex) => (
                  <div key={slotIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {slot.time}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Class {slot.class}</h3>
                        <p className="text-sm text-gray-600">{slot.room}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.6s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              📚
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-gray-900">20</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp" style={{animationDelay: '0.7s'}}>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl mr-4">
              ⏰
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Hours per Week</p>
              <p className="text-2xl font-bold text-gray-900">20</p>
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
              <p className="text-2xl font-bold text-gray-900">6</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


