import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function HistoryPayment({ listRiwayat }) {
  const navigate = useNavigate();
  const formatCurrency = (amount) => {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });
  };

  const handleDetail = (dataList) => {
    const data = {
      response: {
        data: {
          price: dataList.price,
          expired_date: dataList.expired_date,
          trxId: dataList.trxId,
          virtual_account: dataList.virtual_account,
        },
      },
    };
    navigate("/payment_process", { state: data });
  };

  return (
    <>
      {listRiwayat.map((items, index) => (
        <div
          key={index}
          className="bg-white shadow-md w-full rounded-lg border border-slate-300 text-xs relative max-h-60 hover:bg-slate-100"
          onClick={() => handleDetail(items)}
        >
          <div className="absolute bg-white rounded-full h-6 w-6 -left-4 top-7 border-r border-slate-300"></div>
          <div className="absolute bg-white rounded-full h-6 w-6 -right-4 top-7 border-l border-slate-300"></div>

          <div className="flex justify-between items-center w-full mb-3 border-b border-dashed py-3 px-3">
            <h1>{items.purchase_type.toUpperCase()}</h1>
            <h3>{format(new Date(items?.timestamp), "dd MMM yyyy HH:mm")}</h3>
          </div>

          <div className="flex justify-start items-center text-left w-full mb-3 border-dashed border-b py-3 px-3">
            {items?.product_name === "TOP UP"
              ? "Top Up Point Member"
              : items?.product_name}
          </div>

          <div className="flex justify-between items-center w-full mb-3 px-3 ">
            <p
              className={`text-xs font-semibold border px-3 py-2 rounded-xl ${
                items?.statusPayment === "PAID"
                  ? "text-green-600 bg-green-100"
                  : items?.statusPayment === "PENDING"
                  ? "text-yellow-600 bg-yellow-100"
                  : items?.statusPayment === "FAILED"
                  ? "text-red-600 bg-red-100"
                  : "-"
              }`}
            >
              {items?.statusPayment}
            </p>

            <h1 className="text-sm font-semibold">
              {formatCurrency(parseInt(items?.price ?? 0))}
            </h1>
          </div>
        </div>
      ))}
    </>
  );
}
