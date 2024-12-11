import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";

function HeaderTitle({ title, subtitle }) {
  return (
    <>
      <div className="flex justify-between items-center px-4">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>

        <div className="flex flex-row justify-start items-center space-x-5">
          <IoNotificationsOutline size={25} />
          <select
            name=""
            id=""
            className="border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value="">Selected Location</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default HeaderTitle;
