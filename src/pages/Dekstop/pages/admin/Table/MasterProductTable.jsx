import React, { useEffect, useState } from "react";
import { BsPenFill, BsTrashFill } from "react-icons/bs";
import { MdCloudDownload, MdOutlineAddCircle } from "react-icons/md";
import { productBundleAll } from "../../../../../api/apiProduct";
import AddMasterProduct from "./modal/AddMasterProduct";
import { format } from "date-fns";
import DeleteConfirmation from "./modal/DeleteConfirmation";

export default function MasterProductTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataMasterProduct, setDataMasterProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  const fetchData = async (page = currentPage, limit = itemsPerPage) => {
    const response = await productBundleAll.getAll(page, limit);
    console.log(response);
    setDataMasterProduct(response.data.bundles);
    setTotalItems(response.data.totalItems);
    setTotalPages(response.data.totalPages);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleOpenModalDelete = () => {
    setIsModalDeleteOpen(true);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem("");
    fetchData();
  };

  const handleCloseModalDelete = () => {
    setIsModalDeleteOpen(false);
    setSelectedItem("");
    fetchData();
  };

  function formatCurrency(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  return (
    <>
      <div className="w-full px-2 py-4">
        <div className="flex justify-between items-center mb-5">
          <div className="flex flex-row justify-center items-center space-x-2">
            <button
              className="px-3 py-2 rounded-lg text-blue-500 text-sm flex flex-row justify-center items-center space-x-2 border border-slate-200 shadow-inner hover:bg-blue-100"
              onClick={handleOpenModal}
            >
              <MdOutlineAddCircle size={25} />
              <p>Add Product</p>
            </button>
          </div>
        </div>
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-auto border border-slate-300">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-2 py-3 border-b-4 border-gray-500 bg-gray-200 text-left text-xs font-semibold text-gray-700 tracking-wider">
                  <input type="checkbox" name="" id="" />
                </th>
                <th className="px-2 py-3 border-b-4 border-gray-500 bg-gray-200 text-left text-xs font-semibold text-gray-700 tracking-wider">
                  Name Product
                </th>
                <th className="px-2 py-3 border-b-4 border-gray-500 bg-gray-200 text-left text-xs font-semibold text-gray-700 tracking-wider">
                  Start Date
                </th>
                <th className="px-2 py-3 border-b-4 border-gray-500 bg-gray-200 text-left text-xs font-semibold text-gray-700 tracking-wider">
                  End Date
                </th>
                <th className="px-2 py-3 border-b-4 border-gray-500 bg-gray-200 text-left text-xs font-semibold text-gray-700 tracking-wider">
                  Type
                </th>
                <th className="px-2 py-3 border-b-4 border-gray-500 bg-gray-200 text-left text-xs font-semibold text-gray-700 tracking-wider">
                  Price
                </th>
                <th className="px-2 py-3 border-b-4 border-gray-500 bg-gray-200 text-xs font-semibold text-gray-700 tracking-wider text-start">
                  Status
                </th>
                <th className="px-2 py-3 border-b-4 border-gray-500 bg-gray-200 text-left text-xs font-semibold text-gray-700 tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {dataMasterProduct.map((item, index) => (
                <tr key={index} className="text-start">
                  <td className="px-2 py-3 border-b border-gray-200 bg-white text-xs">
                    <input type="checkbox" name="" id="" />
                  </td>
                  <td className="px-2 py-3 border-b border-gray-200 bg-white text-xs">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.Name}
                    </p>
                  </td>
                  <td className="px-2 py-3 border-b border-gray-200 bg-white text-xs">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {format(item.StartDate, "dd MMM yyyy HH:mm:ss")}
                    </p>
                  </td>
                  <td className="px-2 py-3 border-b border-gray-200 bg-white text-xs">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {format(item.EndDate, "dd MMM yyyy HH:mm:ss")}
                    </p>
                  </td>
                  <td className="px-2 py-3 border-b border-gray-200 bg-white text-xs">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.Type}
                    </p>
                  </td>
                  <td className="px-2 py-3 border-b border-gray-200 bg-white text-xs">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {formatCurrency(item.Price)}
                    </p>
                  </td>
                  <td className="px-2 py-3 border-b border-gray-200 bg-white text-xs">
                    <div
                      className={`border p-1 rounded-md text-center ${
                        item.IsDeleted === true
                          ? "border-red-500 bg-red-50 text-red-500"
                          : "border-green-500 bg-green-50 text-green-500"
                      }`}
                    >
                      {item.IsDeleted ? "Inactive" : "Active"}
                    </div>
                  </td>

                  <td className="py-3 border-b border-gray-200 bg-white text-xs text-center">
                    <div className="flex flex-row justify-center items-center gap-x-3">
                      <BsPenFill
                        className="text-sky-500 text-sm cursor-pointer"
                        onClick={() => {
                          setSelectedItem(item.id);
                          handleOpenModal();
                        }}
                      />
                      <div className="border-l border-slate-400 h-4"></div>
                      <BsTrashFill
                        className="text-red-500 text-sm cursor-pointer"
                        onClick={() => {
                          setSelectedItem(item.id);
                          handleOpenModalDelete();
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
        <AddMasterProduct
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          data={selectedItem}
        />
      )}
      {isModalDeleteOpen && (
        <DeleteConfirmation
          isOpen={isModalDeleteOpen}
          onClose={handleCloseModalDelete}
          data={selectedItem}
        />
      )}
    </>
  );
}
