import React from "react";
import SideBar from "./SideBar";
import Welcome from "./Welcome";
import Highlight from "./Highlight";
import { Outlet } from "react-router-dom";
import Home from "./Home";
import ClassSched from "./ClassSched";
import Grades from "./Grades";
import Exams from "./Exams";
import Announcement from "./Announcement";
import Homework from "./Homework";

function Index() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  return (
    <div className="min-h-screen bg-gray-200 overflow-x-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-lg p-3 md:p-4 flex items-center justify-between sticky top-0 z-50">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors touch-target"
        >
          ☰
        </button>
        <h1 className="text-lg md:text-xl font-bold text-gray-800">Student Portal</h1>
        <div className="w-8"></div>
      </div>

      <div className="flex w-full">
        {/* Sidebar - ALWAYS VISIBLE */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 lg:w-auto lg:flex-shrink-0 transition-transform duration-300 ease-in-out mobile-sidebar`}>
          <div className="h-full lg:h-auto">
            <SideBar setSidebarOpen={setSidebarOpen} />
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content - Full width layout like announcements/exams */}
        <div className="flex-1 w-full min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Index;
