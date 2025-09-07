import React from "react";
import SideBar from "./SideBar";
import Welcome from "./Welcome";
import Highlight from "./Highlight";
import { Outlet } from "react-router-dom";

function Index() {
  return (
    <div className="grid grid-cols-12 min-h-screen bg-gray-200 pl-6 p-2 gap-4">
      {/* Sidebar - 3/12 width */}
      <div className="col-span-3">
        <SideBar />
      </div>

      {/* Main Content - 9/12 width */}
      <div className="col-span-9 p-6 flex flex-col gap-6 ">
        <Outlet />
      </div>
    </div>
  );
}

export default Index;
