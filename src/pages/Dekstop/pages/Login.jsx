import React, { useEffect, useState } from 'react';
import { MdOutlineRefresh } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { userCMS, Users } from '../../../api/apiMembershipV2';
import { TiWarning } from 'react-icons/ti';
import { BsPatchCheck } from 'react-icons/bs';

function Login() {
    const [captcha, setCaptcha] = useState('');
    const [inputCaptcha, setInputCaptcha] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [requestEmail, setRequestEmail] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false,
    });

    const [formErrors, setFormErrors] = useState({});

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsError(false);
        setMessage('');
    };

    const refreshString = () => {
        const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';

        // Gabungkan semua karakter yang ingin dimasukkan dalam captcha
        const allCharacters = upperCaseLetters + lowerCaseLetters + numbers;

        // Membuat captcha dengan memastikan ada huruf besar, huruf kecil, dan angka
        const randomCaptcha = () => {
            const captchaLength = 6; // panjang CAPTCHA yang diinginkan
            let captcha = '';

            // Memastikan ada karakter dari setiap jenis
            captcha +=
                upperCaseLetters[
                    Math.floor(Math.random() * upperCaseLetters.length)
                ];
            captcha +=
                lowerCaseLetters[
                    Math.floor(Math.random() * lowerCaseLetters.length)
                ];
            captcha += numbers[Math.floor(Math.random() * numbers.length)];

            // Menambahkan karakter acak sisanya
            for (let i = 3; i < captchaLength; i++) {
                captcha +=
                    allCharacters[
                        Math.floor(Math.random() * allCharacters.length)
                    ];
            }

            // Acak urutan captcha
            captcha = captcha
                .split('')
                .sort(() => 0.5 - Math.random())
                .join('');

            return captcha;
        };

        const newCaptcha = randomCaptcha();
        setCaptcha(newCaptcha);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.username) errors.username = 'Username is required';
        if (!formData.password) errors.password = 'Password is required';
        if (inputCaptcha !== captcha) errors.captcha = 'Captcha does not match';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        refreshString();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await userCMS.login(
                formData.username,
                formData.password
            );
            localStorage.setItem('userToken', response.token);
            localStorage.setItem('userData', JSON.stringify(response.user));

            if (response.status === 'success') {
                setFormErrors({});
                setFormData({
                    username: '',
                    password: '',
                    rememberMe: false,
                });

                setTimeout(() => {
                    navigate('/dashboard');
                }, 500);
                refreshString();
            } else {
                if (response.request === true) {
                    setRequestEmail(true);
                }
                setIsError(true);
                setIsModalOpen(true);
                setLoading(false);
                setMessage(response.message);
                refreshString();
            }

            setLoading(false);
        } catch (error) {
            // toast.error(error.message);
            setLoading(false);
        }
    };

    const handleRequest = async () => {
        const currentUrl = window.location.href;
        const siteUrl = new URL(currentUrl).origin;
        setLoading(true);
        try {
            const response = await Users.requestTokenAktivasion(
                formData.username,
                siteUrl
            );
            // setIsModalOpen(false);
            if (response.status === 'success') {
                closeModal();
                setLoading(false);
                setIsModalOpen(true);
                setRequestEmail(false);
                setMessage(
                    'Email aktifasi sudah dikirim, silahkan cek email untuk aktifasi'
                );
                refreshString();
            } else {
                setLoading(false);
                setIsError(true);
                setIsModalOpen(true);
                setMessage(response.message);
                refreshString();
            }
        } catch (error) {
            setIsError(true);
            setIsModalOpen(true);
            setLoading(false);
            setMessage(error.message);
            refreshString();
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen max-h-screen m-auto bg-slate-300 w-full p-10">
                <div className="container flex flex-row items-center justify-center gap-3 h-full w-full bg-white p-3 rounded-md shadow-md border border-slate-200">
                    <img
                        src={'/assets/skyparking_image.jpg'}
                        className="w-3/4 rounded-sm shadow-md"
                        alt=""
                    />
                    <div className="flex flex-col w-full px-7">
                        <div className="flex flex-col items-center justify-center w-full h-full border-b border-gray-400 pt-2 pb-3 space-y-3 mb-5">
                            <div className="flex flex-col space-x-3 justify-center items-center border-l border-t border-r border-slate-300 p-7 rounded-full">
                                <img
                                    src={'/logo.png'}
                                    className="w-16"
                                    alt=""
                                />
                            </div>
                            <h1 className="text-xl font-semibold">
                                Membership
                            </h1>
                            <p className="text-base text-gray-400 ">
                                Silahkan masuk ke akun anda
                            </p>
                        </div>
                        <form
                            onSubmit={handleLogin}
                            className="flex flex-col items-center justify-center space-y-3 text-sm"
                        >
                            <input
                                type="text"
                                className="w-full p-3 border border-slate-300 bg-slate-100 rounded-lg"
                                placeholder="Email atau username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                autoComplete="username"
                            />
                            {formErrors.username && (
                                <p className="text-red-500 text-xs">
                                    {formErrors.username}
                                </p>
                            )}
                            <div className="relative w-full">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full p-3 border border-slate-300 bg-slate-100 rounded-lg"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-5 top-4 text-gray-500"
                                    onClick={togglePassword}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {formErrors.password && (
                                <p className="text-red-500 text-xs">
                                    {formErrors.password}
                                </p>
                            )}

                            <div className="w-full">
                                <div className="flex items-center space-x-2">
                                    <span
                                        className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white font-bold rounded-md shadow-lg w-[70%] h-12 text-lg tracking-wide"
                                        style={{
                                            letterSpacing: '0.2em', // Tambahkan jarak antar karakter
                                            textShadow:
                                                '2px 2px 4px rgba(0, 0, 0, 0.5)', // Efek bayangan
                                            transform: 'rotate(-1deg)', // Miringkan sedikit teks secara global
                                        }}
                                    >
                                        {captcha.split('').map((char, idx) => (
                                            <span
                                                key={idx}
                                                style={{
                                                    transform: `rotate(${
                                                        Math.random() * 20 - 10
                                                    }deg)`, // Random rotasi per karakter
                                                    margin: '0 2px', // Tambahkan margin antar angka
                                                    color:
                                                        idx % 2 === 0
                                                            ? 'gold'
                                                            : 'white', // Variasi warna
                                                    fontSize: `${
                                                        Math.random() * 0.4 +
                                                        1.2
                                                    }rem`, // Variasi ukuran font
                                                }}
                                            >
                                                {char}
                                            </span>
                                        ))}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={refreshString}
                                        className="flex items-center px-3 py-2 text-blue-500 border border-amber-500 rounded-md shadow-md hover:bg-amber-500 hover:text-white transition-all duration-300"
                                    >
                                        <MdOutlineRefresh
                                            size={20}
                                            className="mr-1"
                                        />
                                    </button>
                                </div>

                                <input
                                    type="text"
                                    id="captcha"
                                    name="captcha"
                                    value={inputCaptcha}
                                    onChange={(e) =>
                                        setInputCaptcha(e.target.value)
                                    }
                                    className="w-full p-3 mt-4 border border-slate-300 bg-slate-100 rounded-lg"
                                    placeholder="Masukkan captcha"
                                />
                                {formErrors.captcha && (
                                    <p className="text-red-500 text-xs">
                                        {formErrors.captcha}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-row space-x-2 justify-center items-center">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        id="rememberMe"
                                        value={formData.rememberMe}
                                        onChange={handleChange}
                                    />
                                    <p className="text-xs">Ingat saya</p>
                                </div>
                                <Link
                                    to={'/lupapassword'}
                                    className="text-cyan-600 font-semibold text-xs"
                                >
                                    Lupa password ?
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="bg-cyan-600 text-white w-full h-10 rounded-md"
                            >
                                Masuk
                            </button>
                            <p className="flex text-center items-center justify-center text-xs">
                                Belum punya akun ?
                                <span className="text-cyan-600 font-semibold ml-1">
                                    <Link to={'/register'}>Daftar akun</Link>
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed bg-black bg-opacity-50 w-full inset-0 z-50 flex items-center justify-center p-5">
                    {/* Modal Container */}
                    <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto animate-fade-in flex flex-col justify-center items-center">
                        {/* Header */}
                        <div className="flex justify-center">
                            <div
                                className={`p-3 rounded-full ${
                                    isError
                                        ? 'bg-yellow-100 text-yellow-600'
                                        : 'bg-green-100 text-green-600'
                                }`}
                            >
                                {isError ? (
                                    <TiWarning size={30} />
                                ) : (
                                    <BsPatchCheck size={30} />
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {isError ? 'Warning' : 'Success'}
                            </h2>
                        </div>

                        {/* Body */}
                        <div className="mt-4 text-sm text-gray-600">
                            {message}
                        </div>

                        <div className="flex flex-row justify-end items-center gap-x-3">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 mt-7 text-white font-normal py-2 px-4 rounded"
                                onClick={closeModal}
                            >
                                Tutup
                            </button>

                            {requestEmail && (
                                <button
                                    className="bg-emerald-500 hover:bg-emerald-700 mt-7 text-white font-normal py-2 px-4 rounded"
                                    onClick={handleRequest}
                                >
                                    Request email aktifasi
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;
