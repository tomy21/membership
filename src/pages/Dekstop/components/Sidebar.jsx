import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdLogout,
  MdAssignment,
  MdLocationPin,
  MdOutlineReceiptLong,
  MdCardMembership,
  MdOutlineSupervisedUserCircle,
  MdSupervisorAccount,
  MdOutlineGroups,
} from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { TiGroupOutline } from "react-icons/ti";

const Sidebar = () => {
  const [isMasterOpen, setIsMasterOpen] = useState(false);

  const location = useLocation();

  const toggleMasterMenu = () => {
    setIsMasterOpen(!isMasterOpen);
  };

  return (
    <div className="fixed top-0 left-0 h-full w-60 bg-white text-black">
      <div className="flex flex-col space-x-3 items-center justify-center h-20 px-4 py-4 border-b border-gray-300">
        <img src={"/logo.png"} className="w-12" alt="" />
        <h1 className="text-lg">Membership</h1>
      </div>
      <nav className="px-4 py-4 overflow-auto text-sm max-h-[85vh]">
        <ul>
          {/* <h1 className="text-start mb-2">Main</h1>
          <li className="mb-1">
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-2 hover:bg-slate-400 rounded ${
                location.pathname === "/dashboard" ? "bg-slate-400" : ""
              }`}
            >
              <MdDashboard className="mr-2" /> Dashboard
            </Link>
          </li>

          <li className="mb-2">
            <Link
              to="/dashboard/ticket"
              className={`flex items-center px-4 py-2 hover:bg-slate-400 rounded ${
                location.pathname === "/dashboard/ticket" ? "bg-slate-400" : ""
              }`}
            >
              <MdAssignment className="mr-2" /> Reports
            </Link>
          </li>

          <h1 className="mb-2 text-start">Tenants</h1>
          <li className="mb-1">
            <Link
              to="/dashboard/tenants/membership"
              className={`flex items-center px-4 py-2 hover:bg-slate-400 rounded ${
                location.pathname === "/dashboard/tenants/membership"
                  ? "bg-slate-400"
                  : ""
              }`}
            >
              <TiGroupOutline className="mr-2" /> List Membership
            </Link>
          </li>
          <li className="mb-1">
            <Link
              to="/dashboard/tenants/listmahasiswa"
              className={`flex items-center px-4 py-2 hover:bg-slate-400 rounded ${
                location.pathname === "/dashboard/tenants/listmahasiswa"
                  ? "bg-slate-400"
                  : ""
              }`}
            >
              <MdOutlineReceiptLong className="mr-2" /> List Mahasiswa
            </Link>
          </li>
          <li className="mb-1">
            <Link
              to="/dashboard/tenants/transaction"
              className={`flex items-center px-4 py-2 hover:bg-slate-400 rounded ${
                location.pathname === "/dashboard/tenants/transaction"
                  ? "bg-slate-400"
                  : ""
              }`}
            >
              <MdOutlineReceiptLong className="mr-2" /> Order Membership
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/tenants/history"
              className={`flex items-center px-4 py-2 hover:bg-slate-400 rounded ${
                location.pathname === "/dashboard/tenants/history"
                  ? "bg-slate-400"
                  : ""
              }`}
            >
              <GoHistory className="mr-2" /> History
            </Link>
          </li> */}

          <h1 className="mb-2 text-start">Manage</h1>
          <li className="mb-1">
            <Link
              to="/dashboard/transaction"
              className={`flex items-center px-4 py-2 hover:bg-slate-400 rounded ${
                location.pathname === "/dashboard/transaction"
                  ? "bg-slate-400"
                  : ""
              }`}
            >
              <MdOutlineReceiptLong className="mr-2" /> Transactions
            </Link>
          </li>
          <li className="mb-1">
            <Link
              to="/dashboard/master-products"
              className={`flex items-center px-4 py-2 hover:bg-slate-400 rounded ${
                location.pathname === "/dashboard/master-products"
                  ? "bg-slate-400"
                  : ""
              }`}
            >
              <MdCardMembership className="mr-2" /> Master Products
            </Link>
          </li>
          <li className="mb-1">
            <Link
              to="/dashboard/product"
              className={`flex items-center px-4 py-2 hover:bg-slate-400 rounded ${
                location.pathname === "/dashboard/product" ? "bg-slate-400" : ""
              }`}
            >
              <MdCardMembership className="mr-2" /> Products
            </Link>
          </li>
          {/* <li className="mb-2">
            <Link
              to="/dashboard/client"
              className={`flex items-center px-4 py-2 hover:bg-slate-400 rounded ${
                location.pathname === "/dashboard/client" ? "bg-slate-400" : ""
              }`}
            >
              <MdOutlineSupervisedUserCircle className="mr-2" /> Tenants
            </Link>
          </li> */}
          <li className="mb-2">
            <Link
              to="/dashboard/members"
              className={`flex items-center px-4 py-2 hover:bg-slate-400 rounded ${
                location.pathname === "/dashboard/members" ? "bg-slate-400" : ""
              }`}
            >
              <MdOutlineGroups className="mr-2" /> Membership
            </Link>
          </li>

          <h1 className="mb-2 text-start">User Management</h1>
          <li className="mb-1">
            <Link
              to="/dashboard/lokasi"
              className={`flex items-center px-4 py-2 hover:bg-slate-400 rounded ${
                location.pathname === "/dashboard/lokasi" ? "bg-slate-400" : ""
              }`}
            >
              <MdSupervisorAccount className="mr-2" /> Users
            </Link>
          </li>
          <li className="mb-1">
            <Link
              to="/dashboard/lokasi"
              className={`flex items-center px-4 py-2 hover:bg-slate-400 rounded ${
                location.pathname === "/dashboard/lokasi" ? "bg-slate-400" : ""
              }`}
            >
              <MdSupervisorAccount className="mr-2" /> Roles
            </Link>
          </li>
          <li className="mb-1">
            <Link
              to="/"
              className="flex items-center px-4 py-2 hover:bg-slate-400 rounded"
            >
              <MdLogout className="mr-2" /> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
