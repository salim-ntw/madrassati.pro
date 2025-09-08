import React from "react";

export default function Announcement() {
  // Example announcements
  const announcements = [
    {
      title: "Exam Schedule Released",
      date: "2025-09-05",
      content: "The exam timetable for the Fall semester has been published. Please check the Exams section.",
      type: "info", // info | urgent
    },
    {
      title: "Holiday Notice",
      date: "2025-09-10",
      content: "School will be closed on 15th September for Independence Day.",
      type: "info",
    },
    {
      title: "Urgent: Room Change",
      date: "2025-09-07",
      content: "The Algorithms class on Monday has been moved to Room B203.",
      type: "urgent",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📢 Announcements</h1>

      {announcements.length === 0 ? (
        <p className="text-gray-500 italic">No announcements at the moment.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((a, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl shadow-md border transition ${
                a.type === "urgent"
                  ? "bg-red-100 border-red-400"
                  : "bg-blue-50 border-blue-300"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h2
                  className={`font-bold text-lg ${
                    a.type === "urgent" ? "text-red-700" : "text-blue-700"
                  }`}
                >
                  {a.title}
                </h2>
                <span className="text-sm text-gray-500">{a.date}</span>
              </div>
              <p className="text-gray-700">{a.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
