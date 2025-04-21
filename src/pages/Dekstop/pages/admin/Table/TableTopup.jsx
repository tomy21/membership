import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { Payment } from '../../../../../api/apiMembershipV2';
import { ScaleLoader } from 'react-spinners';
import { format } from 'date-fns';

export default function TableTopup({ tab }) {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [LimitData, setLimitData] = useState(10);
    const [totalItems, setTotalItems] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await Payment.getAllTransactionTopup(
                currentPage,
                LimitData,
                tab === 'all' ? '' : tab
            );

            setOrders(response.data || []);
            setTotalPages(response.pagination?.totalPages || 1);
            setTotalItems(response.pagination?.total || 1);
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
                                Transaction Date
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap">
                                Users
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap">
                                Transaction ID
                            </th>

                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap">
                                Product
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap">
                                Payment Method
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap">
                                Total
                            </th>
                            <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 whitespace-nowrap rounded-tr-lg">
                                Payment Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="9" className="text-center py-4">
                                    <div className="flex justify-center items-center w-full">
                                        <ScaleLoader color="#D7BF36FF" />
                                    </div>
                                </td>
                            </tr>
                        ) : orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={index} className="text-sm">
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {format(
                                            new Date(order.createdAt),
                                            'dd-MMM-yyyy HH:mm:ss'
                                        )}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        <div className="flex flex-col justify-start items-start">
                                            <p className="text-gray-900 whitespace-no-wrap font-semibold">
                                                {order.trxHistoryUser?.fullname}
                                            </p>
                                            <p className="whitespace-no-wrap text-slate-400">
                                                {order.trxHistoryUser?.email}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {order.trxId}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {order.product_name}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {order.transactionType}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        {formatCurrency(order.price ?? 0)}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                        <div className="flex flex-row justify-start items-center gap-x-3">
                                            <div
                                                className={`relative h-4 w-4 rounded-full text-xs flex items-center justify-center ${
                                                    order.statusPayment ===
                                                    'PAID'
                                                        ? 'bg-green-100'
                                                        : order.statusPayment ===
                                                          'PENDING'
                                                        ? 'bg-yellow-100'
                                                        : 'bg-red-100'
                                                }`}
                                            >
                                                <div
                                                    className={`h-2 w-2 rounded-full ${
                                                        order.statusPayment ===
                                                        'PAID'
                                                            ? 'bg-green-500'
                                                            : order.statusPayment ===
                                                              'PENDING'
                                                            ? 'bg-yellow-500'
                                                            : 'bg-red-500'
                                                    }`}
                                                ></div>
                                                <span className="absolute text-center text-black text-sm font-bold"></span>
                                            </div>
                                            <p
                                                className={`${
                                                    order.statusPayment ===
                                                    'PAID'
                                                        ? 'text-green-500'
                                                        : order.statusPayment ===
                                                          'PENDING'
                                                        ? 'text-yellow-500'
                                                        : 'text-red-500'
                                                }`}
                                            >
                                                {order.statusPayment}
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
