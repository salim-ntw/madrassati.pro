import React from "react";

export default function Exams() {
  // Example: test season (so exams are empty)
  const tests = [
    { subject: "Mathematics", date: "2025-09-12", time: "09:00 - 10:30", room: "A101" },
    { subject: "Physics", date: "2025-09-14", time: "11:00 - 12:30", room: "B203" },
    { subject: "Computer Science", date: "2025-09-16", time: "14:00 - 15:30", room: "Lab 2" },
  ];

  const exams = []; // no exams in this season

  // Reusable table component
  const ScheduleTable = ({ title, color, data }) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {data.length === 0 ? (
        <p className="text-gray-500 italic">No {title.toLowerCase()} scheduled.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-md rounded-xl overflow-hidden">
            <thead>
              <tr className={`${color} text-white`}>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Room</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="p-3 font-semibold">{item.subject}</td>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">{item.time}</td>
                  <td className="p-3">{item.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📝 Tests & Exams Schedule</h1>

      {/* Tests table */}
      <ScheduleTable title="Tests" color="bg-blue-900" data={tests} />

      {/* Exams table */}
      <ScheduleTable title="Exams" color="bg-red-600" data={exams} />
    </div>
  );
}
