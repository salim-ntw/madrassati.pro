import React from 'react'

export default function Exams() {
  const [tests, setTests] = React.useState([
    { id: 'T001', title: 'Math Quiz - Chapter 1', date: '2025-01-25', time: '10:00 - 10:30', className: '1A', location: 'Room 101', duration: '30 min' },
    { id: 'T002', title: 'Science Test - Photosynthesis', date: '2025-01-28', time: '09:00 - 09:45', className: '1B', location: 'Room 102', duration: '45 min' },
  ])

  const [exams, setExams] = React.useState([
    { id: 'E001', title: 'Midterm Exam - Mathematics', date: '2025-02-15', time: '10:00 - 12:00', className: '1A', location: 'Room 101', duration: '2 hours' },
    { id: 'E002', title: 'Final Exam - Science', date: '2025-02-20', time: '09:00 - 11:00', className: '1B', location: 'Room 102', duration: '2 hours' },
  ])

  const [activeTab, setActiveTab] = React.useState('tests')
  const [showAddTest, setShowAddTest] = React.useState(false)
  const [showAddExam, setShowAddExam] = React.useState(false)
  const [showEditTest, setShowEditTest] = React.useState(false)
  const [showEditExam, setShowEditExam] = React.useState(false)
  const [showDeleteTest, setShowDeleteTest] = React.useState(false)
  const [showDeleteExam, setShowDeleteExam] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')

  const [testForm, setTestForm] = React.useState({ title: '', date: '', time: '', className: '', location: '', duration: '' })
  const [examForm, setExamForm] = React.useState({ title: '', date: '', time: '', className: '', location: '', duration: '' })
  const [editTestForm, setEditTestForm] = React.useState({ id: '', title: '', date: '', time: '', className: '', location: '', duration: '' })
  const [editExamForm, setEditExamForm] = React.useState({ id: '', title: '', date: '', time: '', className: '', location: '', duration: '' })

  const handleTestChange = (e) => {
    const { name, value } = e.target
    setTestForm((f) => ({ ...f, [name]: value }))
  }

  const handleExamChange = (e) => {
    const { name, value } = e.target
    setExamForm((f) => ({ ...f, [name]: value }))
  }

  const addTest = (e) => {
    e.preventDefault()
    if (!testForm.title || !testForm.date || !testForm.time || !testForm.className || !testForm.location || !testForm.duration) return
    const id = 'T' + String(Math.floor(Math.random()*10000)).padStart(3,'0')
    setTests((t) => [...t, { id, ...testForm }])
    setTestForm({ title: '', date: '', time: '', className: '', location: '', duration: '' })
    setShowAddTest(false)
  }

  const addExam = (e) => {
    e.preventDefault()
    if (!examForm.title || !examForm.date || !examForm.time || !examForm.className || !examForm.location || !examForm.duration) return
    const id = 'E' + String(Math.floor(Math.random()*10000)).padStart(3,'0')
    setExams((e) => [...e, { id, ...examForm }])
    setExamForm({ title: '', date: '', time: '', className: '', location: '', duration: '' })
    setShowAddExam(false)
  }

  const editTest = (test) => {
    setEditTestForm({ ...test })
    setShowEditTest(true)
  }

  const editExam = (exam) => {
    setEditExamForm({ ...exam })
    setShowEditExam(true)
  }

  const saveTestEdit = (e) => {
    e.preventDefault()
    setTests((t) => t.map((test) => test.id === editTestForm.id ? { ...editTestForm } : test))
    setShowEditTest(false)
  }

  const saveExamEdit = (e) => {
    e.preventDefault()
    setExams((e) => e.map((exam) => exam.id === editExamForm.id ? { ...editExamForm } : exam))
    setShowEditExam(false)
  }

  const deleteTest = (id) => {
    setSelectedId(id)
    setShowDeleteTest(true)
  }

  const deleteExam = (id) => {
    setSelectedId(id)
    setShowDeleteExam(true)
  }

  const confirmDeleteTest = () => {
    setTests((t) => t.filter((test) => test.id !== selectedId))
    setShowDeleteTest(false)
    setSelectedId('')
  }

  const confirmDeleteExam = () => {
    setExams((e) => e.filter((exam) => exam.id !== selectedId))
    setShowDeleteExam(false)
    setSelectedId('')
  }

  const getDaysUntil = (date) => {
    const today = new Date()
    const target = new Date(date)
    const diffTime = target - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className='p-6 animate-fadeIn'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6 animate-slideInDown'>Tests & Exams Management</h1>

      {/* Tab Navigation */}
      <div className='flex gap-2 mb-6'>
        <button
          onClick={() => setActiveTab('tests')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 animate-slideInUp ${
            activeTab === 'tests'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
          }`}
          style={{animationDelay: '0.1s'}}
        >
          Tests ({tests.length})
        </button>
        <button
          onClick={() => setActiveTab('exams')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 animate-slideInUp ${
            activeTab === 'exams'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
          }`}
          style={{animationDelay: '0.2s'}}
        >
          Exams ({exams.length})
        </button>
      </div>

      {/* Tests Section */}
      {activeTab === 'tests' && (
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='bg-gradient-to-r from-green-600 to-green-800 text-white p-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-semibold'>Tests</h2>
              <button onClick={() => setShowAddTest(true)} className='bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors'>
                + Add Test
              </button>
            </div>
          </div>

    <div className='p-6'>
            <div className='grid gap-4'>
              {tests.map((test) => {
                const daysUntil = getDaysUntil(test.date)
                return (
                  <div key={test.id} className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'>
                    <div className='flex items-start justify-between mb-3'>
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold text-gray-800 mb-1'>{test.title}</h3>
                        <div className='flex items-center gap-4 text-sm text-gray-500 mb-2'>
                          <span>📅 {new Date(test.date).toLocaleDateString()}</span>
                          <span>⏰ {test.time}</span>
                          <span>⏱️ {test.duration}</span>
                          <span>🏫 {test.location}</span>
                        </div>
                        <div className='text-sm text-gray-600'>Class: {test.className}</div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='text-right mr-4'>
                          <div className='text-sm text-gray-500'>Days left</div>
                          <div className={`text-lg font-bold ${daysUntil < 0 ? 'text-red-600' : daysUntil <= 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {daysUntil < 0 ? 'Past' : daysUntil}
                          </div>
                        </div>
                        <div className='flex gap-2'>
                          <button onClick={() => editTest(test)} className='px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm'>
                            Edit
                          </button>
                          <button onClick={() => deleteTest(test.id)} className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm'>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='text-xs text-gray-500'>ID: {test.id}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Exams Section */}
      {activeTab === 'exams' && (
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='bg-gradient-to-r from-red-600 to-red-800 text-white p-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-semibold'>Exams</h2>
              <button onClick={() => setShowAddExam(true)} className='bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors'>
                + Add Exam
              </button>
            </div>
          </div>

          <div className='p-6'>
            <div className='grid gap-4'>
              {exams.map((exam) => {
                const daysUntil = getDaysUntil(exam.date)
                return (
                  <div key={exam.id} className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'>
                    <div className='flex items-start justify-between mb-3'>
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold text-gray-800 mb-1'>{exam.title}</h3>
                        <div className='flex items-center gap-4 text-sm text-gray-500 mb-2'>
                          <span>📅 {new Date(exam.date).toLocaleDateString()}</span>
                          <span>⏰ {exam.time}</span>
                          <span>⏱️ {exam.duration}</span>
                          <span>🏫 {exam.location}</span>
                        </div>
                        <div className='text-sm text-gray-600'>Class: {exam.className}</div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='text-right mr-4'>
                          <div className='text-sm text-gray-500'>Days left</div>
                          <div className={`text-lg font-bold ${daysUntil < 0 ? 'text-red-600' : daysUntil <= 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {daysUntil < 0 ? 'Past' : daysUntil}
                          </div>
                        </div>
                        <div className='flex gap-2'>
                          <button onClick={() => editExam(exam)} className='px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm'>
                            Edit
                          </button>
                          <button onClick={() => deleteExam(exam.id)} className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm'>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='text-xs text-gray-500'>ID: {exam.id}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Add Test Modal */}
      {showAddTest && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-full max-w-2xl mx-4'>
            <h3 className='text-xl font-semibold mb-4'>Add Test</h3>
            <form onSubmit={addTest} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Test Title</label>
                <input name='title' value={testForm.title} onChange={handleTestChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500' required />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Date</label>
                  <input type='date' name='date' value={testForm.date} onChange={handleTestChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500' required />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Time</label>
                  <input type='text' name='time' placeholder='HH:MM - HH:MM' value={testForm.time} onChange={handleTestChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500' required />
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Class</label>
                  <input name='className' value={testForm.className} onChange={handleTestChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500' required />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Duration</label>
                  <input name='duration' placeholder='e.g., 30 min' value={testForm.duration} onChange={handleTestChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500' required />
                </div>
          </div>
          <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Location</label>
                <input name='location' value={testForm.location} onChange={handleTestChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500' required />
              </div>
              <div className='flex justify-end gap-2 pt-4'>
                <button type='button' onClick={()=>setShowAddTest(false)} className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
                  Cancel
                </button>
                <button type='submit' className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'>
                  Add Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Exam Modal */}
      {showAddExam && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-full max-w-2xl mx-4'>
            <h3 className='text-xl font-semibold mb-4'>Add Exam</h3>
            <form onSubmit={addExam} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Exam Title</label>
                <input name='title' value={examForm.title} onChange={handleExamChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500' required />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Date</label>
                  <input type='date' name='date' value={examForm.date} onChange={handleExamChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500' required />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Time</label>
                  <input type='text' name='time' placeholder='HH:MM - HH:MM' value={examForm.time} onChange={handleExamChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500' required />
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Class</label>
                  <input name='className' value={examForm.className} onChange={handleExamChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500' required />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Duration</label>
                  <input name='duration' placeholder='e.g., 2 hours' value={examForm.duration} onChange={handleExamChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500' required />
                </div>
          </div>
          <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Location</label>
                <input name='location' value={examForm.location} onChange={handleExamChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500' required />
              </div>
              <div className='flex justify-end gap-2 pt-4'>
                <button type='button' onClick={()=>setShowAddExam(false)} className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
                  Cancel
                </button>
                <button type='submit' className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'>
                  Add Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Test Modal */}
      {showEditTest && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-full max-w-2xl mx-4'>
            <h3 className='text-xl font-semibold mb-4'>Edit Test</h3>
            <form onSubmit={saveTestEdit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Test Title</label>
                <input name='title' value={editTestForm.title} onChange={(e)=>setEditTestForm({...editTestForm,title:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500' required />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Date</label>
                  <input type='date' name='date' value={editTestForm.date} onChange={(e)=>setEditTestForm({...editTestForm,date:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500' required />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Time</label>
                  <input type='text' name='time' placeholder='HH:MM - HH:MM' value={editTestForm.time} onChange={(e)=>setEditTestForm({...editTestForm,time:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500' required />
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Class</label>
                  <input name='className' value={editTestForm.className} onChange={(e)=>setEditTestForm({...editTestForm,className:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500' required />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Duration</label>
                  <input name='duration' placeholder='e.g., 30 min' value={editTestForm.duration} onChange={(e)=>setEditTestForm({...editTestForm,duration:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500' required />
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Location</label>
                <input name='location' value={editTestForm.location} onChange={(e)=>setEditTestForm({...editTestForm,location:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500' required />
              </div>
              <div className='flex justify-end gap-2 pt-4'>
                <button type='button' onClick={()=>setShowEditTest(false)} className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
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

      {/* Edit Exam Modal */}
      {showEditExam && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-full max-w-2xl mx-4'>
            <h3 className='text-xl font-semibold mb-4'>Edit Exam</h3>
            <form onSubmit={saveExamEdit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Exam Title</label>
                <input name='title' value={editExamForm.title} onChange={(e)=>setEditExamForm({...editExamForm,title:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500' required />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Date</label>
                  <input type='date' name='date' value={editExamForm.date} onChange={(e)=>setEditExamForm({...editExamForm,date:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500' required />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Time</label>
                  <input type='text' name='time' placeholder='HH:MM - HH:MM' value={editExamForm.time} onChange={(e)=>setEditExamForm({...editExamForm,time:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500' required />
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Class</label>
                  <input name='className' value={editExamForm.className} onChange={(e)=>setEditExamForm({...editExamForm,className:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500' required />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Duration</label>
                  <input name='duration' placeholder='e.g., 2 hours' value={editExamForm.duration} onChange={(e)=>setEditExamForm({...editExamForm,duration:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500' required />
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Location</label>
                <input name='location' value={editExamForm.location} onChange={(e)=>setEditExamForm({...editExamForm,location:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500' required />
              </div>
              <div className='flex justify-end gap-2 pt-4'>
                <button type='button' onClick={()=>setShowEditExam(false)} className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
                  Cancel
                </button>
                <button type='submit' className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'>
                  Save Changes
                </button>
          </div>
        </form>
      </div>
        </div>
      )}

      {/* Delete Test Modal */}
      {showDeleteTest && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-full max-w-md mx-4'>
            <h3 className='text-xl font-semibold mb-4'>Delete Test</h3>
            <p className='text-gray-700 mb-6'>Are you sure you want to delete this test? This action cannot be undone.</p>
            <div className='flex justify-end gap-2'>
              <button onClick={()=>setShowDeleteTest(false)} className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
                Cancel
              </button>
              <button onClick={confirmDeleteTest} className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'>
                Delete
              </button>
            </div>
                    </div>
                    </div>
                  )}

      {/* Delete Exam Modal */}
      {showDeleteExam && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-full max-w-md mx-4'>
            <h3 className='text-xl font-semibold mb-4'>Delete Exam</h3>
            <p className='text-gray-700 mb-6'>Are you sure you want to delete this exam? This action cannot be undone.</p>
            <div className='flex justify-end gap-2'>
              <button onClick={()=>setShowDeleteExam(false)} className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
                Cancel
              </button>
              <button onClick={confirmDeleteExam} className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'>
                Delete
              </button>
            </div>
          </div>
      </div>
      )}
    </div>
  )
}




