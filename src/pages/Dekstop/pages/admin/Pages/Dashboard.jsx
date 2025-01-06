import React from "react";
import NavbarClient from "../../../components/NavbarClient";
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";
import DashboardChart from "../../../components/DashboardChart";
import Information from "../../../components/Information";
import HeaderTitle from "../components/HeaderTitle";

function Dashboard() {
  return (
    <>
      <HeaderTitle title={"Dashboard"} subtitle={"Overview"} />

      <div className="container m-auto p-4 min-h-[100vh] justify-center items-center">
        <div className="container m-auto max-h-screen">
          <h1 className="text-xl font-semibold mt-3 text-start">Dashboard</h1>
          <div className="flex flex-row justify-start items-start h-full mt-5 space-x-2">
            <div className="flex flex-col justify-start items-start w-[65%] h-full px-2 py-3">
              {/* Top Card */}
              <div className="flex justify-between items-center space-x-16 w-full">
                <div className="flex flex-col justify-start items-start w-full px-2 py-2 border border-slate-200 shadow-md rounded-lg bg-white">
                  <h1 className="text-xs font-medium text-slate-400 mb-1">
                    Total Income
                  </h1>
                  <div className="h-1 w-full border-b border-slate-300"></div>
                  <h1 className="my-3 text-xl font-semibold">IDR 200 K</h1>
                  <div className="flex flex-row justify-start items-center space-x-2">
                    <div className="flex flex-row justify-start items-center space-x-2 bg-red-200 rounded-md p-1">
                      <MdOutlineTrendingDown
                        size={15}
                        className="text-red-700"
                      />
                      <h1 className="font-reguler text-xs">20%</h1>
                    </div>
                    <h1 className="text-xs font-normal text-gray-400">
                      vs last month
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start w-full px-2 py-2 border border-slate-200 shadow-md rounded-lg bg-white">
                  <h1 className="text-xs font-medium text-slate-400 mb-1">
                    Total Member Mobil
                  </h1>
                  <div className="h-1 w-full border-b border-slate-300"></div>
                  <h1 className="my-3 text-xl font-semibold">2,000</h1>
                  <div className="flex flex-row justify-start items-center space-x-2">
                    <div className="flex flex-row justify-start items-center space-x-2 bg-red-200 rounded-md p-1">
                      <MdOutlineTrendingDown
                        size={15}
                        className="text-red-700"
                      />
                      <h1 className="font-reguler text-xs">20%</h1>
                    </div>
                    <h1 className="text-xs font-normal text-gray-400">
                      vs last month
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start w-full px-2 py-2 border border-slate-200 shadow-md rounded-lg bg-white">
                  <h1 className="text-xs font-medium text-slate-400 mb-1">
                    Total Member Motor
                  </h1>
                  <div className="h-1 w-full border-b border-slate-300"></div>
                  <h1 className="my-3 text-xl font-semibold">3,000</h1>
                  <div className="flex flex-row justify-start items-center space-x-2">
                    <div className="flex flex-row justify-start items-center space-x-2 bg-emerald-200 rounded-md p-1">
                      <MdOutlineTrendingUp
                        size={15}
                        className="text-emerald-700"
                      />
                      <h1 className="font-reguler text-xs">20%</h1>
                    </div>
                    <h1 className="text-xs font-normal text-gray-400">
                      vs last month
                    </h1>
                  </div>
                </div>
              </div>
              <div className="mt-8 w-full">
                <DashboardChart />
              </div>
            </div>
            <div className="flex flex-col justify-start items-start w-[35%] px-2 py-3">
              <div className="flex flex-row justify-between items-start w-full space-x-2">
                <div className="bg-gray-800 text-white px-3 py-5 rounded-lg shadow w-1/2 text-start">
                  <h2 className="text-lg font-semibold mb-2">Quota Mobil</h2>
                  <div className="flex justify-between items-center">
                    <span>Available</span>
                    <h1 className="text-md font-semibold">
                      750 / <span className="text-xs font-normal">1000</span>
                    </h1>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded mt-2">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-gray-800 text-white px-3 py-5 rounded-lg shadow w-1/2 text-start">
                  <h2 className="text-lg font-semibold mb-2">Quota Motor</h2>
                  <div className="flex justify-between items-center">
                    <span>Available</span>
                    <h1 className="text-md font-semibold">
                      50 / <span className="text-xs font-normal">1000</span>
                    </h1>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded mt-2">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <Information />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
