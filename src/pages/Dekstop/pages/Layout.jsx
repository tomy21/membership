import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <>
      <div className="flex h-screen bg-white">
        <Sidebar />
        <div className="flex flex-col flex-1 p-4 ml-60 w-full max-h-screen overflow-auto justify-start items-start bg-gray-100">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
