import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <>
      <div className="flex h-screen bg-white">
        <Sidebar />
        <div className="flex flex-col flex-1 p-4 ml-60 max-h-screen h-full overflow-y-auto bg-gray-100">
          <Navbar />
          <div className="w-full text-start">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
