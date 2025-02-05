import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { endOfMonth, format } from 'date-fns';
import { motion } from 'framer-motion';
import { TbExclamationMark } from 'react-icons/tb';
import { FaArrowLeftLong, FaLocationDot } from 'react-icons/fa6';
import ErrorModal from '../components/ErrorModal';
import TermsAndCondition from '../components/TermAndCondition';
import { Provider } from '../../../api/apiMembershipV2';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import ProviderSelector from '../components/ProviderSelector';

function PaymentMember() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [providers, setProviders] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [filteredProviders, setFilteredProviders] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isTermsVisible, setIsTermsVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const closeModal = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const fetchProvider = async () => {
            if (!selectedType) return;

            try {
                const response = await Provider.getAllByType(
                    selectedType.value,
                    location.state.locationCode
                );
                setProviders(response);
            } catch (error) {
                console.error('Error fetching providers:', error);
                setProviders([]);
            }
        };

        fetchProvider();
    }, [selectedType, location.state.locationCode]);

    useEffect(() => {
        if (selectedType && Array.isArray(providers)) {
            setFilteredProviders(
                providers.filter(
                    (provider) => provider.code_bank === selectedType.value
                )
            );
        } else {
            setFilteredProviders([]);
        }
    }, [selectedType, providers]);

    const handleProceed = () => {
        if (!isTermsAccepted) {
            setShowModal(true);
            return;
        }

        if (selectedProvider) {
            setIsModalVisible(true);
        } else {
            setShowModal(true);
        }
    };

    const handleProceedCancel = () => navigate('/dashboard');

    const getMonthlyPeriod = () => {
        const start = location.state.startDate
            ? new Date(location.state.startDate)
            : new Date();
        const end = location.state.endDate
            ? new Date(location.state.endDate)
            : endOfMonth(start);

        return {
            start: format(start, 'dd MMM yyyy'),
            end: format(end, 'dd MMM yyyy'),
        };
    };

    const verifikasi = () => {
        setIsModalVisible(false);
        navigate('/verifikasi', {
            state: {
                type: location.state.type,
                providerId: selectedProvider.id,
                code_bank: selectedProvider.code_bank,
                productId: location.state.productId,
                plateNumber: location.state.plateNumber,
            },
        });
    };

    const currentPeriod = getMonthlyPeriod();

    useEffect(() => {
        // Reset semua field di bawah lokasi
        if (selectedType) {
            setSelectedProvider('');
        }
    }, [selectedType]);

    return (
        <div>
            <ErrorModal
                showModal={showModal}
                handleClose={() => setShowModal(false)}
                message={
                    !isTermsAccepted
                        ? 'Anda harus menyetujui syarat dan ketentuan.'
                        : 'Pilih metode pembayaran terlebih dahulu.'
                }
            />
            {isModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
            )}
            {isTermsVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
            )}

            <div className="flex w-full space-x-4 items-center py-4 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-md">
                <FaArrowLeftLong
                    className="pl-3 w-10 cursor-pointer"
                    onClick={() => navigate(-1)}
                />
                <h1 className="text-lg font-semibold px-3">Detail Transaksi</h1>
            </div>

            <div className="px-3">
                <div className="flex flex-col items-start justify-start mt-2 w-full border border-gray-400 rounded-lg max-h-[30vh] p-3">
                    <div className="px-3 flex flex-col justify-start items-start w-full">
                        <div className="flex flex-col justify-start items-start border-dashed border-b border-gray-400 w-full">
                            <p className="text-lg font-semibold">
                                Informasi Member
                            </p>
                            <p className="text-gray-400">
                                {location.state
                                    ? location.state.plateNumber
                                    : '-'}
                            </p>
                            <p className="text-gray-400">
                                {location.state.vehicleType}
                            </p>
                            <div className="flex flex-row justify-start items-center space-x-3 my-2">
                                <FaLocationDot
                                    size={20}
                                    className="text-blue-600"
                                />
                                <p className="text-gray-400 text-sm font-medium">
                                    {location.state
                                        ? location.state.location
                                        : '-'}
                                </p>
                            </div>
                        </div>
                        <p className="text-lg pt-2 font-semibold">Periode</p>
                        <p className="font-semibold text-gray-400">
                            {currentPeriod.start} - {currentPeriod.end}
                        </p>
                    </div>
                </div>

                <p className="flex items-start text-md font-medium mb-3 mt-3">
                    Pilih metode pembayaran
                </p>

                <PaymentMethodSelector
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                />

                {selectedType && (
                    <ProviderSelector
                        selectedProvider={selectedProvider}
                        setSelectedProvider={setSelectedProvider}
                        filteredProviders={providers}
                    />
                )}

                <div className="mt-5 flex items-center space-x-3">
                    <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={isTermsAccepted}
                        onChange={() => setIsTermsAccepted(!isTermsAccepted)}
                    />
                    <span
                        className="text-gray-700 text-sm cursor-pointer"
                        onClick={() => setIsTermsVisible(true)}
                    >
                        Saya menyetujui syarat dan ketentuan.
                    </span>
                </div>

                <button
                    className={`flex items-center justify-center w-full py-3 rounded-lg shadow-md cursor-pointer mt-10 ${
                        isTermsAccepted
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-400'
                    }`}
                    onClick={handleProceed}
                >
                    <span>Lanjutkan</span>
                </button>

                <button
                    className="flex items-center justify-center w-full bg-red-500 text-white py-3 rounded-lg shadow-md cursor-pointer mt-2"
                    onClick={handleProceedCancel}
                >
                    <span>Batal</span>
                </button>
            </div>

            {isModalVisible && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed bottom-0 left-0 w-full bg-white p-5 shadow-2xl rounded-t-3xl border border-slate-400 z-20"
                >
                    <h2 className="text-base max-h-[90vh] text-slate-400 font-medium mb-1 mt-20">
                        Total pembayaran
                    </h2>
                    <h1 className="text-4xl font-medium">
                        <span className="font-semibold">IDR</span>{' '}
                        {(location.state.tariff + 5000).toLocaleString('id-ID')}
                    </h1>

                    <div className="flex justify-between items-center mt-5 border-b border-gray-300 pb-2 pt-3">
                        <div className="text-base text-gray-400">
                            Metode pembayaran
                        </div>
                        <p className="font-semibold">
                            {selectedProvider.code_bank === 'NATIONALNOBU'
                                ? 'Nobu'
                                : selectedProvider.code_bank}{' '}
                            {selectedType.value === 'VIRTUAL_ACCOUNT'
                                ? 'VA'
                                : ''}
                        </p>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-300 pb-2 pt-3">
                        <div className="text-base text-gray-400">
                            Biaya admin
                        </div>
                        <p className="font-semibold">
                            <span className="font-semibold">IDR</span>{' '}
                            {parseInt('5000').toLocaleString('id-ID')}
                        </p>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-300 pb-2 pt-3">
                        <div className="text-base text-gray-400">Tanggal</div>
                        <p className="font-semibold">
                            {format(new Date(), 'dd MMMM yyyy')}
                        </p>
                    </div>

                    <div className="flex flex-col justify-center items-center space-y-1">
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-5 w-full"
                            onClick={verifikasi}
                        >
                            Lanjutkan
                        </button>
                        <button
                            className="bg-red-500 text-white py-2 px-4 rounded-lg mt-5 w-full"
                            onClick={closeModal}
                        >
                            Batal
                        </button>
                    </div>
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                        <div className="relative w-36 h-36 bg-blue-600 opacity-40 rounded-full"></div>
                        <div className="absolute inset-0 w-24 h-24 bg-blue-600 opacity-100 rounded-full m-auto">
                            <TbExclamationMark
                                size={50}
                                className="m-auto mt-5 text-amber-500"
                            />
                        </div>
                    </div>
                </motion.div>
            )}

            {isTermsVisible && (
                <TermsAndCondition
                    isVisible={isTermsVisible}
                    onClose={() => setIsTermsVisible(false)}
                />
            )}
        </div>
    );
}

export default PaymentMember;
