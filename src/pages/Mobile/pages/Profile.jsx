import React from "react";
import NavbarMobile from "../components/NavbarMobile";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { HiPhoto } from "react-icons/hi2";

const user = {
  name: "Tomy Agung s",
  email: "tomy21.agung@gmail.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function Profile() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleProceed = () => {
    navigate("/input_identitas");
  };

  return (
    <>
      <div className="container w-full">
        <NavbarMobile />
        <div className="flex flex-col items-start justify-start min-h-[60vh] w-full">
          <div className="flex w-full space-x-20 justify-start items-center py-3 bg-amber-300">
            <FaArrowLeftLong
              className="pl-3 w-10"
              onClick={() => handleBack()}
            />
            <h1 className="text-lg font-semibold px-10">Profil</h1>
          </div>
          <div className="flex flex-col justify-center items-center w-full mt-2 px-3 space-y-2">
            <img
              alt=""
              src={user.imageUrl}
              className="h-20 w-20 rounded-full"
            />
            <input
              type="text"
              className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
              value={user.name}
              autoComplete="false"
            />
            <input
              type="text"
              className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
              value={user.email}
              autoComplete="false"
            />
            <input
              type="text"
              className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
              placeholder="Masukan nomor handphone"
              autoComplete="false"
            />
            <input
              type="text"
              className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
              placeholder="Masukan pin member"
              autoComplete="false"
            />
            <input
              type="text"
              className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
              placeholder="Masukan ulang pin member"
              autoComplete="false"
            />

            <button
              className="flex items-center justify-center w-full bg-blue-500 text-white py-3 px-5 rounded-lg shadow-md cursor-pointer mt-5"
              onClick={handleProceed}
            >
              <span>Lanjutkan</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
