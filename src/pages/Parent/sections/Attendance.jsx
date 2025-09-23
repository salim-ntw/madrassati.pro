import React from 'react'

export default function Attendance({ child }) {
  const [records] = React.useState([
    { id: 1, date: '2025-01-20', time: '08:00 - 09:00', subject: 'Math', status: 'Present' },
    { id: 2, date: '2025-01-20', time: '09:00 - 10:00', subject: 'Science', status: 'Absent' },
    { id: 3, date: '2025-01-21', time: '08:00 - 09:00', subject: 'Arabic', status: 'Present' },
  ])

  return (
    <div className='p-6 bg-white rounded-xl shadow-lg animate-fadeIn'>
      <h2 className='text-2xl font-bold text-gray-800 mb-4 animate-slideInDown'>Attendance · {child?.name}</h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full border border-gray-200 rounded-lg overflow-hidden'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='text-left px-4 py-2 text-sm font-semibold text-gray-700 border-b'>Date</th>
              <th className='text-left px-4 py-2 text-sm font-semibold text-gray-700 border-b'>Time</th>
              <th className='text-left px-4 py-2 text-sm font-semibold text-gray-700 border-b'>Subject</th>
              <th className='text-left px-4 py-2 text-sm font-semibold text-gray-700 border-b'>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className='hover:bg-gray-50'>
                <td className='px-4 py-2 border-b'>{r.date}</td>
                <td className='px-4 py-2 border-b'>{r.time}</td>
                <td className='px-4 py-2 border-b'>{r.subject}</td>
                <td className='px-4 py-2 border-b'>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${r.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}



