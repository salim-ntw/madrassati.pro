import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./side/SideBar";

function Index() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  return (
    <div className="min-h-screen bg-gray-200">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-lg p-3 md:p-4 flex items-center justify-between sticky top-0 z-50">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors touch-target"
        >
          ☰
        </button>
        <h1 className="text-lg md:text-xl font-bold text-gray-800">Teacher Portal</h1>
        <div className="w-8"></div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 lg:w-auto lg:flex-shrink-0 transition-transform duration-300 ease-in-out mobile-sidebar`}>
          <div className="h-full lg:h-auto">
            <SideBar />
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 lg:col-span-9 p-3 md:p-4 lg:p-6 flex flex-col gap-4 md:gap-6 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Index;



