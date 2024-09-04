import React from "react";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { format } from "date-fns";

export default function HistoryPayment({ listRiwayat }) {
  const formatCurrency = (amount) => {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };
  console.log(listRiwayat);
  return (
    <>
      {listRiwayat.map((items, index) => (
        <div
          key={index}
          className="bg-white shadow-md w-full rounded-lg border border-slate-300 text-xs relative h-60"
        >
          <div className="absolute bg-white rounded-full h-6 w-6 -left-4 top-7 border-r border-slate-300"></div>
          <div className="absolute bg-white rounded-full h-6 w-6 -right-4 top-7 border-l border-slate-300"></div>

          <div className="flex justify-between items-center w-full mb-3 border-b border-dashed py-3 px-3">
            <h1>{items.Activity.toUpperCase()}</h1>
            <h3>{format(new Date(items.CreatedAt), "dd MMM yy")}</h3>
          </div>

          <div className="flex justify-between items-center w-full mb-3 border-b py-3 px-3">
            <div className="flex flex-col justify-start items-start">
              <label htmlFor="plat_nomor" className="text-xs text-slate-400">
                Plat Nomor
              </label>
              <h1 className="text-sm font-semibold">tambahkan plat</h1>
            </div>
            <div className="flex flex-col justify-start items-start w-40">
              <label htmlFor="plat_nomor" className="text-xs text-slate-400">
                {items.Activity === "topup" ? "Price" : "Lokasi"}
              </label>
              <h1 className="text-xs font-semibold text-start">
                {items.Activity === "topup"
                  ? formatCurrency(items.Price)
                  : items.LocationName}
              </h1>
            </div>
          </div>

          <div className="flex justify-between items-center w-full mb-3 px-3 ">
            <p
              className={`text-xs font-semibold border px-3 py-2 rounded-xl ${
                items.Status === "Success"
                  ? "text-green-600 bg-green-100"
                  : items.Status === "Pending"
                  ? "text-yellow-600 bg-yellow-100"
                  : items.Status === "Cancel"
                  ? "text-red-600 bg-red-100"
                  : "-"
              }`}
            >
              {items.Status === "Success"
                ? items.Status.toUpperCase()
                : items.Status === "Pending"
                ? items.Status.toUpperCase()
                : items.Status === "Cancel"
                ? items.Status.toUpperCase()
                : "-"}
            </p>
          </div>

          {/* <div className="flex flex-row justify-center items-center space-x-3 py-2">
            {items.Activity === "topup" ? (
              <MdOutlineAccountBalanceWallet
                size={30}
                className="text-sky-500"
              />
            ) : items.Activity === "membership" ? (
              <MdOutlineAccountBalanceWallet
                size={30}
                className="text-sky-500"
              />
            ) : items.Activity === "in" ? (
              <MdArrowDropUp size={30} className="text-emerald-500" />
            ) : (
              <MdArrowDropDown size={30} className="text-red-500" />
            )}
            <div className="flex flex-col justify-start items-start">
              <div className="flex flex-row justify-start items-center space-x-2">
                <p className={`text-xs font-semibold `}>
                  {items.Activity.toUpperCase()}
                </p>
                <p
                  className={`text-xs font-semibold ${
                    items.Status === "Success"
                      ? "text-green-600"
                      : items.Status === "Pending"
                      ? "text-yellow-600"
                      : items.Status === "Cancel"
                      ? "text-red-600"
                      : "-"
                  }`}
                >
                  {items.Status === "Success"
                    ? items.Status.toUpperCase()
                    : items.Status === "Pending"
                    ? items.Status.toUpperCase()
                    : items.Status === "Cancel"
                    ? items.Status.toUpperCase()
                    : "-"}
                </p>
              </div>
              <p className="text-xs text-slate-400 font-semibold">
                {items.Activity === "topup"
                  ? formatCurrency(items.Price)
                  : items.LocationName}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-16">
            <h1 className="text-xs font-medium">
              {format(new Date(items.CreatedAt), "dd MMM yy")}
            </h1>
            <h1 className="text-xs font-medium">
              {format(new Date(items.CreatedAt), "HH:mm:ss")}
            </h1>
          </div> */}
        </div>
      ))}
    </>
  );
}
