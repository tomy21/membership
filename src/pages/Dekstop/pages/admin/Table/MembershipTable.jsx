import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Users } from '../../../../../api/apiMembershipV2';
import Pagination from '../components/Pagination';

export default function MembershipTable({ tab }) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [LimitData, setLimitData] = useState(10);
    const [totalItems, setTotalItems] = useState(1);

    const fetchData = async () => {
        try {
            const response = await Users.getAllUser(
                currentPage,
                LimitData,
                tab === 'all' ? '' : tab
            );
            setData(response.data || []);
            setTotalPages(response.totalPages || 1);
            setTotalItems(response.total || 1);
        } catch (error) {
            console.error('Failed to fetch data:', error);
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

    return (
        <div className="w-full px-3 py-4">
            <div className="bg-white rounded-lg shadow-lg">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 rounded-tl-lg">
                                #
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                Customer Code
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                Profil
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                Contact
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                Address
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                Birthday
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                Points
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                Reward Points
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                Status
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 rounded-tr-lg"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((items, index) => (
                            <tr key={index} className="text-sm">
                                <td className="px-5 py-3 border-b border-gray-200">
                                    {index + 1}
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200">
                                    {items.customer_no}
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200">
                                    <div className="flex flex-col justify-start items-start">
                                        <h1 className="text-gray-800 font-semibold text-sm">
                                            {items.fullname}
                                        </h1>
                                        <p className="text-gray-500 text-xs">
                                            {items.gender}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200">
                                    <div className="flex flex-col justify-start items-start">
                                        <h1 className="text-gray-800 font-semibold text-sm">
                                            {items.email}
                                        </h1>
                                        <p className="text-gray-400 text-xs">
                                            {items.phone_number}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200">
                                    {items.address}
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200">
                                    {format(new Date(items.dob), 'dd-MMM-yyyy')}
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200">
                                    {formatCurrency(items.points ?? 0)}
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200">
                                    {formatCurrency(items.reward_points ?? 0)}
                                </td>
                                <td className="px-5 py-3 border-b border-gray-200">
                                    <div className="flex flex-row justify-start items-center gap-x-3">
                                        <div
                                            className={`relative h-4 w-4 rounded-full text-xs flex items-center justify-center ${
                                                items.is_active === 1
                                                    ? 'bg-green-100'
                                                    : 'bg-red-100'
                                            }`}
                                        >
                                            <div
                                                className={`h-2 w-2 rounded-full ${
                                                    items.is_active === 1
                                                        ? 'bg-green-500'
                                                        : 'bg-red-500'
                                                }`}
                                            ></div>
                                            <span className="absolute text-center text-black text-sm font-bold"></span>
                                        </div>
                                        <p
                                            className={`${
                                                items.is_active === 1
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                            }`}
                                        >
                                            {items.is_active === 1
                                                ? 'Active'
                                                : 'Inactive'}
                                        </p>
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
        </div>
    );
}
