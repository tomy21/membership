import React from "react";
import NavbarMobile from "../components/NavbarMobile";
import PinInput from "../components/PinInput";

export default function VeryfikasiPin() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <NavbarMobile />
        <div className="w-full max-w-md p-4">
          <PinInput />
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
            Lanjutkan
          </button>
        </div>
      </div>
    </>
  );
}
