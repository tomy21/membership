import React, { useEffect, useState } from "react";
import TabRiwayat from "../components/TabRiwayat";
import { historyMembers } from "../../../api/apiUsers";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Perbaikan impor tanpa {}
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RxDownload } from "react-icons/rx";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import HistoryPayment from "../components/HistoryPayment";
import { HistoryPost } from "../../../api/apiProduct";
import Skeleton from "react-loading-skeleton";
import HistoryPostComponent from "../components/HistoryPost";
import { historyParking, Payment } from "../../../api/apiMembershipV2";

function Riwayat() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [idUser, setIdUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [activeTab, setActiveTab] = useState("tab1");
  const [listRiwayat, setListRiwayat] = useState([]);
  const [historyPost, setHistoryPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const tabs = ["Payment History", "Parking History"];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const historyResponse = await Payment.getAllTransaction();
        setListRiwayat(historyResponse?.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("Failed to fetch history:", error);
        } else {
          setListRiwayat([]); // Set default empty list if not found
        }
      } finally {
        setIsLoading(false);
      }

      try {
        const historyPost = await historyParking.getHistoryByUserId();
        setHistoryPost(historyPost?.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("Failed to fetch history:", error);
        } else {
          setHistoryPost([]); // Set default empty list if not found
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage, currentTab]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleExport = () => {
    try {
      let data = [];

      // Tentukan data berdasarkan tab aktif
      if (activeTab === "tab1") {
        data = listRiwayat;
      } else if (activeTab === "tab2") {
        data = historyPost;
      }

      // Validasi jika data kosong
      if (!data || data.length === 0) {
        alert("Tidak ada data untuk diekspor.");
        return;
      }

      // Map data untuk diubah menjadi format yang sesuai untuk Excel
      const excelData = data.map((row, index) => ({
        Id: index + 1,
        Invoice: row.invoice_id || "-",
        Virtual_Account: parseInt(row.virtual_account).toFixed() || "-",
        Product: row.product_name || "-",
        Price: row.price || 0,
        Status: row.statusPayment || "-",
        CreatedAt: row.createAt
          ? format(new Date(row.createAt), "dd MMM yyyy HH:mm:ss")
          : "-",
      }));

      // Membuat worksheet dari data
      const worksheet = XLSX.utils.json_to_sheet(excelData);

      // Membuat workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

      // Konversi workbook ke buffer binary
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Membuat blob untuk file Excel
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      // Simpan file menggunakan nama file dinamis berdasarkan tab aktif
      const fileName = `${
        tabs[currentTab]?.replace(" ", "_") || "Exported_Data"
      }.xlsx`;
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Gagal mengekspor data:", error);
      alert("Terjadi kesalahan saat mengekspor data. Silakan coba lagi.");
    }
  };

  const loadMore = () => {
    if (currentPage < totalPages) {
      setShowMore(true);
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = async () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="flex w-full space-x-20 justify-start items-center py-3 bg-amber-300">
        <FaArrowLeftLong className="pl-3 w-10" onClick={() => handleBack()} />
        <h1 className="text-lg font-semibold px-10">History</h1>
      </div>
      <div className="p-4 h-screen overflow-auto">
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
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Activity"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold">
            {activeTab === "tab1" ? "Payment History" : "Parking History"}
          </h2>
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-md flex flex-row justify-center items-center text-sm gap-x-2 text-blue-600"
          >
            <span>
              <RxDownload />
            </span>
            Export Excel
          </button>
        </div>

        <div className="space-y-2 w-full max-h-[70%] overflow-auto">
          <div className="">
            {activeTab === "tab1" && (
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
                  <div className="flex flex-col justify-start items-start px-4 space-y-2 h-full overflow-y-auto py-2">
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
                  <div className="flex flex-col justify-start items-start px-4 space-y-2 h-full overflow-y-auto py-2">
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
        {currentPage < totalPages && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={loadMore}
              className="bg-sky-500 w-full text-white px-4 py-2 rounded-md"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Riwayat;
