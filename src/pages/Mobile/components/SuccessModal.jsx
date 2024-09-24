import React from "react";
import { CiWarning } from "react-icons/ci";

const SuccessModal = ({ showModal, handleSuccessClose, message }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 px-5">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex flex-col justify-center items-center mb-5 text-red-500">
          <CiWarning size={50} />
          <h2 className="text-xl font-bold">Gagal</h2>
        </div>
        <p className="mb-4">{message}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSuccessClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
