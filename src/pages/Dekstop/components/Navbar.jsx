import React, { useEffect, useState } from "react";
import { MdNotes } from "react-icons/md";
import { apiUsers } from "../../../api/apiUsers";
import Loading from "./Loading";

function Navbar() {
  const [loading, setLoading] = useState(false);
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
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 rounded-md shadow-md mb-3 w-full">
        <nav
          aria-label="Global"
          className="flex max-w-full items-center justify-between p-3 h-14"
        >
          <div className="flex">
            <MdNotes size={30} />
          </div>
          <div className="flex flex-col justify-end items-end">
            <h1 className="text-xs font-semibold">{name}</h1>
            <p className="text-xs font-light">{email}</p>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
