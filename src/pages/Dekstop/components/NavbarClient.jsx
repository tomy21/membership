import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  PopoverGroup,
} from "@headlessui/react";
import React from "react";
import { BsGear } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userNavigation = [
  { name: "Profil", href: "/profil" },
  { name: "Keluar", href: "/" },
];

function NavbarClient() {
  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-md">
        <div className="container m-auto ">
          <nav
            aria-label="Global"
            className="mx-auto flex max-w-7xl items-center justify-between p-3"
          >
            <div className="flex lg:flex-1 space-x-10 justify-start items-end">
              <Link to="#" className="-m-1.5 p-1.5">
                <span className="sr-only">SKY Membership</span>
                <img alt="" src={"/logo.png"} className="h-12 w-auto" />
              </Link>
              <PopoverGroup className="flex gap-x-12 justify-between items-end">
                <NavLink
                  to="/dashboard-client"
                  className={({ isActive }) =>
                    isActive
                      ? "text-sm font-medium leading-6 text-gray-900 py-2 px-2 border-b-2 border-amber-400"
                      : "text-sm font-medium leading-6 text-gray-900 py-2 px-2 hover:border-b-2 border-amber-400"
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    isActive
                      ? "text-sm font-medium leading-6 text-gray-900 py-2 px-2 border-b-2 border-amber-400"
                      : "text-sm font-medium leading-6 text-gray-900 py-2 px-2 hover:border-b-2 border-amber-400"
                  }
                >
                  History
                </NavLink>
                <NavLink
                  to="/location"
                  className={({ isActive }) =>
                    isActive
                      ? "text-sm font-medium leading-6 text-gray-900 py-2 px-2 border-b-2 border-amber-400"
                      : "text-sm font-medium leading-6 text-gray-900 py-2 px-2 hover:border-b-2 border-amber-400"
                  }
                >
                  Locations
                </NavLink>
              </PopoverGroup>
            </div>

            <PopoverGroup className="flex gap-x-5 justify-center items-center">
              <Link
                to="#"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                <IoMdNotificationsOutline size={20} />
              </Link>
              <Link
                to="#"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                <BsGear size={20} />
              </Link>

              <div className="flex flex-row justify-center items-center border-l border-gray-200 pl-5">
                <div className="flex flex-col justify-end items-end">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs font-light">{user.email}</p>
                </div>
                <Menu as="div" className="relative ml-2">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-start rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src={user.imageUrl}
                        className="h-12 w-12 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute left-0 z-10 -mt-1 w-48 origin-top-left text-start rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </PopoverGroup>
          </nav>
        </div>
      </header>
    </>
  );
}

export default NavbarClient;
