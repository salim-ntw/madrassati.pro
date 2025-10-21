import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { parentAPI } from '../../../api/parent'

export default function Attendance() {
  const { parentId, childId } = useParams()
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const initialLoadDone = useRef(false)
  const lastFetchTime = useRef(null)

  // Fetch attendance data once on mount
  useEffect(() => {
    const fetchAttendanceOnce = async () => {
      if (initialLoadDone.current || !parentId || !childId) return
      
      try {
        setLoading(true)
        const res = await parentAPI.getChildAttendance(parentId, childId)
        const data = res.data?.data
        const attendanceRecords = (data?.attendance || []).map(r => ({
          id: r.id,
          date: new Date(r.date).toLocaleDateString(),
          time: r.time || '-',
          subject: r.subject || 'N/A',
          status: r.status
        }))
        
        setRecords(attendanceRecords)
        setLastUpdated(data?.lastUpdated ? new Date(data.lastUpdated).toLocaleString() : null)
        lastFetchTime.current = new Date()
        initialLoadDone.current = true
        setError(null)
      } catch (e) {
        setError(e?.response?.data?.message || e.message || 'Failed to load attendance')
      } finally {
        setLoading(false)
      }
    }

    fetchAttendanceOnce()
  }, [parentId, childId])

  // Function to add new attendance record (called when teacher marks attendance)
  const addNewRecord = (newRecord) => {
    setRecords(prev => {
      // Check if record already exists to avoid duplicates
      const exists = prev.some(record => 
        record.id === newRecord.id || 
        (record.date === newRecord.date && record.subject === newRecord.subject)
      )
      
      if (exists) return prev
      
      // Add new record and sort by date (newest first)
      const updated = [newRecord, ...prev].sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'))
        const dateB = new Date(b.date.split('/').reverse().join('-'))
        return dateB - dateA
      })
      
      return updated
    })
    
    setLastUpdated(new Date().toLocaleString())
  }

  // Expose addNewRecord function globally for potential WebSocket integration
  useEffect(() => {
    window.addAttendanceRecord = addNewRecord
    return () => {
      delete window.addAttendanceRecord
    }
  }, [])

  if (loading) {
    return (
      <div className='p-6'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading attendance...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-6'>
        <div className='bg-red-50 border border-red-200 rounded-xl p-6 text-center'>
          <p className='text-red-600 font-semibold mb-4'>⚠️ {error}</p>
          <button onClick={() => window.location.reload()} className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700'>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className='p-6 bg-white rounded-xl shadow-lg animate-fadeIn'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold text-gray-800'>Child's Attendance</h2>
        {lastUpdated && <p className='text-sm text-gray-500'>Last Updated: {lastUpdated}</p>}
      </div>
      
      <div className='overflow-x-auto'>
        <table className='min-w-full border border-gray-200 rounded-lg overflow-hidden'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b'>Date</th>
              <th className='text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b'>Time</th>
              <th className='text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b'>Subject</th>
              <th className='text-left px-4 py-3 text-sm font-semibold text-gray-700 border-b'>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? records.map((r) => (
              <tr key={r.id} className='hover:bg-gray-50 transition-colors'>
                <td className='px-4 py-3 border-b font-medium'>{r.date}</td>
                <td className='px-4 py-3 border-b text-gray-600'>{r.time}</td>
                <td className='px-4 py-3 border-b'>
                  <span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium'>
                    {r.subject}
                  </span>
                </td>
                <td className='px-4 py-3 border-b'>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${r.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {r.status === 'Present' ? '✅ Present' : '❌ Absent'}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className='px-4 py-12 text-center text-gray-500'>
                  <div className='flex flex-col items-center'>
                    <div className='text-4xl mb-2'>📅</div>
                    <p className='text-lg font-medium'>No attendance records yet</p>
                    <p className='text-sm'>Attendance will appear here as teachers mark it</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}



