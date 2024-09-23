import React, { useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa6";
import Loading from "../../../../components/Loading";
import { MdOutlineWarningAmber } from "react-icons/md";
import { productBundleAll } from "../../../../../../api/apiProduct";

export default function DeleteConfirmation({ isOpen, onClose, data }) {
  const [dataId, setDataId] = useState(data);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [userName, setUserName] = useState("testing");

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate loading state for 500ms
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await productBundleAll.deleteProduct(dataId, userName);
      setSuccessMessage(response.message);

      setLoading(false);
      setShowSuccessModal(true);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong");
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const handleClose = () => {
    setDataId("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-40">
        {loading ? (
          <Loading />
        ) : showSuccessModal ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="flex flex-col justify-center items-center space-y-3 mb-10">
                <FaRegThumbsUp size={40} className="text-green-600" />
                <h3 className="text-lg">{successMessage}</h3>
              </div>
              <button
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300"
                onClick={handleCloseSuccessModal}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg w-full md:w-1/2 lg:w-1/4 max-h-[90vh] flex flex-col px-6 py-4 ">
            <div className="flex flex-col justify-center items-center space-y-3 mb-10">
              <MdOutlineWarningAmber size={70} className="text-amber-400" />
              <p>Apakah anda yakin ingin menghapus data ini?</p>
            </div>
            <div className="flex justify-between items-center space-x-3">
              <button
                className="text-white hover:bg-red-600 hover:text-white focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700 w-full"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="text-white hover:bg-emerald-600 hover:text-white focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-700 w-full"
                onClick={handleSubmit}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
