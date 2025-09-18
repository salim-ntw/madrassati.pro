import React from 'react'

export default function Classes() {
  const [classes, setClasses] = React.useState([
    { name: '1A', students: 28 },
    { name: '1B', students: 30 },
    { name: '2A', students: 27 },
    { name: '3B', students: 26 },
  ])

  const startEdit = (idx) => {
    const name = prompt('New class name:', classes[idx].name)
    if (!name) return
    setClasses((list) => list.map((c, i) => (i === idx ? { ...c, name } : c)))
  }

  const deleteClass = (idx) => {
    if (!confirm('Delete this class?')) return
    setClasses((list) => list.filter((_, i) => i !== idx))
  }

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-6'>My Classes</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {classes.map((c, idx) => (
          <div key={c.name} className='bg-white p-5 rounded-lg shadow flex items-center justify-between'>
            <div>
              <div className='text-lg font-semibold'>Class {c.name}</div>
              <div className='text-gray-600'>{c.students} students</div>
            </div>
            <div className='flex gap-2'>
              <button onClick={() => startEdit(idx)} className='px-3 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600'>Edit</button>
              <button onClick={() => deleteClass(idx)} className='px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700'>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


