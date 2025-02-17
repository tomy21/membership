import React from 'react';
import { VscCopilotWarning } from 'react-icons/vsc';

export default function ErrorModal({ message, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center w-1/4">
                <div className="flex flex-row justify-center items-center w-full space-x-4 border-b border-slate-400 mb-4 py-4">
                    <VscCopilotWarning size={50} className="text-amber-500" />
                    <h1 className="text-2xl font-bold text-amber-500">
                        Warning
                    </h1>
                </div>
                <p className="mb-7 text-2xl text-bold border-b border-slate-400 py-3">
                    {message}
                </p>
                <button
                    onClick={onClose}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    OK
                </button>
            </div>
        </div>
    );
}
