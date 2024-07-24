import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { logoutUsers } from "../../../api/apiUsers";
import Loading from "./Loading";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const userNavigation = [
  { name: "Profil", href: "/profil" },
  { name: "Keluar", href: "/" },
];
const notifications = [
  {
    title: "Profil",
    subtitle: "Lengkapi profil kamu",
    status: "new",
    href: "#",
  },
  {
    title: "Daftar Akun",
    subtitle: "Kamu berhasil membuat akun",
    status: "read",
    href: "#",
  },
];

// const user = {
//   name: "Tom Cook",
//   email: "tom@example.com",
//   imageUrl:
//     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
// };

export default function NavbarMobile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      setTimeout(() => {
        const token = Cookies.get("refreshToken");
        if (token) {
          const decodedToken = jwtDecode(token);
          setUser(decodedToken);
        }
      }, 500); // Delay 500 milliseconds
    };
    fetchToken();
  }, []);
  // console.log(user);
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUsers.logout();
      // Assuming a successful logout, redirect to login page
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Logout failed", error);
      // Handle error appropriately, possibly show an error message
    }
  };
  console.log("data", user);

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
                  {getInitial(user?.sub)}
                </div>
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
            <p className="text-sm font-semibold">{user?.sub || "-"}</p>
            <p className="text-xs">{user?.email || "-"}</p>
          </div>
        </div>

        <Menu as="div" className="relative ml-2">
          <div>
            <MenuButton className="relative flex max-w-xs items-start rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <IoMdNotifications size={30} />
              {notifications.some((item) => item.status === "new") && (
                <span className="absolute top-0 right-0 inline-block h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute right-0 z-10 -mt-1 w-56 origin-top-right text-start rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {notifications.map((item) => (
              <MenuItem key={item.name}>
                <a
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <h1 className="text-sm font-semibold">{item.title}</h1>
                    {item.status === "new" && (
                      <span className="ml-2 px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-reguler text-gray-400">
                    {item.subtitle}
                  </p>
                </a>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </>
  );
}
