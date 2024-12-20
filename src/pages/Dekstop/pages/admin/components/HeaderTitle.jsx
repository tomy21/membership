import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";

function HeaderTitle({ title, subtitle }) {
  return (
    <>
      <div className="flex justify-between items-center px-4 border-b border-gray-300 w-full pb-3">
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
          <div className="border-l border-gray-300 h-5 mx-3"></div>
          <div className="flex flex-row justify-center items-center space-x-2">
            <img
              src={"/man.png"}
              className="w-12 h-12 p-1 rounded-full shadow-md border-t border-l border-r"
              alt="avatar"
            />
            <div className="flex flex-col justify-start items-start">
              <h1 className="font-semibold">Tomy Agung</h1>
              <h1 className="text-sm text-gray-400">Admin</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderTitle;
