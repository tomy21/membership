import React, { useState } from 'react';
import { usePaymentProvider } from '../../../context/PaymentProvider';
import { IoTrashOutline } from 'react-icons/io5';
import { MdEditDocument } from 'react-icons/md';
import { format } from 'date-fns';

export default function TableBankProvider() {
    const [loading, setLoading] = useState(false);
    const {
        dataProvider,
        pages,
        limit,
        totalPages,
        totalItems,
        search,
        setLimit,
        setTotalPages,
        setTotalItems,
        setSearch,
        setPages,
        reloadDataPaymenProvider,
    } = usePaymentProvider();
    console.log(dataProvider);
    return (
        <>
            <div className="w-full px-3 py-4">
                <div className="flex justify-between items-start w-full mb-3">
                    <input
                        type="search"
                        className="py-2 px-3 border border-slate-300 rounded-lg"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                    />
                    <button
                        className="bg-amber-500 hover:bg-amber-700 text-white font-normal py-2 px-4 rounded"
                        // onClick={handleOpenAdd}
                    >
                        Add Provider Payment
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-lg max-w-full overflow-auto">
                    <table className="max-w-full leading-normal w-full">
                        <thead>
                            <tr>
                                <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 rounded-tl-lg">
                                    #
                                </th>
                                {/* <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                    Partner Key
                                </th>
                                <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                    Channel Id
                                </th> */}
                                <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                    Payment Gateway
                                </th>
                                <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                    Code Bank
                                </th>
                                <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                    Category
                                </th>
                                <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                    Show
                                </th>
                                <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                    Created Date
                                </th>
                                <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                    Updated Date
                                </th>
                                <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataProvider.length > 0 ? (
                                dataProvider.map((items, index) => (
                                    <tr>
                                        <td className="px-5 py-3 border-b border-gray-200">
                                            {index + 1}
                                        </td>
                                        {/* <td className="px-5 py-3 border-b border-gray-200">
                                            {items.partner_key}
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200">
                                            {items.channel_id}
                                        </td> */}
                                        <td className="px-5 py-3 border-b border-gray-200">
                                            {items.gateway_partner}
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200">
                                            {items.code_bank}
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200">
                                            {items.type_payment}
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200">
                                            <span
                                                className={`p-2 rounded-md ${
                                                    items.is_show === 0
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-emerald-100 text-emerald-700'
                                                }`}
                                            >
                                                {items.is_show === 0
                                                    ? 'Unactive'
                                                    : 'Active'}
                                            </span>
                                        </td>

                                        <td className="px-5 py-3 border-b border-gray-200">
                                            {format(
                                                new Date(items.created_at),
                                                'dd-MM-yyyy HH:mm:ss'
                                            )}
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200">
                                            {format(
                                                new Date(items.updated_at),
                                                'dd-MM-yyyy HH:mm:ss'
                                            )}
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200">
                                            <div className="flex flex-row justify-center items-center w-full gap-x-3 cursor-pointer">
                                                <IoTrashOutline
                                                    size={25}
                                                    className="text-red-500 hover:text-red-600"
                                                    // onClick={() => handleConfirmation(items)}
                                                />
                                                <div className="border-l border-slate-300 h-5"></div>
                                                <MdEditDocument
                                                    size={25}
                                                    className="text-blue-500 hover:text-blue-600"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr
                                    colSpan="9"
                                    className="py-3 px-3 text-center"
                                >
                                    <td>No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
