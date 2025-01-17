import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

export default function CardHeader({ title, value, percentage, icon }) {
  return (
    <>
      <div className="flex flex-col justify-start items-start w-full border border-slate-300 rounded-md p-3">
        <div className="flex justify-between item-start w-full">
          <div className="flex flex-row justify-start items-start space-x-2">
            <span className="text-amber-600">{icon}</span>
            <h2 className="text-sm font-semibold">{title}</h2>
          </div>
          <HiOutlineDotsHorizontal />
        </div>
        <div className="flex flex-col justify-start items-start w-full mt-4">
          <h1 className="text-3xl font-normal">{value}</h1>
          {percentage > 0 ? (
            <div className="flex flex-row justify-start items-start w-full space-x-3">
              <div className="flex flex-row justify-start items-start">
                <TiArrowSortedUp className="text-green-500" />
                <p className="text-xs text-green-500">{percentage}%</p>
              </div>
              <p className="text-xs text-slate-500">vs last month</p>
            </div>
          ) : (
            <div className="flex flex-row justify-start items-start w-full">
              <div className="flex flex-row justify-start items-start">
                <TiArrowSortedDown className="text-red-500" />
                <p className="text-xs text-red-500">0%</p>
              </div>
              <p className="text-xs text-slate-500">vs last month</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
