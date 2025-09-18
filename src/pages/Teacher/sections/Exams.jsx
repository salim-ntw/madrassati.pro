import React from 'react'

export default function Exams() {
  const [exams, setExams] = React.useState([
    { id: 'E001', date: '2025-09-25', time: '10:00 - 11:30', className: '1A', location: 'Room A1' },
  ])

  const [form, setForm] = React.useState({ date: '', time: '', className: '', location: '' })
  const [editingId, setEditingId] = React.useState(null)
  const [editForm, setEditForm] = React.useState({ date: '', time: '', className: '', location: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const addExam = (e) => {
    e.preventDefault()
    if (!form.date || !form.time || !form.className || !form.location) return
    const id = 'E' + String(Math.floor(Math.random()*10000)).padStart(3,'0')
    setExams((ex) => [...ex, { id, ...form }])
    setForm({ date: '', time: '', className: '', location: '' })
  }

  const deleteExam = (id) => {
    setExams((ex) => ex.filter((e) => e.id !== id))
  }

  const startEdit = (ex) => {
    setEditingId(ex.id)
    setEditForm({ date: ex.date, time: ex.time, className: ex.className, location: ex.location })
  }

  const saveEdit = () => {
    setExams((list) => list.map((e) => e.id === editingId ? { ...e, ...editForm } : e))
    setEditingId(null)
  }

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>Exams</h2>

      <div className='mb-6 bg-white p-6 rounded-lg shadow'>
        <h3 className='text-lg font-semibold mb-3'>Add Exam</h3>
        <form onSubmit={addExam} className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Date</label>
            <input type='date' name='date' value={form.date} onChange={handleChange} className='w-full border rounded px-3 py-2' />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Time</label>
            <input type='text' name='time' placeholder='HH:MM - HH:MM' value={form.time} onChange={handleChange} className='w-full border rounded px-3 py-2' />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Class</label>
            <input type='text' name='className' value={form.className} onChange={handleChange} className='w-full border rounded px-3 py-2' />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Location</label>
            <input type='text' name='location' value={form.location} onChange={handleChange} className='w-full border rounded px-3 py-2' />
          </div>
          <div className='md:col-span-4 flex justify-end'>
            <button type='submit' className='px-4 py-2 rounded-md bg-blue-900 text-white'>Add</button>
          </div>
        </form>
      </div>

      <div className='overflow-x-auto bg-white rounded-xl shadow'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-red-600 text-white'>
              <th className='p-3 text-left'>ID</th>
              <th className='p-3 text-left'>Date</th>
              <th className='p-3 text-left'>Time</th>
              <th className='p-3 text-left'>Class</th>
              <th className='p-3 text-left'>Location</th>
              <th className='p-3 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((ex, idx) => (
              <tr key={ex.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-red-100 transition`}>
                <td className='p-3 font-semibold'>{ex.id}</td>
                <td className='p-3'>
                  {editingId === ex.id ? (
                    <input type='date' className='border rounded px-2 py-1' value={editForm.date} onChange={(e)=>setEditForm({...editForm,date:e.target.value})} />
                  ) : ex.date}
                </td>
                <td className='p-3'>
                  {editingId === ex.id ? (
                    <input type='text' className='border rounded px-2 py-1' value={editForm.time} onChange={(e)=>setEditForm({...editForm,time:e.target.value})} />
                  ) : ex.time}
                </td>
                <td className='p-3'>
                  {editingId === ex.id ? (
                    <input type='text' className='border rounded px-2 py-1' value={editForm.className} onChange={(e)=>setEditForm({...editForm,className:e.target.value})} />
                  ) : ex.className}
                </td>
                <td className='p-3'>
                  {editingId === ex.id ? (
                    <input type='text' className='border rounded px-2 py-1' value={editForm.location} onChange={(e)=>setEditForm({...editForm,location:e.target.value})} />
                  ) : ex.location}
                </td>
                <td className='p-3'>
                  {editingId === ex.id ? (
                    <div className='flex gap-2'>
                      <button onClick={saveEdit} className='px-3 py-1 rounded bg-green-600 text-white'>Save</button>
                      <button onClick={()=>setEditingId(null)} className='px-3 py-1 rounded bg-gray-400 text-white'>Cancel</button>
                    </div>
                  ) : (
                    <div className='flex gap-2'>
                      <button onClick={()=>startEdit(ex)} className='px-3 py-1 rounded bg-yellow-500 text-white'>Edit</button>
                      <button onClick={() => deleteExam(ex.id)} className='px-3 py-1 rounded bg-red-600 text-white'>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}



