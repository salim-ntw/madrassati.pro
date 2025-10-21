import React from 'react'
import { teacherAPI } from '../../../api/teacher'
import { useParams } from 'react-router-dom'

export default function Attendance() {
  const { teacherId } = useParams()
  const [classes, setClasses] = React.useState([])
  const [studentsByClass, setStudentsByClass] = React.useState({})
  const [activeClass, setActiveClass] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [teacherSubject, setTeacherSubject] = React.useState('Mathematics') // Temporary fallback

  // Fetch attendance data on component mount
  React.useEffect(() => {
    fetchAttendanceData()
  }, [teacherId])


  const fetchAttendanceData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('📊 Fetching attendance data for teacher:', teacherId)
      
      // Fetch both attendance data and teacher profile to get subject
      const [attendanceResponse, profileResponse] = await Promise.all([
        teacherAPI.getAttendance(teacherId),
        teacherAPI.getProfile(teacherId)
      ])
      
      if (attendanceResponse.data.success) {
        const { classes: teacherClasses, studentsByClass: students } = attendanceResponse.data.data
        
        console.log('✅ Attendance data fetched:', { teacherClasses, students })
        
        setClasses(teacherClasses)
        setStudentsByClass(students)
        
        // Set active class to first available class
        if (teacherClasses.length > 0) {
          setActiveClass(teacherClasses[0])
        }
      } else {
        setError(attendanceResponse.data.error || 'Failed to fetch attendance data')
      }
      
      if (profileResponse.data.success) {
        const teacherData = profileResponse.data.data
        setTeacherSubject(teacherData.subject || 'General')
      } else {
        setTeacherSubject('General') // Fallback
      }
    } catch (error) {
      console.error('❌ Error fetching attendance:', error)
      setError('Failed to fetch attendance data')
    } finally {
      setLoading(false)
    }
  }

  // Fetch students for a specific class
  const fetchStudentsForClass = async (className) => {
    try {
      console.log('📊 Fetching students for class:', className)
      const response = await teacherAPI.getAttendanceByClassName(className)
      
      if (response.data.success) {
        const { students } = response.data.data
        console.log(`✅ Found ${students.length} students in ${className}`)
        
        setStudentsByClass(prev => ({
          ...prev,
          [className]: students
        }))
      }
    } catch (error) {
      console.error('❌ Error fetching students for class:', error)
    }
  }

  // Handle class tab click
  const handleClassClick = (className) => {
    setActiveClass(className)
    // If we don't have students for this class, fetch them
    if (!studentsByClass[className] || studentsByClass[className].length === 0) {
      fetchStudentsForClass(className)
    }
  }

  const togglePresence = async (studentId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Present' ? 'Absent' : 'Present'
      
      console.log('🔄 Toggling attendance for student:', studentId, 'to:', newStatus)

      // Call unified attendance mark endpoint
      const response = await teacherAPI.markAttendance({
        studentId,
        teacherId,
        className: activeClass,
        subject: teacherSubject,
        status: newStatus
      })

      if (response.data.success) {
        // Update the local state immediately for instant UI feedback
        setStudentsByClass(prev => {
          const list = prev[activeClass] || []
          const updated = list.map(s => 
            s._id === studentId 
              ? { ...s, status: newStatus, overallAttendance: response.data.data.overallAttendance }
              : s
          )
          return { ...prev, [activeClass]: updated }
        })

        // Notify parent pages about the new attendance record
        const newRecord = {
          id: response.data.data._id,
          date: new Date().toLocaleDateString(),
          time: response.data.data.time || new Date().toLocaleTimeString(),
          subject: teacherSubject,
          status: newStatus
        }

        // Trigger update for any open parent attendance pages
        if (window.addAttendanceRecord) {
          window.addAttendanceRecord(newRecord)
        }

        console.log('✅ Attendance updated successfully')
      }
    } catch (error) {
      console.error('❌ Error toggling attendance:', error)
      setError('Failed to update attendance')
    }
  }

  const currentStudents = studentsByClass[activeClass] || []

  if (loading) {
    return (
      <div className='p-6 animate-fadeIn'>
        <h2 className='text-2xl font-bold mb-4 animate-slideInDown'>Attendance</h2>
        <div className='flex justify-center items-center h-64'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4'></div>
            <p className='text-gray-600'>Loading attendance data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-6 animate-fadeIn'>
        <h2 className='text-2xl font-bold mb-4 animate-slideInDown'>Attendance</h2>
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          <p className='font-bold'>Error:</p>
          <p>{error}</p>
          <button 
            onClick={fetchAttendanceData}
            className='mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='p-6 animate-fadeIn'>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold animate-slideInDown'>Attendance</h2>
        <p className='text-sm text-gray-600 mt-1'>
          Subject: <span className='font-semibold text-blue-900'>{teacherSubject}</span>
        </p>
      </div>

      {classes.length > 0 ? (
        <>
          <div className='flex gap-2 mb-4 flex-wrap'>
            {classes.map((className) => (
              <button 
                key={className} 
                onClick={() => handleClassClick(className)}
                className={`px-3 py-1 rounded-md border transition-colors ${
                  activeClass === className 
                    ? 'bg-blue-900 text-white border-blue-900' 
                    : 'bg-white text-blue-900 border-blue-900 hover:bg-blue-50'
                }`}
              >
                {className}
              </button>
            ))}
          </div>

          <div className='bg-white rounded-xl shadow overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='bg-blue-900 text-white'>
                    <th className='p-3 text-left'>Student</th>
                    <th className='p-3 text-left'>ID</th>
                    <th className='p-3 text-left'>Status</th>
                    <th className='p-3 text-left'>Overall Attendance</th>
                    <th className='p-3 text-left'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.length > 0 ? (
                    currentStudents.map((student, idx) => (
                      <tr 
                        key={student._id} 
                        className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-100 transition-colors`}
                      >
                        <td className='p-3 font-semibold'>{student.name}</td>
                        <td className='p-3 text-gray-600'>{student._id.slice(-6)}</td>
                        <td className='p-3'>
                          <span className={`px-2 py-1 rounded text-sm font-medium ${
                            student.status === 'Present' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className='p-3 text-gray-600'>
                          {student.overallAttendance}%
                        </td>
                        <td className='p-3'>
                          <button 
                            onClick={() => togglePresence(student._id, student.status)}
                            className='px-3 py-1 rounded bg-blue-900 text-white text-sm hover:bg-blue-800 transition-colors'
                          >
                            Mark {student.status === 'Present' ? 'Absent' : 'Present'}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className='p-8 text-center text-gray-500'>
                        No students found in {activeClass}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className='bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded'>
          <p className='font-bold'>No Classes Assigned</p>
          <p>This teacher is not assigned to any classes yet.</p>
        </div>
      )}
    </div>
  )
}


