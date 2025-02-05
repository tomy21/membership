import React, { useEffect, useRef, useState } from 'react';
import { verifikasiUsers } from '../../../api/apiUsers';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    apiBarindCekstatus,
    apiBayarindExtend,
    apiBayarindTopUp,
    apiBayarindVa,
    pointPayment,
} from '../../../api/apiBayarind';
import Loading from '../components/Loading';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';

function PinInput() {
    const [pin, setPin] = useState(Array(6).fill(''));
    const [idUser, setIdUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorShowModal, setErrorShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const inputRefs = useRef([]);
    const location = useLocation();

    const verifyPin = async (enteredPin) => {
        setLoading(true);
        try {
            const response = await verifikasiUsers.verifikasiPin({
                memberUserId: idUser,
                pinVerifikasi: enteredPin,
            });

            if (location.state.code_bank !== 'SKYPOINTS') {
                if (response.statusCode === 200) {
                    if (location.state.type === 'Member') {
                        const dataFormTopUp = {
                            bank_id: location.state.providerId,
                            plate_number: location.state.plateNumber,
                        };
                        const idProduct = location.state.productId;

                        const responseBayarind = await apiBayarindVa.createVa(
                            idProduct,
                            dataFormTopUp
                        );

                        if (responseBayarind.status === 200) {
                            const data = {
                                bankProvider: location.state,
                                response: responseBayarind.data,
                            };

                            navigate('/payment_process', { state: data });
                        } else {
                            setErrorMessage(responseBayarind.data.message);
                            setPin(Array(6).fill(''));
                            setErrorShowModal(true);
                        }
                    } else if (location.state.type === 'Extend') {
                        const responseBayarind = await apiBayarindExtend.extend(
                            location.state.productId,
                            location.state.plateNumber,
                            location.state.providerId
                        );

                        if (responseBayarind.status === 200) {
                            const data = {
                                bankProvider: location.state,
                                response: responseBayarind.data,
                            };
                            navigate('/payment_process', { state: data });
                        } else {
                            setErrorMessage(responseBayarind.data.message);
                            setPin(Array(6).fill(''));
                            setErrorShowModal(true);
                        }
                    } else if (location.state.type === 'topup') {
                        const dataFormTopUp = {
                            bank_id: location.state.bank_id,
                            amount: location.state.amount,
                        };
                        const responseBayarind =
                            await apiBayarindTopUp.createVaTopup(dataFormTopUp);

                        if (responseBayarind.status === true) {
                            const data = {
                                bankProvider: location.state,
                                response: responseBayarind,
                            };

                            navigate('/payment_process', { state: data });
                        } else if (
                            responseBayarind.data.responseCode === '400'
                        ) {
                            setErrorMessage(
                                responseBayarind.data.responseMessage
                            );
                            setPin(Array(6).fill(''));
                            setErrorShowModal(true);
                        }
                    }
                } else {
                    setErrorMessage(response.message);
                    setErrorShowModal(true);
                }
            } else {
                if (response.statusCode === 200) {
                    if (location.state.type === 'Member') {
                        const dataFormTopUp = {
                            bank_id: location.state.providerId,
                            plate_number: location.state.plateNumber,
                        };
                        const idProduct = location.state.productId;

                        const responseBayarind =
                            await pointPayment.pointPayment(
                                idProduct,
                                dataFormTopUp
                            );
                        if (responseBayarind.data.status === true) {
                            setShowModal(true);
                            setErrorMessage(responseBayarind.data.message);
                        } else {
                            setErrorMessage(responseBayarind.data.message);
                            setPin(Array(6).fill(''));
                            setErrorShowModal(true);
                        }
                    } else {
                        const responseBayarind =
                            await pointPayment.extendsPoint(
                                location.state.productId,
                                location.state.plateNumber,
                                location.state.providerId
                            );

                        if (responseBayarind.data.status === true) {
                            setShowModal(true);
                            setErrorMessage(responseBayarind.data.message);
                        } else {
                            setErrorMessage(responseBayarind.data.message);
                            setPin(Array(6).fill(''));
                            setErrorShowModal(true);
                        }
                    }
                } else {
                    setErrorMessage(response.message);
                    setErrorShowModal(true);
                }
            }
        } catch (err) {
            console.error('Terjadi kesalahan, silahkan coba lagi');
        } finally {
            setLoading(false);
        }
    };

    const handleInput = (e, index) => {
        const value = e.target.value;

        // Filter untuk memastikan hanya angka yang bisa diinput
        if (/^\d$/.test(value)) {
            if (value.length === 1 && index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);

            // Check if PIN is complete
            if (index === inputRefs.current.length - 1 && value.length === 1) {
                verifyPin(newPin.join(''));
            }
        }
    };

    const handleKeypadClick = (value) => {
        const newPin = [...pin];
        const firstEmptyIndex = newPin.findIndex((p) => p === '');
        if (firstEmptyIndex !== -1) {
            newPin[firstEmptyIndex] = value;
            setPin(newPin);
            inputRefs.current[firstEmptyIndex].focus();

            // Check if PIN is complete
            if (firstEmptyIndex === inputRefs.current.length - 1) {
                verifyPin(newPin.join(''));
            }
        }
    };

    const handleBackspace = () => {
        const newPin = [...pin];
        const lastFilledIndex = newPin
            .slice()
            .reverse()
            .findIndex((p) => p !== '');
        if (lastFilledIndex !== -1) {
            const index = 5 - lastFilledIndex;
            newPin[index] = '';
            setPin(newPin);
            inputRefs.current[index].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleCloseModal = () => {
        setErrorShowModal(false);
    };

    const handleCloseModalSuccess = () => {
        setShowModal(false);
        navigate('/dashboard');
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full">
                <ErrorModal
                    showModal={errorShowModal}
                    handleClose={handleCloseModal}
                    message={errorMessage}
                />
                <SuccessModal
                    showModal={showModal}
                    handleSuccessClose={handleCloseModalSuccess}
                    message={errorMessage}
                />
                <div className="text-center text-lg font-semibold mt-5">
                    Masukkan 6 digit PIN Kamu
                </div>
                <div className="flex justify-center space-x-5 mt-6">
                    {Array(6)
                        .fill(0)
                        .map((_, index) => (
                            <input
                                key={index}
                                type="password" // Menggunakan type tel untuk fokus pada input numerik
                                maxLength="1"
                                className="w-5 h-5 border border-gray-300 rounded-full text-center text-xl"
                                autoFocus={index === 0}
                                onChange={(e) => handleInput(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                value={pin[index]}
                                inputMode="none" // Tidak memunculkan keypad mobile bawaan
                                autoComplete="off" // Nonaktifkan autoComplete
                                readOnly // Mencegah input langsung
                                style={{ caretColor: 'transparent' }} // Menyembunyikan kursor
                            />
                        ))}
                </div>
                {/* <button className="mb-6 text-blue-600">Lupa PIN?</button> */}
                <div className="grid grid-cols-3 gap-10 mt-16">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleKeypadClick(num.toString())}
                            className="w-[4rem] h-[4rem] border border-gray-300 rounded-full bg-white shadow-md text-xl flex items-center justify-center"
                        >
                            {num}
                        </button>
                    ))}
                    <div className="w-[4rem] h-[4rem]"></div>
                    <button
                        onClick={() => handleKeypadClick('0')}
                        className="w-[4rem] h-[4rem] border border-gray-300 rounded-full bg-white shadow-md text-xl flex items-center justify-center"
                    >
                        0
                    </button>
                    <button
                        onClick={handleBackspace}
                        className="w-[4rem] h-[4rem] border border-gray-300 rounded-full bg-white shadow-md text-xl flex items-center justify-center"
                    >
                        ⌫
                    </button>
                </div>
            </div>
        </>
    );

}

export default PinInput;
