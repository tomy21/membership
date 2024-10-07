import React from "react";

export default function TabTransaction({ activeTab, setActiveTab }) {
  const tabs = [
    { name: "Orders", key: "orders" },
    { name: "Status Members", key: "status" },
  ];
  return (
    <div className="flex justify-start space-x-4 border-b border-gray-300">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`flex items-center space-x-2 pb-2 text-base ${
            activeTab === tab.key
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-400"
          }`}
        >
          <span>{tab.name}</span>
        </button>
      ))}
    </div>
  );
}
