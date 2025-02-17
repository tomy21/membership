import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Payment, Users } from '../../../../../api/apiMembershipV2';
import Pagination from '../components/Pagination';
import { TbListDetails } from 'react-icons/tb';
import ModalDetailHistory from './modal/ModalDetailHistory';
import { ScaleLoader } from 'react-spinners';
import { FaUsersViewfinder } from 'react-icons/fa6';

export default function MembershipTable({ tab }) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [LimitData, setLimitData] = useState(10);
    const [totalItems, setTotalItems] = useState(1);
    const [modalDetail, setModalDetail] = useState(false);
    const [idUsers, setIdUsers] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            // const response = await Users.getAllUser(
            //     currentPage,
            //     LimitData,
            //     tab === 'all' ? '' : tab
            // );
            const response = await Payment.getHistoryByLocation();
            console.log(response.data);
            setData(response.data || []);
            setTotalPages(response.totalPages || 1);
            setTotalItems(response.total || 1);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, LimitData, tab]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleModalDetail = (id) => {
        setIdUsers(id);
        setModalDetail(true);
    };

    const handleCloseModal = () => {
        setModalDetail(false);
    };

    return (
        <div className="w-full px-3 py-4">
            <div className="bg-white rounded-lg shadow-lg max-w-full overflow-auto">
                <table className="max-w-full leading-normal w-full">
                    <thead>
                        <tr>
                            <th
                                rowSpan={2}
                                className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 rounded-tl-lg"
                            >
                                #
                            </th>
                            <th
                                rowSpan={2}
                                className="px-5 py-4 border-b-2 border-r-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200"
                            >
                                Location
                            </th>
                            <th
                                colSpan={2}
                                className="px-5 py-4 border-b-2 border-r-2 border-gray-500 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200"
                            >
                                Total Members
                            </th>
                            <th
                                colSpan={3}
                                className="px-5 py-4 border-b-2 border-gray-500 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200"
                            >
                                Income
                            </th>
                            <th
                                rowSpan={2}
                                className="px-5 py-4 border-b-2 border-l-2 border-gray-500 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200"
                            >
                                Action
                            </th>
                        </tr>
                        <tr>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 rounded-tl-lg">
                                Mobil
                            </th>
                            <th className="px-5 py-4 border-b-2 border-r-2 border-gray-500 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                Motor
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                Mobil
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                Motor
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                Total
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="9" className="py-4">
                                    <div className="flex justify-center items-center w-full">
                                        <ScaleLoader color="#D7BF36FF" />
                                    </div>
                                </td>
                            </tr>
                        ) : data.length > 0 ? (
                            data.map((items, index) => (
                                <tr key={index} className="text-sm">
                                    <td className="px-5 py-3 border-b text-left border-gray-200">
                                        {index + 1}
                                    </td>
                                    <td className="px-5 py-3 border-b text-left border-gray-200">
                                        {items.location_name ?? '-'}
                                    </td>

                                    <td className="px-5 py-3 border-b text-center border-gray-200">
                                        {items.totalMobil ?? 0}
                                    </td>
                                    <td className="px-5 py-3 border-b text-center border-gray-200">
                                        {items.totalMotor ?? 0}
                                    </td>

                                    <td className="px-5 py-3 border-b text-center border-gray-200">
                                        {formatCurrency(
                                            items.totalAmountMobil ?? 0
                                        )}
                                    </td>
                                    <td className="px-5 py-3 border-b text-center border-gray-200">
                                        {formatCurrency(
                                            items.totalAmountMotor ?? 0
                                        )}
                                    </td>
                                    <td className="px-5 py-3 border-b text-center border-gray-200">
                                        {formatCurrency(items.totalAmount ?? 0)}
                                    </td>

                                    <td
                                        className="px-5 py-3 border-b text-center border-gray-200"
                                        title="view detail customer"
                                    >
                                        <div className="w-full text-cyan-700">
                                            <FaUsersViewfinder
                                                size={25}
                                                className="text-center"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center py-4">
                                    No data available
                                </td>
                            </tr>
                        )}
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

            {modalDetail && (
                <ModalDetailHistory
                    isOpen={modalDetail}
                    onClose={handleCloseModal}
                    idUsers={idUsers}
                />
            )}
        </div>
    );
}
