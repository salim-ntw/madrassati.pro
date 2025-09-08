import React from "react";

export default function Exams() {
  // Example: if exams season → list, else keep it empty []
  const exams = [
    { subject: "Mathematics", date: "2025-06-10", time: "09:00 - 11:00", room: "A101" },
    { subject: "Physics", date: "2025-06-12", time: "14:00 - 16:00", room: "B203" },
    { subject: "Computer Science", date: "2025-06-14", time: "10:00 - 12:00", room: "Lab 3" },
    { subject: "Algorithms", date: "2025-06-16", time: "08:30 - 10:30", room: "A305" },
    { subject: "English", date: "2025-06-18", time: "11:00 - 13:00", room: "C102" },
    { subject: "Databases", date: "2025-06-20", time: "15:00 - 17:00", room: "Lab 1" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📝 Exam Schedule</h1>

      {exams.length === 0 ? (
        <p className="text-gray-500 italic">No exams scheduled yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-md rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-red-600 text-white">
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Room</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-red-100 transition`}
                >
                  <td className="p-3 font-semibold">{exam.subject}</td>
                  <td className="p-3">{exam.date}</td>
                  <td className="p-3">{exam.time}</td>
                  <td className="p-3">{exam.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
