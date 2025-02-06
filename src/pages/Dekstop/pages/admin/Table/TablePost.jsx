import React, { useEffect } from 'react';
import { useHistoryPOST } from '../../../context/HistoryPOSTProvider';
import { format } from 'date-fns';
import Pagination from '../components/Pagination';

export default function TablePost({ tab }) {
    console.log(tab);
    const {
        historyPOST,
        page,
        setPage,
        limit,
        setLimit,
        totalPages,
        setTotalPages,
        totalItems,
        setTotalItems,
        search,
        setSearch,
        status,
        setStatus,
        reloadDataHistoryPost,
    } = useHistoryPOST();

    console.log(totalItems);

    useEffect(() => {
        if (tab) {
            setStatus(tab);
        }
    }, [tab, setStatus]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="w-full px-3 py-4">
            <div className="bg-white rounded-lg shadow-lg">
                <table className="min-w-full leading-normal">
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
                                Status Membership
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap">
                                Plate Number
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap">
                                In Time
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap">
                                Out Time
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap">
                                Tariff
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap rounded-tr-lg">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyPOST.length > 0 ? (
                            historyPOST.map((data, index) => (
                                <tr key={index} className="text-sm">
                                    <td className="px-5 py-3 border-b border-gray-200">
                                        {index + 1}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200">
                                        <div className="flex flex-col justify-start items-start w-full">
                                            <h1 className="font-semibold text-sm">
                                                {data.userHistoryPost
                                                    ?.fullname ?? '-'}
                                            </h1>
                                            <h1 className="font-normal text-sm text-gray-400">
                                                {data.userHistoryPost?.email ??
                                                    '-'}
                                            </h1>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200">
                                        {data.location_name ?? '-'}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200">
                                        {data.status_member ?? '-'}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200">
                                        {data.plate_number}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200">
                                        {format(
                                            new Date(data.gate_in_time ?? 0),
                                            'dd-MMM-yyyy HH:mm:ss:SSS'
                                        )}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200">
                                        {data.gate_out_time === null
                                            ? '-'
                                            : format(
                                                  new Date(data.gate_out_time),
                                                  'dd-MMM-yyyy HH:mm:ss:SSS'
                                              )}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200">
                                        {formatCurrency(data.tariff ?? 0)}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200">
                                        <div className="flex flex-row justify-start items-center gap-x-3">
                                            <div
                                                className={`relative h-4 w-4 rounded-full text-xs flex items-center justify-center ${
                                                    data.is_close === 1
                                                        ? 'bg-green-100'
                                                        : 'bg-red-100'
                                                }`}
                                            >
                                                <div
                                                    className={`h-2 w-2 rounded-full ${
                                                        data.is_close === 1
                                                            ? 'bg-green-500'
                                                            : 'bg-red-500'
                                                    }`}
                                                ></div>
                                                <span className="absolute text-center text-black text-sm font-bold"></span>
                                            </div>
                                            <p
                                                className={`${
                                                    data.is_close === 1
                                                        ? 'text-green-500'
                                                        : 'text-red-500'
                                                }`}
                                            >
                                                {data.is_close === 1
                                                    ? 'Out Area'
                                                    : 'In Area'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="py-3 px-3 text-center"
                                >
                                    No data available
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
        </div>
    );
}
