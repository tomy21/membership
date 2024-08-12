import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import React from "react";
import { MdNotes } from "react-icons/md";
import { Link } from "react-router-dom";

const callsToAction = [
  { name: "Watch demo", href: "#", icon: "" },
  { name: "Contact sales", href: "#", icon: "PhoneIcon" },
];
function Navbar() {
  return (
    <>
      <header className="bg-white border-b border-gray-200 -mt-2 rounded-md shadow-md mb-3 w-full">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-3 h-14"
        >
          <div className="flex lg:flex-1">
            <MdNotes size={30} />
          </div>
          <div className="flex flex-col justify-end items-end">
            <h1 className="text-xs font-semibold">Tomy Agung</h1>
            <p className="text-xs font-light">Universitas Pelita Harapan</p>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
