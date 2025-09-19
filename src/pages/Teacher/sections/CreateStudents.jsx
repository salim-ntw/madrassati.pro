import React from 'react'

export default function CreateStudents() {
  const [classes, setClasses] = React.useState([
    { name: '1A', students: [
      { id: 'S001', fullName: 'Alice Martin', email: 'alice@example.com', grade: 'A', attendance: '95%' },
      { id: 'S002', fullName: 'Bob Karim', email: 'bob@example.com', grade: 'B+', attendance: '88%' },
    ]},
    { name: '1B', students: [
      { id: 'S010', fullName: 'David Ben', email: 'david@example.com', grade: 'A-', attendance: '92%' },
      { id: 'S011', fullName: 'Eva Noor', email: 'eva@example.com', grade: 'B', attendance: '85%' },
    ]},
  ])

  const [showAdd, setShowAdd] = React.useState(false)
  const [showEdit, setShowEdit] = React.useState(false)
  const [showDelete, setShowDelete] = React.useState(false)
  const [selectedStudent, setSelectedStudent] = React.useState(null)
  const [form, setForm] = React.useState({ fullName: '', id: '', className: '', email: '', password: '' })
  const [editForm, setEditForm] = React.useState({ id: '', fullName: '', email: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleGeneratePassword = () => {
    const pwd = Math.random().toString(36).slice(-10)
    setForm((f) => ({ ...f, password: pwd }))
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (!form.fullName || !form.id || !form.className || !form.email || !form.password) return
    setClasses((cls) => cls.map(c => c.name === form.className ? { ...c, students: [...c.students, { id: form.id, fullName: form.fullName, email: form.email, grade: 'N/A', attendance: 'N/A' }] } : c))
    setForm({ fullName: '', id: '', className: '', email: '', password: '' })
    setShowAdd(false)
  }

  const handleDelete = (student) => {
    setSelectedStudent(student)
    setShowDelete(true)
  }

  const confirmDelete = () => {
    setClasses((cls) => cls.map(c => c.name === selectedStudent.className ? {
      ...c,
      students: c.students.filter(st => st.id !== selectedStudent.id)
    } : c))
    setShowDelete(false)
    setSelectedStudent(null)
  }

  const startEdit = (student) => {
    setEditForm({ id: student.id, fullName: student.fullName, email: student.email })
    setShowEdit(true)
  }

  const saveEdit = (e) => {
    e.preventDefault()
    if (!editForm.fullName || !editForm.email) return
    
    setClasses((cls) => cls.map(c => c.name === selectedStudent.className ? {
      ...c,
      students: c.students.map(st => st.id === editForm.id ? { ...st, fullName: editForm.fullName, email: editForm.email } : st)
    } : c))
    setShowEdit(false)
    setSelectedStudent(null)
  }

  const getGradeColor = (grade) => {
    if (grade === 'A' || grade === 'A-') return 'text-green-600 bg-green-100'
    if (grade === 'B+' || grade === 'B') return 'text-blue-600 bg-blue-100'
    if (grade === 'B-' || grade === 'C+') return 'text-yellow-600 bg-yellow-100'
    return 'text-gray-600 bg-gray-100'
  }

  const getAttendanceColor = (attendance) => {
    const percentage = parseInt(attendance)
    if (percentage >= 95) return 'text-green-600 bg-green-100'
    if (percentage >= 85) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className='p-6 animate-fadeIn'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-3xl font-bold text-gray-800 animate-slideInDown'>Students Management</h1>
        <button onClick={() => setShowAdd(true)} className='px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium'>
          + Add Student
        </button>
      </div>

      <div className='space-y-6'>
        {classes.map((c) => (
          <div key={c.name} className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4'>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl font-semibold'>Class {c.name}</h2>
                <span className='text-sm bg-white/20 px-3 py-1 rounded-full'>{c.students.length} students</span>
              </div>
            </div>
            
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='p-4 text-left font-semibold text-gray-700'>ID</th>
                    <th className='p-4 text-left font-semibold text-gray-700'>Full Name</th>
                    <th className='p-4 text-left font-semibold text-gray-700'>Email</th>
                    <th className='p-4 text-center font-semibold text-gray-700'>Grade</th>
                    <th className='p-4 text-center font-semibold text-gray-700'>Attendance</th>
                    <th className='p-4 text-center font-semibold text-gray-700'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {c.students.map((st, idx) => (
                    <tr key={st.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                      <td className='p-4 font-semibold text-gray-800'>{st.id}</td>
                      <td className='p-4 text-gray-800'>{st.fullName}</td>
                      <td className='p-4 text-gray-600'>{st.email}</td>
                      <td className='p-4 text-center'>
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getGradeColor(st.grade)}`}>
                          {st.grade}
                        </span>
                      </td>
                      <td className='p-4 text-center'>
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getAttendanceColor(st.attendance)}`}>
                          {st.attendance}
                        </span>
                      </td>
                      <td className='p-4'>
                        <div className='flex gap-2 justify-center'>
                          <button 
                            onClick={() => startEdit({...st, className: c.name})} 
                            className='px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm'
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete({...st, className: c.name})} 
                            className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm'
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Add Student Modal */}
      {showAdd && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-full max-w-2xl mx-4'>
            <h3 className='text-xl font-semibold mb-4'>Add New Student</h3>
            <form onSubmit={handleAdd} className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                  <input name='fullName' value={form.fullName} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Student ID</label>
                  <input name='id' value={form.id} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                </div>
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Class</label>
                  <select name='className' value={form.className} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required>
                    <option value=''>Select Class</option>
                    <option value='1A'>Class 1A</option>
                    <option value='1B'>Class 1B</option>
                    <option value='2A'>Class 2A</option>
                    <option value='3B'>Class 3B</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                  <input name='email' type='email' value={form.email} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                </div>
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                <div className='flex gap-2'>
                  <input name='password' value={form.password} onChange={handleChange} className='flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                  <button type='button' onClick={handleGeneratePassword} className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
                    Generate
                  </button>
                </div>
              </div>
              
              <div className='flex justify-end gap-2 pt-4'>
                <button type='button' onClick={()=>setShowAdd(false)} className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
                  Cancel
                </button>
                <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEdit && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-full max-w-lg mx-4'>
            <h3 className='text-xl font-semibold mb-4'>Edit Student</h3>
            <form onSubmit={saveEdit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Student ID</label>
                <input value={editForm.id} readOnly className='w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100' />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                <input value={editForm.fullName} onChange={(e)=>setEditForm({...editForm, fullName: e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                <input type='email' value={editForm.email} onChange={(e)=>setEditForm({...editForm, email: e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
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
            <h3 className='text-xl font-semibold mb-4'>Delete Student</h3>
            <p className='text-gray-700 mb-6'>Are you sure you want to delete <strong>{selectedStudent?.fullName}</strong>? This action cannot be undone.</p>
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


