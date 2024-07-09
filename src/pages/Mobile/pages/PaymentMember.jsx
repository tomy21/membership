import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarMobile from "../components/NavbarMobile";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { motion } from "framer-motion";
import { TbExclamationMark } from "react-icons/tb";

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
    title: "Virtual Account Nobu",
    path: "/assets/payment/nobu_logo.png",
    name: "VA Nobu",
  },
  {
    id: 4,
    title: "Virtual Account BCA",
    path: "/assets/payment/bca_logo.png",
    name: "VA BCA",
  },
  {
    id: 5,
    title: "Virtual Account Mandiri",
    path: "/assets/payment/logo_mandiri.png",
    name: "VA Mandiri",
  },
  {
    id: 6,
    title: "Virtual Account BNI",
    path: "/assets/payment/bni_logo.png",
    name: "VA BNI",
  },
];

function PaymentMember() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    location: selectedLocation,
    vehicleType,
    packageMember,
  } = location.state || {};

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

  const handleProceedCancel = () => {
    navigate("/dashboard");
  };

  const getMonthlyPeriod = (date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);

    return {
      start: format(start, "dd MMM yyyy"),
      end: format(end, "dd MMM yyyy"),
    };
  };

  const verifikasi = () => {
    setIsModalVisible(false);
    navigate("/verifikasi");
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  //   const handleBack = () => {
  //     navigate("/dashboard");
  //   };

  const currentPeriod = getMonthlyPeriod(new Date());
  return (
    <>
      <div>
        {isModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
        )}
        <NavbarMobile />
        <div className="container px-3">
          <div className="flex flex-col items-start justify-start mt-2 w-full border border-gray-400 rounded-lg">
            <div className="bg-gray-200 w-full">
              <h1 className="flex justify-start items-center px-3 text-lg font-semibold h-10">
                #TRX0912311
              </h1>
            </div>
            <div className="px-3 flex flex-col justify-start items-start w-full">
              <div className="flex flex-col justify-start items-start border-b border-gray-400 w-full pb-2">
                <p className="text-lg pt-2 font-semibold">Informasi Member</p>
                <p className="text-gray-400">
                  {selectedLocation ? selectedLocation.name : "-"}
                </p>
                <p className="text-gray-400">
                  {vehicleType ? vehicleType.name : "-"}
                </p>
                <p className="text-gray-400">
                  {packageMember ? packageMember.name : "-"}
                </p>
              </div>

              <p className="text-lg pt-2 font-semibold">Periode</p>
              <p className="font-semibol text-gray-400 ">
                {`${currentPeriod.start} - ${currentPeriod.end}`}
              </p>
              <p className="text-gray-400 pb-2">
                {packageMember
                  ? `IDR ${parseInt(packageMember.tariff).toLocaleString(
                      "id-ID"
                    )}`
                  : "-"}
              </p>
            </div>
          </div>
          <p className="flex items-start text-md font-medium mb-3 mt-3">
            Pilih metode pembayaran
          </p>
          <div className="w-full mb-2 text-start max-h-[40vh] overflow-y-auto">
            <div className="w-full mb-5">
              <div className="flex flex-col items-center justify-start space-y-2">
                {paymentMethod.map((method, index) => (
                  <div
                    key={index}
                    className={`flex items-start justify-between p-3 rounded-lg shadow-md cursor-pointer w-full ${
                      selectedMethod === method.name
                        ? "bg-blue-400"
                        : "bg-gray-100"
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
          </div>
          <button
            className="flex items-center justify-center w-full bg-blue-500 text-white py-3 rounded-lg shadow-md cursor-pointer mt-2"
            onClick={handleProceed}
          >
            <span>Lanjutkan</span>
          </button>
          <button
            className="flex items-center justify-center w-full bg-red-500 text-white py-3 rounded-lg shadow-md cursor-pointer mt-2"
            onClick={handleProceedCancel}
          >
            <span>Batal</span>
          </button>
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
            Total pembayaran
          </h2>
          <h1 className="text-4xl font-medium">
            <span className="font-semibold">IDR</span>{" "}
            {packageMember
              ? `${parseInt(packageMember.tariff + 5000).toLocaleString(
                  "id-ID"
                )}`
              : "-"}
          </h1>

          <div className="flex justify-between items-center mt-5 border-b border-gray-300 pb-2 pt-3">
            <div className="text-base text-gray-400">Metode pembayaran</div>
            <p className="font-semibold">{selectedMethod}</p>
          </div>

          <div className="flex justify-between items-center border-b border-gray-300 pb-2 pt-3">
            <div className="text-base text-gray-400">Biaya member</div>
            <p className="font-semibold">
              <span className="font-semibold">IDR</span>{" "}
              {parseInt(packageMember.tariff).toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex justify-between items-center border-b border-gray-300 pb-2 pt-3">
            <div className="text-base text-gray-400">Biaya admin</div>
            <p className="font-semibold">
              <span className="font-semibold">IDR</span>{" "}
              {parseInt("5000").toLocaleString("id-ID")}
            </p>
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

export default PaymentMember;
