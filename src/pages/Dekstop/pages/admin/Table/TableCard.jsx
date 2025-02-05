import React, { useEffect, useState } from 'react';
import { Card } from '../../../../../api/apiBayarind';
import { format } from 'date-fns';
import { IoMdClose } from 'react-icons/io';
import { GoInfo } from 'react-icons/go';
import { RiRfidLine } from 'react-icons/ri';
import { ScaleLoader } from 'react-spinners';
import { BsFillXCircleFill, BsPatchCheck } from 'react-icons/bs';
import { IoTrashOutline } from 'react-icons/io5';
import { MdEditDocument } from 'react-icons/md';
import Pagination from '../components/Pagination';

export default function TableCard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [LimitData, setLimitData] = useState(10);
    const [totalPages, setTotalPages] = useState(10);
    const [totalItems, setTotalItems] = useState(10);
    const [data, setData] = useState([]);
    const [isModalAdd, setIsModalAdd] = useState(false);
    const [deviceData, setDeviceData] = useState(null);
    const [dataRFID, setDataRFID] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [progress, setProgress] = useState(false);
    const [isMessage, setIsMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, [currentPage, LimitData]);

    useEffect(() => {
        autoConnectToSerialDevice();
    }, []);

    const fetchData = async () => {
        try {
            const response = await Card.getAllCard();
            console.log(response);
            setData(response.data);
            // setTotalPages(response.meta.totalPages);
            // setTotalItems(response.totalItems);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const autoConnectToSerialDevice = async () => {
        try {
            const savedDevice = localStorage.getItem('serialDevice');
            if (savedDevice) {
                const port = await navigator.serial.requestPort();
                await connectToPort(port);
            }
        } catch (error) {
            console.error(
                'Failed to auto-connect to the serial device:',
                error
            );
        }
    };

    const connectToPort = async (port) => {
        try {
            await port.open({ baudRate: 9600 });

            const textDecoder = new TextDecoderStream();
            const readableStreamClosed = port.readable.pipeTo(
                textDecoder.writable
            );
            const reader = textDecoder.readable.getReader();

            setDeviceData('Connected to device');

            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    reader.releaseLock();
                    break;
                }

                if (value) {
                    setDataRFID(value.trim()); // Trim data untuk menghapus karakter kosong
                    handleAddCard(value.trim()); // Panggil fungsi untuk menyimpan data kartu
                }
            }
        } catch (error) {
            console.error('Error connecting to the serial port:', error);
            setDeviceData('Failed to connect to device.');
        }
    };

    const handleConnectDevice = async () => {
        try {
            const port = await navigator.serial.requestPort();
            localStorage.setItem(
                'serialDevice',
                JSON.stringify(port.getInfo())
            );
            await connectToPort(port);
        } catch (error) {
            console.error('Error connecting to the serial device:', error);
        }
    };

    const handleOpenAdd = () => {
        setIsModalAdd(true);
    };

    const handleAddCard = async (value) => {
        setLoading(true);
        try {
            console.log(value.length);

            if (value.length != 8) {
                setIsError(true);
                setIsMessage('Card not valid');
                const interval = setInterval(() => {
                    setProgress((prev) => {
                        if (prev >= 100) {
                            clearInterval(interval); // Hentikan progress
                            setIsError(false); // Tutup modal success
                        }
                        return prev + 10; // Tambahkan progress
                    });
                }, 300);
                setProgress(0);
                setDataRFID('');
            } else {
                const response = await Card.createNewCard(value);

                if (response.status === true) {
                    setIsSuccessModalOpen(true);
                    setIsMessage('Success Add Card');
                    // Tutup modal success secara otomatis setelah beberapa saat
                    const interval = setInterval(() => {
                        setProgress((prev) => {
                            if (prev >= 100) {
                                clearInterval(interval); // Hentikan progress
                                setIsSuccessModalOpen(false); // Tutup modal success
                            }
                            return prev + 10; // Tambahkan progress
                        });
                    }, 300);
                    setProgress(0);
                    setDataRFID('');
                } else {
                    setIsError(true);
                    setIsMessage('Card already exist');
                    const interval = setInterval(() => {
                        setProgress((prev) => {
                            if (prev >= 100) {
                                clearInterval(interval); // Hentikan progress
                                setIsError(false); // Tutup modal success
                            }
                            return prev + 10; // Tambahkan progress
                        });
                    }, 300);
                    setProgress(0);
                    setDataRFID('');
                }
            }

            fetchData(); // Refresh data tabel setelah sukses
        } catch (error) {
            console.error('Failed to add card:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="w-full px-3 py-4">
                <div className="flex justify-between items-start w-full mb-3">
                    <input
                        type="search"
                        className="py-2 px-3 border border-slate-300 rounded-lg"
                        placeholder="Search..."
                    />
                    <button
                        className="bg-amber-500 hover:bg-amber-700 text-white font-normal py-2 px-4 rounded"
                        onClick={handleOpenAdd}
                    >
                        Add Card
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-lg max-w-full overflow-auto">
                    <table className="max-w-full leading-normal w-full">
                        <thead>
                            <tr>
                                <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 rounded-tl-lg">
                                    #
                                </th>
                                <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                    No Card
                                </th>
                                <th className="px-5 py-4 border-b-2 border-gray-500 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200">
                                    Status
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
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                            {index + 1}
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                            {item.no_card}
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                            <div className="flex flex-row justify-start items-center gap-x-3">
                                                <div
                                                    className={`relative h-4 w-4 rounded-full text-xs flex items-center justify-center ${
                                                        item.is_used
                                                            ? 'bg-green-100'
                                                            : 'bg-yellow-100'
                                                    }`}
                                                >
                                                    <div
                                                        className={`h-2 w-2 rounded-full ${
                                                            item.is_used
                                                                ? 'bg-green-500'
                                                                : 'bg-yellow-500'
                                                        }`}
                                                    ></div>
                                                </div>
                                                <p
                                                    className={`${
                                                        item.is_used
                                                            ? 'text-green-500'
                                                            : 'text-yellow-500'
                                                    }`}
                                                >
                                                    {item.is_used
                                                        ? 'Used'
                                                        : 'Not Used'}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                            {format(
                                                new Date(item.created_at),
                                                'dd-MM-yyyy'
                                            )}
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
                                            {format(
                                                new Date(item.updated_at),
                                                'dd-MM-yyyy'
                                            )}
                                        </td>
                                        <td className="px-5 py-3 border-b border-gray-200 whitespace-nowrap">
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

            {isModalAdd && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 w-[40%] rounded-lg shadow-lg">
                        <div className="flex justify-between items-start w-full border-b border-slate-300 p-3">
                            <h2 className="text-lg font-bold text-gray-900">
                                Add New Item
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsModalAdd(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <IoMdClose
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>

                        <div className="border w-full h-60 mt-3 bg-slate-200 rounded-lg flex items-center justify-center">
                            {deviceData ? (
                                isLoading ? (
                                    <div className="flex flex-col justify-center items-center p-3 space-y-3">
                                        <ScaleLoader
                                            size={150}
                                            color={'#bbb'}
                                            loading={true}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col justify-center items-center p-3 space-y-3">
                                        <RiRfidLine
                                            size={60}
                                            className="text-blue-600"
                                        />
                                        <p className="text-center text-gray-700">
                                            {deviceData}
                                        </p>
                                    </div>
                                )
                            ) : (
                                <div className="flex flex-col justify-center items-center p-3 space-y-3">
                                    <div className="flex flex-row justify-center items-center bg-blue-200 text-blue-600 rounded-lg p-3 space-x-2">
                                        <GoInfo size={32} />
                                        <p className="text-start text-xs">
                                            Klik untuk menyambungkan perangkat.
                                        </p>
                                    </div>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded"
                                        onClick={handleConnectDevice}
                                    >
                                        Connect Device
                                    </button>
                                </div>
                            )}
                        </div>

                        <input
                            type="text"
                            className="border border-slate-300 bg-slate-100 rounded-lg mt-4 w-full py-2 px-3"
                            placeholder="Masukkan nomor RFID"
                            value={dataRFID}
                            onChange={(e) => setDataRFID(e.target.value)}
                            readOnly
                        />
                    </div>
                </div>
            )}

            {isSuccessModalOpen && (
                <div
                    className="fixed top-4 right-4 z-50 animate-slide-in" // Animasi untuk modal
                    style={{ animationDuration: '0.5s' }} // Durasi animasi
                >
                    <div className="relative bg-white border border-green-50 shadow-inner rounded-lg p-4 w-72">
                        <div className="flex flex-row justify-start items-center space-x-2">
                            <BsPatchCheck
                                size={30}
                                className="text-green-500"
                            />
                            <div className="flex flex-col justify-start items-start">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Success ... !
                                </h2>
                                <p className="text-sm text-slate-300">
                                    {isMessage}
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                            <div
                                className="bg-green-500 h-1 rounded-full transition-all duration-300" // Animasi progress bar
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {isError && (
                <div
                    className="fixed top-4 right-4 z-50 animate-slide-in" // Animasi untuk modal
                    style={{ animationDuration: '0.5s' }} // Durasi animasi
                >
                    <div className="relative bg-white border border-green-50 shadow-inner rounded-lg p-4 w-72">
                        <div className="flex flex-row justify-start items-center space-x-2">
                            <BsFillXCircleFill
                                size={30}
                                className="text-red-500"
                            />
                            <div className="flex flex-col justify-start items-start">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Failed ... !
                                </h2>
                                <p className="text-sm text-slate-300">
                                    {isMessage}
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                            <div
                                className="bg-red-500 h-1 rounded-full transition-all duration-300" // Animasi progress bar
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
