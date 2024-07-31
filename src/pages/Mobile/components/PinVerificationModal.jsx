import React, { useState } from "react";
import Modal from "react-modal";
// import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

function PinVerificationModal({ isOpen, onClose, success, data, onContinue }) {
  // const navigate = useNavigate();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 px-5"
      overlayClassName="fixed inset-0"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {success ? "PIN Terverifikasi !" : "PIN Salah !"}
        </h2>
        <p>
          {success
            ? "PIN berhasil di verifikasi, apakah ingin melanjutkan pembayaran"
            : "PIN tidak sesuai , silahkan di ulangi kembali"}
        </p>
        <div className="mt-4 flex flex-row items-center justify-between w-full space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded w-1/2"
          >
            Batal
          </button>
          {success && (
            <button
              onClick={onContinue}
              className="px-4 py-2 bg-blue-500 text-white rounded w-1/2"
            >
              Lanjutkan
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default PinVerificationModal;
