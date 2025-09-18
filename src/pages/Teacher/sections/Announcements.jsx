import React from 'react'

export default function CreateStudents() {
  const [classes, setClasses] = React.useState([
    { name: '1A', students: [
      { id: 'S001', fullName: 'Alice Martin', email: 'alice@example.com' },
      { id: 'S002', fullName: 'Bob Karim', email: 'bob@example.com' },
    ]},
    { name: '1B', students: [
      { id: 'S010', fullName: 'David Ben', email: 'david@example.com' },
      { id: 'S011', fullName: 'Eva Noor', email: 'eva@example.com' },
    ]},
  ])

  const [showAdd, setShowAdd] = React.useState(false)
  const [form, setForm] = React.useState({ fullName: '', id: '', className: '', email: '', password: '' })
  const [showDelete, setShowDelete] = React.useState(false)
  const [pendingDelete, setPendingDelete] = React.useState({ className: '', id: '' })

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
    setClasses((cls) => cls.map(c => c.name === form.className ? { ...c, students: [...c.students, { id: form.id, fullName: form.fullName, email: form.email }] } : c))
    setForm({ fullName: '', id: '', className: '', email: '', password: '' })
    setShowAdd(false)
  }

  const handleDelete = (className, id) => {
    setPendingDelete({ className, id })
    setShowDelete(true)
  }

  const [editing, setEditing] = React.useState({ id: null, className: '' })
  const [editForm, setEditForm] = React.useState({ fullName: '', email: '' })

  const startEdit = (className, st) => {
    setEditing({ id: st.id, className })
    setEditForm({ fullName: st.fullName, email: st.email })
  }

  const saveEdit = () => {
    setClasses((cls) => cls.map(c => c.name === editing.className ? {
      ...c,
      students: c.students.map(st => st.id === editing.id ? { ...st, fullName: editForm.fullName, email: editForm.email } : st)
    } : c))
    setEditing({ id: null, className: '' })
  }

  return (
    <div className='page-container py-6'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold'>Students</h2>
        <button onClick={() => setShowAdd(true)} className='px-4 py-2 rounded-md bg-blue-900 text-white hover:bg-blue-800'>Add Student</button>
      </div>

      <div className='space-y-6'>
        {classes.map((c) => (
          <div key={c.name} className='card p-0'>
            <div className='px-6 py-4 border-b border-white/10 flex items-center justify-between'>
              <div className='text-lg font-semibold'>Class {c.name}</div>
              <span className='text-sm text-slate-300'>{c.students.length} students</span>
            </div>
            <div className='table-wrap'>
              <table className='table'>
                <thead className='thead'>
                  <tr className='thead-row'>
                    <th className='p-3 text-left'>ID</th>
                    <th className='p-3 text-left'>Full name</th>
                    <th className='p-3 text-left'>Email</th>
                    <th className='p-3 text-left'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {c.students.map((st, idx) => (
                    <tr key={st.id} className={`tbody-row`}>
                      <td className='p-3 font-semibold'>{st.id}</td>
                      <td className='p-3'>
                        {editing.id === st.id && editing.className === c.name ? (
                          <input className='input' value={editForm.fullName} onChange={(e)=>setEditForm({...editForm, fullName: e.target.value})} />
                        ) : st.fullName}
                      </td>
                      <td className='p-3'>
                        {editing.id === st.id && editing.className === c.name ? (
                          <input className='input' value={editForm.email} onChange={(e)=>setEditForm({...editForm, email: e.target.value})} />
                        ) : st.email}
                      </td>
                      <td className='p-3'>
                        {editing.id === st.id && editing.className === c.name ? (
                          <div className='flex gap-2'>
                            <button onClick={saveEdit} className='btn-success'>Save</button>
                            <button onClick={()=>setEditing({ id: null, className: '' })} className='btn-secondary'>Cancel</button>
                          </div>
                        ) : (
                          <div className='flex gap-2'>
                            <button onClick={()=>startEdit(c.name, st)} className='btn-warning'>Edit</button>
                            <button onClick={()=>handleDelete(c.name, st.id)} className='btn-danger'>Delete</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h3 className='text-xl font-semibold mb-4'>Register New Student</h3>
            <form onSubmit={handleAdd} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='label'>Full name</label>
                <input name='fullName' value={form.fullName} onChange={handleChange} className='input' />
              </div>
              <div>
                <label className='label'>ID</label>
                <input name='id' value={form.id} onChange={handleChange} className='input' />
              </div>
              <div>
                <label className='label'>Class</label>
                <input name='className' value={form.className} onChange={handleChange} className='input' />
              </div>
              <div>
                <label className='label'>Email</label>
                <input name='email' type='email' value={form.email} onChange={handleChange} className='input' />
              </div>
              <div className='md:col-span-2'>
                <label className='label'>Password</label>
                <div className='flex gap-2'>
                  <input name='password' value={form.password} onChange={handleChange} className='input flex-1' />
                  <button type='button' onClick={handleGeneratePassword} className='btn-secondary'>Generate</button>
                </div>
              </div>
              <div className='md:col-span-2 flex justify-end gap-2'>
                <button type='button' onClick={()=>setShowAdd(false)} className='btn-secondary'>Cancel</button>
                <button type='submit' className='btn-primary'>Add Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDelete && (
        <div className='modal-overlay'>
          <div className='modal max-w-lg'>
            <h3 className='text-lg font-semibold mb-3'>Delete Student</h3>
            <p className='text-gray-700 mb-4'>Are you sure you want to delete this student?</p>
            <div className='flex justify-end gap-2'>
              <button onClick={()=>setShowDelete(false)} className='btn-secondary'>Cancel</button>
              <button onClick={()=>{setClasses((cls)=>cls.map(c=>c.name===pendingDelete.className?{...c,students:c.students.filter(st=>st.id!==pendingDelete.id)}:c)); setShowDelete(false)}} className='btn-danger'>Delete</button>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className='mt-6 bg-white p-6 rounded-lg shadow'>
          <h3 className='text-xl font-semibold mb-4'>Register New Student</h3>
          <form onSubmit={handleAdd} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Full name</label>
              <input name='fullName' value={form.fullName} onChange={handleChange} className='w-full border rounded px-3 py-2' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>ID</label>
              <input name='id' value={form.id} onChange={handleChange} className='w-full border rounded px-3 py-2' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Class</label>
              <input name='className' value={form.className} onChange={handleChange} className='w-full border rounded px-3 py-2' />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>Email</label>
              <input name='email' type='email' value={form.email} onChange={handleChange} className='w-full border rounded px-3 py-2' />
            </div>
            <div className='md:col-span-2'>
              <label className='block text-sm font-medium mb-1'>Password</label>
              <div className='flex gap-2'>
                <input name='password' value={form.password} onChange={handleChange} className='flex-1 border rounded px-3 py-2' />
                <button type='button' onClick={handleGeneratePassword} className='px-3 py-2 rounded-md bg-gray-700 text-white'>Generate</button>
              </div>
            </div>
            <div className='md:col-span-2 flex justify-end gap-2'>
              <button type='button' onClick={()=>setShowAdd(false)} className='px-4 py-2 rounded-md bg-gray-400 text-white'>Cancel</button>
              <button type='submit' className='px-4 py-2 rounded-md bg-blue-900 text-white'>Add Student</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}


