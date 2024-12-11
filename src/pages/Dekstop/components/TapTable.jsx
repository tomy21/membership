import React, { useState } from "react";
import { MdFilterList, MdSearch } from "react-icons/md";
import { TbColumns3 } from "react-icons/tb";
import { GoDownload } from "react-icons/go";

function TapTable({ listTab, activeTab, setActiveTab, tabPage, tabName }) {
  console.log(activeTab);
  return (
    <>
      <div className="flex justify-between items-center w-full border-b mt-5">
        <div className="flex">
          {listTab.map((tab, index) => (
            <button
              key={index}
              className={`flex items-center px-4 py-3 text-sm font-medium gap-x-2 ${
                activeTab === tab.name
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="flex flex-row justify-end items-center space-x-2 px-3">
          <button className="border border-slate-300 p-1 rounded-md flex flex-row justify-center items-center space-x-2">
            <MdSearch size={20} />
          </button>
          <button className="border border-slate-300 p-1 rounded-md flex flex-row justify-center items-center space-x-2">
            <MdFilterList />
            <h1 className="text-sm">Filter</h1>
          </button>
          <button className="border border-slate-300 p-1 rounded-md flex flex-row justify-center items-center space-x-2">
            <TbColumns3 />
            <h1 className="text-sm">Columns</h1>
          </button>
          <div className="border-r border-slate-300 h-7"></div>
          {tabPage === true && activeTab === "Tenants" && (
            <button className="flex items-center bg-gradient-to-t from-green-300 to-green-500 text-white rounded-md py-1 px-2 hover:opacity-80 shadow-inner shadow-green-500">
              <GoDownload className="mr-2" />
              <h1 className="text-sm"> Add {activeTab} </h1>
            </button>
          )}
          <button className="flex items-center bg-gradient-to-t from-blue-300 to-blue-500 text-white rounded-md py-1 px-2 hover:opacity-80 shadow-inner shadow-blue-500">
            <GoDownload className="mr-2" />
            <h1 className="text-sm"> Export</h1>
          </button>
        </div>
      </div>
    </>
  );
}

export default TapTable;
