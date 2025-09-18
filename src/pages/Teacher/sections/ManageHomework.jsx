import React from 'react'

export default function ManageHomework() {
  const [classes, setClasses] = React.useState([
    { name: '1A', homework: [
      { id: 'H001', title: 'Chapter 1 Exercises', due: '2025-09-20' },
    ]},
    { name: '1B', homework: [
      { id: 'H010', title: 'Read pages 20-30', due: '2025-09-18' },
    ]},
  ])

  const [activeClass, setActiveClass] = React.useState('1A')
  const [showAdd, setShowAdd] = React.useState(false)
  const [form, setForm] = React.useState({ id: '', title: '', due: '' })
  const [showEdit, setShowEdit] = React.useState(false)
  const [editForm, setEditForm] = React.useState({ id: '', title: '', due: '' })
  const [showDelete, setShowDelete] = React.useState(false)
  const [selectedHwId, setSelectedHwId] = React.useState('')

  const addHw = () => {
    setShowAdd(true)
  }

  const editHw = (className, hwId) => {
    const hw = classes.find(c => c.name === className)?.homework.find(h => h.id === hwId)
    if (!hw) return
    setEditForm({ id: hw.id, title: hw.title, due: hw.due })
    setShowEdit(true)
  }

  const deleteHw = (className, hwId) => {
    setSelectedHwId(hwId)
    setShowDelete(true)
  }

  const submitEdit = (e) => {
    e.preventDefault()
    if (!editForm.id || !editForm.title || !editForm.due) return
    setClasses((cls) => cls.map(c => c.name === activeClass ? {
      ...c,
      homework: c.homework.map(h => h.id === editForm.id ? { ...h, title: editForm.title, due: editForm.due } : h)
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

  const current = classes.find(c => c.name === activeClass)

  return (
    <div className='page-container py-6'>
      <h2 className='text-2xl font-bold mb-4'>Manage Homework</h2>

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
              <th className='p-3 text-left'>Homework</th>
              <th className='p-3 text-left'>ID</th>
              <th className='p-3 text-left'>Due</th>
              <th className='p-3 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {current?.homework.map((h, idx) => (
              <tr key={h.id} className={`tbody-row`}>
                <td className='p-3 font-semibold'>{h.title}</td>
                <td className='p-3'>{h.id}</td>
                <td className='p-3'>{h.due}</td>
                <td className='p-3'>
                  <div className='flex gap-2'>
                    <button onClick={addHw} className='btn-primary'>Add</button>
                    <button onClick={() => editHw(current.name, h.id)} className='btn-warning'>Edit</button>
                    <button onClick={() => deleteHw(current.name, h.id)} className='btn-danger'>Delete</button>
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
          <h3 className='text-lg font-semibold mb-3'>Add Homework</h3>
          <form onSubmit={(e)=>{e.preventDefault(); if(!form.id||!form.title||!form.due) return; setClasses((cls)=>cls.map(c=>c.name===activeClass?{...c,homework:[...c.homework,{...form}]}:c)); setForm({id:'',title:'',due:''}); setShowAdd(false)}} className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='label'>Homework ID</label>
              <input name='id' value={form.id} onChange={(e)=>setForm({...form,[e.target.name]:e.target.value})} className='input' />
            </div>
            <div>
              <label className='label'>Title</label>
              <input name='title' value={form.title} onChange={(e)=>setForm({...form,[e.target.name]:e.target.value})} className='input' />
            </div>
            <div>
              <label className='label'>Due</label>
              <input type='date' name='due' value={form.due} onChange={(e)=>setForm({...form,[e.target.name]:e.target.value})} className='input' />
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
          <h3 className='text-lg font-semibold mb-3'>Edit Homework</h3>
          <form onSubmit={submitEdit} className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='label'>ID</label>
              <input name='id' value={editForm.id} readOnly className='input bg-white/5' />
            </div>
            <div>
              <label className='label'>Title</label>
              <input name='title' value={editForm.title} onChange={(e)=>setEditForm({...editForm,title:e.target.value})} className='input' />
            </div>
            <div>
              <label className='label'>Due</label>
              <input type='date' name='due' value={editForm.due} onChange={(e)=>setEditForm({...editForm,due:e.target.value})} className='input' />
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
          <h3 className='text-lg font-semibold mb-3'>Delete Homework</h3>
          <p className='text-gray-700 mb-4'>Are you sure you want to delete this homework?</p>
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


