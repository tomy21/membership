import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [company, setCompany] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [jumlahMember, setJumlahMember] = useState(1);
    const [pembayaran, setPembayaran] = useState('');
    const [harga, setHarga] = useState(0);
    const [location, setLocation] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [locations] = useState(['004SK', '005SK']);
    const [vehicleTypes] = useState(['Mobil', 'Motor']);
    const [virtualAccountNumber] = useState('9876543210');
    const [qrCode, setQrCode] = useState('');

    function fetchPrice(location, vehicleType) {
        const sampleData = [
            {
                id: 1,
                productName: "Paket Motor 1 Bulan UPH",
                productDescription: "Paket Diskon",
                vehicleType: "Mobil",
                price: 200000.00,
                locationCode: "004SK"
            }
        ];

        const result = sampleData.find(
            (item) => item.locationCode === location && item.vehicleType === vehicleType
        );
        return result ? result.price : 0;
    }

    useEffect(() => {
        const updatePrice = () => {
            const price = fetchPrice(location, vehicleType);
            setHarga(price * jumlahMember);
        };
        updatePrice();
    }, [location, vehicleType, jumlahMember]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderDetails = {
            company,
            phoneNumber,
            fullName,
            jumlahMember,
            pembayaran,
            harga,
            location,
            vehicleType,
            orderId: '12345',
            virtualAccountNumber,
            qrCode
        };
        onSubmit(orderDetails);
        onClose(); // Close the modal after submission
    };

    const handleClickOutside = (e) => {
        // Close modal only if clicked outside the modal content
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleClickOutside} // Close the modal when clicking outside
        >
            <div 
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
            >
                <h2 className="text-xl font-bold mb-4">Create Orders</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col mb-4">
                        <label className="block text-gray-700 mb-2 text-left" htmlFor="company">Company</label>
                        <select
                            id="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="border border-gray-300 p-2 rounded"
                            required
                        >
                            <option value="">Select company</option>
                            <option value="Company A">Company A</option>
                            <option value="Company B">Company B</option>
                            <option value="Company C">Company C</option>
                        </select>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="block text-gray-700 mb-2 text-left" htmlFor="phone-number">Phone Number</label>
                        <input
                            type="text"
                            id="phone-number"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="block text-gray-700 mb-2 text-left" htmlFor="full-name">Full Name</label>
                        <input
                            type="text"
                            id="full-name"
                            placeholder="Enter full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="block text-gray-700 mb-2 text-left" htmlFor="jumlah-member">Jumlah Member</label>
                        <input
                            type="number"
                            id="jumlah-member"
                            placeholder="Enter number of members"
                            value={jumlahMember}
                            onChange={(e) => setJumlahMember(parseInt(e.target.value, 10))}
                            className="border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="block text-gray-700 mb-2 text-left" htmlFor="pembayaran">Pembayaran</label>
                        <select
                            id="pembayaran"
                            value={pembayaran}
                            onChange={(e) => setPembayaran(e.target.value)}
                            className="border border-gray-300 p-2 rounded"
                            required
                        >
                            <option value="">Select payment method</option>
                            <option value="VA BCA">VA BCA</option>
                            <option value="VA Nobu">VA Nobu</option>
                            <option value="QRIS">QRIS</option>
                        </select>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="block text-gray-700 mb-2 text-left" htmlFor="location">Location</label>
                        <select
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="border border-gray-300 p-2 rounded"
                            required
                        >
                            <option value="">Select location</option>
                            {locations.map((loc) => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="block text-gray-700 mb-2 text-left" htmlFor="vehicle-type">Vehicle Type</label>
                        <select
                            id="vehicle-type"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className="border border-gray-300 p-2 rounded"
                            required
                        >
                            <option value="">Select vehicle type</option>
                            {vehicleTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="block text-gray-700 mb-2 text-left" htmlFor="harga">Total Price</label>
                        <input
                            type="text"
                            id="harga"
                            value={harga.toLocaleString('en-US', { style: 'currency', currency: 'IDR' })}
                            disabled
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                    </div>

                    {pembayaran === 'VA BCA' || pembayaran === 'VA Nobu' ? (
                        <div className="flex flex-col mb-4 col-span-2">
                            <label className="block text-gray-700 mb-2 text-left" htmlFor="virtual-account">Virtual Account Number</label>
                            <input
                                type="text"
                                id="virtual-account"
                                value={virtualAccountNumber}
                                disabled
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </div>
                    ) : pembayaran === 'QRIS' ? (
                        <div className="flex flex-col items-center col-span-2 mb-4">
                            <QRCode value={virtualAccountNumber} size={128} />
                            <p className="text-center mt-2">Scan this QR code to pay</p>
                        </div>
                    ) : null}

                    <div className="flex justify-end space-x-4 col-span-2">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent click from closing the modal
                                onClose();
                            }}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
