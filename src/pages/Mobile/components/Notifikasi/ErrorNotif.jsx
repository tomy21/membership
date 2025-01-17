import React from 'react';
import { BsFillXCircleFill } from 'react-icons/bs';

export default function ErrorNotif({ isError, progress, message }) {
    if (!isError) return null;
    return (
        <>
            <div
                className="fixed top-4 right-4 z-50 animate-slide-in" // Animasi untuk modal
                style={{ animationDuration: '0.5s' }} // Durasi animasi
            >
                <div className="relative shadow-inner rounded-lg p-4 w-72 bg-red-500 bg-opacity-65">
                    <div className="flex flex-row justify-start items-center space-x-2">
                        <BsFillXCircleFill size={30} className="text-red-500" />
                        <h2 className="text-base font-semibold text-white">
                            {message}
                        </h2>
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
        </>
    );
}
