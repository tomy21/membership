import React, { useState } from 'react';

const UploadImageModal = ({ isOpen, onClose, onImageUpload }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(file);
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = () => {
        if (image && onImageUpload) {
            setUploading(true);
            onImageUpload(image)
                .finally(() => setUploading(false)); // Ensure uploading state is reset
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
            >
                <h2 className="text-xl font-bold mb-4">Upload Payment Image</h2>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border border-gray-300 p-2 rounded mb-4 w-full"
                />
                {preview && (
                    <div className="mb-4">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-auto border border-gray-300 rounded"
                        />
                    </div>
                )}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className={`rounded-xl bg-yellow-100 text-yellow-600 px-4 py-2 ${uploading ? 'cursor-not-allowed' : ''}`}
                    >
                        {uploading ? 'Uploading...' : 'Upload Payment'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadImageModal;
