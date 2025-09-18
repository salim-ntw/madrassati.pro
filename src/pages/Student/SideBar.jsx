import React from 'react'
import profPic from '../../assets/graduated.png'
import sched from "../../assets/icons/timetable.png"
import grade from "../../assets/icons/grade.png"
import homework from "../../assets/icons/homework.png"
import announcement from "../../assets/icons/megaphone.png"
import exam from "../../assets/icons/exam.png"
import logout from "../../assets/icons/logout.png"
import user from "../../assets/icons/user.png"
import home from "../../assets/icons/home.png"
import { Link } from "react-router-dom"; 

export default function SideBar({ setSelectedTab }) {
    const features = [
        { name: 'Home', icon: home, key: '' },
        { name: 'Class Schedule', icon: sched, key: 'schedule' },
        { name: 'Grades', icon: grade, key: 'grades' },
        { name: 'Homework', icon: homework, key: 'homework' },
        { name: 'Exams', icon: exam , key: 'exams'},
        { name: 'Announcements', icon: announcement, key: 'announcements' },
    ]

    return (
        <div className='flex flex-col gap-5 p-4 h-full'>
            
            {/* School name stays outside */}
            <h1 className='text-xl font-bold text-blue-950 bg-white w-full pl-6 rounded-md shadow-sm'>
                Schools name
            </h1>

            {/* Blue box with rounded corners */}
            <div className='w-full bg-blue-900 flex flex-col text-white p-4 items-center justify-center h-full gap-10 rounded-md mt-2'>
                
            {/* Profile Section */}
            <Link
            to="/student/profile"
            className="flex flex-col items-center justify-center gap-3 bg-gray-300 text-black p-6 rounded-md shadow-md w-full max-w-xs hover:bg-gray-200 transition"
            >
                <img
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-900 shadow"
                    src={profPic}
                    alt="profile"
                />
                <div className="flex items-center justify-center gap-2">
                    <h1 className="font-bold text-lg">Student name</h1>
                    <img className="w-4 h-4" src={user} alt="user" />
                </div>
            </Link>

                {/* Features Section */}
               <div className='flex flex-col gap-4 justify-center items-start w-full'>
                    {features.map((feature, i) => (
                        <button 
                        key={i} 
                        onClick={() => setSelectedTab(feature.key)} 
                        className='flex flex-row items-center gap-2 cursor-pointer hover:text-gray-200 px-2 py-1 rounded-md w-full'
                        >
                        <img className='w-6' src={feature.icon} alt={feature.name} />
                        <span>{feature.name}</span>
                        </button>
                    ))}
                </div>

                {/* Logout Button */}
                <div className='flex flex-row items-center justify-center gap-2 cursor-pointer mt-auto bg-gray-300 p-1 rounded-md shadow-md hover:bg-gray-200 transition'>
                    <img className='w-6' src={logout} alt="logout" />
                    <button className='text-black font-medium cursor-pointer'>Logout</button>
                </div>
            </div>
        </div>
    )
}
