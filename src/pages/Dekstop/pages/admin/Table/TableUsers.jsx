import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
// import { format } from "date-fns";
import { userCMS } from "../../../../../api/apiMembershipV2";
import { format } from "date-fns";
import { IoTrashOutline } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { TiWarning } from "react-icons/ti";
import Loading from "../../../components/Loading";
import { BsPatchCheck } from "react-icons/bs";

export default function TableUsers({ addSuccess, resetSuccess }) {
  const [dataUser, setDataUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [LimitData, setLimitData] = useState(10);
  const [totalItems, setTotalItems] = useState(1);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const fetchData = async () => {
    try {
      const response = await userCMS.getAllusers(currentPage, LimitData);
      setDataUser(response.data);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, LimitData]);

  useEffect(() => {
    if (addSuccess) {
      fetchData().then(() => resetSuccess()); // Set successAdd kembali ke false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addSuccess, resetSuccess]);

  const handleConfirmation = (data) => {
    setModalConfirmation(true);
    setSelectedData(data);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    setIsSuccessModalOpen(true); // Tampilkan modal
    setProgress(0); // Reset progress bar
    setModalConfirmation(false);
    // Mulai progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval); // Hentikan ketika mencapai 100%
          setIsSuccessModalOpen(false); // Tutup modal setelah selesai
        }
        return prev + 10; // Tambahkan progress
      });
    }, 300); // 10% setiap 300ms untuk durasi total 3 detik

    try {
      const response = await userCMS.deleteUsers(id);

      if (response.statusCode === 200) {
        fetchData();
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalConfirmation(false);
    setSelectedData(null);
  };

  return (
    <div className="w-full px-3 py-4">
      <div className="bg-white rounded-lg shadow-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 rounded-tl-lg">
                #
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Profil
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Contact
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Role
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Last Login
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                Status
              </th>
              <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 rounded-tr-lg"></th>
            </tr>
          </thead>
          <tbody>
            {dataUser.map((items, index) => (
              <tr key={index} className="text-sm">
                <td className="px-5 py-3 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  <div className="flex flex-col justify-start items-start">
                    <p className="text-gray-900 whitespace-no-wrap font-semibold">
                      {items.fullname}
                    </p>
                    <p className="whitespace-no-wrap text-slate-400">
                      {items.username}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  <div className="flex flex-col justify-start items-start">
                    <p className="text-gray-900 whitespace-no-wrap font-semibold">
                      {items.email}
                    </p>
                    <p className="whitespace-no-wrap text-slate-400">
                      {items.phone_number}
                    </p>
                  </div>
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {items.membershipRole?.name}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  {items.last_login
                    ? format(
                        new Date(items.last_login),
                        "dd MMM yyyy HH:mm:ss:SSS"
                      )
                    : "-"}
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  <span
                    className={`px-4 py-2 rounded-full text-xs ${
                      items.is_active === 1
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {items.is_active === 1 ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-5 py-3 border-b border-gray-200">
                  <div className="flex flex-row justify-center items-center w-full gap-x-3 cursor-pointer">
                    <IoTrashOutline
                      size={25}
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleConfirmation(items)}
                    />
                    <div className="border-l border-slate-300 h-5"></div>
                    <MdEditDocument
                      size={25}
                      className="text-blue-500 hover:text-blue-600"
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

      {modalConfirmation && (
        <div className="fixed bg-black bg-opacity-50 w-full inset-0 z-50 flex items-center justify-center p-5">
          {/* Modal Container */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto animate-fade-in flex flex-col justify-center items-center">
            {/* Header */}
            <div className="flex justify-center">
              <div className={`p-3 rounded-full bg-yellow-100 text-yellow-600`}>
                <TiWarning size={50} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Perhatian</h2>
            </div>

            {/* Body */}
            <div className="mt-4 text-base text-gray-600 text-center">
              {`Are you sure you want to delete the data for `}
              <strong>{selectedData?.email}</strong>
              {` ?`}
            </div>

            <div className="flex flex-row justify-center items-center space-x-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 mt-7 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(selectedData?.id)}
              >
                Yes
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 mt-7 text-white font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div
          className="fixed top-4 right-4 z-50 animate-slide-in" // Animasi untuk modal
          style={{ animationDuration: "0.5s" }} // Durasi animasi
        >
          <div className="relative bg-white border border-green-50 shadow-inner rounded-lg p-4 w-72">
            <div className="flex flex-row justify-start items-center space-x-2">
              <BsPatchCheck size={30} className="text-green-500" />
              <h2 className="text-lg font-semibold text-gray-800">
                Success ... !
              </h2>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
              <div
                className="bg-green-500 h-1 rounded-full transition-all duration-300" // Animasi progress bar
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <Loading />
        </div>
      )}
    </div>
  );
}
