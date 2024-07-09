import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiPhoto } from "react-icons/hi2";
import NavbarMobile from "../components/NavbarMobile";
import { useNavigate } from "react-router-dom";

function Identitas() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleProceed = () => {
    navigate("/dashboard");
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
            <input
              type="text"
              className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
              placeholder="Masukan no KTP"
              autoComplete="false"
            />
            <input
              type="text"
              className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
              placeholder="Masukan nama lengkap"
              autoComplete="false"
            />
            <textarea
              className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
              placeholder="Masukkan alamat sesuai identitas"
              autoComplete="false"
              rows={4}
            />
            <textarea
              className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
              placeholder="Masukkan alamat kantor"
              autoComplete="false"
              rows={4}
            />

            <div className="col-span-full w-full">
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5">
                <div className="text-center">
                  <HiPhoto
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-gray-300"
                  />
                  <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload foto identitas</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              <button
                className="flex items-center justify-center w-full bg-blue-500 text-white py-3 px-5 rounded-lg shadow-md cursor-pointer mt-5"
                onClick={handleProceed}
              >
                <span>Lanjutkan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Identitas;
