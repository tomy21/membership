import React, { useEffect } from 'react';
import { useHistoryPOST } from '../../../context/HistoryPOSTProvider';
import { format } from 'date-fns';
import Pagination from '../components/Pagination';

export default function TablePost({ tab, tabStatus }) {
    const {
        historyPOST,
        page,
        setPage,
        limit,
        totalPages,
        totalItems,
        statusMember,
        setStatusMember,
        setLimit,
        setTotalPages,
        setTotalItems,
        search,
        setSearch,
        status,
        setStatus,
        reloadDataHistoryPost,
    } = useHistoryPOST();

    useEffect(() => {
        if (tab) {
            setStatus(tab);
            setStatusMember('');
            setPage(1);
        }

        if (tabStatus) {
            setStatus('All');
            setStatusMember(tabStatus);
            setPage(1);
        }
    }, [tab, setStatus, tabStatus, setStatusMember]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="w-full px-3 py-4">
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
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
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
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {data.location_name ?? '-'}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {data.status_member ?? '-'}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {data.plate_number}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {data.gate_in_time === null
                                            ? '-'
                                            : format(
                                                  new Date(data.gate_in_time)
                                                      .toISOString()
                                                      .replace('T', ' ')
                                                      .replace('Z', ''),
                                                  'dd-MMM-yyyy HH:mm:ss'
                                              )}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {data.gate_out_time === null
                                            ? '-'
                                            : format(
                                                  new Date(data.gate_out_time)
                                                      .toISOString()
                                                      .replace('T', ' ')
                                                      .replace('Z', ''),
                                                  'dd-MMM-yyyy HH:mm:ss'
                                              )}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {formatCurrency(data.tariff ?? 0)}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
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
                                                className={
                                                    data.is_close === 1
                                                        ? 'text-green-500'
                                                        : 'text-red-500'
                                                }
                                            >
                                                {data.is_close === 1
                                                    ? data.gate_out_time ===
                                                      null
                                                        ? 'Check out'
                                                        : 'Out Area'
                                                    : data.gate_in_time === null
                                                    ? 'Check in'
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
        </div>
    );
}
