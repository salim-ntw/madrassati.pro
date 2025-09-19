import React from 'react'

export default function ManageGrades() {
  const [classes, setClasses] = React.useState([
    { name: '1A', students: [
      { id: 'S001', name: 'Alice Martin', homework: 8, test: 7, exam: 15, finalGrade: 0 },
      { id: 'S002', name: 'Bob Karim', homework: 6, test: 8, exam: 12, finalGrade: 0 },
    ]},
    { name: '1B', students: [
      { id: 'S010', name: 'David Ben', homework: 9, test: 9, exam: 17, finalGrade: 0 },
      { id: 'S011', name: 'Eva Noor', homework: 5, test: 6, exam: 9, finalGrade: 0 },
    ]},
  ])

  const [activeClass, setActiveClass] = React.useState('1A')
  const [showAdd, setShowAdd] = React.useState(false)
  const [showEdit, setShowEdit] = React.useState(false)
  const [showDelete, setShowDelete] = React.useState(false)
  const [selectedStudentId, setSelectedStudentId] = React.useState('')
  const [form, setForm] = React.useState({ id: '', name: '', homework: '', test: '', exam: '' })
  const [editForm, setEditForm] = React.useState({ id: '', name: '', homework: '', test: '', exam: '' })

  // Calculate final grade (30% homework, 30% test, 40% exam)
  const calculateFinalGrade = (homework, test, exam) => {
    return Math.round((homework * 0.3) + (test * 0.3) + (exam * 0.4))
  }

  // Update final grades when component mounts or data changes
  React.useEffect(() => {
    setClasses(prevClasses => 
      prevClasses.map(cls => ({
        ...cls,
        students: cls.students.map(student => ({
          ...student,
          finalGrade: calculateFinalGrade(student.homework, student.test, student.exam)
        }))
      }))
    )
  }, [])

  const addStudentGrade = () => {
    setForm({ id: '', name: '', homework: '', test: '', exam: '' })
    setShowAdd(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const homework = Number(form.homework)
    const test = Number(form.test)
    const exam = Number(form.exam)
    
    if (!form.id || !form.name || isNaN(homework) || isNaN(test) || isNaN(exam)) return
    
    const finalGrade = calculateFinalGrade(homework, test, exam)
    
    setClasses((cls) => cls.map(c => c.name === activeClass ? { 
      ...c, 
      students: [...c.students, { 
        id: form.id, 
        name: form.name, 
        homework, 
        test, 
        exam, 
        finalGrade 
      }] 
    } : c))
    setForm({ id: '', name: '', homework: '', test: '', exam: '' })
    setShowAdd(false)
  }

  const editStudentGrade = (className, studentId) => {
    const st = classes.find(c => c.name === className)?.students.find(s => s.id === studentId)
    if (!st) return
    setEditForm({ 
      id: st.id, 
      name: st.name, 
      homework: String(st.homework), 
      test: String(st.test), 
      exam: String(st.exam) 
    })
    setShowEdit(true)
  }

  const deleteStudent = (className, studentId) => {
    setSelectedStudentId(studentId)
    setShowDelete(true)
  }

  const submitEdit = (e) => {
    e.preventDefault()
    const homework = Number(editForm.homework)
    const test = Number(editForm.test)
    const exam = Number(editForm.exam)
    
    if (!editForm.id || !editForm.name || isNaN(homework) || isNaN(test) || isNaN(exam)) return
    
    const finalGrade = calculateFinalGrade(homework, test, exam)
    
    setClasses((cls) => cls.map(c => c.name === activeClass ? {
      ...c,
      students: c.students.map(s => s.id === editForm.id ? { 
        ...s, 
        name: editForm.name, 
        homework, 
        test, 
        exam, 
        finalGrade 
      } : s)
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
    <div className='p-6 animate-fadeIn'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6 animate-slideInDown'>Manage Grades</h1>

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
            <h2 className='text-xl font-semibold'>Class {activeClass} - Grade Management</h2>
            <button onClick={addStudentGrade} className='bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors'>
              + Add Student
            </button>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='p-4 text-left font-semibold text-gray-700'>Student</th>
                <th className='p-4 text-left font-semibold text-gray-700'>ID</th>
                <th className='p-4 text-center font-semibold text-gray-700'>Homework<br/><span className='text-xs text-gray-500'>(30%)</span></th>
                <th className='p-4 text-center font-semibold text-gray-700'>Test<br/><span className='text-xs text-gray-500'>(30%)</span></th>
                <th className='p-4 text-center font-semibold text-gray-700'>Exam<br/><span className='text-xs text-gray-500'>(40%)</span></th>
                <th className='p-4 text-center font-semibold text-gray-700'>Final Grade<br/><span className='text-xs text-gray-500'>(Auto-calculated)</span></th>
                <th className='p-4 text-center font-semibold text-gray-700'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {current?.students.map((s, idx) => (
                <tr key={s.id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                  <td className='p-4 font-semibold text-gray-800'>{s.name}</td>
                  <td className='p-4 text-gray-600'>{s.id}</td>
                  <td className='p-4 text-center'>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      s.homework >= 7 ? 'bg-green-100 text-green-800' : 
                      s.homework >= 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {s.homework}/10
                    </span>
                  </td>
                  <td className='p-4 text-center'>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      s.test >= 7 ? 'bg-green-100 text-green-800' : 
                      s.test >= 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {s.test}/10
                    </span>
                  </td>
                  <td className='p-4 text-center'>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      s.exam >= 14 ? 'bg-green-100 text-green-800' : 
                      s.exam >= 10 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {s.exam}/20
                    </span>
                  </td>
                  <td className='p-4 text-center'>
                    <span className={`px-4 py-2 rounded-lg text-lg font-bold ${
                      s.finalGrade >= 14 ? 'bg-green-500 text-white' : 
                      s.finalGrade >= 10 ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {s.finalGrade}/20
                    </span>
                  </td>
                  <td className='p-4'>
                    <div className='flex gap-2 justify-center'>
                      <button onClick={() => editStudentGrade(current.name, s.id)} className='px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm'>
                        Edit
                      </button>
                      <button onClick={() => deleteStudent(current.name, s.id)} className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm'>
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

      {/* Add Student Modal */}
      {showAdd && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-full max-w-2xl mx-4'>
            <h3 className='text-xl font-semibold mb-4'>Add Student Grade</h3>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Student ID</label>
                <input name='id' value={form.id} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Student Name</label>
                <input name='name' value={form.name} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Homework (0-10)</label>
                <input name='homework' type='number' min='0' max='10' value={form.homework} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Test (0-10)</label>
                <input name='test' type='number' min='0' max='10' value={form.test} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
              </div>
              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Exam (0-20)</label>
                <input name='exam' type='number' min='0' max='20' value={form.exam} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
              </div>
              <div className='md:col-span-2 flex justify-end gap-2 pt-4'>
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
          <div className='bg-white rounded-xl p-6 w-full max-w-2xl mx-4'>
            <h3 className='text-xl font-semibold mb-4'>Edit Student Grade</h3>
            <form onSubmit={submitEdit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Student ID</label>
                <input name='id' value={editForm.id} readOnly className='w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100' />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Student Name</label>
                <input name='name' value={editForm.name} onChange={(e)=>setEditForm({...editForm,name:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Homework (0-10)</label>
                <input name='homework' type='number' min='0' max='10' value={editForm.homework} onChange={(e)=>setEditForm({...editForm,homework:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Test (0-10)</label>
                <input name='test' type='number' min='0' max='10' value={editForm.test} onChange={(e)=>setEditForm({...editForm,test:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
              </div>
              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Exam (0-20)</label>
                <input name='exam' type='number' min='0' max='20' value={editForm.exam} onChange={(e)=>setEditForm({...editForm,exam:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' required />
              </div>
              <div className='md:col-span-2 flex justify-end gap-2 pt-4'>
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
            <p className='text-gray-700 mb-6'>Are you sure you want to delete this student's grade record? This action cannot be undone.</p>
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


