import React from 'react';
import QRCode from 'qrcode.react';

const OrderConfirmationModal = ({ isOpen, onClose, orderDetails }) => {
    if (!isOpen) return null;

    // Stop event propagation to keep modal content non-clickable
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
            style={{ pointerEvents: 'auto' }} // Ensure the overlay itself is clickable
            onClick={onClose} // Close modal when clicking outside
        >
            <div 
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
                onClick={handleContentClick} // Prevent clicks from propagating to the overlay
            >
                <h2 className="text-xl font-bold mb-4">Order Confirmation</h2>
                <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                <p><strong>Company:</strong> {orderDetails.company}</p>
                <p><strong>Full Name:</strong> {orderDetails.fullName}</p>
                <p><strong>Jumlah Member:</strong> {orderDetails.jumlahMember}</p>
                <p><strong>Pembayaran:</strong> {orderDetails.pembayaran}</p>
                <p><strong>Total Price:</strong> {orderDetails.harga.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}</p>
                <p><strong>Location:</strong> {orderDetails.location}</p>
                <p><strong>Vehicle Type:</strong> {orderDetails.vehicleType}</p>
                {orderDetails.pembayaran === 'VA BCA' || orderDetails.pembayaran === 'VA Nobu' ? (
                    <p><strong>Virtual Account Number:</strong> {orderDetails.virtualAccountNumber}</p>
                ) : orderDetails.pembayaran === 'QRIS' ? (
                    <div className="mt-4 flex flex-col items-center">
                        <QRCode value={orderDetails.virtualAccountNumber} size={128} />
                        <p className="text-center mt-2">Scan this QR code to pay</p>
                    </div>
                ) : null}
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        style={{ pointerEvents: 'auto' }} // Ensure the close button is clickable
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationModal;
