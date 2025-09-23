import React from 'react'
import StudentGrades from '../../Student/Grades'

export default function Grades({ child }) {
  return (
    <div className='p-0'>
      <div className='mb-4 text-gray-700 font-medium'>Grades · {child?.name}</div>
      <StudentGrades studentId={child?.id} />
    </div>
  )
}


