import { format } from "date-fns";
import React from "react";

export default function HistoryPost({ dataPost }) {
  const formatCurrency = (amount) => {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  return (
    <>
      {dataPost.map((items, index) => (
        <div
          key={index}
          className="bg-white shadow-md w-full rounded-lg border border-slate-300 text-xs relative max-h-60"
        >
          <div className="absolute bg-white rounded-full h-6 w-6 -left-4 top-7 border-r border-slate-300"></div>
          <div className="absolute bg-white rounded-full h-6 w-6 -right-4 top-7 border-l border-slate-300"></div>

          <div className="flex justify-between items-center w-full mb-3 border-b border-dashed py-3 px-3">
            {/* <h1>{items.Activity.toUpperCase()}</h1> */}
            <h3>{format(new Date(items?.CreatedAt), "dd MMM yyyy HH:mm")}</h3>
          </div>

          <div className="flex justify-between items-center w-full mb-3 border-b py-3 px-3">
            <div className="flex flex-col justify-start items-start w-1/2">
              <label htmlFor="plat_nomor" className="text-xs text-slate-400">
                Plat Nomor
              </label>
              <h1 className="text-sm font-semibold">
                {items?.PlateNumber ? items?.PlateNumber : "-"}
              </h1>
            </div>
            <div className="flex flex-col justify-start items-start w-1/2">
              <label htmlFor="plat_nomor" className="text-xs text-slate-400">
                {items?.Activity === "topup" ? "Price" : "Lokasi"}
              </label>
              <h1 className="text-xs font-semibold text-start">
                {items?.Activity === "topup"
                  ? formatCurrency(items?.Price)
                  : items?.LocationName}
              </h1>
            </div>
          </div>

          <div className="flex justify-between items-center w-full mb-3 px-3 ">
            <p
              className={`text-xs font-semibold border px-3 py-2 rounded-xl ${
                items?.Status === "API berhasil dijalankan"
                  ? "text-green-600 bg-green-100"
                  : items?.Status ===
                    "Berhasilmasuk gate dengan status bukan member"
                  ? "text-yellow-600 bg-yellow-100"
                  : items?.Status === "Berhasil masuk gate dengan status member"
                  ? "text-emerald-600 bg-emerald-100"
                  : items?.Status === "Berhasil keluar gate"
                  ? "text-red-600 bg-red-100"
                  : items?.Status === "Kesalahan sistem API Baronang"
                  ? "text-red-600 bg-red-100"
                  : items?.Status === "Saldo tidak cukup"
                  ? "text-red-600 bg-red-100"
                  : items?.Status === "Kartu tidak valid"
                  ? "text-red-600 bg-red-100"
                  : items?.Status === "Kartu sedang digunakan"
                  ? "text-red-600 bg-red-100"
                  : items?.Status === "Vehicle not valid"
                  ? "text-red-600 bg-red-100"
                  : items?.Status === "Location not valid"
                  ? "text-red-600 bg-red-100"
                  : items?.Status ===
                    "Kartu yang digunakan tidak benar/bukan kartu yang digunakan di gate masuk"
                  ? "text-red-600 bg-red-100"
                  : items?.Status === "KID not valid"
                  ? "text-red-600 bg-red-100"
                  : items?.Status === "Invalid require param api"
                  ? "text-red-600 bg-red-100"
                  : "-"
              }`}
            >
              {items?.Status === "API berhasil dijalankan"
                ? "Berhasil Verifikasi"
                : items?.Status ===
                  "Berhasil masuk gate dengan status bukan member"
                ? "Masuk Area Parkir Bukan Member"
                : items?.Status === "Berhasil masuk gate dengan status member"
                ? "Masuk Area Parkir Dengan Member"
                : items?.Status === "Berhasil keluar gate"
                ? "Keluar Area Parkir"
                : items?.Status === "Kesalahan sistem API Baronang"
                ? "Ada Kesalahan"
                : items?.Status === "Saldo tidak cukup"
                ? "Saldo tidak Cukup"
                : items?.Status === "Kartu tidak valid"
                ? "Kartu tidak valid"
                : items?.Status === "Kartu sedang digunakan"
                ? "Kartu sedang di gunakan"
                : items?.Status === "Vehicle not valid"
                ? "Kendaraan tidak valid"
                : items?.Status === "Location not valid"
                ? "Lokasi tidak valid"
                : items?.Status ===
                  "Kartu yang digunakan tidak benar/bukan kartu yang digunakan di gate masuk"
                ? "Kartu salah"
                : items?.Status === "KID not valid"
                ? "KID tidak valid"
                : items?.Status === "Invalid require param api"
                ? "Invalid api"
                : "-"}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
