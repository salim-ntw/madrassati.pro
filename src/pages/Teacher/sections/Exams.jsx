import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { teacherAPI } from '../../../api/teacher';

export default function Exams() {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [exams, setExams] = useState([]);
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState('tests');
  const [showEditTest, setShowEditTest] = useState(false);
  const [showEditExam, setShowEditExam] = useState(false);
  const [showDeleteTest, setShowDeleteTest] = useState(false);
  const [showDeleteExam, setShowDeleteExam] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editTestForm, setEditTestForm] = useState({ 
    id: '', 
    title: '', 
    date: '', 
    startTime: '', 
    endTime: '', 
    className: '', 
    room: '', 
    durationMinutes: '' 
  });
  
  const [editExamForm, setEditExamForm] = useState({ 
    id: '', 
    title: '', 
    date: '', 
    startTime: '', 
    endTime: '', 
    className: '', 
    room: '', 
    durationMinutes: '' 
  });

  // Fetch teacher's classes and existing tests/exams
  useEffect(() => {
    const fetchData = async () => {
      if (!teacherId) return;
      
      try {
        setLoading(true);
        
        // Fetch teacher's classes
        const classesResponse = await teacherAPI.getClasses(teacherId);
        // Extract class names from the classes array
        const classNames = classesResponse.data.data.classes?.map(cls => cls.className) || [];
        setTeacherClasses(classNames);
        
        // Fetch existing exams and tests
        const examsResponse = await teacherAPI.getExams(teacherId);
        console.log('📋 Teacher exams response:', examsResponse.data);
        
        // The API now returns both exams and tests separately
        setExams(examsResponse.data.data.exams || []);
        setTests(examsResponse.data.data.tests || []);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherId]);

  const handleAddTest = () => {
    navigate(`/teacher/${teacherId}/add-test-exam`);
  };

  const handleAddExam = () => {
    navigate(`/teacher/${teacherId}/add-test-exam`);
  };

  const handleDeleteTest = (testId, testTitle) => {
    setSelectedId(testId);
    setSelectedTitle(testTitle);
    setShowDeleteTest(true);
  };

  const handleDeleteExam = (examId, examTitle) => {
    setSelectedId(examId);
    setSelectedTitle(examTitle);
    setShowDeleteExam(true);
  };

  const confirmDeleteTest = async () => {
    setDeleting(true);
    try {
      await teacherAPI.deleteTest(teacherId, selectedId);
      setShowDeleteTest(false);
      setSelectedId('');
      setSelectedTitle('');
      // Refresh the data
      window.location.reload();
    } catch (err) {
      console.error('Error deleting test:', err);
      alert(err.response?.data?.message || 'Failed to delete test');
    } finally {
      setDeleting(false);
    }
  };

  const confirmDeleteExam = async () => {
    setDeleting(true);
    try {
      await teacherAPI.deleteExam(teacherId, selectedId);
      setShowDeleteExam(false);
      setSelectedId('');
      setSelectedTitle('');
      // Refresh the data
      window.location.reload();
    } catch (err) {
      console.error('Error deleting exam:', err);
      alert(err.response?.data?.message || 'Failed to delete exam');
    } finally {
      setDeleting(false);
    }
  };

  const handleEditTest = (test) => {
    // Navigate to edit page with test data
    navigate(`/teacher/${teacherId}/add-test-exam`, { 
      state: { 
        editMode: true, 
        testData: test, 
        activeTab: 'test' 
      } 
    });
  };

  const handleEditExam = (exam) => {
    // Navigate to edit page with exam data
    navigate(`/teacher/${teacherId}/add-test-exam`, { 
      state: { 
        editMode: true, 
        examData: exam, 
        activeTab: 'exam' 
      } 
    });
  };

  const editTest = (test) => {
    setEditTestForm({ ...test })
    setShowEditTest(true)
  }

  const editExam = (exam) => {
    setEditExamForm({ ...exam })
    setShowEditExam(true)
  }

  const saveTestEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await teacherAPI.updateTest(teacherId, editTestForm.id, editTestForm);
      setShowEditTest(false);
      // Refresh the data
      window.location.reload();
    } catch (err) {
      console.error('Error updating test:', err);
      alert(err.response?.data?.message || 'Failed to update test');
    } finally {
      setSaving(false);
    }
  };

  const saveExamEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await teacherAPI.updateExam(teacherId, editExamForm.id, editExamForm);
      setShowEditExam(false);
      // Refresh the data
      window.location.reload();
    } catch (err) {
      console.error('Error updating exam:', err);
      alert(err.response?.data?.message || 'Failed to update exam');
    } finally {
      setSaving(false);
    }
  };

  const getDaysUntil = (date) => {
    const today = new Date()
    const target = new Date(date)
    const diffTime = target - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (loading) {
    return (
      <div className='p-6'>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto'></div>
            <p className='mt-4 text-gray-600'>Loading tests and exams...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-6'>
        <div className='bg-red-50 border border-red-200 rounded-lg p-6 text-center'>
          <p className='text-red-600 font-semibold'>⚠️ {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className='mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700'
          >
            Retry
          </button>
        </div>
      </div>
    );
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
              <button onClick={handleAddTest} className='bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors'>
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
                          <button onClick={() => handleEditTest(test)} className='px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm'>
                            Edit
                          </button>
                          <button onClick={() => handleDeleteTest(test.id, test.title)} className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm'>
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
              <button onClick={handleAddExam} className='bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors'>
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
                          <button onClick={() => handleEditExam(exam)} className='px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm'>
                            Edit
                          </button>
                          <button onClick={() => handleDeleteExam(exam.id, exam.title)} className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm'>
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



      {/* Professional Edit Test Modal */}
      {showEditTest && (
        <div className='fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto'>
            {/* Header */}
            <div className='bg-gradient-to-r from-green-500 to-green-600 rounded-t-2xl p-6 text-white sticky top-0'>
              <div className='flex items-center justify-center mb-2'>
                <div className='w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center'>
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                  </svg>
                </div>
              </div>
              <h3 className='text-xl font-bold text-center'>Edit Test</h3>
              <p className='text-center text-green-100 text-sm mt-1'>Update test information</p>
            </div>
            
            {/* Content */}
            <div className='p-6'>
              <form onSubmit={saveTestEdit} className='space-y-6'>
                {/* Title */}
              <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Test Title *
                  </label>
                  <input 
                    name='title' 
                    value={editTestForm.title} 
                    onChange={(e) => setEditTestForm({...editTestForm, title: e.target.value})} 
                    className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200' 
                    placeholder='Enter test title...'
                    required 
                  />
              </div>

                {/* Date and Time */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Date *
                    </label>
                    <input 
                      type='date' 
                      name='date' 
                      value={editTestForm.date} 
                      onChange={(e) => setEditTestForm({...editTestForm, date: e.target.value})} 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200' 
                      required 
                    />
                </div>
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Time *
                    </label>
                    <input 
                      type='text' 
                      name='time' 
                      placeholder='HH:MM - HH:MM' 
                      value={editTestForm.time} 
                      onChange={(e) => setEditTestForm({...editTestForm, time: e.target.value})} 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200' 
                      required 
                    />
                </div>
              </div>

                {/* Class and Duration */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Class *
                    </label>
                    <input 
                      name='className' 
                      value={editTestForm.className} 
                      onChange={(e) => setEditTestForm({...editTestForm, className: e.target.value})} 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200' 
                      required 
                    />
                </div>
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Duration *
                    </label>
                    <input 
                      name='duration' 
                      placeholder='e.g., 30 min' 
                      value={editTestForm.duration} 
                      onChange={(e) => setEditTestForm({...editTestForm, duration: e.target.value})} 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200' 
                      required 
                    />
                </div>
          </div>

                {/* Location */}
          <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Location *
                  </label>
                  <input 
                    name='location' 
                    value={editTestForm.location} 
                    onChange={(e) => setEditTestForm({...editTestForm, location: e.target.value})} 
                    className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200' 
                    required 
                  />
              </div>

                {/* Actions */}
                <div className='flex gap-4 pt-6 border-t border-gray-200'>
                  <button 
                    type='button' 
                    onClick={() => setShowEditTest(false)} 
                    className='flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105'
                    disabled={saving}
                  >
                  Cancel
                </button>
                  <button 
                    type='submit' 
                    disabled={saving}
                    className='flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                  >
                    {saving ? (
                      <>
                        <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' fill='none' viewBox='0 0 24 24'>
                          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                          <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                        </svg>
                        Save Changes
                      </>
                    )}
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}

      {/* Professional Edit Exam Modal */}
      {showEditExam && (
        <div className='fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto'>
            {/* Header */}
            <div className='bg-gradient-to-r from-red-500 to-red-600 rounded-t-2xl p-6 text-white sticky top-0'>
              <div className='flex items-center justify-center mb-2'>
                <div className='w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center'>
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                  </svg>
                </div>
              </div>
              <h3 className='text-xl font-bold text-center'>Edit Exam</h3>
              <p className='text-center text-red-100 text-sm mt-1'>Update exam information</p>
                </div>
            
            {/* Content */}
            <div className='p-6'>
              <form onSubmit={saveExamEdit} className='space-y-6'>
                {/* Title */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Exam Title *
                  </label>
                  <input 
                    name='title' 
                    value={editExamForm.title} 
                    onChange={(e) => setEditExamForm({...editExamForm, title: e.target.value})} 
                    className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200' 
                    placeholder='Enter exam title...'
                    required 
                  />
        </div>

                {/* Date and Time */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Date *
                    </label>
                    <input 
                      type='date' 
                      name='date' 
                      value={editExamForm.date} 
                      onChange={(e) => setEditExamForm({...editExamForm, date: e.target.value})} 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200' 
                      required 
                    />
                </div>
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Time *
                    </label>
                    <input 
                      type='text' 
                      name='time' 
                      placeholder='HH:MM - HH:MM' 
                      value={editExamForm.time} 
                      onChange={(e) => setEditExamForm({...editExamForm, time: e.target.value})} 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200' 
                      required 
                    />
                </div>
              </div>

                {/* Class and Duration */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Class *
                    </label>
                    <input 
                      name='className' 
                      value={editExamForm.className} 
                      onChange={(e) => setEditExamForm({...editExamForm, className: e.target.value})} 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200' 
                      required 
                    />
                </div>
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Duration *
                    </label>
                    <input 
                      name='duration' 
                      placeholder='e.g., 2 hours' 
                      value={editExamForm.duration} 
                      onChange={(e) => setEditExamForm({...editExamForm, duration: e.target.value})} 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200' 
                      required 
                    />
                </div>
              </div>

                {/* Location */}
              <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Location *
                  </label>
                  <input 
                    name='location' 
                    value={editExamForm.location} 
                    onChange={(e) => setEditExamForm({...editExamForm, location: e.target.value})} 
                    className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200' 
                    required 
                  />
              </div>

                {/* Actions */}
                <div className='flex gap-4 pt-6 border-t border-gray-200'>
                  <button 
                    type='button' 
                    onClick={() => setShowEditExam(false)} 
                    className='flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105'
                    disabled={saving}
                  >
                  Cancel
                </button>
                  <button 
                    type='submit' 
                    disabled={saving}
                    className='flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                  >
                    {saving ? (
                      <>
                        <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' fill='none' viewBox='0 0 24 24'>
                          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                          <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                        </svg>
                  Save Changes
                      </>
                    )}
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}

      {/* Professional Delete Test Modal */}
      {showDeleteTest && (
        <div className='fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100'>
            {/* Header */}
            <div className='bg-gradient-to-r from-red-500 to-red-600 rounded-t-2xl p-6 text-white'>
              <div className='flex items-center justify-center mb-2'>
                <div className='w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center'>
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                  </svg>
                </div>
              </div>
              <h3 className='text-xl font-bold text-center'>Delete Test</h3>
            </div>
            
            {/* Content */}
            <div className='p-6'>
              <div className='text-center mb-6'>
                <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg className='w-8 h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' />
                  </svg>
                </div>
                <h4 className='text-lg font-semibold text-gray-800 mb-2'>Are you absolutely sure?</h4>
                <p className='text-gray-600 mb-4'>
                  You are about to delete the test <span className='font-semibold text-red-600'>"{selectedTitle}"</span>
                </p>
                <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                  <p className='text-sm text-red-700'>
                    <strong>⚠️ This action cannot be undone.</strong> All data related to this test will be permanently removed.
                  </p>
                </div>
              </div>
              
              {/* Actions */}
              <div className='flex gap-3'>
                <button 
                  onClick={() => setShowDeleteTest(false)} 
                  className='flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 transform hover:scale-105'
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDeleteTest} 
                  disabled={deleting}
                  className='flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                >
                  {deleting ? (
                    <>
                      <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                      </svg>
                      Delete Test
                    </>
                  )}
                </button>
          </div>
            </div>
      </div>
        </div>
      )}

      {/* Professional Delete Exam Modal */}
      {showDeleteExam && (
        <div className='fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100'>
            {/* Header */}
            <div className='bg-gradient-to-r from-red-500 to-red-600 rounded-t-2xl p-6 text-white'>
              <div className='flex items-center justify-center mb-2'>
                <div className='w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center'>
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                  </svg>
            </div>
              </div>
              <h3 className='text-xl font-bold text-center'>Delete Exam</h3>
            </div>
            
            {/* Content */}
            <div className='p-6'>
              <div className='text-center mb-6'>
                <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg className='w-8 h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' />
                  </svg>
                </div>
                <h4 className='text-lg font-semibold text-gray-800 mb-2'>Are you absolutely sure?</h4>
                <p className='text-gray-600 mb-4'>
                  You are about to delete the exam <span className='font-semibold text-red-600'>"{selectedTitle}"</span>
                </p>
                <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                  <p className='text-sm text-red-700'>
                    <strong>⚠️ This action cannot be undone.</strong> All data related to this exam will be permanently removed.
                  </p>
                    </div>
                    </div>
              
              {/* Actions */}
              <div className='flex gap-3'>
                <button 
                  onClick={() => setShowDeleteExam(false)} 
                  className='flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 transform hover:scale-105'
                  disabled={deleting}
                >
                Cancel
              </button>
                <button 
                  onClick={confirmDeleteExam} 
                  disabled={deleting}
                  className='flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                >
                  {deleting ? (
                    <>
                      <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                      </svg>
                      Delete Exam
                    </>
                  )}
              </button>
              </div>
            </div>
          </div>
      </div>
      )}
    </div>
  )
}




