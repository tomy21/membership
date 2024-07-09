import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import React from "react";
import { Link } from "react-router-dom";

const callsToAction = [
  { name: "Watch demo", href: "#", icon: "" },
  { name: "Contact sales", href: "#", icon: "PhoneIcon" },
];
function Navbar() {
  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-md">
        <div className="container m-auto ">
          <nav
            aria-label="Global"
            className="mx-auto flex max-w-7xl items-center justify-between p-3"
          >
            <div className="flex lg:flex-1">
              <Link to="#" className="-m-1.5 p-1.5">
                <span className="sr-only">SKY Membership</span>
                <img alt="" src={"/logo.png"} className="h-12 w-auto" />
              </Link>
            </div>
            <PopoverGroup className="flex gap-x-12">
              <Link
                to="#"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                Dashboard
              </Link>
              <Link
                to="#"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                Member
              </Link>
              <Link
                to="#"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                ListMember
              </Link>
            </PopoverGroup>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
