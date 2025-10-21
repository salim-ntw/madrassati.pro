import React from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { authAPI, storage } from "../../../utils/auth";
import profPic from "../../../assets/graduated.png";
import sched from "../../../assets/icons/timetable.png";
import grade from "../../../assets/icons/grade.png";
import homework from "../../../assets/icons/homework.png";
import announcement from "../../../assets/icons/megaphone.png";
import exam from "../../../assets/icons/exam.png";
import attendance from "../../../assets/icons/checked.png";
import logout from "../../../assets/icons/logout.png";
import user from "../../../assets/icons/user.png";
import home from "../../../assets/icons/home.png";
import messages from "../../../assets/icons/communication.png";

export default function SideBar({ setSidebarOpen, parentData, children, selectedChild }) {
  const navigate = useNavigate();
  const { parentId, childId } = useParams();
  const location = useLocation();

  const features = [
    { name: "Dashboard", icon: home, path: "dashboard", color: "from-blue-500 to-blue-600" },
    {
      name: "Child's Schedule",
      icon: sched,
      path: "schedule",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Child's Grades",
      icon: grade,
      path: "grades",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      name: "Child's Homework",
      icon: homework,
      path: "homework",
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Child's Exams",
      icon: exam,
      path: "exams",
      color: "from-red-500 to-red-600",
    },
    {
      name: "Child's Attendance",
      icon: attendance,
      path: "attendance",
      color: "from-teal-500 to-teal-600",
    },
    {
      name: "Announcements",
      icon: announcement,
      path: "announcements",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Messages",
      icon: messages,
      path: "messages",
      color: "from-pink-500 to-pink-600",
    },
  ];

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

  // Display data
  const displayParentName = parentData?.name || 'Loading...';
  const displayChildName = selectedChild?.name || 'Child';

  return (
    <div className="flex flex-col gap-5 p-4 h-full animate-fadeIn">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-xl shadow-lg animate-slideInDown">
        <h1 className="text-xl font-bold text-center">🏫 Madrassati School</h1>
      </div>

      <div className="w-full bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col text-white p-6 items-center justify-center h-full gap-8 rounded-xl shadow-2xl mt-2 animate-slideInUp">
        {/* Parent Profile Section */}
        <div
          onClick={() => navigate(`/parent/${parentId}/profile`)}
          className="flex flex-col items-center justify-center gap-4 bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-xs transform hover:scale-105 transition-all duration-300 animate-slideInUp cursor-pointer"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="relative">
            <img
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow-lg"
              src={profPic}
              alt="profile"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-center">{displayParentName}</h1>
              <img className="w-4 h-4" src={user} alt="user" />
            </div>
            <p className="text-xs text-gray-500">Parent</p>
          </div>
        </div>

        {/* Selected Child Info or Children List */}
        {selectedChild ? (
          <div className="w-full bg-blue-600 p-4 rounded-lg text-center">
            <p className="text-xs text-blue-100 mb-1">Viewing</p>
            <p className="font-bold text-lg">{displayChildName}</p>
            <p className="text-sm text-blue-100">{selectedChild?.grade || 'N/A'}</p>
            <button
              onClick={() => navigate(`/parent/${parentId}`)}
              className="mt-3 text-xs bg-white text-blue-600 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors"
            >
              Change Child
            </button>
          </div>
        ) : children && children.length > 0 ? (
          <div className="w-full bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-lg">
            <p className="text-xs text-blue-100 mb-3 text-center">👶 Your Children</p>
            <div className="space-y-2">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => navigate(`/parent/${parentId}/child/${child.id}/dashboard`)}
                  className="w-full bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all duration-200 text-left"
                >
                  <p className="font-semibold text-white text-sm">{child.name}</p>
                  <p className="text-xs text-blue-100">{child.grade}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full bg-yellow-600 p-4 rounded-lg text-center">
            <p className="text-xs text-yellow-100 mb-2">👶 No Children</p>
            <p className="text-sm text-yellow-100">No children found in your profile</p>
          </div>
        )}

        {/* Navigation Menu */}
        <div className="flex flex-col gap-3 justify-center items-start w-full">
          {selectedChild ? (
            features.map((feature, i) => (
              <Link
                key={i}
                to={`/parent/${parentId}/child/${childId}/${feature.path}`}
                onClick={() => setSidebarOpen && setSidebarOpen(false)}
                className={`flex flex-row items-center gap-3 cursor-pointer px-4 py-3 rounded-lg w-full transition-all duration-300 transform hover:scale-105 animate-slideInUp ${
                  location.pathname.includes(feature.path)
                    ? `bg-gradient-to-r ${feature.color} text-white shadow-lg`
                    : "hover:bg-white/10 hover:text-gray-200"
                }`}
                style={{ animationDelay: `${(i + 2) * 0.1}s` }}
              >
                <div
                  className={`p-2 rounded-lg ${
                    location.pathname.includes(feature.path) ? "bg-white/20" : "bg-white/10"
                  }`}
                >
                  <img
                    className="w-5 h-5"
                    src={feature.icon}
                    alt={feature.name}
                  />
                </div>
                <span className="font-medium">{feature.name}</span>
                {location.pathname.includes(feature.path) && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </Link>
            ))
          ) : (
            <div className="w-full text-center p-4 text-gray-400 text-sm">
              Select a child to view navigation options
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div
          onClick={handleLogout}
          className="flex flex-row items-center justify-center gap-3 cursor-pointer mt-auto bg-red-500 hover:bg-red-600 p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp"
          style={{ animationDelay: "0.8s" }}
        >
          <img className="w-5 h-5" src={logout} alt="logout" />
          <button className="text-white font-medium cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
