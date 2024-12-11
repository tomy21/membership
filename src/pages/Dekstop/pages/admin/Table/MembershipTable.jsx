import React, { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { MdCloudDownload, MdOutlineAddCircle } from "react-icons/md";
import { BsPenFill, BsTrashFill } from "react-icons/bs";
import { getAllMembers } from "../../../../../api/apiUsers";
import DetailModal from "./modal/UserDetailProduct";

export default function MembershipTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataProduct, setDataProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

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
      const response = await getAllMembers.getData(page, limit);
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
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <input type="checkbox" name="" id="" />
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  #
                </th>
              </tr>
            </thead>
            <tbody>
              {dataProduct.map((item, index) => (
                <tr key={item.id} className="text-start">
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                    <input type="checkbox" name="" id="" />
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                    <div className="flex items-center">
                      <div className="">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.UserName}
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
                    {item.MemberUserDetails &&
                    item.MemberUserDetails.length > 0 &&
                    item.MemberUserDetails[0].Points != null
                      ? item.MemberUserDetails[0].Points
                      : 0}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                    {item.EmailConfirmed === 1 ? (
                      <span className="text-green-400 hover:bg-green-200 border border-green-500 font-bold py-1 px-3 rounded-xl mr-2 cursor-pointer">
                        Active
                      </span>
                    ) : (
                      <>
                        <span className="text-red-400 hover:bg-red-200 border border-red-500 font-bold py-1 px-3 rounded-xl mr-2 cursor-pointer">
                          Inactive
                        </span>
                      </>
                    )}
                    {item.isDeleted === true && (
                      <span className="text-red-500 font-bold">Un Active</span>
                    )}
                  </td>
                  <td className="py-3 border-b border-gray-200 bg-white text-xs text-center">
                    <div className="flex flex-row justify-center items-center gap-x-3">
                      <BsTrashFill className="text-red-500 text-sm cursor-pointer" />
                      <div className="border-l border-slate-400 h-4"></div>
                      <BsPenFill
                        className="text-sky-500 text-sm cursor-pointer"
                        onClick={() => {
                          setSelectedItem(item);
                          handleOpenModal();
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagging */}
        <div className="flex justify-between items-center mt-4 px-2">
          <div className="flex items-center">
            <span className="text-sm mr-2">Total {totalItems}</span>
          </div>
          <div className="flex items-center">
            <div className="flex flex-row justify-center items-center gap-x-3 mr-3">
              <span className="ml-2 text-sm text-slate-400">Per page</span>
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
      {isModalOpen && (
        <DetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          item={selectedItem}
        />
      )}
    </>
  );
}
