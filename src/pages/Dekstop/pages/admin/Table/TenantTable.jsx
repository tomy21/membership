import React, { useCallback, useEffect, useState } from 'react';
import { getAllTenants, Tenants } from '../../../../../api/apiTenant';
import { MdCloudDownload, MdOutlineAddCircle } from 'react-icons/md';
import { BsPenFill, BsTrashFill } from 'react-icons/bs';
import { FaRegThumbsUp } from 'react-icons/fa6';

export default function TenantTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [dataTenant, setDataTenant] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [successModal, setSuccessModal] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseModalSuccess = () => {
        setSuccessModal(false);
        fetchData();
    };

    const fetchData = useCallback(
        async (page = currentPage, limit = itemsPerPage) => {
            const response = await Tenants.getTenant(page, limit);
            console.log('data Response', response);
            setDataTenant(response.data);
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

    const handleSuccess = (success, message) => {
        if (success === true) {
            setSuccessModal(true);
        } else {
            console.log(message);
        }
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="w-full px-2 py-4">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    No
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Tenant
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Location
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
                            {dataTenant.map((item, index) => (
                                <tr key={index} className="text-start">
                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                        {index + 1}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            <div className="">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {item.Name}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex flex-col justify-start items-start">
                                            <h1 className="text-sm">
                                                {item.Email}
                                            </h1>
                                            <h1 className="text-xs text-slate-400">
                                                {item.PhoneNumber}
                                            </h1>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                                        {item.MemberLocation?.LocationName}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                                        <button
                                            className={`${
                                                item.Status === 'Active'
                                                    ? 'border border-green-500 text-green-500 bg-green-100'
                                                    : 'border border-red-500 text-red-500 bg-red-100'
                                            }  font-bold py-1 px-3 rounded-xl mr-2`}
                                        >
                                            {item.Status}
                                        </button>
                                    </td>
                                    <td className="py-3 px-2 border-b border-gray-200 bg-white text-xs text-center">
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
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-500 border border-slate-200'
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
          message={handleSuccess}
        />
      )} */}
            {successModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <div className="flex flex-col justify-center items-center space-y-3 mb-10">
                            <FaRegThumbsUp
                                size={40}
                                className="text-green-600"
                            />
                            <h3 className="text-lg">
                                Product successfully added!
                            </h3>{' '}
                        </div>
                        <button
                            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300"
                            onClick={handleCloseModalSuccess}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
