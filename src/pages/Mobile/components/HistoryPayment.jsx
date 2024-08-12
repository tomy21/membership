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
  return (
    <>
      {listRiwayat.map((items, index) => (
        <div
          key={index}
          className="flex flex-row justify-between items-center bg-white shadow-md w-full py-2 rounded-lg px-2"
        >
          <div className="flex flex-row justify-center items-center space-x-3 py-2">
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
          </div>
        </div>
      ))}
    </>
  );
}
