import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { teacherAPI } from '../../../api/teacher';

export default function CreateStudents() {
  const { teacherId } = useParams();
  
  const [studentsByClass, setStudentsByClass] = useState({});
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalStudents, setTotalStudents] = useState(0);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form, setForm] = useState({ fullName: '', className: '', email: '', averageGrade: '', attendance: '' });
  const [editForm, setEditForm] = useState({ id: '', fullName: '', email: '', className: '', averageGrade: '', attendance: '' });
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch students data from backend
  useEffect(() => {
    const fetchStudents = async () => {
      if (!teacherId) return;
      
      try {
        setLoading(true);
        const response = await teacherAPI.getStudents(teacherId);
        console.log('📚 Students API response:', response.data);
        
        const { studentsByClass, classes, totalStudents } = response.data.data;
        setStudentsByClass(studentsByClass);
        setTeacherClasses(classes);
        setTotalStudents(totalStudents);
        setError(null);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [teacherId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.className || !form.email) return;
    
    try {
      setSaving(true);
      const response = await teacherAPI.addStudent(teacherId, {
        fullName: form.fullName,
        email: form.email,
        className: form.className,
        averageGrade: form.averageGrade || null,
        attendance: form.attendance || null
      });
      
      console.log('✅ Student created:', response.data);
      
      // Refresh the students list
      const studentsResponse = await teacherAPI.getStudents(teacherId);
      const { studentsByClass, totalStudents } = studentsResponse.data.data;
      setStudentsByClass(studentsByClass);
      setTotalStudents(totalStudents);
      
      setForm({ fullName: '', className: '', email: '', averageGrade: '', attendance: '' });
      setShowAdd(false);
    } catch (err) {
      console.error('❌ Error adding student:', err);
      setError(err.response?.data?.message || err.message || 'Failed to add student');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await teacherAPI.deleteStudent(teacherId, selectedStudent._id);
      
      console.log('✅ Student deleted:', selectedStudent.fullName);
      
      // Refresh the students list
      const studentsResponse = await teacherAPI.getStudents(teacherId);
      const { studentsByClass, totalStudents } = studentsResponse.data.data;
      setStudentsByClass(studentsByClass);
      setTotalStudents(totalStudents);
      
      setShowDelete(false);
      setSelectedStudent(null);
    } catch (err) {
      console.error('❌ Error deleting student:', err);
      setError(err.response?.data?.message || err.message || 'Failed to delete student');
    } finally {
      setDeleting(false);
    }
  };

  const startEdit = (student) => {
    setEditForm({ 
      id: student._id, 
      fullName: student.fullName, 
      email: student.email,
      className: student.className,
      averageGrade: student.averageGrade === 'N/A' ? '' : student.averageGrade,
      attendance: student.attendance === 'N/A' ? '' : student.attendance.replace('%', '')
    });
    setSelectedStudent(student);
    setShowEdit(true);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (!editForm.fullName || !editForm.email) return;
    
    try {
      setSaving(true);
      const updateData = {
        fullName: editForm.fullName,
        email: editForm.email,
        className: editForm.className,
        averageGrade: editForm.averageGrade || null,
        attendance: editForm.attendance || null
      };
      
      const response = await teacherAPI.updateStudent(teacherId, editForm.id, updateData);
      
      console.log('✅ Student updated:', response.data);
      
      // Refresh the students list
      const studentsResponse = await teacherAPI.getStudents(teacherId);
      const { studentsByClass, totalStudents } = studentsResponse.data.data;
      setStudentsByClass(studentsByClass);
      setTotalStudents(totalStudents);
      
      setShowEdit(false);
      setSelectedStudent(null);
    } catch (err) {
      console.error('❌ Error updating student:', err);
      setError(err.response?.data?.message || err.message || 'Failed to update student');
    } finally {
      setSaving(false);
    }
  };

  const getGradeColor = (grade) => {
    if (grade === 'A' || grade === 'A-') return 'text-green-600 bg-green-100';
    if (grade === 'B+' || grade === 'B') return 'text-blue-600 bg-blue-100';
    if (grade === 'B-' || grade === 'C+') return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getAttendanceColor = (attendance) => {
    const percentage = parseInt(attendance);
    if (percentage >= 95) return 'text-green-600 bg-green-100';
    if (percentage >= 85) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (loading) {
    return (
      <div className='p-6'>
        <div className='flex items-center justify-center h-64'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
            <p className='text-gray-600'>Loading students...</p>
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
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden'>
      {/* Header Section */}
      <div className='bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40'>
        <div className='w-full px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div className='flex-1 min-w-0'>
              <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 truncate'>Students Management</h1>
              <div className='flex flex-wrap items-center gap-3 text-sm sm:text-base lg:text-lg text-gray-600'>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                  <span><span className='font-semibold text-blue-600'>{totalStudents}</span> students</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <span><span className='font-semibold text-green-600'>{teacherClasses.length}</span> classes</span>
                </div>
              </div>
            </div>
            <div className='flex-shrink-0'>
              <button 
                onClick={() => setShowAdd(true)} 
                className='w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-base lg:text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 lg:gap-3'
              >
                <svg className='w-4 h-4 lg:w-5 lg:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                </svg>
                <span className='hidden sm:inline'>Add Student</span>
                <span className='sm:hidden'>Add</span>
        </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8'>
        <div className='space-y-6 lg:space-y-8'>
          {teacherClasses.map((className) => {
            const students = studentsByClass[className] || [];
            return (
              <div key={className} className='bg-white rounded-xl lg:rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300'>
                <div className='bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-4 sm:p-6 lg:p-8'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                    <div className='flex items-center gap-3 min-w-0 flex-1'>
                      <div className='w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center backdrop-blur-sm flex-shrink-0'>
                        <svg className='w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
                        </svg>
                      </div>
                      <div className='min-w-0 flex-1'>
                        <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold truncate'>Class {className}</h2>
                        <p className='text-blue-100 text-xs sm:text-sm lg:text-base'>Student Management</p>
                      </div>
                    </div>
                    <div className='flex-shrink-0'>
                      <div className='bg-white/20 backdrop-blur-sm rounded-lg lg:rounded-xl px-4 py-2 lg:px-6 lg:py-3'>
                        <div className='flex items-center gap-2 lg:gap-3'>
                          <svg className='w-4 h-4 lg:w-5 lg:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                          </svg>
                          <span className='text-sm lg:text-lg font-semibold'>{students.length} student{students.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>
              </div>
            </div>
            
                {students.length > 0 ? (
            <div className='bg-gray-50/50 overflow-hidden'>
            <div className='overflow-x-auto'>
                <table className='w-full min-w-full'>
                      <thead className='bg-gray-100 border-b-2 border-gray-300'>
                        <tr>
                          <th className='px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider'>ID</th>
                          <th className='px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider'>Name</th>
                          <th className='px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider hidden sm:table-cell'>Email</th>
                          <th className='px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider'>Grade</th>
                          <th className='px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider hidden lg:table-cell'>Attendance</th>
                          <th className='px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wider'>Actions</th>
                  </tr>
                </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        {students.map((student, idx) => (
                          <tr key={student._id} className='hover:bg-blue-50/50 transition-all duration-200 group'>
                            <td className='px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6 whitespace-nowrap'>
                              <div className='text-xs sm:text-sm font-bold text-gray-800 font-mono bg-gray-100 px-2 py-1 sm:px-3 sm:py-2 rounded-lg inline-block'>
                                {student._id.substring(0, 6)}...
                              </div>
                            </td>
                            <td className='px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6 whitespace-nowrap'>
                              <div className='flex items-center'>
                                <div className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3 lg:mr-4 shadow-sm flex-shrink-0'>
                                  <svg className='w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                  </svg>
                                </div>
                                <div className='min-w-0 flex-1'>
                                  <div className='text-sm sm:text-base lg:text-lg font-bold text-gray-900 truncate'>{student.fullName}</div>
                                  <div className='text-xs sm:text-sm text-gray-500 hidden sm:block'>Student</div>
                                  <div className='text-xs text-gray-500 sm:hidden truncate'>{student.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className='px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6 whitespace-nowrap hidden sm:table-cell'>
                              <div className='text-sm sm:text-base text-gray-700 font-medium truncate max-w-xs'>{student.email}</div>
                            </td>
                            <td className='px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6 whitespace-nowrap text-center'>
                              <span className={`inline-flex px-2 sm:px-3 lg:px-4 py-1 sm:py-2 text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl shadow-sm ${getGradeColor(student.averageGrade)}`}>
                                {student.averageGrade}
                        </span>
                      </td>
                            <td className='px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6 whitespace-nowrap text-center hidden lg:table-cell'>
                              <span className={`inline-flex px-2 sm:px-3 lg:px-4 py-1 sm:py-2 text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl shadow-sm ${getAttendanceColor(student.attendance)}`}>
                                {student.attendance}
                        </span>
                      </td>
                            <td className='px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6 whitespace-nowrap text-center'>
                              <div className='flex gap-1 sm:gap-2 justify-center'>
                          <button 
                                  onClick={() => startEdit({...student, className})} 
                                  className='inline-flex items-center px-2 sm:px-3 lg:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg'
                          >
                                  <svg className='w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                                  </svg>
                                  <span className='hidden sm:inline'>Edit</span>
                          </button>
                          <button 
                                  onClick={() => handleDelete({...student, className})} 
                                  className='inline-flex items-center px-2 sm:px-3 lg:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-md hover:shadow-lg'
                          >
                                  <svg className='w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                  </svg>
                                  <span className='hidden sm:inline'>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
                ) : (
                  <div className='p-8 sm:p-12 lg:p-16 text-center bg-gradient-to-br from-gray-50 to-gray-100'>
                    <div className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg'>
                      <svg className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
                      </svg>
                    </div>
                    <h3 className='text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4'>No students enrolled</h3>
                    <p className='text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto px-4'>This class doesn't have any students yet. Add the first student to get started with managing this class.</p>
                    <button 
                      onClick={() => setShowAdd(true)} 
                      className='inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 border border-transparent text-base sm:text-lg font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'
                    >
                      <svg className='w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                      </svg>
                      <span className='hidden sm:inline'>Add the first student</span>
                      <span className='sm:hidden'>Add Student</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          </div>
      </div>

      {/* Add Student Modal */}
      {showAdd && (
          <div className='fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4'>
            <div className='bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl sm:max-w-3xl max-h-[95vh] overflow-hidden flex flex-col mx-2 sm:mx-0'>
              {/* Header */}
              <div className='bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-4 sm:p-6 lg:p-8 text-white'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3 sm:gap-4 min-w-0 flex-1'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm flex-shrink-0'>
                    <svg className='w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                    </svg>
                  </div>
                     <div className='min-w-0 flex-1'>
                       <h3 className='text-lg sm:text-xl lg:text-2xl font-bold truncate'>Add New Student</h3>
                       <p className='text-blue-100 text-sm sm:text-base lg:text-lg'>Create a new student account</p>
                     </div>
                </div>
                <button
                  onClick={() => setShowAdd(false)}
                  className='w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors'
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className='flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50/30'>
              <form id='add-student-form' onSubmit={handleAdd} className='space-y-6 sm:space-y-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8'>
                <div>
                    <label className='block text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4'>Full Name *</label>
                    <input 
                      name='fullName' 
                      value={form.fullName} 
                      onChange={handleChange} 
                      className='w-full border-2 border-gray-300 rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm' 
                      placeholder='Enter student full name'
                      required 
                    />
                </div>
                <div>
                    <label className='block text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4'>Email *</label>
                    <input 
                      name='email' 
                      type='email' 
                      value={form.email} 
                      onChange={handleChange} 
                      className='w-full border-2 border-gray-300 rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm' 
                      placeholder='Enter student email'
                      required 
                    />
                </div>
              </div>
              
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8'>
                <div>
                    <label className='block text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4'>Class *</label>
                    <select 
                      name='className' 
                      value={form.className} 
                      onChange={handleChange} 
                      className='w-full border-2 border-gray-300 rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm' 
                      required
                    >
                    <option value=''>Select Class</option>
                      {teacherClasses.map(className => (
                        <option key={className} value={className}>Class {className}</option>
                      ))}
                  </select>
                </div>
                <div>
                    <label className='block text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4'>Average Grade</label>
                    <input 
                      name='averageGrade' 
                      value={form.averageGrade} 
                      onChange={handleChange} 
                      className='w-full border-2 border-gray-300 rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm' 
                      placeholder='e.g., A, B+, C-'
                    />
                </div>
              </div>
              
              <div>
                  <label className='block text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4'>Attendance %</label>
                  <input 
                    name='attendance' 
                    type='number' 
                    min='0' 
                    max='100' 
                    value={form.attendance} 
                    onChange={handleChange} 
                    className='w-full border-2 border-gray-300 rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm' 
                    placeholder='Enter attendance percentage'
                  />
                </div>
              
              </form>
              </div>
              
            {/* Footer */}
            <div className='border-t border-gray-200 p-4 sm:p-6 lg:p-8 bg-white'>
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end'>
                   <button 
                     type='button' 
                     onClick={() => setShowAdd(false)} 
                     disabled={saving}
                     className='w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 text-base sm:text-lg font-bold rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'
                   >
                  Cancel
                </button>
                   <button 
                     type='submit' 
                     form='add-student-form'
                     disabled={saving}
                     className='w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-base sm:text-lg font-bold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl'
                   >
                  {saving ? (
                    <>
                      <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                      </svg>
                  Add Student
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEdit && (
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col'>
            {/* Header */}
            <div className='bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 text-white'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                    </svg>
                  </div>
                  <div>
                    <h3 className='text-xl font-bold'>Edit Student</h3>
                    <p className='text-yellow-100 text-base'>Update student information</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEdit(false)}
                  className='w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors'
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className='flex-1 overflow-y-auto p-6'>
              <form id='edit-student-form' onSubmit={saveEdit} className='space-y-6'>
                <div>
                  <label className='block text-base font-semibold text-gray-700 mb-3'>Student ID</label>
                  <input 
                    value={editForm.id} 
                    readOnly 
                    className='w-full border-2 border-gray-200 rounded-lg px-4 py-4 text-base bg-gray-50 text-gray-600' 
                  />
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-base font-semibold text-gray-700 mb-3'>Full Name *</label>
                    <input 
                      value={editForm.fullName} 
                      onChange={(e) => setEditForm({...editForm, fullName: e.target.value})} 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200' 
                      required 
                    />
                  </div>
              <div>
                    <label className='block text-base font-semibold text-gray-700 mb-3'>Email *</label>
                    <input 
                      type='email' 
                      value={editForm.email} 
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})} 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200' 
                      required 
                    />
                  </div>
              </div>
              
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-base font-semibold text-gray-700 mb-3'>Class</label>
                    <select 
                      value={editForm.className} 
                      onChange={(e) => setEditForm({...editForm, className: e.target.value})} 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200'
                    >
                      {teacherClasses.map(className => (
                        <option key={className} value={className}>Class {className}</option>
                      ))}
                    </select>
                  </div>
              <div>
                    <label className='block text-base font-semibold text-gray-700 mb-3'>Average Grade</label>
                    <input 
                      value={editForm.averageGrade} 
                      onChange={(e) => setEditForm({...editForm, averageGrade: e.target.value})} 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200' 
                      placeholder='e.g., A, B+, C-'
                    />
                  </div>
              </div>
              
              <div>
                  <label className='block text-base font-semibold text-gray-700 mb-3'>Attendance %</label>
                  <input 
                    type='number' 
                    min='0' 
                    max='100' 
                    value={editForm.attendance} 
                    onChange={(e) => setEditForm({...editForm, attendance: e.target.value})} 
                    className='w-full border-2 border-gray-200 rounded-lg px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200' 
                    placeholder='Enter attendance percentage'
                  />
              </div>
              
              </form>
            </div>
            
            {/* Footer */}
            <div className='border-t border-gray-200 p-6 bg-gray-50'>
              <div className='flex gap-3 justify-end'>
                <button 
                  type='button' 
                  onClick={() => setShowEdit(false)} 
                  disabled={saving}
                  className='px-6 py-3 border border-gray-300 text-gray-700 text-base font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Cancel
                </button>
                <button 
                  type='submit' 
                  form='edit-student-form'
                  disabled={saving}
                  className='px-6 py-3 bg-yellow-600 text-white text-base font-semibold rounded-lg hover:bg-yellow-700 transition-colors duration-150 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {saving ? (
                    <>
                      <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                      </svg>
                  Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDelete && (
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl shadow-2xl w-full max-w-md'>
            {/* Header */}
            <div className='bg-gradient-to-r from-red-500 to-red-600 p-6 text-white'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                    </svg>
                  </div>
                  <div>
                    <h3 className='text-xl font-bold'>Delete Student</h3>
                    <p className='text-red-100 text-base'>This action cannot be undone</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDelete(false)}
                  className='w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors'
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className='p-6'>
              <div className='text-center mb-6'>
                <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg className='w-8 h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' />
                  </svg>
                </div>
                <h4 className='text-xl font-semibold text-gray-800 mb-3'>Are you absolutely sure?</h4>
                <p className='text-lg text-gray-600 mb-4'>
                  You are about to delete <span className='font-semibold text-red-600'>"{selectedStudent?.fullName}"</span>
                </p>
                <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                  <p className='text-base text-red-700'>
                    <strong>⚠️ This action cannot be undone.</strong> All data related to this student will be permanently removed.
                  </p>
                </div>
              </div>
              
              <div className='flex gap-3 justify-end'>
                <button 
                  onClick={() => setShowDelete(false)} 
                  disabled={deleting}
                  className='px-6 py-3 border border-gray-300 text-gray-700 text-base font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                Cancel
              </button>
                <button 
                  onClick={confirmDelete} 
                  disabled={deleting}
                  className='px-6 py-3 bg-red-600 text-white text-base font-semibold rounded-lg hover:bg-red-700 transition-colors duration-150 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {deleting ? (
                    <>
                      <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                      </svg>
                      Delete Student
                    </>
                  )}
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}