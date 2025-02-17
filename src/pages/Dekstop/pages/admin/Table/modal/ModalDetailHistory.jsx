import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { historyMembers } from '../../../../../../api/apiUsers';
import { format } from 'date-fns';
import Pagination from '../../components/Pagination';
import { ScaleLoader } from 'react-spinners';

export default function ModalDetailHistory({ isOpen, onClose, idUsers }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [totalItems, setTotalItems] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await historyMembers.historyGetAllByUserid(
                    idUsers,
                    page,
                    limit,
                    search
                );
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        if (isOpen) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
            fetchData();
        }
    }, [isOpen]);

    const handleClose = () => {
        onClose();
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            maximumFractionDigits: 0,
        }).format(amount);
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-900 bg-opacity-50">
            {loading ? (
                <ScaleLoader size={150} color={'#ffff'} loading={true} />
            ) : (
                <div className="bg-white rounded-xl shadow-lg w-full md:w-1/2 lg:w-[80%] max-h-[90vh] flex flex-col p-2">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-gray-700">
                            Detail Transaction
                        </h3>
                        <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={handleClose}
                        >
                            <MdClose className="w-6 h-6" />
                        </button>
                    </div>

                    {data.users && (
                        <div className="px-6 py-4 border-b border-gray-200">
                            <tr>
                                <td className="w-20 text-slate-400">Name</td>
                                <td className="w-3">:</td>
                                <td className="w-10">{data.users.fullname}</td>
                            </tr>
                            <tr>
                                <td className="w-20 text-slate-400">Email</td>
                                <td className="w-3">:</td>
                                <td className="w-10">{data.users.email}</td>
                            </tr>
                        </div>
                    )}

                    <div className="px-6 py-4">
                        <table className="table table-hover w-full">
                            <thead className="border-b border-slate-300">
                                <tr>
                                    <th className="p-2">No</th>
                                    <th className="p-2">Date</th>
                                    <th className="p-2">Description</th>
                                    <th className="p-2">Debit</th>
                                    <th className="p-2">Kredit</th>
                                    <th className="p-2">Current Point</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.history && data.history.length > 0 ? (
                                    data.history.map((item, index) => (
                                        <tr key={index}>
                                            <td className="p-2 text-sm border-b border-slate-400">
                                                {index + 1}
                                            </td>
                                            <td className="p-2 text-sm border-b border-slate-400">
                                                {format(
                                                    new Date(item.date),
                                                    'dd-MMM-yyyy HH:mm:ss'
                                                )}
                                            </td>
                                            <td className="p-2 text-sm border-b border-slate-400">
                                                {item.description}
                                            </td>
                                            <td className="p-2 text-sm border-b border-slate-400 text-center">
                                                {item.debet
                                                    ? formatCurrency(item.debet)
                                                    : '-'}
                                            </td>
                                            <td className="p-2 text-sm border-b border-slate-400 text-center">
                                                {item.kredit
                                                    ? formatCurrency(
                                                          item.kredit
                                                      )
                                                    : '-'}
                                            </td>
                                            <td className="p-2 text-sm border-b border-slate-400 text-center">
                                                {item.currentPoint
                                                    ? formatCurrency(
                                                          item.currentPoint
                                                      )
                                                    : '-'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="p-2">
                                            Data not found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                            totalItem={totalItems}
                            limit={limit}
                            onLimitChange={setLimit}
                            setPageCurrent={setPage}
                            setLimitData={setLimit}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
