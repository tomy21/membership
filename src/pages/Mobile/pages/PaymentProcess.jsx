import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "../components/Accordion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";
import { getIdTrx } from "../../../api/apiTrxPayment";
import { Users } from "../../../api/apiMembershipV2";
import { format } from "date-fns";

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
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataStatus, setDataStatus] = useState(null);
  const location = useLocation();
  const formatAmount = formatNumber(
    Math.floor(
      location.state.response.data.price ?? location.state.response.price
    )
  );
  const formattedDate = formatDate(location.state.response.data.expired_date);
  const navigate = useNavigate();
  console.log(location.state);
  const handleCekStatus = async () => {
    const responseCek = await getIdTrx.getIdStatus(
      location.state.response.data.trxId
    );

    if (responseCek.statusCode === 200) {
      setIsModalOpen(true);
      setDataStatus(responseCek.data);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await Users.getByUserId();
        setName(response.data.fullname);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleBack = async () => {
    navigate("/dashboard");
  };

  if (loading) {
    return <Loading />;
  }

  console.log(location.state);

  return (
    <div className="bg-gray-100 min-h-screen text-left">
      <ToastContainer />

      {/* Header */}
      <div className="w-full flex flex-col justify-center items-center py-4 bg-white shadow-sm mb-5">
        <h1 className="text-sm text-gray-500">Lakukan pembayaran sebelum</h1>
        <h1 className="text-lg font-bold text-red-500">{formattedDate}</h1>
      </div>

      {/* Payment Details */}
      <div className="max-w-lg mx-auto bg-white shadow-sm rounded-lg p-6 space-y-6">
        <div>
          <h2 className="text-gray-500 text-sm">
            Bayar ke nomor rekening virtual
          </h2>
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-semibold text-gray-800">
              {location.state.response.data.virtual_account}
            </span>
            <button
              onClick={() =>
                copyToClipboard(location.state.response.data.virtual_account)
              }
              className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded-lg hover:bg-blue-50 transition"
            >
              Salin
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Bank {location.state.bankProvider.code_bank} a/n {name}
          </p>
        </div>

        <div>
          <h2 className="text-gray-500 text-sm">Bayar sejumlah</h2>
          <div className="flex justify-between items-center mt-2">
            <span className="text-2xl font-semibold text-gray-800">
              IDR {formatAmount}
            </span>
            <button
              onClick={() =>
                copyToClipboard(location.state.response.data.price)
              }
              className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded-lg hover:bg-blue-50 transition"
            >
              Salin
            </button>
          </div>
        </div>
      </div>

      {/* Payment Instructions */}
      <div className="max-w-lg h-full mx-auto bg-white shadow-sm rounded-lg p-6 mt-6">
        <h2 className="text-gray-500 text-sm mb-4">Cara Pembayaran</h2>
        <Accordion />

        <button
          onClick={handleCekStatus}
          className="w-full text-blue-600 border border-blue-600 rounded-lg py-3 mt-5 hover:bg-blue-50 transition"
        >
          Cek Status Pembayaran
        </button>
        <button
          onClick={handleBack}
          className="w-full text-red-600 border border-red-600 rounded-lg py-3 mt-3 hover:bg-red-50 transition"
        >
          Kembali
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fade-in">
          <div className="relative bg-white p-6 rounded-2xl shadow-2xl flex flex-col justify-center items-center w-[90%] max-w-md">
            {/* Icon Status */}
            {dataStatus.statusPayment === "PAID" ? (
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-md mb-4">
                <img
                  src={"/assets/success.png"}
                  alt="success"
                  className="w-14 h-14"
                />
              </div>
            ) : dataStatus.statusPayment === "PENDING" ? (
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center shadow-md mb-4">
                <img
                  src="/assets/pending.png"
                  alt="pending"
                  className="w-12 h-12"
                />
              </div>
            ) : (
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center shadow-md mb-4">
                <img
                  src="/assets/delete.png"
                  alt="delete"
                  className="w-12 h-12"
                />
              </div>
            )}

            {/* Header Text */}
            <div className="text-lg font-semibold text-gray-800 mb-2 text-center">
              {dataStatus.statusPayment === "PAID"
                ? "Pembayaran Berhasil"
                : dataStatus.statusPayment === "PENDING"
                ? "Pembayaran Tertunda"
                : "Pembayaran Gagal"}
            </div>
            <p className="text-sm text-gray-500 text-center">
              {dataStatus.statusPayment === "PAID"
                ? `Berhasil membayar sebesar`
                : "Silakan lakukan pembayaran."}
            </p>
            {dataStatus.statusPayment === "PENDING" ? (
              <div className="mb-4"></div>
            ) : (
              <h1 className="text-sm text-gray-500 mb-4 text-center">
                <p>Rp. {parseInt(dataStatus.price).toLocaleString("id-ID")}</p>
              </h1>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 w-full mb-4"></div>

            {/* Detail Informasi */}
            <div className="w-full text-xs text-gray-600 space-y-2">
              <div className="flex justify-between">
                <p className="font-medium">ID Invoice</p>
                <p>{dataStatus.invoice_id}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium">Type Pembelian</p>
                <p>{dataStatus.purchase_type}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium">Metode </p>
                <p>{dataStatus.transactionType}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium">Tanggal</p>
                <p>{format(dataStatus.updatedAt, "dd MMMM yyyy HH:mm:ss")}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end w-full mt-6 space-x-3">
              {/* <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Tutup
              </button> */}
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => setIsModalOpen(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
