import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { studentAPI } from '../../api/student';
import { authAPI, storage } from '../../utils/auth';
import profPic from '../../assets/graduated.png';
import sched from "../../assets/icons/timetable.png";
import grade from "../../assets/icons/grade.png";
import homework from "../../assets/icons/homework.png";
import announcement from "../../assets/icons/megaphone.png";
import exam from "../../assets/icons/exam.png";
import logout from "../../assets/icons/logout.png";
import user from "../../assets/icons/user.png";
import home from "../../assets/icons/home.png";
import { Link, useNavigate } from "react-router-dom"; 

export default function SideBar({ setSidebarOpen }) {
    const { id: studentId } = useParams();
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState(null);
    
    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                console.log('👤 Sidebar: Fetching profile for student:', studentId);
                const response = await studentAPI.getProfile(studentId);
                console.log('✅ Sidebar: Profile data received:', response.data);
                setStudentData(response.data.data);
            } catch (err) {
                console.error('❌ Sidebar: Error fetching profile:', err);
            }
        };

        if (studentId) {
            fetchStudentProfile();
        }
    }, [studentId]);
    
    const features = [
        { name: 'Home', icon: home, path: 'dashboard', color: 'from-blue-500 to-blue-600' },
        { name: 'Class Schedule', icon: sched, path: 'schedule', color: 'from-green-500 to-green-600' },
        { name: 'Grades', icon: grade, path: 'grades', color: 'from-yellow-500 to-yellow-600' },
        { name: 'Homework', icon: homework, path: 'homework', color: 'from-orange-500 to-orange-600' },
        { name: 'Exams', icon: exam, path: 'exams', color: 'from-red-500 to-red-600' },
        { name: 'Announcements', icon: announcement, path: 'announcements', color: 'from-purple-500 to-purple-600' },
    ];

    const handleTabClick = (path) => {
        navigate(`/student/${studentId}/${path}`);
    };

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

    // Display data (use fetched data or default values)
    const displayName = studentData?.name || 'Loading...';
    const displayClass = studentData?.class || 'Loading...';
    const displayId = studentData?.id ? studentData.id.slice(-8) : '...';
    const displayProfilePic = studentData?.profilePicture || profPic;

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
                    to={`/student/${studentId}/profile`}
                    className="flex flex-col items-center justify-center gap-4 bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-xs transform hover:scale-105 transition-all duration-300 animate-slideInUp"
                    style={{animationDelay: '0.1s'}}
                >
                    <div className="relative">
                        <img
                            className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                            src={displayProfilePic}
                            alt="profile"
                            onError={(e) => { e.target.src = profPic; }}
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <h1 className="font-bold text-lg text-center">{displayName}</h1>
                        <img className="w-4 h-4" src={user} alt="user" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">{displayClass}</p>
                        <p className="text-xs text-gray-500">ID: {displayId}</p>
                    </div>
                </Link>

                {/* Navigation Menu */}
                <div className='flex flex-col gap-3 justify-center items-start w-full'>
                    {features.map((feature, i) => (
                        <Link
                            key={i}
                            to={`/student/${studentId}/${feature.path}`}
                            onClick={() => setSidebarOpen && setSidebarOpen(false)}
                            className={`flex flex-row items-center gap-3 cursor-pointer px-4 py-3 rounded-lg w-full transition-all duration-300 transform hover:scale-105 animate-slideInUp ${
                                window.location.pathname.includes(feature.path)
                                    ? `bg-gradient-to-r ${feature.color} text-white shadow-lg` 
                                    : 'hover:bg-white/10 hover:text-gray-200'
                            }`}
                            style={{animationDelay: `${(i + 2) * 0.1}s`}}
                        >
                            <div className={`p-2 rounded-lg ${window.location.pathname.includes(feature.path) ? 'bg-white/20' : 'bg-white/10'}`}>
                                <img className='w-5 h-5' src={feature.icon} alt={feature.name} />
                            </div>
                            <span className="font-medium">{feature.name}</span>
                            {window.location.pathname.includes(feature.path) && (
                                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            )}
                        </Link>
                    ))}
                </div>

                {/* Logout Button */}
                <div 
                    onClick={handleLogout}
                    className='flex flex-row items-center justify-center gap-3 cursor-pointer mt-auto bg-red-500 hover:bg-red-600 p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp' 
                    style={{animationDelay: '0.8s'}}
                >
                    <img className='w-5 h-5' src={logout} alt="logout" />
                    <button className='text-white font-medium cursor-pointer'>Logout</button>
                </div>
            </div>
        </div>
    );
}