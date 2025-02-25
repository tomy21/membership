import React from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

export default function CardHeader({
    title,
    value,
    percentage,
    icon,
    value2,
    label,
    label2,
}) {
    return (
        <div className="flex flex-col w-full border border-slate-200 rounded-lg p-4 min-h-40 gap-4 bg-white shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center space-x-2">
                    <span className="text-amber-600 text-xl">{icon}</span>
                    <h2 className="text-base font-semibold text-gray-700">
                        {title}
                    </h2>
                </div>
                <HiOutlineDotsHorizontal className="text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>

            {/* Value Display */}
            <div className="flex flex-col w-full gap-3">
                {title === 'Total Parking' ||
                title === 'Total Membership' ||
                title === 'Stock Card' ? (
                    <div className="flex justify-around items-center w-full">
                        <StatBox
                            value={value}
                            label={label}
                            textColor="text-emerald-500"
                        />
                        <StatBox
                            value={value2}
                            label={label2}
                            textColor="text-red-500"
                        />
                    </div>
                ) : title === 'Total Balance Point' ? (
                    <div className="flex flex-row justify-start items-end space-x-3">
                        <h1 className="text-2xl font-normal text-gray-800">
                            {value}
                        </h1>
                        <span className="text-xs text-slate-300">Points</span>
                    </div>
                ) : (
                    <h1 className="text-2xl font-normal text-gray-800">
                        {value}
                    </h1>
                )}

                {/* Percentage Indicator */}
                {/* <div
                    className={`flex items-center space-x-2 text-sm ${
                        title !== 'Total Parking' ? 'mt-3' : ''
                    }`}
                >
                    {percentage > 0 ? (
                        <>
                            <TiArrowSortedUp className="text-green-500" />
                            <p className="text-green-500 font-medium">
                                {percentage}%
                            </p>
                        </>
                    ) : (
                        <>
                            <TiArrowSortedDown className="text-red-500" />
                            <p className="text-red-500 font-medium">0%</p>
                        </>
                    )}
                    <p className="text-gray-500">vs last month</p>
                </div> */}
            </div>
        </div>
    );
}

const StatBox = ({ value, label, textColor }) => (
    <div className="flex flex-col items-center">
        <h1 className="text-3xl font-normal text-gray-800">{value}</h1>
        <p className={`text-xs font-medium ${textColor}`}>{label}</p>
    </div>
);
