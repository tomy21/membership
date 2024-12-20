import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdOutlineHistoryEdu,
  MdOutlineScreenSearchDesktop,
  MdOutlineEditLocationAlt,
  MdOutlineCardMembership,
  MdOutlineCorporateFare,
} from "react-icons/md";
import { LuFileBox, LuLayoutDashboard, LuWallet2 } from "react-icons/lu";
import { IoTicketSharp } from "react-icons/io5";
import { FaUsersGear } from "react-icons/fa6";
import { GoDot, GoGear } from "react-icons/go";

const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const location = useLocation();
  const [listMenu, setListMenu] = useState([
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <LuLayoutDashboard className="mr-2" />,
    },
    {
      name: "Transaction",
      link: "/dashboard/transaction",
      icon: <MdOutlineHistoryEdu className="mr-2" />,
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
    <div className="fixed top-0 left-0 h-screen w-60 bg-gradient-to-tr from-slate-900 to-black text-white">
      <div className="flex flex-row space-x-3 items-center justify-start px-2 h-20 border-b border-gray-300">
        <div className="bg-gray-400 rounded-full w-10 h-10 flex items-center justify-center p-1">
          <img src="/man.png" className="w-full" alt="" />
        </div>
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-sm font-semibold">Tomy Agung Saputro</h1>
          <h1 className="text-xs text-slate-400">Tomy@gmail.com</h1>
        </div>
      </div>

      <nav className="mt-6 space-y-1 text-gray-300 px-3">
        {listMenu.map((menu, index) => (
          <div key={index}>
            <Link
              to={menu.link}
              className={`flex text-base items-center py-2 px-4 rounded-md gap-y-3
                ${
                  location.pathname === menu.link
                    ? "text-slate-100 bg-yellow-500"
                    : "text-slate-400 hover:bg-yellow-500 hover:text-slate-100"
                }`}
              onClick={() => menu.subMenu && handleToggleSubMenu(index)}
            >
              {menu.icon} {menu.name}
            </Link>
            {menu.subMenu && openSubMenu === index && (
              <div className="pl-8 space-y-1 mt-1">
                {menu.subMenu.map((subMenu, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subMenu.link}
                    className={`flex text-sm items-center p-2 rounded-md 
                      ${
                        location.pathname === subMenu.link
                          ? "text-slate-100 bg-slate-600"
                          : "text-slate-400 hover:bg-slate-600 hover:text-slate-100"
                      }`}
                  >
                    {subMenu.icon} {subMenu.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
