import React from 'react'

export default function Schedule() {
  const schedule = [
    { day: 'Monday', classes: '2A, 3B', time: '08:00 – 12:00' },
    { day: 'Tuesday', classes: '1C, 2C', time: '10:00 – 14:00' },
    { day: 'Wednesday', classes: '4A', time: '09:00 – 11:00' },
    { day: 'Thursday', classes: '3A, 3C', time: '13:00 – 16:00' },
    { day: 'Friday', classes: '2B', time: '08:30 – 10:30' },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🗓️ My Teaching Schedule</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-md rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-3 text-left">Day</th>
              <th className="p-3 text-left">Classes</th>
              <th className="p-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-100 transition`}>
                <td className="p-3 font-semibold">{row.day}</td>
                <td className="p-3">{row.classes}</td>
                <td className="p-3">{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


