import React from "react";
import SideBar from "./side/SideBar";
import Home from "./sections/Home";
import Schedule from "./sections/Schedule";
import Grades from "./sections/Grades";
import Homework from "./sections/Homework";
import Exams from "./sections/Exams";
import Announcements from "./sections/Announcements";
import Messages from "./sections/Messages";
import Attendance from "./sections/Attendance";

function Index() {
  const [selectedTab, setSelectedTab] = React.useState("");

  return (
    <div className="grid grid-cols-12 min-h-screen bg-gray-200 pl-6 p-2 gap-4">
      <div className="col-span-3">
        <SideBar setSelectedTab={setSelectedTab} />
      </div>
      <div className="col-span-9 p-6 flex flex-col gap-6">
        {selectedTab === "" && <Home />}
        {selectedTab === "schedule" && <Schedule />}
        {selectedTab === "grades" && <Grades />}
        {selectedTab === "homework" && <Homework />}
        {selectedTab === "exams" && <Exams />}
        {selectedTab === "announcements" && <Announcements />}
        {selectedTab === "messages" && <Messages />}
        {selectedTab === "attendance" && <Attendance />}
      </div>
    </div>
  );
}

export default Index;



