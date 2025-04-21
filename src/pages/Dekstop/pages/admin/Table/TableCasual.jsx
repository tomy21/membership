import React, { useState } from 'react';
import { GoDownload, GoPlus } from 'react-icons/go';
import { MdEditDocument, MdFilterList, MdSearch } from 'react-icons/md';
import { TbColumns3 } from 'react-icons/tb';
import { useHistoryCasual } from '../../../context/HistoryCasualProvider';
import { format } from 'date-fns';
import { IoTrashOutline } from 'react-icons/io5';
import Pagination from '../components/Pagination';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { apiExportData } from '../../../../../api/apiExportData';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarLoader } from 'react-spinners';

export default function TableCasual() {
    const {
        data,
        limit,
        page,
        search,
        totalPages,
        totalItems,
        totalTariff,
        month,
        listMonth,
        setPage,
        setLimit,
        setSearch,
        setTotalItems,
        setTotalPages,
        setMonth,
        setListMonth,
        reloadData,
    } = useHistoryCasual();
    console.log(data);
    const [searchText, setSearchText] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState(null);

    // exportAction
    const handleExport = async () => {
        setIsLoading(true);
        try {
            const startDateFormat = format(new Date(startDate), 'yyyy-MM-dd');
            const endDateFormat = format(new Date(endDate), 'yyyy-MM-dd');
            const { blob, fileName } = await apiExportData.historyParking(
                startDateFormat,
                endDateFormat,
                location,
                'NON-MEMBER'
            );

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();

            toast.success('Data berhasil diunduh!', {
                position: 'top-right',
            });
            setStartDate(null);
            setEndDate(null);
        } catch (error) {
            toast.error(error, {
                position: 'top-right',
            });
            setStartDate(null);
            setEndDate(null);
        } finally {
            setIsLoading(false);
            setStartDate(null);
            setEndDate(null);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <>
            <ToastContainer />
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <BarLoader size={550} color={'#e9d309'} loading={true} />
                </div>
            )}
            <div className="w-full px-3 py-4">
                <div className="flex flex-row justify-between items-center space-x-2 px-3 border-b mb-5 pb-2">
                    <div className="flex flex-row justify-between items-center w-1/2">
                        <div className="flex flex-row space-x-5 items-start w-1/2">
                            <p className="text-sm text-slate-400 font-semibold">
                                Transaction
                            </p>
                            <p className="text-lg font-semibold">
                                {totalItems}
                            </p>
                        </div>
                        <div className="flex flex-row space-x-5 items-start w-1/2">
                            <p className="text-sm text-slate-400 font-semibold">
                                Income
                            </p>
                            <p className="text-lg font-semibold">
                                {formatCurrency(totalTariff)}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center space-x-2 px-3">
                        <input
                            type="text"
                            className="px-3 py-2 outline-none text-sm border rounded"
                            placeholder="Search..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <select
                            value={month}
                            onChange={(e) => setMonth(Number(e.target.value))}
                            className="border border-slate-300 p-2 rounded-md"
                        >
                            {/* <option value="">Select Month</option> */}
                            {listMonth.map((m) => (
                                <option key={m} value={m}>
                                    {new Date(2025, m - 1, 1).toLocaleString(
                                        'en-US',
                                        {
                                            month: 'long',
                                        }
                                    )}
                                </option>
                            ))}
                        </select>

                        <div className="border-r border-slate-300 h-7"></div>

                        <div className="w-full">
                            <DatePicker
                                selected={startDate}
                                onChange={(dates) => {
                                    const [start, end] = dates;
                                    setStartDate(start);
                                    setEndDate(end);
                                }}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                dateFormat="dd/MM/yyyy"
                                className="w-full p-2 border rounded-md min-w-[150px] md:min-w-[250px] flex-1"
                                placeholderText="Pilih rentang tanggal"
                            />
                        </div>

                        <button
                            onClick={handleExport}
                            className="flex items-center bg-gradient-to-t from-blue-300 to-blue-500 text-white rounded-md p-2 hover:opacity-80 shadow-inner shadow-blue-500"
                        >
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
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={index} className="text-sm">
                                        <td className="px-5 py-3 border-b border-gray-200">
                                            {index + 1}
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200">
                                            <div className="flex flex-col justify-start items-start w-full">
                                                <h1 className="font-semibold text-sm">
                                                    {item.userHistoryPost
                                                        ?.fullname ?? '-'}
                                                </h1>
                                                <h1 className="font-normal text-sm text-gray-400">
                                                    {item.userHistoryPost
                                                        ?.email ?? '-'}
                                                </h1>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200">
                                            {item.location_name ?? '-'}
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200">
                                            {item.plate_number}
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200">
                                            {item.gate_in_time === null
                                                ? '-'
                                                : format(
                                                      new Date(
                                                          item.gate_in_time
                                                      )
                                                          .toISOString()
                                                          .replace('T', ' ')
                                                          .replace('Z', ''),
                                                      'dd-MMM-yyyy HH:mm:ss'
                                                  )}
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200">
                                            {item.gate_out_time === null
                                                ? '-'
                                                : format(
                                                      new Date(
                                                          item.gate_out_time
                                                      )
                                                          .toISOString()
                                                          .replace('T', ' ')
                                                          .replace('Z', ''),
                                                      'dd-MMM-yyyy HH:mm:ss'
                                                  )}
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200">
                                            {formatCurrency(item.tariff ?? 0)}
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200">
                                            <div className="flex flex-row justify-start items-center gap-x-3">
                                                <div
                                                    className={`relative h-4 w-4 rounded-full text-xs flex items-center justify-center ${
                                                        item.is_close === 1
                                                            ? 'bg-green-100'
                                                            : 'bg-red-100'
                                                    }`}
                                                >
                                                    <div
                                                        className={`h-2 w-2 rounded-full ${
                                                            item.is_close === 1
                                                                ? 'bg-green-500'
                                                                : 'bg-red-500'
                                                        }`}
                                                    ></div>
                                                    <span className="absolute text-center text-black text-sm font-bold"></span>
                                                </div>
                                                <p
                                                    className={
                                                        item.is_close === 1
                                                            ? 'text-green-500'
                                                            : 'text-red-500'
                                                    }
                                                >
                                                    {item.is_close === 1
                                                        ? item.gate_out_time ===
                                                          null
                                                            ? 'Check out'
                                                            : 'Out Area'
                                                        : item.gate_in_time ===
                                                          null
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
                                        colSpan={5}
                                        className="text-center py-3"
                                    >
                                        No Data
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
        </>
    );
}
