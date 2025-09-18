import React from 'react'

export default function ManageGrades() {
  const [classes, setClasses] = React.useState([
    { name: '1A', students: [
      { id: 'S001', name: 'Alice Martin', grade: 15 },
      { id: 'S002', name: 'Bob Karim', grade: 12 },
    ]},
    { name: '1B', students: [
      { id: 'S010', name: 'David Ben', grade: 17 },
      { id: 'S011', name: 'Eva Noor', grade: 9 },
    ]},
  ])

  const [activeClass, setActiveClass] = React.useState('1A')

  const [showAdd, setShowAdd] = React.useState(false)
  const [form, setForm] = React.useState({ id: '', name: '', grade: '' })
  const [showEdit, setShowEdit] = React.useState(false)
  const [editForm, setEditForm] = React.useState({ id: '', name: '', grade: '' })
  const [showDelete, setShowDelete] = React.useState(false)
  const [selectedStudentId, setSelectedStudentId] = React.useState('')

  const addStudentGrade = (className) => {
    setShowAdd(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const grade = Number(form.grade)
    if (!form.id || !form.name || isNaN(grade)) return
    setClasses((cls) => cls.map(c => c.name === activeClass ? { ...c, students: [...c.students, { id: form.id, name: form.name, grade }] } : c))
    setForm({ id: '', name: '', grade: '' })
    setShowAdd(false)
  }

  const editStudentGrade = (className, studentId) => {
    const st = classes.find(c => c.name === className)?.students.find(s => s.id === studentId)
    if (!st) return
    setEditForm({ id: st.id, name: st.name, grade: String(st.grade) })
    setShowEdit(true)
  }

  const deleteStudent = (className, studentId) => {
    setSelectedStudentId(studentId)
    setShowDelete(true)
  }

  const submitEdit = (e) => {
    e.preventDefault()
    const grade = Number(editForm.grade)
    if (!editForm.id || !editForm.name || isNaN(grade)) return
    setClasses((cls) => cls.map(c => c.name === activeClass ? {
      ...c,
      students: c.students.map(s => s.id === editForm.id ? { ...s, name: editForm.name, grade } : s)
    } : c))
    setShowEdit(false)
  }

  const confirmDelete = () => {
    setClasses((cls) => cls.map(c => c.name === activeClass ? {
      ...c,
      students: c.students.filter(s => s.id !== selectedStudentId)
    } : c))
    setShowDelete(false)
    setSelectedStudentId('')
  }

  const current = classes.find(c => c.name === activeClass)

  return (
    <div className='page-container py-6'>
      <h2 className='text-2xl font-bold mb-4'>Manage Grades</h2>

      <div className='flex gap-2 mb-4 flex-wrap'>
        {classes.map((c) => (
          <button key={c.name} onClick={() => setActiveClass(c.name)}
            className={`px-3 py-1 rounded-md border ${activeClass === c.name ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-blue-900 border-blue-900'}`}>
            {c.name}
          </button>
        ))}
      </div>

      <div className='table-wrap'>
        <table className='table'>
          <thead className='thead'>
            <tr className='thead-row'>
              <th className='p-3 text-left'>Student</th>
              <th className='p-3 text-left'>ID</th>
              <th className='p-3 text-left'>Grade</th>
              <th className='p-3 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {current?.students.map((s, idx) => (
              <tr key={s.id} className={`tbody-row`}>
                <td className='p-3 font-semibold'>{s.name}</td>
                <td className='p-3'>{s.id}</td>
                <td className='p-3'>{s.grade}/20</td>
                <td className='p-3'>
                  <div className='flex gap-2'>
                    <button onClick={() => addStudentGrade(current.name)} className='btn-primary'>Add</button>
                    <button onClick={() => editStudentGrade(current.name, s.id)} className='btn-warning'>Edit</button>
                    <button onClick={() => deleteStudent(current.name, s.id)} className='btn-danger'>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h3 className='text-lg font-semibold mb-3'>Add Grade</h3>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <label className='label'>Student ID</label>
                <input name='id' value={form.id} onChange={handleChange} className='input' />
              </div>
              <div>
                <label className='label'>Student Name</label>
                <input name='name' value={form.name} onChange={handleChange} className='input' />
              </div>
              <div>
                <label className='label'>Grade</label>
                <input name='grade' type='number' min='0' max='20' value={form.grade} onChange={handleChange} className='input' />
              </div>
              <div className='md:col-span-3 flex justify-end gap-2'>
                <button type='button' onClick={()=>setShowAdd(false)} className='btn-secondary'>Cancel</button>
                <button type='submit' className='btn-primary'>Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEdit && (
        <div className='modal-overlay'>
          <div className='modal'>
          <h3 className='text-lg font-semibold mb-3'>Edit Grade</h3>
          <form onSubmit={submitEdit} className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='label'>Student ID</label>
              <input name='id' value={editForm.id} readOnly className='input bg-white/5' />
            </div>
            <div>
              <label className='label'>Student Name</label>
              <input name='name' value={editForm.name} onChange={(e)=>setEditForm({...editForm,name:e.target.value})} className='input' />
            </div>
            <div>
              <label className='label'>Grade</label>
              <input name='grade' type='number' min='0' max='20' value={editForm.grade} onChange={(e)=>setEditForm({...editForm,grade:e.target.value})} className='input' />
            </div>
            <div className='md:col-span-3 flex justify-end gap-2'>
              <button type='button' onClick={()=>setShowEdit(false)} className='btn-secondary'>Cancel</button>
              <button type='submit' className='btn-success'>Save</button>
            </div>
          </form>
          </div>
        </div>
      )}

      {showDelete && (
        <div className='modal-overlay'>
          <div className='modal max-w-lg'>
          <h3 className='text-lg font-semibold mb-3'>Delete Grade</h3>
          <p className='text-gray-700 mb-4'>Are you sure you want to delete this student's grade?</p>
          <div className='flex justify-end gap-2'>
            <button onClick={()=>setShowDelete(false)} className='btn-secondary'>Cancel</button>
            <button onClick={confirmDelete} className='btn-danger'>Delete</button>
          </div>
          </div>
        </div>
      )}
    </div>
  )
}


