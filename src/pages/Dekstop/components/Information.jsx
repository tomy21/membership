import React from "react";

const Information = () => {
  const timelineData = [
    {
      date: "17 Juli 2024 11:25",
      title: "Disetujui oleh",
      person: "Manager Fiancne",
      status: "completed",
    },
    {
      date: "16 Juli 2024 11:25",
      title: "Diajukan untuk approval ke ",
      person: "Manager Finance",
      status: "advanced",
    },
    {
      date: "16 Juli 2024 10:25",
      title: "Diterima oleh",
      person: "Galih Tanjung",
      status: "advanced",
    },
    {
      date: "16 Juli 2024 10:20",
      title: "Mengajukan member baru ke ",
      role: "Finance HO",
      status: "applied",
    },

    {
      date: "14 Juli 2024 10:20",
      title: "Disetujui oleh",
      person: "Manager Finance",
      status: "completed",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "applied":
        return (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
            <span className="text-white">👤</span>
          </div>
        );
      case "advanced":
        return (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white">👍</span>
          </div>
        );
      case "completed":
        return (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white">✅</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative p-3 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4 mt-8 h-80">
      {timelineData.map((item, index) => (
        <div key={index} className="flex items-start relative">
          <div className="flex flex-col items-center mr-4">
            {getStatusIcon(item.status)}
            {index < timelineData.length - 1 && (
              <div className="h-full border-l-2 border-gray-300 absolute top-8 left-4"></div>
            )}
          </div>
          <div className="flex justify-between items-center w-full text-xs">
            <span className="font-semibold text-start w-[70%]">
              {item.title}{" "}
              {item.role ? (
                <span className="text-indigo-600">{item.role}</span>
              ) : null}
              {item.person ? (
                <span className="text-indigo-600">{item.person}</span>
              ) : null}
            </span>
            <span className="text-xs text-gray-500">{item.date}</span>
          </div>
        </div>
      ))}
      <button className="absolute bottom-3 bg-white shadow-md rounded-md text-sm border border-slate-300 justify-start items-start px-10 py-2 flex">
        Detail
      </button>
    </div>
  );
};

export default Information;
