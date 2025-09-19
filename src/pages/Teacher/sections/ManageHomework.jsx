import React from 'react'

export default function ManageHomework() {
  const [classes, setClasses] = React.useState([
    { name: '1A', homework: [
      { id: 'H001', title: 'Chapter 1 Exercises', description: 'Complete exercises 1-10 from Chapter 1', startDate: '2025-01-15', dueDate: '2025-01-20', status: 'active' },
      { id: 'H002', title: 'Math Problems', description: 'Solve problems 1-15 from page 45', startDate: '2025-01-18', dueDate: '2025-01-25', status: 'active' },
    ]},
    { name: '1B', homework: [
      { id: 'H010', title: 'Read pages 20-30', description: 'Read and summarize the main points', startDate: '2025-01-16', dueDate: '2025-01-22', status: 'active' },
      { id: 'H011', title: 'Science Project', description: 'Research and create a presentation about photosynthesis', startDate: '2025-01-20', dueDate: '2025-01-30', status: 'upcoming' },
    ]},
  ])

  const [activeClass, setActiveClass] = React.useState('1A')
  const [showAdd, setShowAdd] = React.useState(false)
  const [showEdit, setShowEdit] = React.useState(false)
  const [showDelete, setShowDelete] = React.useState(false)
  const [selectedHwId, setSelectedHwId] = React.useState('')
  const [form, setForm] = React.useState({ id: '', title: '', description: '', startDate: '', dueDate: '' })
  const [editForm, setEditForm] = React.useState({ id: '', title: '', description: '', startDate: '', dueDate: '' })

  const addHw = () => {
    setForm({ id: '', title: '', description: '', startDate: '', dueDate: '' })
    setShowAdd(true)
  }

  const editHw = (className, hwId) => {
    const hw = classes.find(c => c.name === className)?.homework.find(h => h.id === hwId)
    if (!hw) return
    setEditForm({ id: hw.id, title: hw.title, description: hw.description, startDate: hw.startDate, dueDate: hw.dueDate })
    setShowEdit(true)
  }

  const deleteHw = (className, hwId) => {
    setSelectedHwId(hwId)
    setShowDelete(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.id || !form.title || !form.description || !form.startDate || !form.dueDate) return
    
    const status = new Date(form.startDate) > new Date() ? 'upcoming' : 'active'
    
    setClasses((cls) => cls.map(c => c.name === activeClass ? {
      ...c,
      homework: [...c.homework, { ...form, status }]
    } : c))
    setForm({ id: '', title: '', description: '', startDate: '', dueDate: '' })
    setShowAdd(false)
  }

  const submitEdit = (e) => {
    e.preventDefault()
    if (!editForm.id || !editForm.title || !editForm.description || !editForm.startDate || !editForm.dueDate) return
    
    const status = new Date(editForm.startDate) > new Date() ? 'upcoming' : 'active'
    
    setClasses((cls) => cls.map(c => c.name === activeClass ? {
      ...c,
      homework: c.homework.map(h => h.id === editForm.id ? { ...h, ...editForm, status } : h)
    } : c))
    setShowEdit(false)
  }

  const confirmDelete = () => {
    setClasses((cls) => cls.map(c => c.name === activeClass ? {
      ...c,
      homework: c.homework.filter(h => h.id !== selectedHwId)
    } : c))
    setShowDelete(false)
    setSelectedHwId('')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDaysUntilDue = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const current = classes.find(c => c.name === activeClass)

  return (
    <div className='p-6 animate-fadeIn'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6 animate-slideInDown'>Manage Homework</h1>

      <div className='flex gap-2 mb-6 flex-wrap'>
        {classes.map((c, index) => (
          <button key={c.name} onClick={() => setActiveClass(c.name)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 animate-slideInUp ${
              activeClass === c.name 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
            }`}
            style={{animationDelay: `${index * 0.1}s`}}>
            Class {c.name}
          </button>
        ))}
      </div>

      <div className='bg-white rounded-xl shadow-lg overflow-hidden animate-slideInUp' style={{animationDelay: '0.3s'}}>
        <div className='bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>Class {activeClass} - Homework Assignments</h2>
            <button onClick={addHw} className='bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors'>
              + Add Homework
            </button>
          </div>
        </div>

        <div className='p-6'>
          <div className='grid gap-4'>
            {current?.homework.map((h, idx) => {
              const daysUntilDue = getDaysUntilDue(h.dueDate)
              return (
                <div key={h.id} className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'>
                  <div className='flex items-start justify-between mb-3'>
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-gray-800 mb-1'>{h.title}</h3>
                      <p className='text-gray-600 text-sm mb-2'>{h.description}</p>
                      <div className='flex items-center gap-4 text-sm text-gray-500'>
                        <span>📅 Start: {new Date(h.startDate).toLocaleDateString()}</span>
                        <span>⏰ Due: {new Date(h.dueDate).toLocaleDateString()}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(h.status)}`}>
                          {h.status}
                        </span>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='text-right mr-4'>
                        <div className='text-sm text-gray-500'>Days left</div>
                        <div className={`text-lg font-bold ${daysUntilDue < 0 ? 'text-red-600' : daysUntilDue <= 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {daysUntilDue < 0 ? 'Overdue' : daysUntilDue}
                        </div>
                      </div>
                  <div className='flex gap-2'>
                        <button onClick={() => editHw(current.name, h.id)} className='px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm'>
                          Edit
                        </button>
                        <button onClick={() => deleteHw(current.name, h.id)} className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm'>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className='flex items-center justify-between text-xs text-gray-500'>
                    <span>ID: {h.id}</span>
                    <span>Duration: {Math.ceil((new Date(h.dueDate) - new Date(h.startDate)) / (1000 * 60 * 60 * 24))} days</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Add Homework Modal */}
      {showAdd && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-full max-w-2xl mx-4'>
            <h3 className='text-xl font-semibold mb-4'>Add Homework Assignment</h3>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Homework ID</label>
                  <input name='id' value={form.id} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
            </div>
            <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                  <input name='title' value={form.title} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                </div>
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                <textarea name='description' value={form.description} onChange={handleChange} rows={3} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Start Date</label>
                  <input type='date' name='startDate' value={form.startDate} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
            </div>
            <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Due Date</label>
                  <input type='date' name='dueDate' value={form.dueDate} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                </div>
            </div>
              
              <div className='flex justify-end gap-2 pt-4'>
                <button type='button' onClick={()=>setShowAdd(false)} className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
                  Cancel
                </button>
                <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                  Add Homework
                </button>
            </div>
          </form>
          </div>
        </div>
      )}

      {/* Edit Homework Modal */}
      {showEdit && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-full max-w-2xl mx-4'>
            <h3 className='text-xl font-semibold mb-4'>Edit Homework Assignment</h3>
            <form onSubmit={submitEdit} className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Homework ID</label>
                  <input name='id' value={editForm.id} readOnly className='w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100' />
            </div>
            <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                  <input name='title' value={editForm.title} onChange={(e)=>setEditForm({...editForm,title:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                </div>
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                <textarea name='description' value={editForm.description} onChange={(e)=>setEditForm({...editForm,description:e.target.value})} rows={3} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Start Date</label>
                  <input type='date' name='startDate' value={editForm.startDate} onChange={(e)=>setEditForm({...editForm,startDate:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
            </div>
            <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Due Date</label>
                  <input type='date' name='dueDate' value={editForm.dueDate} onChange={(e)=>setEditForm({...editForm,dueDate:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                </div>
            </div>
              
              <div className='flex justify-end gap-2 pt-4'>
                <button type='button' onClick={()=>setShowEdit(false)} className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
                  Cancel
                </button>
                <button type='submit' className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'>
                  Save Changes
                </button>
            </div>
          </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDelete && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-full max-w-md mx-4'>
            <h3 className='text-xl font-semibold mb-4'>Delete Homework</h3>
            <p className='text-gray-700 mb-6'>Are you sure you want to delete this homework assignment? This action cannot be undone.</p>
          <div className='flex justify-end gap-2'>
              <button onClick={()=>setShowDelete(false)} className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
                Cancel
              </button>
              <button onClick={confirmDelete} className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'>
                Delete
              </button>
          </div>
          </div>
        </div>
      )}
    </div>
  )
}




