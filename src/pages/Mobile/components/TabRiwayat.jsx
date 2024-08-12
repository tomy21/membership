import React, { useState } from "react";

const TabRiwayat = ({ tabs, currentTab, onTabChange }) => {
  return (
    <div className="flex mb-4 border-b border-gray-300">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabChange(index)}
          className={`px-4 py-2 text-center flex-1 ${
            currentTab === index
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabRiwayat;
