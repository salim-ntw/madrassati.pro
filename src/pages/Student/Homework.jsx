import React from "react";

export default function Homework() {
  // Example homework data
  const homework = [
    {
      subject: "Mathematics",
      start: "2025-09-05",
      deadline: "2025-09-10",
    },
    {
      subject: "Physics",
      start: "2025-09-01",
      deadline: "2025-09-06", // deadline passed
    },
    {
      subject: "Computer Science",
      start: "2025-09-07",
      deadline: "2025-09-15",
    },
  ];

  const today = new Date();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📘 Homework</h1>

      {homework.length === 0 ? (
        <p className="text-gray-500 italic">No homework assigned.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-md rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Start Date</th>
                <th className="p-3 text-left">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {homework.map((hw, index) => {
                const deadlineDate = new Date(hw.deadline);
                const isExpired = deadlineDate < today;

                return (
                  <tr
                    key={index}
                    className={`transition ${
                      isExpired
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : index % 2 === 0
                        ? "bg-gray-50 hover:bg-blue-100"
                        : "bg-white hover:bg-blue-100"
                    }`}
                  >
                    <td className="p-3 font-semibold">{hw.subject}</td>
                    <td className="p-3">{hw.start}</td>
                    <td className="p-3">{hw.deadline}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
