import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllTenants } from "../../../../../api/apiTenant";
import { MdCloudDownload, MdOutlineAddCircle } from "react-icons/md";
import { format } from "date-fns";
import { BsPenFill, BsTrashFill } from "react-icons/bs";
import { getMemberPayments } from "../../../../../api/apiTrxPayment";

export default function TransactionTable() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Contoh data pesanan, Anda bisa mengambil dari API
  useEffect(() => {
    const mockOrders = [
      {
        id: "012345/10",
        date: "Apr 23, 2023",
        customer: "Dunder Mifflin LTD.",
        priority: "Normal",
        total: "$2,960.00",
        status: "Paid",
        items: 3,
        delivery: "DV/012345/101/RF",
      },
      {
        id: "012345/11",
        date: "Apr 23, 2023",
        customer: "Acme Inc.",
        priority: "Normal",
        total: "$2,960.00",
        status: "Unpaid",
        items: 2,
        delivery: "-",
      },
      // Tambah data lain sesuai kebutuhan
    ];
    setOrders(mockOrders);
    setTotalPages(Math.ceil(mockOrders.length / itemsPerPage));
  }, [itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };
  return (
    <>
      <ToastContainer />
      <div className="w-full px-2 py-4">
        <div className="flex justify-between items-center mb-5">
          <div className="relative">
            <input
              type="text"
              className="w-full py-2 pr-10 pl-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 text-sm"
              placeholder="Search tenant"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.415 1.415l-4.242-4.243zM8 14a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between mb-5">
            <div className="flex space-x-4">
              <select className="border rounded p-2">
                <option>Customer</option>
                {/* Tambah opsi lain */}
              </select>
              <select className="border rounded p-2">
                <option>Order Status</option>
                {/* Tambah opsi lain */}
              </select>
              <select className="border rounded p-2">
                <option>Payment Status</option>
                {/* Tambah opsi lain */}
              </select>
              <select className="border rounded p-2">
                <option>Material</option>
                {/* Tambah opsi lain */}
              </select>
            </div>
            <div className="flex space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
                <MdOutlineAddCircle className="mr-2" /> Add Order
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
                <MdCloudDownload className="mr-2" /> Export
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Created at
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Delivery Number
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="px-5 py-3 border-b border-gray-200">
                    {order.id}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200">
                    {order.date}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200">
                    {order.customer}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200">
                    {order.priority}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200">
                    {order.total}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Paid"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200">
                    {order.items} items
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200">
                    {order.delivery}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <span className="text-sm mr-2">Lines per page</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-gray-300 rounded-md py-1 px-2"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg text-gray-500 border border-slate-200 shadow-inner hover:bg-gray-100"
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-2 rounded-lg mx-1 ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 border border-slate-200"
                }`}
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
    </>
  );
}
