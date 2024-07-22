import React from "react";
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";

function CardValue({
  title,
  value1,
  value2,
  growth1,
  growth2,
  subtitle1,
  subtitle2,
}) {
  return (
    <>
      <div className="border border-gray-300 rounded-md flex flex-col justify-start items-start w-full h-40 px-3 py-3 space-y-5">
        <h1 className="font-xs text-gray-400">{title}</h1>
        <div className="flex justify-between items-center w-full space-x-2">
          <div className="flex flex-col justify-start items-start space-y-2">
            <div className="flex justify-between items-center w-full space-x-2">
              <h1 className="font-semibold text-xl">{value1}</h1>
              {growth1 < 0 ? (
                <div className="rounded-lg bg-red-50 px-2 py-1 flex flex-row justify-start items-center space-x-2">
                  <MdOutlineTrendingDown size={15} className="text-red-700" />
                  <h1 className="font-reguler text-xs">{growth1}%</h1>
                </div>
              ) : (
                <div className="rounded-lg bg-emerald-50 px-2 py-1 flex flex-row justify-start items-center space-x-2">
                  <MdOutlineTrendingUp size={15} className="text-emerald-700" />
                  <h1 className="font-reguler text-xs">{growth1}%</h1>
                </div>
              )}
            </div>
            <h1 className="text-xs font-normal">{subtitle1}</h1>
          </div>
          <div className="flex flex-col justify-start items-start space-y-2">
            <div className="flex justify-between items-center w-full space-x-2">
              <h1 className="font-semibold text-xl">{value1}</h1>
              {growth1 < 0 ? (
                <div className="rounded-lg bg-red-50 px-2 py-1 flex flex-row justify-start items-center space-x-2">
                  <MdOutlineTrendingDown size={15} className="text-red-700" />
                  <h1 className="font-reguler text-xs">{growth1}%</h1>
                </div>
              ) : (
                <div className="rounded-lg bg-emerald-50 px-2 py-1 flex flex-row justify-start items-center space-x-2">
                  <MdOutlineTrendingUp size={15} className="text-emerald-700" />
                  <h1 className="font-reguler text-xs">{growth1}%</h1>
                </div>
              )}
            </div>
            <h1 className="text-xs font-normal">{subtitle2}</h1>
          </div>
        </div>
        <p className="text-xs font-reguler text-gray-400">vs last month</p>
      </div>
    </>
  );
}

export default CardValue;
