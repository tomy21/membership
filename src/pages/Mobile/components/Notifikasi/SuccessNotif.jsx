import React from 'react';
import { BsPatchCheck } from 'react-icons/bs';

export default function SuccessNotif({ isSuccess, progress, message }) {
    if (!isSuccess) return null;
    return (
        <>
            <div
                className="fixed top-10 right-4 z-50 animate-slide-in" // Animasi untuk modal
                style={{ animationDuration: '0.5s' }} // Durasi animasi
            >
                <div className="relative shadow-inner rounded-lg p-4 w-72 bg-emerald-50 bg-opacity-50">
                    <div className="flex flex-row justify-start items-center space-x-2">
                        <BsPatchCheck
                            size={30}
                            className="text-emerald-500 font-semibold"
                        />
                        <h2 className="text-base font-semibold text-emerald-500">
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
