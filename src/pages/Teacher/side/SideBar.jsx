import React, { useState, useEffect } from 'react'
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
import { Link, useNavigate, useParams, useLocation } from "react-router-dom"
import { teacherAPI } from "../../../api/teacher"
import { authAPI, storage } from "../../../utils/auth"

export default function SideBar() {
    const [teacherData, setTeacherData] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()
    const { teacherId } = useParams()
    
    // Fetch teacher data
    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                console.log('👨‍🏫 Fetching teacher data for sidebar...');
                console.log('🆔 Teacher ID from URL:', teacherId);
                
                if (!teacherId) {
                    console.error('❌ No teacherId found in URL params');
                    setLoading(false);
                    return;
                }
                
                const response = await teacherAPI.getProfile(teacherId);
                console.log('✅ Teacher data received:', response.data);
                setTeacherData(response.data.data);
            } catch (error) {
                console.error('❌ Error fetching teacher data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (teacherId) {
            fetchTeacherData();
        }
    }, [teacherId]);

    const features = [
        { name: 'Home', icon: home, path: '', color: 'from-blue-500 to-blue-600' },
        { name: 'My Schedule', icon: sched, path: 'schedule', color: 'from-green-500 to-green-600' },
        { name: 'My Classes', icon: sched, path: 'classes', color: 'from-purple-500 to-purple-600' },
        { name: 'Manage Grades', icon: grade, path: 'manage-grades', color: 'from-yellow-500 to-yellow-600' },
        { name: 'Manage Homework', icon: homework, path: 'manage-homework', color: 'from-orange-500 to-orange-600' },
        { name: 'Exams', icon: exam, path: 'exams', color: 'from-red-500 to-red-600' },
        { name: 'Announcements', icon: announcement, path: 'announcements', color: 'from-pink-500 to-pink-600' },
        { name: 'Messages', icon: messages, path: 'messages', color: 'from-indigo-500 to-indigo-600' },
        { name: 'Attendance', icon: attendance, path: 'attendance', color: 'from-teal-500 to-teal-600' },
    ]

    // Determine if a route is active based on current location
    const isActiveRoute = (path) => {
        if (path === '') {
            return location.pathname === `/teacher/${teacherId}` || location.pathname === `/teacher/${teacherId}/dashboard`;
        }
        return location.pathname === `/teacher/${teacherId}/${path}`;
    }

    const handleLogout = async () => {
        try {
            console.log('🚪 Logging out...');
            
            // Call server-side logout endpoint
            await authAPI.logout();
            console.log('✅ Server-side logout successful');
            
        } catch (error) {
            console.error('⚠️ Server logout failed (continuing with client logout):', error);
        } finally {
            // Always clear client-side storage
            storage.clearUser();
            console.log('✅ Client-side data cleared');
            
            // Redirect to login
            navigate('/login');
        }
    };

    return (
        <div className='flex flex-col gap-5 p-4 h-full animate-fadeIn'>
            <div className='bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-xl shadow-lg animate-slideInDown'>
                <h1 className='text-xl font-bold text-center'>
                    🏫 Madrassati School
                </h1>
            </div>

            <div className='w-full bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col text-white p-6 items-center justify-center h-full gap-8 rounded-xl shadow-2xl mt-2 animate-slideInUp'>
                {/* Teacher Profile Section */}
                <Link
                    to={`/teacher/${teacherId}/profile`}
                    className="flex flex-col items-center justify-center gap-4 bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-xs transform hover:scale-105 transition-all duration-300 animate-slideInUp cursor-pointer"
                    style={{animationDelay: '0.1s'}}
                >
                    <div className="relative">
                        <img className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow-lg" src={profPic} alt="profile" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-2">
                            <h1 className="font-bold text-lg text-center">{loading ? 'Loading...' : (teacherData?.name || 'Teacher')}</h1>
                            <img className="w-4 h-4" src={user} alt="user" />
                        </div>
                        <p className="text-xs text-gray-500">{loading ? 'Loading...' : (teacherData?.subject ? `${teacherData.subject} Teacher` : 'Teacher')}</p>
                    </div>
                </Link>

                {/* Navigation Menu */}
                <div className='flex flex-col gap-3 justify-center items-start w-full'>
                    {features.map((feature, i) => {
                        const isActive = isActiveRoute(feature.path);
                        const linkPath = feature.path === '' ? `/teacher/${teacherId}` : `/teacher/${teacherId}/${feature.path}`;
                        
                        
                        return (
                            <Link 
                                key={i} 
                                to={linkPath}
                                className={`flex flex-row items-center gap-3 cursor-pointer px-4 py-3 rounded-lg w-full transition-all duration-300 transform hover:scale-105 animate-slideInUp ${
                                    isActive
                                        ? `bg-gradient-to-r ${feature.color} text-white shadow-lg` 
                                        : 'hover:bg-white/10 hover:text-gray-200'
                                }`}
                                style={{animationDelay: `${(i + 2) * 0.1}s`}}
                            >
                                <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-white/10'}`}>
                                    <img className='w-5 h-5' src={feature.icon} alt={feature.name} />
                                </div>
                                <span className="font-medium">{feature.name}</span>
                                {isActive && (
                                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Logout Button */}
                <div 
                    onClick={handleLogout}
                    className='flex flex-row items-center justify-center gap-3 cursor-pointer mt-auto bg-red-500 hover:bg-red-600 p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp' 
                    style={{animationDelay: '1.2s'}}
                >
                    <img className='w-5 h-5' src={logout} alt="logout" />
                    <button className='text-white font-medium cursor-pointer'>Logout</button>
                </div>
            </div>
        </div>
    )
}


