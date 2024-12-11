import React, { useEffect, useState } from "react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import NavbarMobile from "../components/NavbarMobile";
import SliderComponent from "../components/Slider";
import QRCode from "qrcode.react";
import { apiUsers, historyMembers } from "../../../api/apiUsers";
import Skeleton from "react-loading-skeleton";
import {
  getMemberByUserId,
  History,
  HistoryPost,
} from "../../../api/apiProduct";
import { isMobile } from "react-device-detect";
import HistoryPayment from "../components/HistoryPayment";
import HistoryPostComponent from "../components/HistoryPost";
import { Users } from "../../../api/apiMembershipV2";

const items = [
  {
    src: "/assets/membership.png",
    alt: "Membership",
    label: "Membership",
    path: "/membership",
  },
  {
    src: "/assets/map.png",
    alt: "Location",
    label: "Location",
    path: "/lokasi",
  },
  {
    src: "/assets/gift-voucher.png",
    alt: "Voucher",
    label: "Voucher",
    path: "/voucher",
  },
  {
    src: "/assets/vehicles.png",
    alt: "History",
    label: "Vehicle List",
    path: "/vehicle-list",
  },
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [dataCustomer, setDataCustomer] = useState([]);
  const [listRiwayat, setListRiwayat] = useState([]);
  const [historyPost, setHistoryPost] = useState([]);
  const [memberProduct, setMemberProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("Payment");
  const navigate = useNavigate();

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleTopUp = () => {
    navigate("/topup");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Users.getByUserId();
        setDataCustomer(response.data);
        setMemberProduct(response.data?.membership_cards);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDataHistoryPayment = async () => {
      setIsLoading(true);
      try {
        const response = await History.getAll();
        setListRiwayat(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    fetchDataHistoryPayment();
  }, []);

  // Disable back navigation on mobile
  useEffect(() => {
    const handlePopState = (event) => {
      if (isMobile) {
        event.preventDefault();
        event.stopPropagation();
        navigate(1);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  const handleDetailLocation = (id) => {
    navigate(`/detailMember/${id}`, { state: { selectedProduct } });
  };

  return (
    <>
      <div className="container min-w-screen min-h-screen m-auto">
        <NavbarMobile />

        <div className={`w-full bg-amber-300 h-52`}>
          <SliderComponent
            openModal={openModal}
            memberProducts={memberProduct}
          />
        </div>

        <div className="relative -mt-10 w-full max-w-md px-3">
          <div className="bg-white shadow-lg rounded-xl p-4 flex items-center justify-between">
            {/* Points Section */}
            <div className="flex items-center space-x-2">
              <div className="bg-gray-100 p-2 rounded-full shadow-md">
                <MdOutlineAccountBalanceWallet
                  size={30}
                  className="text-sky-500"
                />
              </div>
              <div>
                <p className="text-xl font-normal flex flex-col justify-start items-start">
                  <span className="text-sm"> Points</span>
                  {(dataCustomer?.points ?? 0).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
            {/* Top Up Button */}
            <button
              className="bg-emerald-600 text-white text-sm p-2 font-medium rounded-lg flex items-center space-x-1"
              onClick={handleTopUp}
            >
              <span>Top up</span>
            </button>
          </div>
        </div>

        <div className="flex flex-row space-x-6 justify-center items-center my-5 px-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <Link to={item.path}>
                <div className="bg-gray-200 rounded-lg p-2 shadow-md items-center flex justify-center ">
                  <img src={item.src} alt={item.alt} className="w-12" />
                </div>
                <p className="mt-2 text-xs text-center">{item.label}</p>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center px-5 my-2">
          <h1 className="text-sm font-semibold">History</h1>
          <Link to={"/riwayat"}>
            <h1 className="font-semibold text-sm text-amber-500">view all</h1>
          </Link>
        </div>

        <div className="flex border-b border-gray-300 mb-4">
          <button
            onClick={() => setActiveTab("Payment")}
            className={`py-2 px-4 text-sm font-semibold ${
              activeTab === "Payment"
                ? "border-b-2 border-amber-500 text-amber-500"
                : "text-gray-500"
            }`}
          >
            Payment
          </button>
          <button
            onClick={() => setActiveTab("POST")}
            className={`py-2 px-4 text-sm font-semibold ${
              activeTab === "POST"
                ? "border-b-2 border-amber-500 text-amber-500"
                : "text-gray-500"
            }`}
          >
            Parking
          </button>
        </div>

        <div className="">
          {activeTab === "Payment" && (
            <div>
              {listRiwayat?.length === 0 ? (
                <div className="flex flex-col justify-center items-center w-full h-[30vh] opacity-60">
                  <img
                    src={"/parchment.png"}
                    className="w-24 opacity-20"
                    alt=""
                  />
                  <p className="text-sm text-gray-500 mt-5">
                    Belum ada riwayat transaksi
                  </p>
                </div>
              ) : (
                <div className="flex flex-col justify-start items-start mt-5 px-5 pb-3 space-y-2 min-h-1/2 max-h-80 overflow-y-auto py-2">
                  {isLoading ? (
                    [...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className="flex flex-row justify-between items-center bg-white shadow-md w-full py-2 rounded-lg px-3"
                      >
                        <div className="flex flex-row justify-center items-center space-x-3 py-2">
                          <Skeleton circle={true} height={30} width={30} />
                          <div className="flex flex-col justify-start items-start">
                            <Skeleton width={100} />
                            <Skeleton width={80} />
                          </div>
                        </div>
                        <div className="flex flex-col justify-start items-start w-14">
                          <Skeleton width={40} />
                          <Skeleton width={30} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <HistoryPayment listRiwayat={listRiwayat} />
                  )}
                </div>
              )}
            </div>
          )}
          {activeTab === "POST" && (
            <div>
              {historyPost?.length === 0 ? (
                <div className="flex flex-col justify-center items-center w-full h-[30vh] opacity-60">
                  <img
                    src={"/parchment.png"}
                    className="w-24 opacity-20"
                    alt=""
                  />
                  <p className="text-sm text-gray-500 mt-5">
                    Belum ada riwayat parkir
                  </p>
                </div>
              ) : (
                <div className="flex flex-col justify-start items-start mt-5 px-5 pb-3 space-y-2 min-h-28 max-h-72 overflow-y-auto py-2">
                  {isLoading ? (
                    [...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className="flex flex-row justify-between items-center bg-white shadow-md w-full py-2 rounded-lg px-3"
                      >
                        <div className="flex flex-row justify-center items-center space-x-3 py-2">
                          <Skeleton circle={true} height={30} width={30} />
                          <div className="flex flex-col justify-start items-start">
                            <Skeleton width={100} />
                            <Skeleton width={80} />
                          </div>
                        </div>
                        <div className="flex flex-col justify-start items-start w-14">
                          <Skeleton width={40} />
                          <Skeleton width={30} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <HistoryPostComponent dataPost={historyPost} />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[70%] text-center relative">
            <h2 className="text-xl font-semibold">Qr Code Member</h2>
            <p className="text-xs text-slate-400">Silahkan scan QRCODE kamu</p>

            <div className="border-b border-slate-400 w-full h-1 mb-8"></div>

            <div className="flex flex-col justify-center items-center w-full space-y-10">
              <QRCode value={selectedProduct.CardId} size={150} />
              <div className="flex flex-col justify-center items-center space-y-2 w-full">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded w-full"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  className="bg-sky-500 text-white px-4 py-2 rounded w-full"
                  onClick={() => handleDetailLocation(selectedProduct.Id)}
                >
                  Detail Lokasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
