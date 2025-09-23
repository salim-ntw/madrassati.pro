import React from 'react'

export default function Home({ allChildren = [] }) {
  return (
    <div className='flex flex-col gap-6'>
      <h2 className='text-2xl font-semibold'>Overview</h2>
      <p className='text-gray-700'>Quick summary across your children.</p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {allChildren.map((c) => (
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
  )
}



