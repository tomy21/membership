import React, { useEffect, useState } from "react";
import TabTransaction from "./TabTransaction";
import { FaChevronDown, FaEllipsisH } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import Order from "./Table/Order";
import StatusMembers from "./Table/StatusMembers";
import { Tenants } from "../../../../../../api/apiTenant";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function TransactionTable() {
  const [activeTab, setActiveTab] = useState("orders");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: null, // Initially set to null
    endDate: null, // Initially set to null
    key: "selection",
  });

  const togglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    setIsPickerOpen(false); // Close the picker once dates are selected
  };

  const options = ["Option 1", "Option 2", "Option 3"];

  const fetchData = async (tab) => {
    setIsLoading(true);
    setTimeout(async () => {
      if (tab === "orders") {
        const dataOrder = await Tenants.getTransaction(
          currentPage,
          itemsPerPage
        );
        setData(dataOrder);
        setTotalPages(dataOrder.data.pagination.totalPages);
        setTotalItems(dataOrder.data.pagination.totalItems);
        setCurrentPage(dataOrder.data.pagination.currentPage);
      }
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData(activeTab); // Fetch data saat tab berubah
  }, [activeTab]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData();
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(currentPage);
    fetchData();
  };

  const formatDate = (date) => {
    if (!date) return "dd-mm-yyyy"; // Return placeholder if date is null
    return date.toLocaleDateString("en-GB"); // Format as "dd-mm-yyyy"
  };

  return (
    <>
      <div className="w-full p-4">
        <TabTransaction activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content for each tab */}
        <div className="mt-3 text-gray-400">
          <div className="flex justify-between items-center space-x-4">
            {/* Input search */}
            <input
              type="search"
              placeholder="Search"
              className="px-3 py-1 rounded-md border border-slate-300"
            />

            {/* Dropdown */}
            <div className="relative">
              <div
                onClick={togglePicker}
                className="flex items-center justify-between px-3 py-2 rounded-md border border-slate-300 cursor-pointer"
              >
                <span>
                  {selectionRange.startDate && selectionRange.endDate
                    ? `From ${formatDate(
                        selectionRange.startDate
                      )} to ${formatDate(selectionRange.endDate)}`
                    : "dd-mm-yyyy s/d dd-mm-yyyy"}
                </span>
                <FaChevronDown className="ml-2" />
              </div>

              {isPickerOpen && (
                <div className="absolute z-10 mt-2 bg-white border border-slate-300 rounded-md shadow-lg right-0">
                  <DateRange
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    moveRangeOnFirstSelection={false}
                    rangeColors={["#3b82f6"]}
                  />
                  <div className="flex justify-end p-2">
                    <button
                      onClick={() => setIsPickerOpen(false)}
                      className="px-4 py-2 text-white bg-blue-500 rounded-md"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="min-h-52 flex flex-col justify-between">
            {activeTab === "orders" ? (
              <Order loading={isLoading} data={data} />
            ) : activeTab === "status" ? (
              <StatusMembers loading={isLoading} />
            ) : (
              "No data"
            )}

            <div className="flex justify-between items-center mt-4 px-2 bottom-0">
              <div className="flex items-center">
                <span className="text-sm mr-2">Total {totalItems}</span>
              </div>
              <div className="flex items-center">
                <div className="flex flex-row justify-center items-center gap-x-3 mr-3">
                  <span className="ml-2 text-sm text-slate-400">
                    Lines per page
                  </span>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="border border-gray-300 rounded-md py-1 px-2"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>
                <button
                  onClick={() => handlePageChange(currentPage)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg text-gray-500 border border-slate-200 shadow-inner hover:bg-gray-100"
                >
                  &lt;
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-2 rounded-lg ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "text-gray-500 border border-slate-200"
                    } mx-1`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg text-gray-500 border border-slate-200 shadow-inner hover:bg-gray-100"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Default props
TransactionTable.defaultProps = {
  activeTab: "allOrders",
};
