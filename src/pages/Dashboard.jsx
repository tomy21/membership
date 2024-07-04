import React from "react";
import { IoMdNotifications } from "react-icons/io";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import NavbarMobile from "../components/NavbarMobile";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleTopUp = () => {
    navigate("/topup");
  };

  const items = [
    {
      src: "/assets/membership.png",
      alt: "Membership",
      label: "Membership",
      path: "/topup",
    },
    {
      src: "/assets/map.png",
      alt: "Lokasi Parkir",
      label: "Lokasi Parkir",
      path: "/lokasi",
    },
    {
      src: "/assets/gift-voucher.png",
      alt: "Voucher",
      label: "Voucher",
      path: "/voucher",
    },
    {
      src: "/assets/clock.png",
      alt: "History",
      label: "Riwayat",
      path: "/riwayat",
    },
  ];

  const listRiwayat = [
    {
      TypeTransaction: "topup",
      CreatedOn: "2021-12-12 12:12:12",
      Description: "Berhasil top up",
      Amount: 100000,
    },
    {
      TypeTransaction: "in",
      CreatedOn: "2024-07-03 08:12:12",
      Description: "Masuk area parkir",
      LocationName: "SKY Karawaci Office Park",
    },
    {
      TypeTransaction: "out",
      CreatedOn: "2021-07-03 17:12:12",
      Description: "Keluar area parkir",
      LocationName: "SKY Karawaci Office Park",
    },
    {
      TypeTransaction: "in",
      CreatedOn: "2024-07-02 08:12:12",
      Description: "Masuk area parkir",
      LocationName: "SKY Karawaci Office Park",
    },
    {
      TypeTransaction: "out",
      CreatedOn: "2021-07-02 17:12:12",
      Description: "Keluar area parkir",
      LocationName: "SKY Karawaci Office Park",
    },
    {
      TypeTransaction: "in",
      CreatedOn: "2024-07-01 08:12:12",
      Description: "Masuk area parkir",
      LocationName: "SKY Karawaci Office Park",
    },
    {
      TypeTransaction: "out",
      CreatedOn: "2021-07-01 17:12:12",
      Description: "Keluar area parkir",
      LocationName: "SKY Karawaci Office Park",
    },
  ];

  const formatCurrency = (amount) => {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };
  return (
    <>
      <div className="container min-w-screen m-auto">
        <NavbarMobile />

        <div className="w-full bg-amber-300 h-32"></div>

        <div className="relative -mt-10 w-full max-w-md px-6">
          <div className="bg-white shadow-lg rounded-xl p-4 flex items-center justify-between">
            {/* Points Section */}
            <div className="flex items-center space-x-2">
              <div className="bg-gray-100 p-2 rounded-full">
                <MdOutlineAccountBalanceWallet
                  size={30}
                  className="text-sky-500"
                />
              </div>
              <div>
                <p className="text-xl font-semibold">0 Points</p>
              </div>
            </div>
            {/* Top Up Button */}
            <button
              className="bg-gray-200 text-gray-700 p-2 font-medium rounded-lg flex items-center space-x-1"
              onClick={() => handleTopUp()}
            >
              <span>Top up</span>
            </button>
          </div>
        </div>

        <div className="flex flex-row space-x-6 justify-center items-center my-5 px-2">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <Link to={item.path}>
                <div className="bg-gray-200 rounded-lg p-2 shadow-md">
                  <img src={item.src} alt={item.alt} className="w-12 h-12" />
                </div>
                <p className="mt-2 text-xs text-center">{item.label}</p>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center px-5 my-2">
          <h1 className="font-semibold text-sm">Riwayat Transaksi</h1>
          <h1 className="font-semibold text-sm text-amber-500">view all</h1>
        </div>

        <div className="flex flex-col justify-start items-start mt-5 px-5 pb-3 space-y-2 min-h-28 max-h-72 overflow-y-auto">
          {listRiwayat.map((items, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-center bg-slate-100 w-full py-2 rounded-lg px-3"
            >
              <div className="flex flex-row justify-center items-center space-x-3 py-2">
                {items.TypeTransaction === "topup" ? (
                  <MdOutlineAccountBalanceWallet
                    size={30}
                    className="text-sky-500"
                  />
                ) : items.TypeTransaction === "in" ? (
                  <MdArrowDropUp size={30} className="text-emerald-500" />
                ) : (
                  <MdArrowDropDown size={30} className="text-red-500" />
                )}
                <div className="flex flex-col justify-start items-start">
                  <p className="text-xs font-semibold">{items.Description}</p>
                  <p className="text-xs text-slate-400 font-semibold">
                    {items.TypeTransaction === "topup"
                      ? formatCurrency(items.Amount)
                      : items.LocationName}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start w-14">
                <h1 className="text-xs font-medium">
                  {format(new Date(items.CreatedOn), "dd MMM yy")}
                </h1>
                <h1 className="text-xs font-medium">
                  {format(new Date(items.CreatedOn), "HH:mm:ss")}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
