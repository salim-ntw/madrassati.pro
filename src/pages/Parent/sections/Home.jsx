import React from 'react'
import { useOutletContext } from 'react-router-dom';

export default function Home() {
  const { children = [], selectedChild } = useOutletContext();
  
  return (
    <div className='flex flex-col gap-4 md:gap-6 mobile-padding'>
      <h2 className='text-xl md:text-2xl font-semibold'>Dashboard - {selectedChild?.name || 'Child'}</h2>
      <p className='text-sm md:text-base text-gray-700'>Overview of {selectedChild?.name}'s progress and activities.</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mobile-grid-2'>
        <div className='bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100 mobile-card'>
          <p className='text-xs md:text-sm text-gray-500 mb-2'>Attendance</p>
          <p className='text-2xl md:text-3xl font-bold text-green-600'>98%</p>
        </div>
        <div className='bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100 mobile-card'>
          <p className='text-xs md:text-sm text-gray-500 mb-2'>GPA</p>
          <p className='text-2xl md:text-3xl font-bold text-blue-600'>{selectedChild?.gpa || 'N/A'}</p>
        </div>
        <div className='bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100 mobile-card'>
          <p className='text-xs md:text-sm text-gray-500 mb-2'>Grade Level</p>
          <p className='text-2xl md:text-3xl font-bold text-purple-600'>{selectedChild?.grade || 'N/A'}</p>
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
        <h3 className='text-xl font-semibold mb-4'>All Your Children</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {children.map((c) => (
          <div key={c.id} className='bg-white rounded-xl shadow p-4 border border-gray-100'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center'>
                {c.name.split(' ').map(p=>p[0]).slice(0,2).join('')}
              </div>
              <div>
                <p className='font-medium text-gray-900'>{c.name}</p>
                <p className='text-xs text-gray-500'>Grade {c.grade}</p>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-2 text-center'>
              <div className='bg-gray-50 rounded p-2'>
                <p className='text-xs text-gray-500'>Attendance</p>
                <p className='font-semibold text-gray-800'>98%</p>
              </div>
              <div className='bg-gray-50 rounded p-2'>
                <p className='text-xs text-gray-500'>Average</p>
                <p className='font-semibold text-gray-800'>15.2</p>
              </div>
              <div className='bg-gray-50 rounded p-2'>
                <p className='text-xs text-gray-500'>Homework</p>
                <p className='font-semibold text-gray-800'>On track</p>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}



