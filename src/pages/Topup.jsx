import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import NavbarMobile from "../components/NavbarMobile";
import { motion } from "framer-motion";
import { TbExclamationMark } from "react-icons/tb";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function Topup() {
  const [amount, setAmount] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Menghapus karakter non-numerik
    setAmount(Number(value));
  };

  const handleMethodClick = (method) => {
    setSelectedMethod(method);
  };

  const handleProceed = () => {
    if (selectedMethod) {
      setIsModalVisible(true);
    } else {
      alert("Pilih metode pembayaran terlebih dahulu.");
    }
  };

  const verifikasi = () => {
    setIsModalVisible(false);
    navigate("/verifikasi");
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const paymentMethod = [
    {
      id: 1,
      title: "Gopay",
      path: "/assets/payment/logo_gopay.png",
      name: "Gopay",
    },
    { id: 2, title: "OVO", path: "/assets/payment/logo_ovo.png", name: "OVO" },
    {
      id: 3,
      title: "Virtual Acount Nobu",
      path: "/assets/payment/nobu_logo.png",
      name: "VA Nobu",
    },
    {
      id: 4,
      title: "Virtual Acount BCA",
      path: "/assets/payment/bca_logo.png",
      name: "VA BCA",
    },
    {
      id: 5,
      title: "Virtual Acount Mandiri",
      path: "/assets/payment/logo_mandiri.png",
      name: "VA Mandiri",
    },
    {
      id: 6,
      title: "Virtual Acount BNI",
      path: "/assets/payment/bni_logo.png",
      name: "VA BNI",
    },
  ];

  return (
    <>
      <div className="container w-full">
        {isModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
        )}
        <NavbarMobile />
        <div className="flex space-x-20 justify-start items-center w-full mb-5 py-3 bg-amber-300">
          <FaArrowLeftLong className="pl-3 w-10" />
          <h1 className="text-lg font-bold px-3">Top up Point</h1>
        </div>

        <div className="flex flex-col items-center justify-start px-5 bg-white ">
          <div className="text-center mb-5 border-b border-slate-300 pb-5">
            <h2 className="text-xl font-medium text-slate-300">
              Nominal Top Up
            </h2>
            <input
              type="text"
              value={`IDR ${amount.toLocaleString("id-ID")}`}
              onChange={handleAmountChange}
              className="text-4xl font-semibold my-3 text-center border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <p className="text-gray-400">
              {(amount / 1000).toLocaleString("id-ID")} Points
            </p>
          </div>

          <div className="w-full mb-2 text-start max-h-[50vh] overflow-y-auto">
            <div className="w-full mb-10">
              <p className="text-md font-medium mb-2">
                Pilih metode pembayaran
              </p>
              <div className="flex flex-col items-center justify-start space-y-2">
                {paymentMethod.map((method, index) => (
                  <div
                    key={index}
                    className={`flex items-start justify-between bg-gray-100 p-3 rounded-lg shadow-md cursor-pointer w-full ${
                      selectedMethod === method.name ? "bg-blue-400" : ""
                    }`}
                    onClick={() => handleMethodClick(method.name)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-white shadow-md rounded-full p-2 w-12 h-12 flex justify-center items-center">
                        <img
                          src={method.path}
                          alt={method.name}
                          className="w-12"
                        />
                      </div>
                      <p className="text-md font-semibold">{method.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="flex items-center justify-center w-full bg-blue-500 text-white py-3 rounded-lg shadow-md cursor-pointer mt-5"
              onClick={handleProceed}
            >
              <span>Lanjutkan</span>
            </button>
          </div>
        </div>
      </div>
      {isModalVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 w-full bg-white p-5 shadow-2xl rounded-t-3xl border border-slate-400 z-20"
        >
          <h2 className="text-base text-slate-400 font-medium mb-1 mt-20">
            Nominal Topup
          </h2>
          <h1 className="text-4xl font-medium">
            <span className="font-semibold">IDR</span>{" "}
            {amount.toLocaleString("id-ID")}
          </h1>

          <div className="flex justify-between items-center mt-5 border-b border-gray-300 pb-2 pt-3">
            <div className="text-base text-gray-400">Metode pembayaran</div>
            <p className="font-semibold">{selectedMethod}</p>
          </div>

          <div className="flex justify-between items-center border-b border-gray-300 pb-2 pt-3">
            <div className="text-base text-gray-400">Biaya admin</div>
            <p className="font-semibold">
              <span className="font-semibold">IDR</span>{" "}
              {parseInt("5000").toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex justify-between items-center border-b border-gray-300 pb-2 pt-3">
            <div className="text-base text-gray-400">Total points</div>
            <p className="font-semibold">{amount / 1000} Points</p>
          </div>

          <div className="flex justify-between items-center border-b border-gray-300 pb-2 pt-3">
            <div className="text-base text-gray-400">Tanggal</div>
            <p className="font-semibold">
              {format(new Date(), "dd MMM yy HH:mm:ss")}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center space-y-1">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-5 w-full"
              onClick={verifikasi}
            >
              Lanjutkan
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg mt-5 w-full"
              onClick={closeModal}
            >
              Batal
            </button>
          </div>
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <div className="relative w-36 h-36 bg-blue-600 opacity-40 rounded-full"></div>
            <div className="absolute inset-0 w-24 h-24 bg-blue-600 opacity-100 rounded-full m-auto">
              <TbExclamationMark
                size={50}
                className="m-auto mt-5 text-amber-500"
              />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
