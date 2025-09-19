import React from "react";

function Highlight() {
  const highlights = [
    {
      icon: "📚",
      title: "Next Class",
      content: "Mathematics",
      time: "15:30",
      color: "bg-blue-50 border-blue-200 text-blue-800"
    },
    {
      icon: "📢",
      title: "New Announcements",
      content: "2 new announcements",
      time: "Today",
      color: "bg-green-50 border-green-200 text-green-800"
    },
    {
      icon: "📝",
      title: "Next Exam",
      content: "Physics Midterm",
      time: "Next Friday",
      color: "bg-red-50 border-red-200 text-red-800"
    },
    {
      icon: "📋",
      title: "Homework Due",
      content: "Math Assignment",
      time: "Tomorrow",
      color: "bg-yellow-50 border-yellow-200 text-yellow-800"
    }
  ]

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg animate-slideInUp" style={{animationDelay: '0.3s'}}>
      <h1 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        ⭐ Today's Highlights
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {highlights.map((highlight, index) => (
          <div key={index} className={`p-4 rounded-lg border-2 ${highlight.color} hover:shadow-md transition-all duration-300 transform hover:scale-105`}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{highlight.icon}</span>
              <h3 className="font-semibold">{highlight.title}</h3>
            </div>
            <p className="text-sm font-medium mb-1">{highlight.content}</p>
            <p className="text-xs opacity-75">⏰ {highlight.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Highlight;
