import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { teacherAPI } from '../../../api/teacher';

export default function AddTestExam() {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're in edit mode
  const editMode = location.state?.editMode || false;
  const editData = location.state?.testData || location.state?.examData || null;
  const initialTab = location.state?.activeTab || 'test';
  
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [submitting, setSubmitting] = useState(false);

  const [teacherProfile, setTeacherProfile] = useState(null);

  const [formData, setFormData] = useState(() => {
    if (editMode && editData) {
      // Convert date to YYYY-MM-DD format for input
      const date = new Date(editData.date);
      const formattedDate = date.toISOString().split('T')[0];
      
      return {
        title: editData.title || '',
        subject: editData.subject || 'Mathematics',
        type: editData.type || 'test',
        date: formattedDate,
        startTime: editData.startTime || '',
        endTime: editData.endTime || '',
        className: editData.className || '',
        room: editData.room || '',
        durationMinutes: editData.durationMinutes || ''
      };
    }
    
    return {
      title: '',
      subject: '', // Will be set from teacher profile
      type: 'test',
      date: '',
      startTime: '',
      endTime: '',
      className: '',
      room: '',
      durationMinutes: ''
    };
  });

  // Fetch teacher's profile and classes
  useEffect(() => {
    const fetchData = async () => {
      if (!teacherId) return;
      
      try {
        setLoading(true);
        
        // Fetch both profile and classes
        const [profileResponse, classesResponse] = await Promise.all([
          teacherAPI.getProfile(teacherId),
          teacherAPI.getClasses(teacherId)
        ]);
        
        console.log('👨‍🏫 Profile API response:', profileResponse.data);
        console.log('📚 Classes API response:', classesResponse.data);
        
        // Set teacher profile
        setTeacherProfile(profileResponse.data.data);
        
        // Extract class names from the classes array
        const classNames = classesResponse.data.data.classes?.map(cls => cls.className) || [];
        console.log('📚 Extracted class names:', classNames);
        setTeacherClasses(classNames);
        
        // Set the subject from teacher profile if not in edit mode
        if (!editMode) {
          const teacherSubject = profileResponse.data.data.subject;
          setFormData(prev => ({
            ...prev,
            subject: teacherSubject
          }));
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherId, editMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData(prev => ({
      ...prev,
      type: tab,
      title: '',
      className: '',
      room: '',
      durationMinutes: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.startTime || !formData.endTime || !formData.className || !formData.room || !formData.durationMinutes) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      console.log(`${editMode ? 'Updating' : 'Creating'} ${activeTab}:`, formData);
      
      let response;
      if (editMode) {
        // Update existing test/exam
        const itemId = editData.id;
        if (activeTab === 'test') {
          response = await teacherAPI.updateTest(teacherId, itemId, formData);
        } else {
          response = await teacherAPI.updateExam(teacherId, itemId, formData);
        }
      } else {
        // Create new test/exam
        if (activeTab === 'test') {
          response = await teacherAPI.addTest(teacherId, formData);
        } else {
          response = await teacherAPI.addExam(teacherId, formData);
        }
      }
      
      console.log(`${activeTab} ${editMode ? 'updated' : 'created'} successfully:`, response.data);
      
      alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} ${editMode ? 'updated' : 'created'} successfully!`);
      
      // Navigate back to exams page
      navigate(`/teacher/${teacherId}/exams`);
      
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'creating'} ${activeTab}:`, error);
      alert(`Failed to ${editMode ? 'update' : 'create'} ${activeTab}: ` + (error.response?.data?.message || error.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/teacher/${teacherId}/exams`);
  };

  if (loading) {
    return (
      <div className='p-6'>
        <div className='flex items-center justify-center min-h-screen'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto'></div>
            <p className='mt-4 text-gray-600'>Loading classes...</p>
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
    <div className='p-6 max-w-4xl mx-auto'>
      {/* Header */}
      <div className='mb-8'>
        <button 
          onClick={handleCancel}
          className='mb-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors'
        >
          <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
          Back to Tests & Exams
        </button>
        
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>
          {editMode ? 'Edit' : 'Add New'} {activeTab === 'test' ? 'Test' : 'Exam'}
        </h1>
        <p className='text-gray-600'>
          {editMode ? 'Update the' : 'Create a new'} {activeTab} for your students
        </p>
      </div>

      {/* Tab Navigation */}
      <div className='flex gap-2 mb-8'>
        <button
          onClick={() => handleTabChange('test')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'test'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
          }`}
        >
          📝 Add Test
        </button>
        <button
          onClick={() => handleTabChange('exam')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'exam'
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-white text-red-600 border-2 border-red-600 hover:bg-red-50'
          }`}
        >
          🎯 Add Exam
        </button>
      </div>

      {/* Form */}
      <div className='bg-white rounded-xl shadow-lg p-8'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Title */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              {activeTab === 'test' ? 'Test' : 'Exam'} Title *
            </label>
            <input
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              placeholder={`Enter ${activeTab} title...`}
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg'
              required
            />
          </div>

          {/* Subject and Type */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Subject * 
                <span className='text-sm text-gray-500 ml-2'>(Your assigned subject)</span>
              </label>
              <input
                name='subject'
                value={formData.subject || ''}
                readOnly
                className='w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-700 cursor-not-allowed'
                placeholder='Loading your subject...'
              />
              {teacherProfile && (
                <p className='text-sm text-green-600 mt-1'>
                  ✅ Subject: {teacherProfile.subject} (locked to your profile)
                </p>
              )}
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                {activeTab === 'test' ? 'Test' : 'Exam'} Type *
              </label>
              <select
                name='type'
                value={formData.type}
                onChange={handleInputChange}
                className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              >
                {activeTab === 'test' ? (
                  <>
                    <option value='test'>Test</option>
                    <option value='quiz'>Quiz</option>
                    <option value='midterm'>Midterm</option>
                  </>
                ) : (
                  <>
                    <option value='exam'>Regular Exam</option>
                    <option value='final'>Final Exam</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Date and Class */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Date *</label>
              <input
                type='date'
                name='date'
                value={formData.date}
                onChange={handleInputChange}
                className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Class *</label>
                  <select
                    name='className'
                    value={formData.className}
                    onChange={handleInputChange}
                    className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                  >
                    <option value=''>Select a class</option>
                    {teacherClasses.length > 0 ? (
                      teacherClasses.map((className) => (
                        <option key={className} value={className}>{className}</option>
                      ))
                    ) : (
                      <option disabled>Loading classes...</option>
                    )}
                  </select>
                  {teacherClasses.length > 0 && (
                    <p className='text-sm text-green-600 mt-1'>
                      ✅ {teacherClasses.length} classes loaded: {teacherClasses.join(', ')}
                    </p>
                  )}
            </div>
          </div>

          {/* Time Fields */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Start Time *</label>
              <input
                type='time'
                name='startTime'
                value={formData.startTime}
                onChange={handleInputChange}
                className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>End Time *</label>
              <input
                type='time'
                name='endTime'
                value={formData.endTime}
                onChange={handleInputChange}
                className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Duration (minutes) *</label>
              <input
                type='number'
                name='durationMinutes'
                value={formData.durationMinutes}
                onChange={handleInputChange}
                placeholder='e.g., 60'
                min='1'
                className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>
          </div>

          {/* Room */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Room/Location *</label>
            <input
              name='room'
              value={formData.room}
              onChange={handleInputChange}
              placeholder='e.g., Room 101, Lab 2'
              className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end gap-4 pt-6 border-t border-gray-200'>
            <button
              type='button'
              onClick={handleCancel}
              className='px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={submitting}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'test'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {submitting ? (
                <span className='flex items-center'>
                  <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  {editMode ? 'Updating...' : 'Creating...'}
                </span>
              ) : (
                `${editMode ? 'Update' : 'Create'} ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Info Section */}
      <div className='mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6'>
        <h3 className='text-lg font-semibold text-blue-800 mb-2'>
          📋 Information
        </h3>
        <ul className='text-blue-700 space-y-1'>
          <li>• All fields marked with * are required</li>
          <li>• The {activeTab} will be automatically visible to all students in the selected class</li>
          <li>• Parents of students in that class will also see this {activeTab}</li>
          <li>• You can edit or delete the {activeTab} later from the main Tests & Exams page</li>
        </ul>
      </div>
    </div>
  );
}
