import React, { useEffect, useState } from "react";
import { Payment } from "../../../../../api/apiMembershipV2";
import Pagination from "../components/Pagination";
import { format } from "date-fns";

export default function TransactionTable() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [LimitData, setLimitData] = useState(10);
  const [totalItems, setTotalItems] = useState(1);

  const fetchData = async () => {
    try {
      const response = await Payment.getAllTransaction(currentPage, LimitData);
      setOrders(response.data || []);
      setTotalPages(response.pagination?.totalPages || 1);
      setTotalItems(response.pagination?.total || 1);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, LimitData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full px-3 py-4">
      <div className="bg-white rounded-lg shadow-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 rounded-tl-lg">
                #
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Transaction ID
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Transaction Date
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Payment Method
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Location
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Total
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 rounded-tr-lg">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="text-sm">
                <td className="px-5 py-3 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {order.trxId}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {format(
                    new Date(order.createdAt),
                    "dd-MMM-yyyy HH:mm:ss:SSS"
                  )}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {order.transactionType}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {order.location_name ?? "-"}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {formatCurrency(order.price ?? 0)}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  <div className="flex flex-row justify-start items-center gap-x-3">
                    <div
                      className={`relative h-4 w-4 rounded-full text-xs flex items-center justify-center ${
                        order.statusPayment === "PAID"
                          ? "bg-green-100"
                          : order.statusPayment === "PENDING"
                          ? "bg-yellow-100"
                          : "bg-red-100"
                      }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          order.statusPayment === "PAID"
                            ? "bg-green-500"
                            : order.statusPayment === "PENDING"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <span className="absolute text-center text-black text-sm font-bold"></span>
                    </div>
                    <p
                      className={`${
                        order.statusPayment === "PAID"
                          ? "text-green-500"
                          : order.statusPayment === "PENDING"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {order.statusPayment}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 border-t border-slate-300 py-1 px-4 w-full">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItem={totalItems}
          limit={LimitData}
          onLimitChange={setLimitData}
          setPageCurrent={setCurrentPage}
          setLimitData={setLimitData}
        />
      </div>
    </div>
  );
}
