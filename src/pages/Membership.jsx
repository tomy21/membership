import React, { useEffect, useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ListComponent from "../components/ListComponent";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { TbExclamationMark } from "react-icons/tb";

const people = [
  {
    id: 1,
    name: "Wade Cooper",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
  },
  {
    id: 3,
    name: "Devon Webb",
  },
  {
    id: 4,
    name: "Tom Cook",
  },
  {
    id: 5,
    name: "Tanya Fox",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
  },
  {
    id: 7,
    name: "Caroline Schultz",
  },
  {
    id: 8,
    name: "Mason Heaney",
  },
  {
    id: 9,
    name: "Claudie Smitham",
  },
  {
    id: 10,
    name: "Emil Schaefer",
  },
];

const vehicle = [
  {
    id: 1,
    name: "Mobil",
  },
  {
    id: 2,
    name: "Motor",
  },
];

const paket = [
  {
    id: 1,
    name: "1 Bulan",
  },
  {
    id: 2,
    name: "2 Bulan",
  },
  {
    id: 3,
    name: "3 Bulan",
  },
  {
    id: 4,
    name: "6 Bulan",
  },
  {
    id: 5,
    name: "1 Tahun",
  },
];

const pembayaran = [
  {
    id: 1,
    name: "Gopay",
  },
  {
    id: 2,
    name: "OVO",
  },
  {
    id: 3,
    name: "Virtual Account Nobu",
  },
  {
    id: 4,
    name: "Virtual Account BCA",
  },
  {
    id: 5,
    name: "Virtual Account mandiri",
  },
];

export default function Membership() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="container min-h-screen">
        <NavbarMobile />
        <div className="flex flex-col items-start justify-start min-h-screen w-full">
          <div className="flex w-full space-x-20 justify-start items-center py-3 bg-amber-300">
            <FaArrowLeftLong
              className="pl-3 w-10"
              onClick={() => handleBack()}
            />
            <h1 className="text-lg font-semibold px-3">Membership</h1>
          </div>

          <div className="w-full flex flex-col items-start justify-start px-3 py-3 font-medium border-b border-gray-300">
            <h1 className="text-xl">Paket Member</h1>
            <p className="text-sm text-gray-400">
              Pilih paket yang anda inginkan
            </p>
          </div>

          <ListComponent list={people} title={"Pilih Lokasi"} />
          <ListComponent list={vehicle} title={"Pilih Type Kendaraan"} />
          <ListComponent list={paket} title={"Pilih Paket Member"} />

          <div className="px-3 flex flex-col justify-start items-start w-full mt-3">
            <input
              type="text"
              className="block w-full rounded-md border-0 py-3 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={"800/1000"}
              disabled
            />

            <div className="relative mt-3 rounded-md shadow-sm w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                <span className="text-gray-500 sm:text-sm">IDR</span>
              </div>
              <input
                id="price"
                name="price"
                type="text"
                placeholder="0.00"
                className="block w-full rounded-md border-0 py-3 pl-16 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={"9.000.000"}
                disabled
              />
            </div>
          </div>
          <ListComponent list={pembayaran} title={"Pilih Metode Pembayaran"} />

          <div className="px-3 flex flex-col justify-start items-start w-full mt-3">
            <button
              className="flex items-center justify-center w-full bg-blue-500 text-white py-3 px-5 rounded-lg shadow-md cursor-pointer mt-5"
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
          <h2 className="text-base max-h-[90vh] text-slate-400 font-medium mb-1 mt-20">
            Nominal Topup
          </h2>
          <h1 className="text-4xl font-medium">
            <span className="font-semibold">IDR</span>{" "}
            {parseInt("9000000").toLocaleString("id-ID")}
          </h1>

          <div className="flex justify-between items-center mt-5 border-b border-gray-300 pb-2 pt-3">
            <div className="text-base text-gray-400">Metode pembayaran</div>
            <p className="font-semibold">{selectedMethod}</p>
          </div>

          <div className="flex justify-between items-center border-b border-gray-300 pb-2 pt-3">
            <div className="text-base text-gray-400">Biaya admin</div>
            <p className="font-semibold">
              <span className="font-semibold">IDR</span>{" "}
              {parseInt("9000000").toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex justify-between items-center border-b border-gray-300 pb-2 pt-3">
            <div className="text-base text-gray-400">Total points</div>
            <p className="font-semibold">{parseInt("9000000") / 1000} Points</p>
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
