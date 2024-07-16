import React from "react";
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";

function CardValue({ title, value, growth }) {
  return (
    <>
      <div className="border border-gray-300 rounded-md flex flex-col justify-start items-start w-56 h-32 px-5 py-3 space-y-4">
        <h1 className="font-medium text-gray-400">{title}</h1>
        <div className="flex justify-between items-center w-full">
          <h1 className="font-medium text-2xl">{value}</h1>
          {growth < 0 ? (
            <div className="rounded-lg bg-red-50 px-2 py-1 flex flex-row justify-start items-center space-x-3">
              <MdOutlineTrendingDown size={20} className="text-red-700" />
              <h1 className="font-reguler text-xs">{growth}%</h1>
            </div>
          ) : (
            <div className="rounded-lg bg-emerald-50 px-2 py-1 flex flex-row justify-start items-center space-x-3">
              <MdOutlineTrendingUp size={20} className="text-emerald-700" />
              <h1 className="font-reguler text-xs">{growth}%</h1>
            </div>
          )}
        </div>
        <p className="text-xs font-reguler text-gray-400">vs last month</p>
      </div>
    </>
  );
}

export default CardValue;
