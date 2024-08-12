import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllTenants } from "../../../../../api/apiTenant";
import { MdCloudDownload, MdOutlineAddCircle } from "react-icons/md";
import { format } from "date-fns";
import { BsPenFill, BsTrashFill } from "react-icons/bs";

export default function TenantTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataProduct, setDataProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0); // Add totalItems state

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = (success, message) => {
    if (success === true) {
      toast.success(message);
      fetchData();
    } else {
      toast.error(message);
    }
    setIsModalOpen(false);
  };

  const fetchData = useCallback(
    async (page = currentPage, limit = itemsPerPage) => {
      const response = await getAllTenants.getTenant(page, limit);
      console.log(response);
      setDataProduct(response.data);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
      setTotalItems(response.total);
    },
    [itemsPerPage, currentPage]
  );

  useEffect(() => {
    fetchData(currentPage, itemsPerPage);
  }, [fetchData, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
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
          <div className="flex flex-row justify-center items-center space-x-2">
            <button
              className="px-3 py-2 rounded-lg text-blue-500 text-xs flex flex-row justify-center items-center space-x-2 border border-slate-200 shadow-inner hover:bg-blue-100"
              onClick={handleOpenModal}
            >
              <p>Add Tenant</p>
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
                  No
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Tenant Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  #
                </th>
              </tr>
            </thead>
            <tbody>
              {dataProduct.map((item, index) => (
                <tr key={item.id} className="text-start">
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                    {index + 1}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                    <div className="flex items-center">
                      <div className="">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.Name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                    <div className="flex flex-col justify-start items-start">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.Email}
                      </p>
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.PhoneNumber}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                    {item.Address}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                    {item.Status === "active" && (
                      <button className="text-green-400 border border-green-500 font-bold py-1 px-3 rounded-xl mr-2">
                        Active
                      </button>
                    )}
                    {item.Status === "not active" && (
                      <span className="text-red-400 border border-red-500 font-bold py-1 px-3 rounded-xl mr-2">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-3 border-b border-gray-200 bg-white text-xs text-center">
                    <div className="flex flex-row justify-center items-center gap-x-3">
                      <BsTrashFill className="text-red-500 text-sm cursor-pointer" />
                      <div className="border-l border-slate-400 h-4"></div>
                      <BsPenFill className="text-sky-500 text-sm cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4 px-2">
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
      {/* {isModalOpen && (
        <AddModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )} */}
    </>
  );
}
