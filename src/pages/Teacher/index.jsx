import React from "react";
import SideBar from "./side/SideBar";
import Home from "./sections/Home";
import Schedule from "./sections/Schedule";
import Classes from "./sections/Classes";
import ManageGrades from "./sections/ManageGrades";
import ManageHomework from "./sections/ManageHomework";
import Exams from "./sections/Exams";
import Announcements from "./sections/Announcements";
import Messages from "./sections/Messages";
import Attendance from "./sections/Attendance";
import CreateStudents from "./sections/CreateStudents";

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
        {selectedTab === "classes" && <Classes />}
        {selectedTab === "manage-grades" && <ManageGrades />}
        {selectedTab === "manage-homework" && <ManageHomework />}
        {selectedTab === "exams" && <Exams />}
        {selectedTab === "announcements" && <Announcements />}
        {selectedTab === "messages" && <Messages />}
        {selectedTab === "attendance" && <Attendance />}
        {selectedTab === "create-students" && <CreateStudents />}
      </div>
    </div>
  );
}

export default Index;



