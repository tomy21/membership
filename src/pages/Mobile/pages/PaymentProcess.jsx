import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "../components/Accordion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";
import { getIdTrx } from "../../../api/apiTrxPayment";
import { Users } from "../../../api/apiMembershipV2";

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
  const location = useLocation();
  const formatAmount = formatNumber(
    Math.floor(location.state.bankProvider.amount)
  );
  const formattedDate = formatDate(location.state.response.expired_date);
  const navigate = useNavigate();

  const handleCekStatus = async () => {
    const responseCek = await getIdTrx.getIdStatus(
      location.state.response.virtualAccountData.trxId
    );

    if (responseCek.statusCode === 200) {
      navigate("/cekStatus", {
        state: {
          responseCek: responseCek.data[0].Id,
          TrxId: location.state.response.virtualAccountData.trxId,
          accountName:
            location.state.response.virtualAccountData.virtualAccountName,
          virtualAccountNomor:
            location.state.response.virtualAccountData.virtualAccountNo,
          totalAmount:
            location.state.response.virtualAccountData.totalAmount.value,
          currency:
            location.state.response.virtualAccountData.totalAmount.currency,
          bankName: location.state.bankProvider,
        },
      });
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
              {location.state.response.virtual_account}
            </span>
            <button
              onClick={() =>
                copyToClipboard(location.state.response.virtual_account)
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
                copyToClipboard(location.state.bankProvider.amount)
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
    </div>
  );
}
