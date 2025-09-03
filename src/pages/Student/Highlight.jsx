import React from "react";

function Highlight() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col gap-4">
      {/* Title */}
      <h1 className="text-xl font-bold text-blue-900 border-b pb-2">
        Today’s Highlights
      </h1>

      {/* Next Class */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          📚 Next Class:
        </h3>
        <p className="text-gray-600 bg-gray-100 px-3 py-2 rounded-md">
          Math at <span className="font-bold text-blue-900">15:30</span>
        </p>
      </div>

      {/* New Announcements */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          📢 New Announcements:
        </h3>
        <div className="bg-gray-100 px-3 py-2 rounded-md">
          <p className="text-gray-600 text-sm">
            no announcements
          </p>
        </div>
      </div>

      {/* Next Exam */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          📝 Next Exam:
        </h3>
        <p className="text-gray-600 bg-gray-100 px-3 py-2 rounded-md">
          No exams scheduled
        </p>
      </div>
    </div>
  );
}

export default Highlight;
