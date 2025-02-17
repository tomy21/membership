import { format } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ErrorModal from './ErrorModal';

export default function ExportModal({ onClose, onExport }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [location, setLocation] = useState([]);
    const [isError, setIsError] = useState(false);

    const handleExport = () => {
        if (!startDate && !endDate) {
            setIsError(true);
            return;
        }
        const startDateFormat = format(new Date(startDate), 'yyyy-MM-dd');
        const endDateFormat = format(new Date(endDate), 'yyyy-MM-dd');
        onExport(startDateFormat, endDateFormat, location);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-md w-1/3 p-5">
                {/* Header */}
                <div className="flex justify-between items-center pb-3">
                    <h2 className="text-lg font-bold">Export Data</h2>
                    <button
                        className="text-gray-600 hover:text-gray-800"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
                <div className="border-b border-gray-300 w-full"></div>

                {/* Single Date Picker */}
                <div className="flex flex-wrap justify-between items-center w-full">
                    <div className="mt-4 flex flex-col justify-start items-start space-y-2 w-1/2">
                        <label className="text-sm font-medium text-gray-700">
                            Select Date
                        </label>
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
                    </div>

                    {/* Select Location */}
                    <div className="mt-4 flex flex-col justify-start items-start space-y-2 w-1/2">
                        <label className="text-sm font-medium text-gray-700">
                            Select Location
                        </label>
                        <div className="w-full">
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full p-2 border rounded-md min-w-[150px] md:min-w-[250px] flex-1"
                            >
                                <option value="All">All</option>
                                <option value="location1">Location 1</option>
                                <option value="location2">Location 2</option>
                                <option value="location3">Location 3</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-300 w-full my-3"></div>

                {/* Buttons */}
                <div className="mt-5 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Export
                    </button>
                </div>
            </div>

            {isError && (
                <ErrorModal
                    message="Please select date"
                    onClose={() => setIsError(false)}
                />
            )}
        </div>
    );
}
