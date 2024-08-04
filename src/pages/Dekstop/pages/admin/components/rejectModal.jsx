import React from 'react';

const RejectModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
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
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
            >
                <h2 className="text-xl font-bold mb-4 text-center">Reject Confirmation</h2>
                <p className="mb-4 text-center">Are you sure you want to reject this action?</p>
                <div className="flex justify-center space-x-4">
                    <button
                        type="button"
                        onClick={() => onClose()} // Close the modal on "No"
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        No
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm} // Confirm rejection and close the modal
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RejectModal;
