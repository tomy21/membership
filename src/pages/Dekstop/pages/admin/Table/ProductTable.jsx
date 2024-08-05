import React, { useEffect, useState } from "react";
import { MdCloudDownload, MdOutlineAddCircle } from "react-icons/md";
import { getProductBundleAll } from "../../../../../api/apiProduct.js";
import { format } from "date-fns";
import AddModal from "./modal/add.jsx";

export default function ProductTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataProduct, setDataProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductBundleAll.getAll();
      console.log(response.data);
      setDataProduct(response.data);
    };

    fetchData();
  }, []);

  //   const filteredData = dataProduct.filter((item) =>
  //     item.employee.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  return (
    <>
      <div className="w-full px-2 py-4">
        <div className="flex justify-between items-center mb-5">
          <div className="relative">
            <input
              type="text"
              className="w-full py-2 pr-10 pl-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 text-sm"
              placeholder="Search product"
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
          <div className="flex flex-row justify-center items-center space-x-2">
            <button
              className="px-3 py-2 rounded-lg text-blue-500 text-xs flex flex-row justify-center items-center space-x-2 border border-slate-200 shadow-inner hover:bg-blue-100"
              onClick={handleOpenModal}
            >
              <p>Add Product</p>
              <MdOutlineAddCircle />
            </button>
            <button className="px-3 py-2 rounded-lg text-green-500 text-xs flex flex-row justify-center items-center space-x-2 border border-slate-200 shadow-inner hover:bg-green-100">
              <p>Export</p>
              <MdCloudDownload />
            </button>
          </div>
        </div>
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <input type="checkbox" name="" id="" />
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Period Member
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {dataProduct.map((item, index) => (
                <tr key={item.id} className="text-start">
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                    <input type="checkbox" name="" id="" />
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                    <div className="flex items-center">
                      <div className="">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                    {format(item.startDate, "dd MMM yyyy")} s.d{" "}
                    {format(item.endDate, "dd MMM yyyy")}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                    IDR {parseInt(item.price).toLocaleString("id-ID")}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                    {item.isDeleted === false && (
                      <button className="text-green-400 hover:bg-green-200 border border-green-500 font-bold py-1 px-3 rounded-xl mr-2">
                        Active
                      </button>
                    )}
                    {item.isDeleted === true && (
                      <span className="text-red-500 font-bold">Un Active</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
