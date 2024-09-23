import React, { useState } from "react";
import { motion } from "framer-motion";

const MotionProfile = ({ onClose, label, valueData, onUpdate }) => {
  // State untuk menyimpan nilai input yang diubah oleh user
  const [inputValue, setInputValue] = useState(valueData || "");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(inputValue);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }} // Memulai posisi dari bawah
      animate={{ y: 0, opacity: 1 }} // Bergerak ke atas hingga posisi normal
      transition={{ duration: 0.5 }} // Durasi animasi
      className="fixed bottom-0 left-0 w-full bg-white p-5 shadow-2xl rounded-t-3xl border border-slate-400 z-20 min-h-72"
    >
      <div
        className="w-32 h-2 bg-slate-300 rounded-full m-auto shadow-inner shadow-white"
        onClick={onClose}
      ></div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-52 justify-between mt-5"
      >
        <div className="text-start mt-5">
          <label htmlFor="nama">{label}</label>

          {label === "Jenis Kelamin" ? (
            <div className="mt-2">
              <input
                type="radio"
                name="jenis_kelamin"
                value="L"
                id="laki-laki"
                checked={inputValue === "L"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="laki-laki" className="mr-4">
                Laki-laki
              </label>

              <input
                type="radio"
                name="jenis_kelamin"
                value="P"
                id="perempuan"
                checked={inputValue === "P"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="perempuan">Perempuan</label>
            </div>
          ) : label === "Alamat" ? (
            <textarea
              id="alamat"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={valueData ? valueData : `Masukan ${label}`}
              className="w-full border border-slate-300 rounded-md px-3 py-2 mt-2"
            />
          ) : label === "Tanggal Lahir" ? (
            <input
              type="date"
              id="tanggal_lahir"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full border border-slate-300 rounded-md px-3 py-2 mt-2"
            />
          ) : (
            <input
              type="text"
              id="nama"
              value={inputValue}
              onChange={handleInputChange}
              name="nama"
              placeholder={valueData ? valueData : `Masukan ${label}`}
              className="w-full border border-slate-300 rounded-md px-3 py-2 mt-2"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-500 rounded-md py-2"
        >
          UPDATE
        </button>
      </form>
    </motion.div>
  );
};

export default MotionProfile;
