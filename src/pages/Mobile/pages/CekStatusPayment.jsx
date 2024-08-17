import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiBarindCekstatus } from "../../../api/apiBayarind";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CekStatusPayment() {
  const location = useLocation();
  const navigate = useNavigate(); // Hook untuk navigasi
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiBarindCekstatus.cekStatus(location.state);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (location.state) {
      fetchData();
    }
  }, [location.state]);

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);

    // Format tanggal secara manual
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("id-ID", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${year} ${hours}:${minutes}`;
  };

  // Fungsi untuk memformat mata uang
  const formatCurrency = (amount, currency) => {
    if (amount === undefined || currency === undefined) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  // Fungsi untuk mendownload halaman sebagai PDF
  const downloadPDF = () => {
    const input = document.getElementById("payment-info");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("bukti-pembayaran.pdf");
    });
  };

  // Fungsi untuk navigasi kembali ke dashboard
  const goBackToDashboard = () => {
    navigate("/dashboard"); // Ganti '/dashboard' dengan path dashboard Anda
  };

  return (
    <>
      <div className="container min-h-screen bg-white flex flex-col justify-between">
        <div className="py-3 w-full bg-amber-400">
          <div className="">Status Pembayaran</div>
        </div>

        <div
          id="payment-info" // Tambahkan ID untuk pengambilan elemen oleh jsPDF
          className="flex flex-col justify-start items-start p-3 space-y-3 flex-grow"
        >
          <h1 className="text-base font-semibold">Informasi Pembayaran</h1>

          <div className="flex flex-col justify-start items-start">
            <h1 className="text-slate-400">No Transaksi</h1>
            <h2 className="font-normal">{location.state.TrxId}</h2>
          </div>
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-slate-400">Bank</h1>
            <h2 className="font-normal">{location.state.bankName}</h2>
          </div>
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-slate-400">No Virtual Account</h1>
            <h2 className="font-normal">
              {data.virtualAccountData?.virtualAccountNo ||
                location.state.virtualAccountNomor}
            </h2>
          </div>
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-slate-400">Total Pembayaran</h1>
            <h2 className="font-normal">
              {data.virtualAccountData?.totalAmount?.value &&
              data.virtualAccountData?.totalAmount?.currency
                ? formatCurrency(
                    data.virtualAccountData?.totalAmount?.value,
                    data.virtualAccountData?.totalAmount?.currency
                  )
                : formatCurrency(
                    location?.state?.totalAmount,
                    location?.state?.currency
                  )}
            </h2>
          </div>
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-slate-400">Tanggal Transaksi</h1>
            <h2 className="font-normal">
              {formatDate(data.virtualAccountData?.transactionDate)}
            </h2>
          </div>
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-slate-400">Keterangan</h1>
            <h2 className="font-normal">
              {data.virtualAccountData?.description || "-"}
            </h2>
          </div>
          <div className="flex flex-col justify-start items-start mb-5">
            <h1 className="text-slate-400">Status Pembayaran</h1>
            <h2
              className={`font-normal ${
                data.virtualAccountData?.paymentStatus === "Success"
                  ? "text-green-500"
                  : data.virtualAccountData?.paymentStatus === "Pending" ||
                    !data.virtualAccountData?.paymentStatus
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {data.virtualAccountData?.paymentStatus
                ? data.virtualAccountData?.paymentStatus
                : "Pending"}
            </h2>
          </div>
        </div>

        <div className="flex flex-col w-full space-y-3 p-3">
          <button
            onClick={downloadPDF} // Tambahkan onClick untuk download PDF
            className="bg-blue-400 p-3 rounded-md"
          >
            Download Bukti Bayar
          </button>
          <button
            onClick={goBackToDashboard} // Tambahkan onClick untuk kembali ke dashboard
            className="bg-red-400 p-3 rounded-md"
          >
            Kembali
          </button>
        </div>
      </div>
    </>
  );
}
