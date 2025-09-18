import React from 'react'

export default function Attendance() {
  const [classes, setClasses] = React.useState([
    { name: '1A', students: [
      { id: 'S001', name: 'Alice Martin', present: true },
      { id: 'S002', name: 'Bob Karim', present: false },
    ]},
    { name: '1B', students: [
      { id: 'S010', name: 'David Ben', present: true },
      { id: 'S011', name: 'Eva Noor', present: true },
    ]},
  ])

  const [activeClass, setActiveClass] = React.useState('1A')

  const togglePresence = (className, studentId) => {
    setClasses((cls) => cls.map(c => c.name === className ? {
      ...c,
      students: c.students.map(s => s.id === studentId ? { ...s, present: !s.present } : s)
    } : c))
  }

  const current = classes.find(c => c.name === activeClass)

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>Attendance</h2>

      <div className='flex gap-2 mb-4 flex-wrap'>
        {classes.map((c) => (
          <button key={c.name} onClick={() => setActiveClass(c.name)}
            className={`px-3 py-1 rounded-md border ${activeClass === c.name ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-blue-900 border-blue-900'}`}>
            {c.name}
          </button>
        ))}
      </div>

      <div className='overflow-x-auto bg-white rounded-xl shadow'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-blue-900 text-white'>
              <th className='p-3 text-left'>Student</th>
              <th className='p-3 text-left'>ID</th>
              <th className='p-3 text-left'>Status</th>
              <th className='p-3 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {current?.students.map((s, idx) => (
              <tr key={s.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-100 transition`}>
                <td className='p-3 font-semibold'>{s.name}</td>
                <td className='p-3'>{s.id}</td>
                <td className='p-3'>
                  <span className={`px-2 py-1 rounded ${s.present ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>
                    {s.present ? 'Present' : 'Absent'}
                  </span>
                </td>
                <td className='p-3'>
                  <button onClick={() => togglePresence(current.name, s.id)} className='px-3 py-1 rounded bg-blue-900 text-white'>Mark {s.present ? 'Absent' : 'Present'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


