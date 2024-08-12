import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdCloudDownload, MdOutlineAddCircle } from "react-icons/md";
import { format } from "date-fns";
import { BsPenFill, BsTrashFill } from "react-icons/bs";
import { getMemberPayments } from "../../../../../api/apiTrxPayment";

const dataProduct = [
  {
    id: 1,
    CardNo: "1982356182",
    MemberName: "Antonius Franco",
    LastStatus: "IN",
    CardStatus: "Active",
    LastActive: "2024-08-08T02:30:32.000Z",
  },
  {
    id: 2,
    CardNo: "1982356189",
    MemberName: "Michael Alpha",
    LastStatus: "OUT",
    CardStatus: "Active",
    LastActive: "2024-08-05T17:30:32.000Z",
  },
  {
    id: 3,
    CardNo: "1982356183",
    MemberName: "Stephani Cecilia",
    LastStatus: "IN",
    CardStatus: "Active",
    LastActive: "2024-08-02T11:30:32.000Z",
  },
  {
    id: 4,
    CardNo: "1982356184",
    MemberName: "Angela Maria",
    LastStatus: "IN",
    CardStatus: "Active",
    LastActive: "2024-08-03T12:30:32.000Z",
  },
  {
    id: 5,
    CardNo: "19823561825",
    MemberName: "Magda Carla Rapali",
    LastStatus: "OUT",
    CardStatus: "Active",
    LastActive: "2024-08-04T10:30:32.000Z",
  },
  // {
  //   id: 6,
  //   CardNo: "19823561826",
  //   MemberName: "Ervan Situmorang",
  //   LastStatus: "OUT",
  //   CardStatus: "Active",
  //   LastActive: "2024-08-01T12:30:32.000Z",
  // },
];

export default function ListMembershipTable() {
  const [searchTerm, setSearchTerm] = useState("");
  // const [dataProduct, setDataProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(5); // Add totalItems state

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = (success, message) => {
    if (success === true) {
      toast.success(message);
      // fetchData();
    } else {
      toast.error(message);
    }
    setIsModalOpen(false);
  };

  // const fetchData = useCallback(
  //   async (page = currentPage, limit = itemsPerPage) => {
  //     const response = await getAllTransactionTenants.getTransaction(
  //       page,
  //       limit
  //     );
  //     console.log(response);
  //     setDataProduct(response.data.tenants);
  //     setTotalPages(response.data.pagination.totalPages);
  //     setCurrentPage(response.data.pagination.currentPage);
  //     setTotalItems(response.data.pagination.totalItems);
  //   },
  //   [itemsPerPage, currentPage]
  // );

  // useEffect(() => {
  //   fetchData(currentPage, itemsPerPage);
  // }, [fetchData, currentPage, itemsPerPage]);

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
        <div className="flex justify-between items-end mb-5">
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
          <div className="flex flex-col justify-start items-start space-x-2 border border-slate-200 rounded-md px-3 py-2 w-44">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col items-center">
                <h1 className="text-lg">6</h1>
                <p className="text-xs">Active</p>
              </div>
              <div className="border-l-2 h-10 mx-4 border-slate-300 rounded-full"></div>
              <div className="flex flex-col items-center">
                <h1 className="text-lg">4</h1>
                <p className="text-xs">Inactive</p>
              </div>
            </div>
            <p className="text-[8px] text-sky-300 text-start mt-2">
              Last update 08 August 2024 10:00
            </p>
          </div>
          {/* <div className="flex flex-row justify-center items-center space-x-2">
            <button
              className="px-3 py-2 rounded-lg text-blue-500 bg-white text-xs flex flex-row justify-center items-center space-x-2 border border-slate-200 shadow-inner hover:bg-blue-100"
              onClick={handleOpenModal}
            >
              <p>Order Member</p>
              <MdOutlineAddCircle />
            </button>
            <button className="px-3 py-2 rounded-lg text-green-500 bg-white text-xs flex flex-row justify-center items-center space-x-2 border border-slate-200 shadow-inner hover:bg-green-100">
              <p>Export</p>
              <MdCloudDownload />
            </button>
          </div> */}
        </div>
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  No
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Card Number
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Member Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Last Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Card Status
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
                          {item.CardNo}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.MemberName}
                    </p>
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                    {format(new Date(item.LastActive), "dd MMM yyyy HH:mm:ss")}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs text-center">
                    {item.LastStatus}
                  </td>
                  <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs text-center">
                    {item.CardStatus === "Active" && (
                      <span className="text-green-400 border border-green-500 font-normal py-1 px-3 rounded-xl mr-2">
                        Active
                      </span>
                    )}
                    {item.Status === "Inactive" && (
                      <span className="text-red-400 border border-red-500 font-normal py-1 px-3 rounded-xl mr-2">
                        Inactive
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4 px-2">
          <div className="flex items-center">
            <span className="text-xs mr-2 text-slate-400">
              Total <span className="text-black">{totalItems}</span>
            </span>
          </div>
          <div className="flex items-center text-xs">
            <div className="flex flex-row justify-center items-center gap-x-3 mr-3">
              <span className="ml-2 text-slate-400">Per page</span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="border border-gray-300 rounded-md py-2 px-2"
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
              className="px-3 py-2 rounded-lg text-gray-500 border border-slate-200 shadow-inner hover:bg-gray-100 text-xs"
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-lg text-xs ${
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
        <ModalOrderAdd
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )} */}
    </>
  );
}
