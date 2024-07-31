import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "../components/Accordion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";

const formatNumber = (number) => {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${dayName}, ${day} ${month} ${year} ${hours}:${minutes}`;
};

const copyToClipboard = (text) => {
  const trimmedText = text.trim();
  navigator.clipboard.writeText(trimmedText).then(
    () => {
      toast.success("Berhasil dicopy");
    },
    (err) => {
      toast.error("Gagal", err);
    }
  );
};

export default function PaymentProcess() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const formatAmount = formatNumber(Math.floor(location.state.amount));
  const formattedDate = formatDate(location.state.expairedDate);
  const navigate = useNavigate();

  const handleBack = async () => {
    navigate("/dashboard");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 h-screen">
      <ToastContainer />
      <div className="w-full flex flex-col justify-center items-center py-3 space-y-2 bg-white mb-3">
        <h1 className="text-xs font-normal text-gray-400">
          Lakukan pembayaran sebelum
        </h1>
        <h1 className="text-base font-bold text-red-500">{formattedDate}</h1>
      </div>

      <div className="w-full flex flex-col justify-start items-start px-3 py-3 space-y-7 bg-white">
        <div className="flex flex-col justify-start items-start w-full space-y-2">
          <h1 className="text-sm font-normal text-gray-400">
            Bayar ke nomor rekening virtual
          </h1>
          <div className="flex justify-between items-center w-full">
            <h1 className="text-base font-bold text-black">
              {location.state.virtualAccountNomor}
            </h1>
            <button
              onClick={() =>
                copyToClipboard(location.state.virtualAccountNomor)
              }
              className="border border-blue-500 rounded-md px-2 py-1 text-blue-500 text-center text-sm"
            >
              Salin
            </button>
          </div>
          <h1 className="text-sm font-normal text-gray-700">
            Bank {location.state.bankProvider} a/n {location.state.accountName}
          </h1>
        </div>

        <div className="flex flex-col justify-start items-start w-full space-y-3">
          <h1 className="text-sm font-normal text-gray-400">Bayar sejumlah</h1>

          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl font-normal text-black">
              <span className="text-bold">Rp</span> {formatAmount}
            </h1>
            <button
              onClick={() => copyToClipboard(location.state.amount)}
              className="border border-blue-500 rounded-md px-2 py-1 text-blue-500 text-center text-sm"
            >
              Salin
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col justify-start items-start px-3 py-3  bg-white mt-3">
        <h1 className="text-sm text-gray-400 mb-5">Cara Pembayaran</h1>

        <Accordion />

        <button className="w-full border border-blue-500 rounded-md py-3 text-blue-500 mt-10">
          Cek Status Pembayaran
        </button>
        <button
          onClick={handleBack}
          className="w-full border border-red-500 rounded-md py-3 text-red-500 mt-2"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
