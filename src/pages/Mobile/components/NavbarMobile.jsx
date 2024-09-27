import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  apiUsers,
  getUserProductById,
  logoutUsers,
} from "../../../api/apiUsers";
import Loading from "./Loading";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const userNavigation = [
  { name: "Profil", href: "/profil" },
  { name: "Keluar", href: "/" },
];

export default function NavbarMobile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await apiUsers.getUserId();
        setName(response.data.UserName);
        setEmail(response.data.Email);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [idUser]);

  const handleLogout = async () => {
    try {
      await logoutUsers.logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getInitial = (name) => {
    if (!name) return "T";
    return name.charAt(0).toUpperCase();
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex justify-between items-center bg-amber-300 w-full p-3 shadow-md">
        <div className="flex flex-row justify-center items-center space-x-3">
          <Menu as="div" className="relative ml-2">
            <div>
              <MenuButton className="relative flex max-w-xs items-start rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                {/* <img
                  alt=""
                  src={user.imageUrl}
                  className="h-12 w-12 rounded-full"
                /> */}
                <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center">
                  {getInitial(name)}
                </div>
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute left-0 z-10 -mt-1 w-48 origin-top-left text-start rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {userNavigation.map((item, index) => (
                <MenuItem key={index}>
                  <a
                    href={item.href}
                    onClick={item.name === "Keluar" ? handleLogout : null}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    {item.name}
                  </a>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
          <div className="flex flex-col items-start justify-start">
            <p className="text-sm font-semibold">{name || "-"}</p>
            <p className="text-xs">{email || "-"}</p>
          </div>
        </div>

        <Menu as="div" className="relative ml-2">
          <div>
            <MenuButton className="relative flex max-w-xs items-start rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <IoMdNotifications size={30} />
              {/* {notifications.some((item) => item.status === "new") && (
                <span className="absolute top-0 right-0 inline-block h-2 w-2 rounded-full bg-red-500"></span>
              )} */}
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute right-0 z-10 -mt-1 w-56 origin-top-right text-start rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <MenuItem>
              <div className="block px-4 py-2 text-sm text-gray-700">
                <p className="text-center text-gray-500">
                  Tidak ada notifikasi
                </p>
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </>
  );
}
