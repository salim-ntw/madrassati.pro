import React from 'react'
import { useParams } from 'react-router-dom'
import { teacherAPI } from '../../../api/teacher'

export default function Announcements() {
  const { teacherId } = useParams()
  const [announcements, setAnnouncements] = React.useState([
    { 
      id: 'A001', 
      title: 'Math Test Next Week', 
      content: 'There will be a mathematics test next week covering chapters 1-3. Please study the exercises we did in class.', 
      date: '2025-01-20', 
      targetAudience: 'All Classes',
      priority: 'high'
    },
    { 
      id: 'A002', 
      title: 'Science Project Deadline', 
      content: 'The science project about photosynthesis is due next Friday. Make sure to include diagrams and explanations.', 
      date: '2025-01-18', 
      targetAudience: 'Class 1B',
      priority: 'medium'
    },
    { 
      id: 'A003', 
      title: 'Parent-Teacher Meeting', 
      content: 'Parent-teacher meetings are scheduled for next month. Please check your emails for the schedule.', 
      date: '2025-01-15', 
      targetAudience: 'All Parents',
      priority: 'low'
    }
  ])

  const [showAdd, setShowAdd] = React.useState(false)
  const [showEdit, setShowEdit] = React.useState(false)
  const [showDelete, setShowDelete] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')
  const [form, setForm] = React.useState({ title: '', content: '', date: '', targetClasses: [], priority: 'medium' })
  const [editForm, setEditForm] = React.useState({ id: '', title: '', content: '', date: '', targetAudience: '', priority: 'medium' })

  const [teacherClasses, setTeacherClasses] = React.useState([])
  const [loadingClasses, setLoadingClasses] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [classQuery, setClassQuery] = React.useState('')
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  React.useEffect(() => {
    const fetchClasses = async () => {
      if (!teacherId) return
      try {
        setLoadingClasses(true)
        const res = await teacherAPI.getClasses(teacherId)
        // Expecting res.data.data.classes to be an array of { className, subject, ... }
        const cls = res.data?.data?.classes || []
        setTeacherClasses(cls)
        setError(null)
      } catch (e) {
        setError(e?.response?.data?.error || e.message || 'Failed to load classes')
      } finally {
        setLoadingClasses(false)
      }
    }
    fetchClasses()
  }, [teacherId])

  const handleChange = (e) => {
    const { name, value, options, multiple } = e.target
    if (multiple) {
      const vals = Array.from(options).filter(o => o.selected).map(o => o.value)
      setForm((f) => ({ ...f, [name]: vals }))
    } else {
      setForm((f) => ({ ...f, [name]: value }))
    }
  }

  const filteredClasses = React.useMemo(() => {
    if (!classQuery) return teacherClasses
    const q = classQuery.toLowerCase()
    return teacherClasses.filter(c => String(c.className).toLowerCase().includes(q))
  }, [teacherClasses, classQuery])

  const toggleClassSelection = (className) => {
    setForm((f) => {
      const set = new Set(f.targetClasses)
      if (set.has(className)) set.delete(className)
      else set.add(className)
      return { ...f, targetClasses: Array.from(set) }
    })
  }

  const selectAllClasses = () => {
    setForm((f) => ({ ...f, targetClasses: teacherClasses.map(c => c.className) }))
  }

  const clearAllClasses = () => {
    setForm((f) => ({ ...f, targetClasses: [] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.content || !form.date || !form.targetClasses?.length) return
    try {
      const payload = {
        title: form.title,
        content: form.content,
        date: form.date,
        priority: form.priority,
        targetClasses: form.targetClasses,
        postedBy: 'Teacher'
      }
      const res = await teacherAPI.addAnnouncement(teacherId, payload)
      const saved = res.data?.data
      // Append to UI list (newest first)
      setAnnouncements((ann) => [{
        id: saved?.announcementId || ('A' + Math.floor(Math.random()*10000)),
        title: saved?.title || form.title,
        content: saved?.content || form.content,
        date: saved?.date || form.date,
        targetAudience: (saved?.targetClasses && saved.targetClasses.join(', ')) || (saved?.className || ''),
        priority: saved?.priority || form.priority
      }, ...ann])
      setForm({ title: '', content: '', date: '', targetClasses: [], priority: 'medium' })
      setShowAdd(false)
      setError(null)
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to add announcement')
    }
  }

  const editAnnouncement = (announcement) => {
    setEditForm({ ...announcement })
    setShowEdit(true)
  }

  const saveEdit = (e) => {
    e.preventDefault()
    if (!editForm.title || !editForm.content || !editForm.date || !editForm.targetAudience) return
    
    setAnnouncements((ann) => ann.map((a) => a.id === editForm.id ? { ...editForm } : a))
    setShowEdit(false)
  }

  const deleteAnnouncement = (id) => {
    setSelectedId(id)
    setShowDelete(true)
  }

  const confirmDelete = () => {
    setAnnouncements((ann) => ann.filter((a) => a.id !== selectedId))
    setShowDelete(false)
    setSelectedId('')
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴'
      case 'medium': return '🟡'
      case 'low': return '🟢'
      default: return '⚪'
    }
  }

  return (
    <div className='p-6 animate-fadeIn'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6 animate-slideInDown'>Announcements</h1>

      <div className='bg-white rounded-xl shadow-lg overflow-hidden animate-slideInUp'>
        <div className='bg-gradient-to-r from-purple-600 to-purple-800 text-white p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>Manage Announcements</h2>
            <button onClick={() => setShowAdd(true)} className='bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105'>
              + Add Announcement
            </button>
          </div>
        </div>

        <div className='p-6'>
          <div className='grid gap-4'>
            {announcements.map((announcement, index) => (
              <div key={announcement.id} className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] animate-slideInUp' style={{animationDelay: `${index * 0.1}s`}}>
                <div className='flex items-start justify-between mb-3'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-2'>
                      <h3 className='text-lg font-semibold text-gray-800'>{announcement.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(announcement.priority)}`}>
                        {getPriorityIcon(announcement.priority)} {announcement.priority}
                      </span>
                    </div>
                    <p className='text-gray-600 mb-3'>{announcement.content}</p>
                    <div className='flex items-center gap-4 text-sm text-gray-500'>
                      <span>📅 {new Date(announcement.date).toLocaleDateString()}</span>
                      <span>👥 {announcement.targetAudience}</span>
                    </div>
                  </div>
                  <div className='flex gap-2 ml-4'>
                    <button onClick={() => editAnnouncement(announcement)} className='px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 text-sm'>
                      Edit
                    </button>
                    <button onClick={() => deleteAnnouncement(announcement.id)} className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 text-sm'>
                      Delete
                    </button>
                  </div>
                </div>
                <div className='text-xs text-gray-500'>ID: {announcement.id}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Announcement Modal */}
      {showAdd && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn'>
          <div className='bg-white rounded-xl p-6 w-full max-w-2xl mx-4 animate-slideInUp'>
            <h3 className='text-xl font-semibold mb-4'>Add Announcement</h3>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                <input name='title' value={form.title} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300' required />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Content</label>
                <textarea name='content' value={form.content} onChange={handleChange} rows={4} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300' required />
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Date</label>
                  <input type='date' name='date' value={form.date} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300' required />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Target Classes</label>
                  <div className='relative'>
                    {/* Display (closed) */}
                    <button
                      type='button'
                      onClick={()=>setDropdownOpen((o)=>!o)}
                      className='w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition'
                    >
                      {form.targetClasses.length === 0 ? (
                        <span className='text-gray-400'>Select classes…</span>
                      ) : (
                        <div className='flex flex-wrap gap-2'>
                          {form.targetClasses.map(c => (
                            <span key={c} className='inline-flex items-center gap-1 text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2 py-1 rounded'>
                              {c}
                              <span onClick={(e)=>{e.stopPropagation(); toggleClassSelection(c)}} className='cursor-pointer hover:text-purple-900'>×</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </button>

                    {/* Dropdown (open) */}
                    {dropdownOpen && (
                      <div className='absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg animate-fadeIn'>
                        <div className='p-2 border-b border-gray-100 flex items-center gap-2'>
                          <input
                            type='text'
                            value={classQuery}
                            onChange={(e)=>setClassQuery(e.target.value)}
                            placeholder='Search classes…'
                            className='w-full border border-gray-200 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
                          />
                        </div>
                        <div className='max-h-56 overflow-auto p-2'>
                          {loadingClasses && (
                            <div className='text-sm text-gray-500 px-1 py-2'>Loading classes…</div>
                          )}
                          {!loadingClasses && filteredClasses?.length === 0 && (
                            <div className='text-sm text-gray-500 px-1 py-2'>No classes found</div>
                          )}
                          {filteredClasses?.map((cls) => {
                            const selected = form.targetClasses.includes(cls.className)
                            return (
                              <label key={cls.className} className='flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-50 cursor-pointer text-sm'>
                                <input
                                  type='checkbox'
                                  checked={selected}
                                  onChange={()=>toggleClassSelection(cls.className)}
                                  className='accent-purple-600'
                                />
                                <span className='flex-1'>{cls.className}</span>
                                {selected && <span className='text-purple-600 text-xs'>Selected</span>}
                              </label>
                            )
                          })}
                        </div>
                        <div className='flex items-center justify-between px-3 py-2 border-t border-gray-100 bg-gray-50 rounded-b-lg'>
                          <button type='button' onClick={selectAllClasses} className='text-xs text-gray-600 hover:text-gray-800'>Select All</button>
                          <div className='flex items-center gap-2'>
                            <button type='button' onClick={clearAllClasses} className='text-xs text-gray-600 hover:text-gray-800'>Clear All</button>
                            <button type='button' onClick={()=>setDropdownOpen(false)} className='text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700'>Done</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Priority</label>
                <select name='priority' value={form.priority} onChange={handleChange} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300'>
                  <option value='low'>Low Priority</option>
                  <option value='medium'>Medium Priority</option>
                  <option value='high'>High Priority</option>
                </select>
              </div>
              
              <div className='flex justify-end gap-2 pt-4'>
                <button type='button' onClick={()=>setShowAdd(false)} className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105'>
                  Cancel
                </button>
                <button type='submit' className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105'>
                  Add Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Announcement Modal */}
      {showEdit && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn'>
          <div className='bg-white rounded-xl p-6 w-full max-w-2xl mx-4 animate-slideInUp'>
            <h3 className='text-xl font-semibold mb-4'>Edit Announcement</h3>
            <form onSubmit={saveEdit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                <input name='title' value={editForm.title} onChange={(e)=>setEditForm({...editForm,title:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300' required />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Content</label>
                <textarea name='content' value={editForm.content} onChange={(e)=>setEditForm({...editForm,content:e.target.value})} rows={4} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300' required />
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Date</label>
                  <input type='date' name='date' value={editForm.date} onChange={(e)=>setEditForm({...editForm,date:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300' required />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Target Audience</label>
                  <select name='targetAudience' value={editForm.targetAudience} onChange={(e)=>setEditForm({...editForm,targetAudience:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300' required>
                    <option value='All Classes'>All Classes</option>
                    <option value='Class 1A'>Class 1A</option>
                    <option value='Class 1B'>Class 1B</option>
                    <option value='Class 2A'>Class 2A</option>
                    <option value='Class 3B'>Class 3B</option>
                    <option value='All Parents'>All Parents</option>
                    <option value='All Students'>All Students</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Priority</label>
                <select name='priority' value={editForm.priority} onChange={(e)=>setEditForm({...editForm,priority:e.target.value})} className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300'>
                  <option value='low'>Low Priority</option>
                  <option value='medium'>Medium Priority</option>
                  <option value='high'>High Priority</option>
                </select>
              </div>
              
              <div className='flex justify-end gap-2 pt-4'>
                <button type='button' onClick={()=>setShowEdit(false)} className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105'>
                  Cancel
                </button>
                <button type='submit' className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105'>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDelete && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn'>
          <div className='bg-white rounded-xl p-6 w-full max-w-md mx-4 animate-slideInUp'>
            <h3 className='text-xl font-semibold mb-4'>Delete Announcement</h3>
            <p className='text-gray-700 mb-6'>Are you sure you want to delete this announcement? This action cannot be undone.</p>
            <div className='flex justify-end gap-2'>
              <button onClick={()=>setShowDelete(false)} className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105'>
                Cancel
              </button>
              <button onClick={confirmDelete} className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105'>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


