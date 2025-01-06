import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { MembershipProduct } from "../../../../../api/apiMembershipV2";
import Pagination from "../components/Pagination";

export default function MasterProductTable() {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [LimitData, setLimitData] = useState(10);
  const [totalItems, setTotalItems] = useState(1);

  const fetchData = async () => {
    try {
      const response = await MembershipProduct.getAll(currentPage, LimitData);
      setProduct(response.data || []);
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
                Location
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Code
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Name
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Type
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Start Date
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                End Date
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Price
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Fee
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 rounded-tr-lg">
                Periode
              </th>
            </tr>
          </thead>
          <tbody>
            {product.map((items, index) => (
              <tr key={index} className="text-sm">
                <td className="px-5 py-3 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {items.location_area?.location_name}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {items.product_code}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {items.product_name}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  <span
                    className={`px-4 py-2 rounded-full text-xs ${
                      items.vehicle_type === "MOBIL"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {items.vehicle_type}
                  </span>
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {format(new Date(items.start_date), "dd-MMM-yyyy")}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {format(new Date(items.end_date), "dd-MMM-yyyy")}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {formatCurrency(items.price ?? 0)}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {formatCurrency(items.Fee ?? 0)}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {items.periode}
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
