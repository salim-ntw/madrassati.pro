import React from "react";

export default function ClassSched() {
  // Example weekly timetable data
  const timetable = {
    Monday: [
      { start: "08:00", end: "10:00", subject: "Mathematics" },
      { start: "10:00", end: "10:30", subject: "Break" },
      { start: "10:30", end: "12:00", subject: "Physics" },
      { start: "12:00", end: "13:00", subject: "Lunch" },
      { start: "13:00", end: "16:00", subject: "Computer Science" },
    ],
    Tuesday: [
      { start: "08:30", end: "10:00", subject: "Algorithms" },
      { start: "10:00", end: "10:30", subject: "Break" },
      { start: "10:30", end: "12:30", subject: "English" },
      { start: "13:30", end: "15:30", subject: "Databases" },
    ],
    Wednesday: [
      { start: "08:00", end: "10:00", subject: "Statistics" },
      { start: "10:00", end: "10:30", subject: "Break" },
      { start: "10:30", end: "12:00", subject: "Operating Systems" },
      { start: "13:00", end: "14:30", subject: "Networks" },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📅 Weekly Schedule</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-md rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-3 text-left">Day</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Subject</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(timetable).map(([day, sessions], index) => (
              <React.Fragment key={day}>
                {sessions.map((session, idx) => (
                  <tr
                    key={idx}
                    className={`${
                      (index + idx) % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-100 transition ${
                      idx === sessions.length - 1 ? "border-b-4 border-gray-400" : ""
                    }`}
                  >
                    {idx === 0 && (
                      <td
                        rowSpan={sessions.length}
                        className="p-3 font-bold bg-gray-200 border-r border-gray-300"
                      >
                        {day}
                      </td>
                    )}
                    <td className="p-3">
                      {session.start} – {session.end}
                    </td>
                    <td
                      className={`p-3 font-semibold ${
                        session.subject === "Break" || session.subject === "Lunch"
                          ? "text-gray-500 italic"
                          : ""
                      }`}
                    >
                      {session.subject}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
