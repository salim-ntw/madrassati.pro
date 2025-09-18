import React from "react";
import SideBar from "./SideBar";
import Welcome from "./Welcome";
import Highlight from "./Highlight";
import { Outlet } from "react-router-dom";
import Home from "./Home";
import ClassSched from "./ClassSched";
import Grades from "./Grades";
import Exams from "./Exams";
import Announcement from "./Announcement";
import Homework from "./Homework";

function Index() {
  const [selectedtab, setSelectedTab] = React.useState('');
  return (
    <div className="grid grid-cols-12 min-h-screen bg-gray-200 pl-6 p-2 gap-4">
      {/* Sidebar - 3/12 width */}
      <div className="col-span-3">
        <SideBar  setSelectedTab={setSelectedTab}/>
      </div>

      {/* Main Content - 9/12 width */}
      <div className="col-span-9 p-6 flex flex-col gap-6 ">
        <Outlet />
{ selectedtab=='' && <Home/> }   
    {selectedtab=='schedule' && <ClassSched/> }
      {selectedtab=='grades' && <Grades/> }
      {selectedtab=='homework' && <Homework/> }
      {selectedtab=='exams' && <Exams/> }
      {selectedtab=='announcements' && <Announcement/> }
   </div>
    </div>
  );
}

export default Index;
