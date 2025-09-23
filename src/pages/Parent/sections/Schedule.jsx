import React from 'react'
import ClassSched from '../../Student/ClassSched'

export default function Schedule({ child }) {
  return (
    <div className='p-0'>
      <div className='mb-4 text-gray-700 font-medium'>Schedule · {child?.name}</div>
      <ClassSched studentId={child?.id} />
    </div>
  )
}


