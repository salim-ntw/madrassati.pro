import React from 'react'

export default function Classes() {
  const [classes, setClasses] = React.useState([
    { name: '1A', students: 28, subject: 'Mathematics', room: 'Room 101' },
    { name: '1B', students: 30, subject: 'Science', room: 'Room 102' },
    { name: '2A', students: 27, subject: 'English', room: 'Room 201' },
    { name: '3B', students: 26, subject: 'Mathematics', room: 'Room 302' },
  ])

  return (
    <div className='p-6 animate-fadeIn'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6 animate-slideInDown'>My Classes</h1>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {classes.map((c, idx) => (
          <div key={c.name} className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp' style={{animationDelay: `${idx * 0.1}s`}}>
            <div className='flex items-center justify-between mb-4'>
              <div className='w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl font-bold'>
                {c.name}
              </div>
              <div className='text-right'>
                <div className='text-2xl font-bold text-gray-800'>{c.students}</div>
                <div className='text-sm text-gray-600'>students</div>
              </div>
            </div>
            
            <div className='space-y-2'>
              <div className='flex items-center'>
                <span className='text-sm font-medium text-gray-600 w-16'>Subject:</span>
                <span className='text-gray-800'>{c.subject}</span>
              </div>
              <div className='flex items-center'>
                <span className='text-sm font-medium text-gray-600 w-16'>Room:</span>
                <span className='text-gray-800'>{c.room}</span>
              </div>
            </div>
            
            <div className='mt-4 pt-4 border-t border-gray-200'>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>Average Grade</span>
                <span className='font-semibold text-green-600'>85%</span>
              </div>
              <div className='flex items-center justify-between text-sm mt-1'>
                <span className='text-gray-600'>Attendance</span>
                <span className='font-semibold text-blue-600'>92%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className='mt-8 grid grid-cols-1 md:grid-cols-4 gap-6'>
        <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp' style={{animationDelay: '0.4s'}}>
          <div className='flex items-center'>
            <div className='w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl mr-4'>
              🏫
            </div>
            <div>
              <p className='text-sm font-medium text-gray-600'>Total Classes</p>
              <p className='text-2xl font-bold text-gray-900'>{classes.length}</p>
            </div>
          </div>
        </div>
        
        <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp' style={{animationDelay: '0.5s'}}>
          <div className='flex items-center'>
            <div className='w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl mr-4'>
              👥
            </div>
            <div>
              <p className='text-sm font-medium text-gray-600'>Total Students</p>
              <p className='text-2xl font-bold text-gray-900'>{classes.reduce((sum, c) => sum + c.students, 0)}</p>
            </div>
          </div>
        </div>
        
        <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp' style={{animationDelay: '0.6s'}}>
          <div className='flex items-center'>
            <div className='w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xl mr-4'>
              📚
            </div>
            <div>
              <p className='text-sm font-medium text-gray-600'>Subjects</p>
              <p className='text-2xl font-bold text-gray-900'>{new Set(classes.map(c => c.subject)).size}</p>
            </div>
          </div>
        </div>
        
        <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp' style={{animationDelay: '0.7s'}}>
          <div className='flex items-center'>
            <div className='w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl mr-4'>
              🏠
            </div>
            <div>
              <p className='text-sm font-medium text-gray-600'>Rooms</p>
              <p className='text-2xl font-bold text-gray-900'>{new Set(classes.map(c => c.room)).size}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


