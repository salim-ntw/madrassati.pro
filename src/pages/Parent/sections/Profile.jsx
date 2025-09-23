import React from "react";
import profPic from "../../../assets/graduated.png";

export default function Profile({ parent, children }) {
  const stats = [
    {
      label: "Children",
      value: String(children?.length || 0),
      color: "bg-blue-500",
      icon: "👶",
    },
    { label: "Messages", value: "12", color: "bg-green-500", icon: "💬" },
    { label: "Meetings", value: "3", color: "bg-purple-500", icon: "📅" },
    { label: "Alerts", value: "1", color: "bg-orange-500", icon: "🔔" },
  ];

  const upcoming = [
    { title: "Parents Meeting", date: "2025-02-15", time: "10:00 AM" },
    { title: "Report Cards", date: "2025-03-01", time: "—" },
  ];

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-slideInDown">
        👨‍👩‍👧 My Profile
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card (left) */}
        <div className="lg:col-span-1">
          <div
            className="bg-white p-6 rounded-xl shadow-lg animate-slideInUp"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                  src={profPic}
                  alt="profile"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white animate-pulse"></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {parent?.name}
              </h2>
              <p className="text-gray-600 mb-4">Parent</p>

              <div className="w-full space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">
                    Email:
                  </span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {parent?.email}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">
                    Phone:
                  </span>
                  <span className="font-semibold text-gray-800">
                    {parent?.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2">
          <div
            className="bg-white p-6 rounded-xl shadow-lg animate-slideInUp"
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              📊 Overview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="text-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  <div
                    className={`w-12 h-12 ${s.color} rounded-lg flex items-center justify-center text-white text-xl mx-auto mb-2`}
                  >
                    {s.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-600">{s.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  👧 Children
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {children?.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                          {c.name
                            .split(" ")
                            .map((p) => p[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{c.name}</p>
                          <p className="text-xs text-gray-500">
                            Grade {c.grade}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  📅 Upcoming
                </h4>
                <div className="space-y-3">
                  {upcoming.map((e, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <div>
                          <p className="font-medium text-gray-800">{e.title}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(e.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-blue-600">
                          {e.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
