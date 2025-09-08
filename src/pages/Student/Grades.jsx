import React from "react";

export default function Grades() {
  // Example grades data
  const grades = [
    { subject: "Mathematics", homework: 15, test: 14, exam: 16 },
    { subject: "Physics", homework: 13, test: 12, exam: 9 },
    { subject: "Computer Science", homework: 17, test: 18, exam: 19 },
    { subject: "Algorithms", homework: 12, test: 8, exam: 9 },
    { subject: "English", homework: 16, test: 15, exam: 14 },
    { subject: "Databases", homework: 14, test: 16, exam: 18 },
  ];

  // Weighted average (20% homework, 30% test, 50% exam)
  const calculateFinal = (hw, test, exam) => {
    return parseFloat(((hw * 0.2) + (test * 0.3) + (exam * 0.5)).toFixed(2));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Grades</h1>

      {grades.length === 0 ? (
        <p className="text-gray-500 italic">No grades available yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-md rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-center">Homework</th>
                <th className="p-3 text-center">Test</th>
                <th className="p-3 text-center">Exam</th>
                <th className="p-3 text-center">Final Grade</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, index) => {
                const finalGrade = calculateFinal(g.homework, g.test, g.exam);
                return (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-green-100 transition`}
                  >
                    <td className="p-3 font-semibold">{g.subject}</td>
                    <td className="p-3 text-center">{g.homework}/20</td>
                    <td className="p-3 text-center">{g.test}/20</td>
                    <td className="p-3 text-center">{g.exam}/20</td>
                    <td
                      className={`p-3 text-center font-bold ${
                        finalGrade >= 10 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {finalGrade}
                    </td>
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
