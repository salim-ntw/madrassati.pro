import React from "react";
import SideBar from "./side/SideBar";
import Home from "./sections/Home";
import Profile from "./sections/Profile";
import Schedule from "./sections/Schedule";
import Grades from "./sections/Grades";
import Homework from "./sections/Homework";
import Exams from "./sections/Exams";
import Announcements from "./sections/Announcements";
import Messages from "./sections/Messages";
import Attendance from "./sections/Attendance";

function Index() {
  const [selectedTab, setSelectedTab] = React.useState("");
  const [selectedChildId, setSelectedChildId] = React.useState(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const children = [
    { id: 1, name: "Aya Benali", grade: "5A", avatar: null },
    { id: 2, name: "Yassine Benali", grade: "8B", avatar: null },
  ];

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-lg p-4 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          ☰
        </button>
        <h1 className="text-xl font-bold text-gray-800">Parent Portal</h1>
        <div className="w-8"></div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 lg:w-auto lg:flex-shrink-0 transition-transform duration-300 ease-in-out`}
        >
          <div className="h-full lg:h-auto">
            <SideBar setSelectedTab={setSelectedTab} />
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
        <div className="flex-1 lg:col-span-9 p-4 lg:p-6 flex flex-col gap-6 min-h-screen">
          {selectedChildId === null ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChildId(child.id)}
                  className="text-left bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold ring-2 ring-blue-200">
                      {child.name
                        .split(" ")
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {child.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Grade {child.grade}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <>
              {selectedTab === "" && <Home allChildren={children} />}
              {selectedTab === "schedule" && (
                <Schedule
                  child={children.find((c) => c.id === selectedChildId)}
                />
              )}
              {selectedTab === "grades" && (
                <Grades
                  child={children.find((c) => c.id === selectedChildId)}
                />
              )}
              {selectedTab === "homework" && (
                <Homework
                  child={children.find((c) => c.id === selectedChildId)}
                />
              )}
              {selectedTab === "exams" && (
                <Exams child={children.find((c) => c.id === selectedChildId)} />
              )}
              {selectedTab === "announcements" && (
                <Announcements
                  child={children.find((c) => c.id === selectedChildId)}
                />
              )}
              {selectedTab === "messages" && (
                <Messages
                  child={children.find((c) => c.id === selectedChildId)}
                />
              )}
              {selectedTab === "attendance" && (
                <Attendance
                  child={children.find((c) => c.id === selectedChildId)}
                />
              )}
              {selectedTab === "profile" && (
                <Profile
                  parent={{
                    name: "Parent name",
                    email: "parent@example.com",
                    phone: "+213 123 456 789",
                  }}
                  children={children}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
