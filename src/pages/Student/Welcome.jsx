import React from 'react'
import picture from "../../assets/welcome.jpg"
export default function Welcome() {
  return (
    <div className=' text-blue-900 bg-white p-4 pl-8 rounded-lg shadow-md flex flex-row gap-10'>
        <div className='flex flex-col gap-3 max-w-lg '>
            <h1 className='font-medium'>Welcome back, userName</h1>
            <p>Here you can quickly check your schedule, view grades, follow announcements, and stay updated with everything happening in your school.</p>
            </div>
        <div>
            <img className='w-55 h-40' src={picture} alt="welcome img" />
        </div>
    </div>
  )
}
