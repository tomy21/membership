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

function Riwayat() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [idUser, setIdUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const navigate = useNavigate();

  const tabs = ["Payment History", "Parking History"];

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
    if (idUser) {
      fetchData(idUser, currentPage, currentTab);
    }
  }, [idUser, currentPage, currentTab]);

  const fetchData = async (idUser, page, tab) => {
    setLoading(true);
    try {
      let response;
      switch (tab) {
        case 1: // Payment History
          response = await historyMembers.getHistory(idUser, page);
          break;
        case 2: // Parking History
          response = await historyMembers.getHistory(idUser, page);
          break;
        default: // Member History
          response = await historyMembers.getHistory(idUser, page);
      }
      setData((prevData) =>
        showMore ? [...prevData, ...response.data] : response.data
      );

      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleExport = () => {
    const csvData = data.map((row) => ({
      Id: row.Id,
      Activity: row.Activity,
      Price: row.Price,
      Status: row.Status,
      CreatedAt: row.CreatedAt,
    }));

    const csv = [
      ["Id", "Activity", "Price", "Status", "CreatedAt"],
      ...csvData.map((item) => [
        item.Id,
        item.Activity,
        item.Price,
        item.Status,
        item.CreatedAt,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${tabs[currentTab].replace(" ", "_")}.csv`);
  };

  const filteredData = data.filter((item) =>
    item.Activity.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="p-4">
        <TabRiwayat
          tabs={tabs}
          currentTab={currentTab}
          onTabChange={(tabIndex) => {
            setShowMore(false);
            setCurrentPage(1);
            setCurrentTab(tabIndex);
          }}
        />
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
          <h2 className="text-base font-semibold">{tabs[currentTab]}</h2>
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-md flex flex-row justify-center items-center text-sm gap-x-2 text-blue-600"
          >
            <span>
              <RxDownload />
            </span>
            Export CSV
          </button>
        </div>
        <div className="space-y-4 max-h-[70vh] overflow-auto">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredData.map((item) => (
              <div
                key={item.Id}
                className={`p-4 rounded-md shadow-md flex flex-col justify-start items-start ${
                  item.Status === "Success"
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                    : item.Status === "Pending"
                    ? "bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-800"
                    : "bg-gradient-to-r from-red-400 to-red-600 text-white"
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="font-semibold">
                    {item.Activity.toUpperCase()}
                  </span>
                  <span>{item.Status}</span>
                </div>
                <span className="mt-4">
                  Rp {item.Price.toLocaleString("id-ID")}
                </span>
                <span>{format(new Date(item.CreatedAt), "dd MMMM yyyy")}</span>
              </div>
            ))
          )}
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
