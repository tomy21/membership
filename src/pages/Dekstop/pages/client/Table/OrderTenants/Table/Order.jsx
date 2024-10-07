import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";

export default function Order({ loading, data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [modalPayment, setModalPayment] = useState(null); // Used to toggle modal
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order

  useEffect(() => {
    setIsLoading(loading);
    setDataList(data.data?.tenants);
  }, [loading, data.data?.tenants]);

  function formatCurrency(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  const handleDropdown = (index) => {
    setActiveRow((prevActiveRow) => (prevActiveRow === index ? null : index));
  };

  const handlePayment = (order) => {
    setSelectedOrder(order);
    setModalPayment(true);
    setActiveRow(false);
  };

  const handleCloseModal = () => {
    setModalPayment(false); // Close the modal
  };

  return (
    <>
      <table className="w-full mt-5">
        <thead>
          <tr className="border-b border-slate-500 text-black text-sm">
            <th className="p-2 text-start">Order ID</th>
            <th className="p-2 text-start">Created date</th>
            <th className="p-2 text-start">Tenant Name</th>
            <th className="p-2 text-start">Product</th>
            <th className="p-2 text-start">Periode</th>
            <th className="p-2 text-start">Quantity</th>
            <th className="p-2 text-start">Total Price</th>
            <th className="p-2 text-start">Status</th>
            <th className="p-2 text-start"></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr className="text-xs text-center">
              <td colSpan={9} className="p-10">
                <div>
                  <ScaleLoader size={10} color={"#bbb"} />
                </div>
              </td>
            </tr>
          ) : (
            <>
              {dataList?.map((items, index) => (
                <tr
                  key={index}
                  className="text-xs odd:bg-slate-50 even:bg-white border-b border-slate-200"
                >
                  <td className="px-2 py-4 text-start">#{items.OrderId}</td>
                  <td className="px-2 py-4 text-start">
                    {format(items?.CreatedOn, "dd MMM yyyy")}
                  </td>
                  <td className="px-2 py-4 text-start">{items.TenantName}</td>
                  <td className="px-2 py-4 text-start">{items.ProductName}</td>
                  <td className="px-2 py-4 text-start">{items.Periode}</td>
                  <td className="px-2 py-4 text-start">{items.QuotaMember}</td>
                  <td className="px-2 py-4 text-start">
                    {formatCurrency(items.Price)}
                  </td>
                  <td className="px-2 py-4 text-start">
                    <span
                      className={`border ${
                        items.Status === "Paid"
                          ? "border-emerald-600 text-emerald-600 bg-emerald-50"
                          : "border-red-600 text-red-600 bg-red-50"
                      }  rounded-md px-2`}
                    >
                      {items.Status}
                    </span>
                  </td>
                  <td className="px-2 py-4 text-start relative">
                    <FaEllipsisH
                      onClick={() => handleDropdown(index)}
                      className="cursor-pointer"
                    />

                    {activeRow === index && (
                      <div className="absolute right-0 mt-2 bg-white border border-slate-300 rounded-md shadow-lg z-10 w-40">
                        <ul>
                          {items.Status === "Paid" ? (
                            <>
                              <li
                                className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                                onClick={() => alert("Cancel clicked")}
                              >
                                Cancel
                              </li>
                            </>
                          ) : (
                            <>
                              <li
                                className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                                onClick={() => handlePayment(items)}
                              >
                                Payment
                              </li>
                              <li
                                className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                                onClick={() => alert("Cancel clicked")}
                              >
                                Cancel
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>

      {/* Payment Modal */}
      {modalPayment && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white rounded-lg w-1/2">
            <div className="flex justify-between items-center w-full p-5">
              <h2 className="text-lg font-bold">Payment</h2>
              <span className="border border-red-500 bg-red-100 text-red-500 rounded-md px-2 py-1">
                {selectedOrder.Status}
              </span>
            </div>
            <div className="border-b border-slate-300 w-full"></div>

            <div className="grid grid-cols-2 gap-3 p-5">
              <p>
                <strong>Order ID:</strong> #{selectedOrder.OrderId}
              </p>
              <p>
                <strong>Tenant Name:</strong> {selectedOrder.TenantName}
              </p>
              <p>
                <strong>Product Name:</strong> {selectedOrder.ProductName}
              </p>
              <p>
                <strong>Periode:</strong> {selectedOrder.Periode}
              </p>
              <p>
                <strong>Quantity:</strong> {selectedOrder.QuotaMember}
              </p>
              <p>
                <strong>Total Price:</strong>{" "}
                {formatCurrency(selectedOrder.Price)}
              </p>
            </div>

            {/* Bank Account Information */}
            <div className="p-4">
              <div className="mt-4 p-4 border-2 border-dashed rounded-md bg-gray-50">
                <p>
                  <strong>Bank Account Details:</strong>
                </p>
                <p>Bank Name: Bank XYZ</p>
                <p>Account Number: 1234567890</p>
                <p>Account Holder: PT. Example Payment</p>
              </div>
            </div>

            <div className="border-b border-slate-300 w-full mt-3"></div>

            <div className="flex justify-end p-4 ">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
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
