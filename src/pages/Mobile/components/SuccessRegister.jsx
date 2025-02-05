import React from "react";
import { Link } from "react-router-dom";

export default function SuccessRegister() {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-full max-w-sm">
          <img
            src={"/assets/successActivate.svg"} // Ganti dengan URL gambar yang sesuai
            alt="Success"
            className="mb-4 w-24 h-24 mx-auto" // Ukuran gambar lebih kecil untuk tampilan mobile
          />
          <h1 className="text-2xl font-bold mb-4">Aktifasi Berhasil</h1>
          <p className="mb-6 text-gray-600">
            Silahkan login untuk masuk ke akun anda
          </p>
          <Link
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
