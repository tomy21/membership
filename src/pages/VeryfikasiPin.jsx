import React from "react";
import NavbarMobile from "../components/NavbarMobile";
import PinInput from "../components/PinInput";
import { useNavigate } from "react-router-dom";

export default function VeryfikasiPin() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <NavbarMobile />
        <div className="w-full max-w-md p-4">
          <PinInput />
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
            Lanjutkan
          </button>
          <button
            className="mt-4 w-full bg-red-500 text-white py-2 rounded"
            onClick={() => handleBack()}
          >
            Batal
          </button>
        </div>
      </div>
    </>
  );
}
