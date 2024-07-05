import React, { useEffect, useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ListComponent from "../components/ListComponent";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { TbExclamationMark } from "react-icons/tb";

const lokasi = [
  {
    id: 1,
    Code: "004SK",
    name: "SKY UNIVERSITAS PELITA HARAPAN	",
    Quota: 2000,
    Used: 1500,
  },
  {
    id: 2,
    Code: "007SK",
    name: "SKY ZONA 3 SILOAM KARAWACI",
    Quota: 3000,
    Used: 2300,
  },
  {
    id: 3,
    Code: "002SK",
    name: "SKY CYBERPARK KARAWACI",
    Quota: 800,
    Used: 800,
  },
  {
    id: 4,
    Code: "003SK",
    name: "SKY KARAWACI OFFICE PARK",
    Quota: 2000,
    Used: 1800,
  },
  {
    id: 5,
    Code: "901SK",
    name: "SKY BCA FORESTA",
    Quota: 1000,
    Used: 1000,
  },
  {
    id: 6,
    Code: "009SK",
    name: "SKY MAXBOXX LIPPO VILLAGE",
    Quota: 1000,
    Used: 1000,
  },
  {
    id: 7,
    Code: "005SK",
    name: "SKY ZONA 2 HELI",
    Quota: 2000,
    Used: 1500,
  },
  {
    id: 8,
    Code: "05QSK",
    name: "SKY OT BUILDING",
    Quota: 2000,
    Used: 1500,
  },
  {
    id: 9,
    Code: "00000",
    name: "SKY HYPERMART KARAWACI",
    Quota: 2000,
    Used: 1500,
  },
  {
    id: 10,
    Code: "00001",
    name: "SKY LIPPO THAMRIN",
    Quota: 2000,
    Used: 1500,
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
    type: 1,
    tariff: 300000,
  },
  {
    id: 2,
    name: "2 Bulan",
    type: 1,
    tariff: 300000,
  },
  {
    id: 3,
    name: "3 Bulan",
    type: 1,
    tariff: 300000,
  },
  {
    id: 4,
    name: "6 Bulan",
    type: 1,
    tariff: 500000,
  },
  {
    id: 5,
    name: "1 Tahun",
    type: 1,
    tariff: 1300000,
  },
  {
    id: 6,
    name: "1 Bulan",
    type: 2,
    tariff: 110000,
  },
  {
    id: 7,
    name: "2 Bulan",
    type: 2,
    tariff: 220000,
  },
  {
    id: 8,
    name: "3 Bulan",
    type: 2,
    tariff: 330000,
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

  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");

  const [vehicleType, setVehicleType] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const [packageMember, setPackageMember] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState("");

  const [payment, setPayment] = useState(null);
  const [selectPayment, setSelectPayment] = useState("");

  const navigate = useNavigate();

  const handleProceed = () => {
    // if (selectedMethod) {
    //   setIsModalVisible(true);
    // } else {
    //   alert("Pilih metode pembayaran terlebih dahulu.");
    // }
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

  const filteredPaket = vehicleType
    ? paket.filter((p) => p.type === vehicleType.id)
    : [];

  // console.log(location.Quota);
  return (
    <>
      <div className="container  overflow-auto">
        <NavbarMobile />
        <div className="flex flex-col items-start justify-start min-h-[60vh] w-full">
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

          <ListComponent
            list={lokasi}
            title={"Pilih Lokasi"}
            search={"Cari Lokasi"}
            selected={location}
            setSelected={setLocation}
            query={selectedLocation}
            setQuery={setSelectedLocation}
          />
          <ListComponent
            list={vehicle}
            title={"Pilih Type Kendaraan"}
            search={"Cari Type Kendaraan"}
            selected={vehicleType}
            setSelected={setVehicleType}
            query={selectedVehicle}
            setQuery={setSelectedVehicle}
          />

          {vehicleType && (
            <ListComponent
              list={filteredPaket}
              title={"Pilih Paket Member"}
              search={"Cari Paket"}
              selected={packageMember}
              setSelected={setPackageMember}
              query={selectedPackage}
              setQuery={setSelectedPackage}
            />
          )}

          <div className="px-3 flex flex-col justify-start items-start w-full mt-3">
            <div className="relative rounded-md shadow-sm w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                <span className="text-gray-500 sm:text-sm">IDR</span>
              </div>
              <input
                id="price"
                name="price"
                type="text"
                placeholder="0.00"
                className="block w-full rounded-md border-0 py-3 pl-16 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={packageMember ? `${packageMember.tariff}` : "-"}
                disabled
              />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-0 mt-3 py-3 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={location ? `${location.Quota}/${location.Quota}` : "-"}
              disabled
            />
          </div>
          <ListComponent
            list={pembayaran}
            title={"Pilih Metode Pembayaran"}
            search={"Pilih methode pembayaran"}
            selected={payment}
            setSelected={setPayment}
            query={selectPayment}
            setQuery={setSelectPayment}
          />

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
            {/* <p className="font-semibold">{selectedMethod}</p> */}
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
