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
            <h3>
              {format(new Date(items?.gate_in_time), "dd MMM yyyy HH:mm")}
            </h3>
          </div>

          <div className="flex justify-between items-center w-full mb-3 border-b py-3 px-3">
            <div className="flex flex-col justify-start items-start w-1/2">
              <label htmlFor="plat_nomor" className="text-xs text-slate-400">
                Plat Nomor
              </label>
              <h1 className="text-sm font-semibold">
                {items?.plate_number ? items?.plate_number : "-"}
              </h1>
            </div>
            <div className="flex flex-col justify-start items-start w-1/2">
              <label htmlFor="plat_nomor" className="text-xs text-slate-400">
                Lokasi
              </label>
              <h1 className="text-xs font-semibold text-start">
                {items?.location_name}
              </h1>
            </div>
          </div>

          <div className="flex justify-between items-center w-full mb-3 px-3 ">
            <p
              className={`text-xs font-semibold border px-3 py-2 rounded-xl ${
                items?.status === "In area parking"
                  ? "text-green-600 bg-green-100"
                  : items?.status === "Out area parking"
                  ? "text-emerald-600 bg-emerald-100"
                  : items?.status === "Unknown"
                  ? "text-amber-600 bg-amber-100"
                  : "-"
              }`}
            >
              {items?.status === "Unknown" ? "Testing" : items?.status}
            </p>
            <h1 className="text-sm font-semibold">{items.status_member}</h1>
          </div>
        </div>
      ))}
    </>
  );
}
