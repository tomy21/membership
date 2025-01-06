import React, { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { userCMS } from "../../../../../api/apiMembershipV2";
import { useNavigate } from "react-router-dom";

function HeaderTitle({ title, subtitle }) {
  const [name, setName] = useState(null);
  const [roleName, setRoleName] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataUser();
  }, []);

  const fetchDataUser = async () => {
    try {
      const response = await userCMS.getByIdUsers();
      setName(response.data.fullname);
      setRoleName(response.data.membershipRole?.name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await userCMS.logoutCMS();
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center px-4 border-b border-gray-300 w-full pb-3">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>

        <div className="flex flex-row justify-start items-center space-x-5 relative">
          <IoNotificationsOutline size={25} />
          <select
            name=""
            id=""
            className="border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value="">Selected Location</option>
          </select>
          <div className="border-l border-gray-300 h-5 mx-3"></div>
          <div
            className="flex flex-row justify-center items-center space-x-2 cursor-pointer relative"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src={"/man.png"}
              className="w-12 h-12 p-1 rounded-full shadow-md border-t border-l border-r"
              alt="avatar"
            />
            <div className="flex flex-col justify-start items-start">
              <h1 className="font-semibold">{name}</h1>
              <h1 className="text-sm text-gray-400">{roleName}</h1>
            </div>
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute top-16 right-0 bg-white shadow-md rounded-md w-40 border border-gray-200 z-50">
              <ul>
                {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li> */}
                <li
                  className="px-4 py-2 hover:bg-red-100 cursor-pointer flex flex-row justify-start items-center gap-x-2 hover:text-red-600 "
                  onClick={handleLogout}
                >
                  <VscSignOut size={20} />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HeaderTitle;
