import React, { useState } from "react";
import { FaUsersGear } from "react-icons/fa6";
import { GoDot, GoGear } from "react-icons/go";
import { LuFileBox, LuLayoutDashboard } from "react-icons/lu";
import {
  MdOutlineCorporateFare,
  MdOutlineEditLocationAlt,
  MdOutlineHistoryEdu,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const location = useLocation();
  const [listMenu, setListMenu] = useState([
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <LuLayoutDashboard className="mr-2" />,
    },
    {
      name: "History",
      icon: <MdOutlineHistoryEdu className="mr-2" />,
      subMenu: [
        {
          name: "Transaction",
          icon: <GoDot className="mr-2" />,
          link: "/dashboard/transaction",
        },
        {
          name: "Payment",
          icon: <GoDot className="mr-2" />,
          link: "/dashboard/transaction",
        },
      ],
    },
    {
      name: "Customer",
      link: "/dashboard/customer",
      icon: <MdOutlineCorporateFare className="mr-2" />,
    },
    {
      name: "Location",
      link: "/dashboard/location",
      icon: <MdOutlineEditLocationAlt className="mr-2" />,
    },
    {
      name: "Product",
      link: "/dashboard/product",
      icon: <LuFileBox className="mr-2" />,
    },
    {
      name: "User Management",
      icon: <FaUsersGear className="mr-2" />,
      subMenu: [
        {
          name: "User List",
          icon: <GoDot className="mr-2" />,
          link: "/dashboard/users",
        },
        {
          name: "Roles",
          icon: <GoDot className="mr-2" />,
          link: "/dashboard/roles",
        },
      ],
    },

    {
      name: "Setting",
      link: "/dashboard/",
      icon: <GoGear className="mr-2" />,
    },
  ]);

  const handleToggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-60 h-full bg-white border-r border-slate-200">
        <div className="flex flex-row justify-start items-end space-x-3 px-3 py-4">
          <img src={"/assets/logo.png"} alt="skyparking" className="w-12" />
          <h1 className="text-xl font-semibold">SKYPARKING</h1>
        </div>

        <div className="mt-5 px-3 text-left space-y-2">
          <h1 className="text-base font-normal mt-5 text-slate-400">
            Main menu
          </h1>
          {listMenu.map((menu, index) => (
            <div key={index}>
              <Link
                to={menu.link}
                className={`flex text-base items-center py-3 px-4 rounded-md 
                ${
                  location.pathname === menu.link
                    ? "bg-yellow-400 text-slate-50"
                    : "hover:bg-yellow-400 hover:text-slate-50"
                }`}
                onClick={() => menu.subMenu && handleToggleSubMenu(index)}
              >
                {menu.icon} {menu.name}
              </Link>
              {menu.subMenu && openSubMenu === index && (
                <div className="pl-8 mt-1 space-y-1">
                  {menu.subMenu.map((subMenu, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subMenu.link}
                      className={`flex text-sm items-center p-2 rounded-md space-y-3
                      ${
                        location.pathname === subMenu.link
                          ? "text-slate-100 bg-yellow-400"
                          : "text-slate-400 hover:bg-yellow-400 hover:text-slate-100"
                      }`}
                    >
                      {subMenu.icon} {subMenu.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
