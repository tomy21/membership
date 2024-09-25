import React from "react";
import { format } from "date-fns";

export default function HistoryPayment({ listRiwayat }) {
  const formatCurrency = (amount) => {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  return (
    <>
      {listRiwayat.map((items, index) => (
        <div
          key={index}
          className="bg-white shadow-md w-full rounded-lg border border-slate-300 text-xs relative max-h-60"
        >
          <div className="absolute bg-white rounded-full h-6 w-6 -left-4 top-7 border-r border-slate-300"></div>
          <div className="absolute bg-white rounded-full h-6 w-6 -right-4 top-7 border-l border-slate-300"></div>

          <div className="flex justify-between items-center w-full mb-3 border-b border-dashed py-3 px-3">
            <h1>{items.Activity.toUpperCase()}</h1>
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
                items?.Status === "Success"
                  ? "text-green-600 bg-green-100"
                  : items?.Status === "Pending"
                  ? "text-yellow-600 bg-yellow-100"
                  : items?.Status === "Cancel"
                  ? "text-yellow-600 bg-yellow-100"
                  : items?.Status === "Berhasil"
                  ? "text-emerald-600 bg-emerald-100"
                  : "-"
              }`}
            >
              {items?.Status}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
