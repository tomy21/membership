import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { useUserLocation } from '../../../context/UserMembershipProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { TbListDetails } from 'react-icons/tb';
import ModalDetailHistory from './modal/ModalDetailHistory';
import { GoDownload } from 'react-icons/go';

export default function TableCustomerByLocation() {
    const location = useLocation();
    const navigation = useNavigate();
    // Simpan ID dari state lokasi
    const [idLocationCode, setIdLocationCode] = useState('');
    const [idUser, setIdUser] = useState(0);
    const [modal, setModal] = useState(false);

    // Ambil locationCode dari state router (sebelum pakai context)
    useEffect(() => {
        if (location.state?.locationCode) {
            setIdLocationCode(location.state.locationCode);
        }
    }, [location.state]);

    // Gunakan useUserLocation setelah idLocationCode siap
    const {
        data,
        page,
        setPage,
        limit,
        totalPages,
        totalItems,
        locationCode,
        setLocationCode,
        setLimit,
        setTotalPages,
        setTotalItems,
        search,
        setSearch,
        status,
        reloadData,
    } = useUserLocation();

    // Set locationCode ke context setelah idLocationCode tersedia
    useEffect(() => {
        if (idLocationCode) {
            setLocationCode(idLocationCode);
        }
    }, [idLocationCode, setLocationCode]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleModal = (id) => {
        setIdUser(id);
        setModal(true);
    };

    const handleclose = () => {
        setModal(false);
    };

    return (
        <div className="w-full px-3 py-4">
            <div className="flex justify-between items-center w-full">
                <div>
                    <input
                        type="text"
                        className="border border-slate-300 rounded-lg p-2 w-72"
                        placeholder="Cari Lokasi"
                    />
                </div>
                <div className="flex flex-row justify-end items-center">
                    <button
                        onClick={() => navigation(-1)}
                        className="px-3 py-1 border border-red-500 rounded m-3 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                        back
                    </button>
                    <button className="flex flex-row items-center justify-center space-x-1 bg-cyan-500 hover:bg-cyan-700 text-white py-2 px-4 rounded">
                        <GoDownload className="mr-2" />
                        <h1 className="text-sm"> Export</h1>
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg max-w-full overflow-auto">
                <table className="max-w-full leading-normal w-full">
                    <thead>
                        <tr>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap rounded-tl-lg">
                                #
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap">
                                Customer
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap">
                                Location
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap">
                                Points
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap">
                                Vehicle Type
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((items, index) => (
                                <tr key={index} className="text-sm">
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        <div className="flex flex-col justify-start items-start w-full">
                                            <h1 className="font-semibold text-sm">
                                                {items.trxHistoryUser
                                                    ?.fullname ?? '-'}
                                            </h1>
                                            <h1 className="font-normal text-sm text-gray-400">
                                                {items.trxHistoryUser?.email ??
                                                    '-'}
                                            </h1>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {items.location_name ?? '-'}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {formatCurrency(
                                            items.trxHistoryUser?.points ?? '-'
                                        )}
                                    </td>

                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {items.vehicle_type}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        <TbListDetails
                                            onClick={() =>
                                                handleModal(
                                                    items.trxHistoryUser?.id
                                                )
                                            }
                                            size={20}
                                            className="text-cyan-600 hover:text-cyan-400"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="py-3 px-3 text-center"
                                >
                                    <div className="flex flex-col justify-center items-center">
                                        <img
                                            src={'/assets/page.png'}
                                            alt="no-data"
                                            className="opacity-50 w-32"
                                        />
                                        <h1 className="text-slate-400 text-2xl">
                                            Data no available
                                        </h1>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 border-t border-slate-300 py-1 px-4 w-full">
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    setPageCurrent={setPage}
                    totalItem={totalItems}
                    limit={limit}
                    setLimitData={setLimit}
                />
            </div>

            {modal && (
                <ModalDetailHistory
                    isOpen={modal}
                    onClose={handleclose}
                    idUsers={idUser}
                />
            )}
        </div>
    );
}
