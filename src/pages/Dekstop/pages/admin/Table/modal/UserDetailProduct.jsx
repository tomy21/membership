import React, { useEffect, useState } from 'react';
import { BsX } from 'react-icons/bs';
import { getUserProductById } from '../../../../../../api/apiUsers';
import Loading from '../../../../components/Loading';

export default function DetailModal({ isOpen, onClose, item }) {
    const [data, setData] = useState(null);
    const [rfIdInput, setRfIdInput] = useState({});
    const [isLoading, setIsLoading] = useState(false); // Untuk menandakan apakah sedang loading
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        if (!item) return;
        setIsLoading(true);
        setError(null);
        try {
            const response = await getUserProductById.userById(item.id);
            console.log(response);
            if (response) {
                setData(response.data);
            }
            setIsLoading(false);
        } catch (error) {
            setError('Data not found or an error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateRfId = async (id) => {
        try {
            const newRfId = rfIdInput[id]; // Ambil input berdasarkan ID
            if (newRfId) {
                await getUserProductById.updateUserProductById(id, {
                    RfId: newRfId,
                });
                toast.success('RfId updated successfully');
                fetchData();
            } else {
                toast.error('Please enter a valid RfId');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error updating RfId');
        }
    };

    if (!isOpen || !item) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-[70%] p-5">
                <div className="flex justify-between items-center border-b pb-2">
                    <div className="flex flex-col justify-start items-start">
                        <h2 className="text-xl font-semibold">
                            Detail Membership
                        </h2>
                        <h2 className="text-xl font-semibold text-slate-400">
                            {item.UserName}
                        </h2>
                    </div>
                    <BsX className="text-xl cursor-pointer" onClick={onClose} />
                </div>
                <div className="mt-4 h-60 overflow-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-auto">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Card No
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        RFID NO
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Plate No
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-4"
                                        >
                                            <Loading />
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-4"
                                        >
                                            <p>{error}</p>{' '}
                                            {/* Menampilkan error jika ada kesalahan */}
                                        </td>
                                    </tr>
                                ) : data && data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr
                                            key={item.Id}
                                            className="text-start"
                                        >
                                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                                                {index + 1}
                                            </td>
                                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                                                <div className="flex items-center">
                                                    <div className="">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {item.CardId}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                                                <div className="flex items-center">
                                                    <div className="">
                                                        {item.RfId === null ? (
                                                            <input
                                                                type="text"
                                                                value={
                                                                    rfIdInput[
                                                                        item.Id
                                                                    ] || ''
                                                                }
                                                                onChange={(e) =>
                                                                    setRfIdInput(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            [item.Id]:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        })
                                                                    )
                                                                }
                                                                className="border border-gray-300 rounded-md px-2 py-2"
                                                                placeholder="Enter RFID"
                                                            />
                                                        ) : (
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {item.RfId}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                                                <div className="flex flex-col justify-start items-start">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {item.PlateNumber}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 border-b border-gray-200 bg-white text-xs">
                                                <div
                                                    className={`px-3 py-2 rounded-full text-center ${
                                                        item.IsUsed === 0
                                                            ? 'bg-red-50 text-red-500 border border-red-200'
                                                            : 'bg-green-50 text-green-500 border border-green-200'
                                                    }`}
                                                >
                                                    {item.IsUsed === 0
                                                        ? 'Out Area'
                                                        : 'In Area'}
                                                </div>
                                            </td>
                                            <td className="py-3 border-b border-gray-200 bg-white text-xs text-center">
                                                {item.RfId === null && (
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateRfId(
                                                                item.Id
                                                            )
                                                        }
                                                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                                                    >
                                                        Save
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-4"
                                        >
                                            <p>Data not found</p>{' '}
                                            {/* Menampilkan pesan jika data kosong */}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
