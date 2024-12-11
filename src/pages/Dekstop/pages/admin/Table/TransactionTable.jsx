import React, { useEffect, useState } from "react";
import { MdCloudDownload, MdOutlineAddCircle } from "react-icons/md";
import { History, Transaction } from "../../../../../api/apiProduct";

export default function TransactionTable() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    const response = await Transaction.getAll(currentPage, itemsPerPage);
    console.log(response);
    setOrders(response.data?.transaction);
    setTotalPages(response.data?.totalPages);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <>
      <div className="w-full px-3 py-4">
        <div className="bg-white rounded-lg shadow-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-300 rounded-tl-lg">
                  Order ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-300">
                  Transaction Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-300">
                  Issuer Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-300">
                  Payment Method
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-300">
                  Location
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-300">
                  Total
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-300">
                  Payment Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-300 rounded-tr-lg">
                  Items
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="text-sm">
                  <td className="px-5 py-3 border-b border-gray-200">
                    {order.TransactionId}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200">
                    {order.CreatedOn}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200">
                    {order.ProviderName}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200">
                    {order.TypePayment}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200">
                    {order.LocationName}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200">
                    {order.total ?? "0"}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Paid"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {order.status ?? "-"}
                    </span>
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200">
                    {order.ProductName}
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
