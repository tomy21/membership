import React from "react";
import PinInput from "../components/PinInput";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function VeryfikasiPin() {
  const navigate = useNavigate();
  // const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col items-center w-full">
        <div className="flex w-full space-x-4 items-center py-4 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-md">
          <FaArrowLeftLong
            className="pl-3 w-10 cursor-pointer"
            onClick={handleBack}
          />
          <h1 className="text-lg font-semibold px-3">Verifikasi Pin</h1>
        </div>
        <div className="w-full max-w-md px-4">
          <PinInput />
        </div>
      </div>
    </>
  );
}
