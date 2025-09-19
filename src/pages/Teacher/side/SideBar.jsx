import React from 'react'
import profPic from '../../../assets/graduated.png'
import sched from "../../../assets/icons/timetable.png"
import announcement from "../../../assets/icons/megaphone.png"
import exam from "../../../assets/icons/exam.png"
import logout from "../../../assets/icons/logout.png"
import user from "../../../assets/icons/user.png"
import home from "../../../assets/icons/home.png"
import messages from "../../../assets/icons/communication.png"
import attendance from "../../../assets/icons/protection.png"
import homework from "../../../assets/icons/homework.png"
import grade from "../../../assets/icons/grade.png"
import { Link } from "react-router-dom"

export default function SideBar({ setSelectedTab }) {
    const [activeTab, setActiveTab] = React.useState('')
    
    const features = [
        { name: 'Home', icon: home, key: '', color: 'from-blue-500 to-blue-600' },
        { name: 'My Schedule', icon: sched, key: 'schedule', color: 'from-green-500 to-green-600' },
        { name: 'My Classes', icon: sched, key: 'classes', color: 'from-purple-500 to-purple-600' },
        { name: 'Manage Grades', icon: grade, key: 'manage-grades', color: 'from-yellow-500 to-yellow-600' },
        { name: 'Manage Homework', icon: homework, key: 'manage-homework', color: 'from-orange-500 to-orange-600' },
        { name: 'Exams', icon: exam, key: 'exams', color: 'from-red-500 to-red-600' },
        { name: 'Announcements', icon: announcement, key: 'announcements', color: 'from-pink-500 to-pink-600' },
        { name: 'Messages', icon: messages, key: 'messages', color: 'from-indigo-500 to-indigo-600' },
        { name: 'Attendance', icon: attendance, key: 'attendance', color: 'from-teal-500 to-teal-600' },
        { name: 'Students', icon: user, key: 'create-students', color: 'from-cyan-500 to-cyan-600' },
    ]

    const handleTabClick = (key) => {
        setActiveTab(key)
        setSelectedTab(key)
    }

    return (
        <div className='flex flex-col gap-5 p-4 h-full animate-fadeIn'>
            <div className='bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-xl shadow-lg animate-slideInDown'>
                <h1 className='text-xl font-bold text-center'>
                    🏫 Madrassati School
                </h1>
            </div>

            <div className='w-full bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col text-white p-6 items-center justify-center h-full gap-8 rounded-xl shadow-2xl mt-2 animate-slideInUp'>
                {/* Profile Section */}
                <Link
                    to="/teacher/profile"
                    className="flex flex-col items-center justify-center gap-4 bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-xs transform hover:scale-105 transition-all duration-300 animate-slideInUp"
                    style={{animationDelay: '0.1s'}}
                >
                    <div className="relative">
                        <img className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow-lg" src={profPic} alt="profile" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <h1 className="font-bold text-lg">Ms. Sarah Johnson</h1>
                        <img className="w-4 h-4" src={user} alt="user" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Mathematics Teacher</p>
                        <p className="text-xs text-gray-500">ID: T001</p>
                    </div>
                </Link>

                {/* Navigation Menu */}
                <div className='flex flex-col gap-3 justify-center items-start w-full'>
                    {features.map((feature, i) => (
                        <button 
                            key={i} 
                            onClick={() => handleTabClick(feature.key)} 
                            className={`flex flex-row items-center gap-3 cursor-pointer px-4 py-3 rounded-lg w-full transition-all duration-300 transform hover:scale-105 animate-slideInUp ${
                                activeTab === feature.key 
                                    ? `bg-gradient-to-r ${feature.color} text-white shadow-lg` 
                                    : 'hover:bg-white/10 hover:text-gray-200'
                            }`}
                            style={{animationDelay: `${(i + 2) * 0.1}s`}}
                        >
                            <div className={`p-2 rounded-lg ${activeTab === feature.key ? 'bg-white/20' : 'bg-white/10'}`}>
                                <img className='w-5 h-5' src={feature.icon} alt={feature.name} />
                            </div>
                            <span className="font-medium">{feature.name}</span>
                            {activeTab === feature.key && (
                                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Logout Button */}
                <div className='flex flex-row items-center justify-center gap-3 cursor-pointer mt-auto bg-red-500 hover:bg-red-600 p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp' style={{animationDelay: '1.2s'}}>
                    <img className='w-5 h-5' src={logout} alt="logout" />
                    <button className='text-white font-medium cursor-pointer'>Logout</button>
                </div>
            </div>
        </div>
    )
}


