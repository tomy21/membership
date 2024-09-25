import React from "react";
import PinInput from "../components/PinInput";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

export default function VeryfikasiPin() {
  const navigate = useNavigate();
  // const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col items-center px-5">
        <div className="flex flex-row justify-start items-center w-full gap-x-20">
          <button
            className="flex flex-row items-center text-black py-2 rounded mt-5"
            onClick={() => handleBack()}
          >
            <MdArrowBackIosNew size={30} className="mr-2" />
            <h1 className="text-base">Kembali</h1>
          </button>
        </div>
        <div className="w-full max-w-md px-4">
          <PinInput />
        </div>
      </div>
    </>
  );
}
