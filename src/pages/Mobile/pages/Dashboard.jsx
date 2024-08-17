import React, { useEffect, useState } from "react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import NavbarMobile from "../components/NavbarMobile";
import SliderComponent from "../components/Slider";
import QRCode from "qrcode.react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getUserById, historyMembers } from "../../../api/apiUsers";
import Skeleton from "react-loading-skeleton";
import { getMemberByUserId } from "../../../api/apiProduct";
import { isMobile } from "react-device-detect";
import HistoryPayment from "../components/HistoryPayment";

const items = [
  {
    src: "/assets/membership.png",
    alt: "Membership",
    label: "Membership",
    path: "/membership",
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
    label: "History",
    path: "/riwayat",
  },
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [idUser, setIdUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [listRiwayat, setListRiwayat] = useState([]);
  const [memberProduct, setMemberProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("tab1");
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

  const formatPoints = (value) => {
    const num = parseFloat(value);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + " jt";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + " k";
    } else {
      return num.toFixed(0);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = Cookies.get("refreshToken");
      if (!token) {
        navigate("/");
        return;
      }

      const decodedToken = jwtDecode(token);
      setIdUser(decodedToken.Id);
    };
    fetchToken();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!idUser) return;

      try {
        const userResponse = await getUserById.userById(idUser);
        setBalance(userResponse.points);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }

      try {
        const historyResponse = await historyMembers.getHistory(idUser);
        setListRiwayat(historyResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("Failed to fetch history:", error);
        } else {
          setListRiwayat([]); // Set default empty list if not found
        }
      }

      try {
        const productMemberResponse = await getMemberByUserId.getByUserId(
          idUser
        );
        setMemberProduct(productMemberResponse.data);
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          console.error("Failed to fetch product member data:", error);
        } else {
          setMemberProduct([]); // Set default empty list if not found
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idUser]);

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
                <p className="text-xl font-normal">
                  {formatPoints(balance)}
                  <span className="text-sm"> Points</span>
                </p>
              </div>
            </div>
            {/* Top Up Button */}
            <button
              className="bg-gray-200 text-gray-700 p-2 font-medium rounded-lg flex items-center space-x-1"
              onClick={handleTopUp}
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
          <h1 className="text-sm font-semibold">History</h1>
          <Link to={"/riwayat"}>
            <h1 className="font-semibold text-sm text-amber-500">view all</h1>
          </Link>
        </div>

        <div className="flex border-b border-gray-300 mb-4">
          <button
            onClick={() => setActiveTab("tab1")}
            className={`py-2 px-4 text-sm font-semibold ${
              activeTab === "tab1"
                ? "border-b-2 border-amber-500 text-amber-500"
                : "text-gray-500"
            }`}
          >
            Payment
          </button>
          <button
            onClick={() => setActiveTab("tab2")}
            className={`py-2 px-4 text-sm font-semibold ${
              activeTab === "tab2"
                ? "border-b-2 border-amber-500 text-amber-500"
                : "text-gray-500"
            }`}
          >
            Parking
          </button>
        </div>

        <div className="">
          {activeTab === "tab1" && (
            <div>
              {listRiwayat.length === 0 ? (
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
                    <HistoryPayment listRiwayat={listRiwayat} />
                  )}
                </div>
              )}
            </div>
          )}
          {activeTab === "tab2" && (
            <div className="flex flex-col justify-center items-center w-full h-[30vh] opacity-60">
              <img src={"/parchment.png"} className="w-24 opacity-20" alt="" />
              <p className="text-sm text-gray-500 mt-5">
                Belum ada history parking
              </p>
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
              <button
                className="bg-red-500 text-white px-4 py-2 rounded w-full"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
