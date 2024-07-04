import React from "react";
import { IoMdNotifications } from "react-icons/io";

export default function NavbarMobile() {
  return (
    <>
      <div className="flex justify-between items-center bg-amber-300 w-full p-3 shadow-md">
        <div className="flex flex-row justify-center items-center space-x-2">
          <div className="bg-slate-200 rounded-full w-14 h-14 p-2 shadow-md">
            <img src={"/assets/boy.png"} className="w-10 m-auto" alt="" />
          </div>
          <div className="flex flex-col items-start justify-start">
            <p className="text-sm font-semibold">Hi, Tomy Agung S</p>
            <p className="text-xs">tomy21.agung@gmail.com</p>
          </div>
        </div>
        <IoMdNotifications size={30} />
      </div>
    </>
  );
}
