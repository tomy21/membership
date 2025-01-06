import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { Location } from "../../../../../api/apiMembershipV2";
import { format } from "date-fns";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";

function TableLocation() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [LimitData, setLimitData] = useState(10);
  const [totalItems, setTotalItems] = useState(1);

  const fetchData = async () => {
    try {
      const response = await Location.getAll(currentPage, LimitData);
      console.log(response);
      setData(response.data || []);
      setTotalPages(response.totalPages || 1);
      setTotalItems(response.total || 1);
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
                Code
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Name
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Address
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                KID
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 rounded-tr-lg"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => (
              <tr key={index} className="text-sm">
                <td className="px-5 py-3 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {order.location_code}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {order.location_name}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {order.address}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {order.KID}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  <div className="flex flex-row justify-center items-center space-x-3">
                    <AiOutlineEdit
                      size={20}
                      className="text-green-500 cursor-pointer hover:text-green-400"
                      title="Edit"
                    />
                    <div className="border-l border-slate-300 h-5 "></div>
                    <FaRegTrashAlt
                      size={20}
                      className="text-red-500 cursor-pointer hover:text-red-400"
                      title="Delete"
                    />
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

export default TableLocation;
