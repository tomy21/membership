import React from 'react';

const RejectBulkModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm(); // Confirm bulk rejection
        onClose(); // Close the modal after confirmation
    };

    return (
        <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">Reject Bulk Items</h2>
                <p className="mb-4">Are you sure you want to reject the selected items?</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        No
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RejectBulkModal;
