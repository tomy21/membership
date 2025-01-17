import React, { useEffect, useState } from 'react';
import { MdOutlineRefresh } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { apiUsers } from '../../../api/apiUsers';
import Modal from 'react-modal';
import Loading from '../components/Loading';
import { BsPatchCheck } from 'react-icons/bs';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { TiWarning } from 'react-icons/ti';

Modal.setAppElement('#root');

export default function Register() {
    const [captcha, setCaptcha] = useState('');
    const [inputCaptcha, setInputCaptcha] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        address: '',
        password: '',
        passwordConfirm: '',
        email: '',
        phone_number: '+62',
        pin: '',
        gender: '',
        dob: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState('');

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        // Terapkan sanitasi hanya pada properti tertentu
        if (
            [
                'username',
                'email',
                'password',
                'passwordConfirm',
                'phone_number',
            ].includes(name)
        ) {
            sanitizedValue = value.replace(/\s+/g, ''); // Hilangkan spasi
        }

        if (name === 'phone_number') {
            let sanitizedValue = value.startsWith('+62')
                ? value
                : '+62' + value;

            sanitizedValue = sanitizedValue.replace(/^\+62(.*)/, (_, rest) => {
                return '+62' + rest.replace(/[^0-9]/g, '');
            });
            if (!sanitizedValue.startsWith('+62')) {
                sanitizedValue = '+62';
            }

            setFormData((prevData) => ({
                ...prevData,
                [name]: sanitizedValue,
            }));

            setFormErrors((prevErrors) => ({
                ...prevErrors,
                phone_number: !/^\+628[0-9]{8,13}$/.test(sanitizedValue)
                    ? 'Nomor telepon tidak valid (harus antara 8-13 digit setelah +62)'
                    : '',
            }));
        } else if (name === 'pin') {
            const formattedPin = sanitizedValue.replace(/[^0-9]/g, '');
            if (formattedPin.length <= 6) {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: formattedPin,
                }));
            }
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                pin:
                    formattedPin.length !== 6
                        ? 'PIN harus terdiri dari 6 angka'
                        : '',
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: sanitizedValue,
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    // Validate form fields
    const validateForm = () => {
        let errors = {};
        if (!formData.fullname) errors.fullname = 'Nama Lengkap harus diisi';
        if (!formData.username) errors.username = 'Username harus diisi';
        if (!formData.address) errors.address = 'Alamat harus diisi';
        if (!formData.email) errors.email = 'Email harus diisi';
        if (!formData.dob) errors.dob = 'Tanggal lahir harus diisi';
        if (!formData.gender) errors.gender = 'Jenis kelamin harus diisi';
        if (!formData.password) errors.password = 'Password harus diisi';
        if (formData.password !== formData.passwordConfirm)
            errors.passwordConfirm = 'Passwords tidak cocok';
        if (!formData.phone_number)
            errors.phone_number = 'Nomor telpone harus diisi';
        if (!formData.pin) errors.pin = 'PIN harus diisi';
        if (inputCaptcha !== captcha) errors.captcha = 'Captcha tidak cocok';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateField = (field, value) => {
        let error = '';

        switch (field) {
            case 'fullname':
                if (!value) error = 'Nama Lengkap harus diisi';
                else if (value.length > 50)
                    error = 'Nama Lengkap tidak boleh lebih dari 50 karakter';
                else if (value.length < 3)
                    error = 'Nama Lengkap tidak boleh kurang dari 3 karakter';
                break;
            case 'username':
                if (!value) error = 'Username harus diisi';
                else if (value.length > 50)
                    error = 'Username tidak boleh lebih dari 50 karakter';
                else if (value.length < 5)
                    error = 'Username tidak boleh kurang dari 5 karakter';
                break;
            case 'address':
                if (!value) error = 'Alamat harus diisi';
                else if (value.length < 10)
                    error = 'Alamat tidak boleh kurang dari 10 karakter';
                break;
            case 'email':
                if (!value) error = 'Email harus diisi';
                else if (value.length > 50)
                    error = 'Email tidak boleh lebih dari 50 karakter';
                else if (value.length < 5)
                    error = 'Email tidak boleh kurang dari 5 karakter';
                else if (!/\S+@\S+\.\S+/.test(value))
                    error = 'Format email tidak valid';
                break;
            case 'dob':
                if (!value) error = 'Tanggal lahir harus diisi';
                break;
            case 'gender':
                if (!value) error = 'Jenis kelamin harus diisi';
                break;
            case 'password':
                if (!value) error = 'Password harus diisi';
                else if (value.length > 50)
                    error = 'Password tidak boleh lebih dari 50 karakter';
                else if (value.length < 3)
                    error = 'Password tidak boleh kurang dari 5 karakter';
                break;
            case 'passwordConfirm':
                if (value !== formData.password)
                    error = 'Passwords tidak cocok';
                break;
            case 'phone_number':
                if (!value) error = 'Nomor telepon harus diisi';
                break;
            case 'pin':
                if (!value) error = 'PIN harus diisi';
                break;
            case 'captcha':
                if (value !== captcha) error = 'Captcha tidak cocok';
                break;
            default:
                break;
        }

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentUrl = window.location.href;
        const siteUrl = new URL(currentUrl).origin;

        if (validateForm()) {
            setLoading(true);
            try {
                const formDataWithUrl = {
                    ...formData,
                    referralUrl: siteUrl,
                };
                const response = await apiUsers.register(formDataWithUrl);

                if (response.status === 'success') {
                    setLoading(false);
                    setIsModalOpen(true);
                    setMessage(
                        'Akun anda berhasil dibuat, silahkan cek email untuk aktivasi'
                    );
                } else {
                    setIsError(true);
                    setIsModalOpen(true);
                    setLoading(false);
                    setMessage(response.message);
                    refreshCaptcha();
                }
            } catch (error) {
                setLoading(false);
                setIsError(true);
                console.error(error.message);
                setIsError(false);
                refreshCaptcha();
            }
        }
    };

    // Refresh captcha
    const refreshCaptcha = () => {
        // Membuat karakter acak
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

    // Check password strength
    const checkPasswordStrength = (password) => {
        let strength = 'zero';
        if (password.length > 8) strength = 'Medium';
        if (
            password.length > 12 &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password)
        )
            strength = 'Strong';
        setPasswordStrength(strength);
    };

    // Close modal
    const closeModal = () => {
        if (isError) {
            setIsError(false);
            setIsModalOpen(false);
        } else {
            setIsModalOpen(false);
            setFormErrors({});
            setFormData({
                fullname: '',
                username: '',
                address: '',
                password: '',
                passwordConfirm: '',
                email: '',
                phone_number: '',
                pin: '',
                gender: '',
                dob: '',
            });
            navigate('/');
        }
    };

    // Effect hooks
    useEffect(() => {
        refreshCaptcha();
    }, []);

    useEffect(() => {
        checkPasswordStrength(formData.password);
    }, [formData.password]);

    // Get password progress bar color
    const getProgressBarColor = () => {
        switch (passwordStrength) {
            case 'zero':
                return 'bg-gray-500';
            case 'Strong':
                return 'bg-green-500';
            case 'Medium':
                return 'bg-yellow-500';
            case 'Weak':
            default:
                return 'bg-red-500';
        }
    };

    // Get password progress bar width
    const getProgressBarWidth = () => {
        switch (passwordStrength) {
            case 'zero':
                return 'w-0';
            case 'Strong':
                return 'w-full';
            case 'Medium':
                return 'w-2/3';
            case 'Weak':
            default:
                return 'w-1/3';
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-between p-3 md:p-20">
                <div className="container w-full md:w-[80%] h-full">
                    <div className="flex flex-col items-center space-y-2">
                        <img
                            src="/assets/logo.png"
                            className="w-16 h-16"
                            alt="Logo"
                        />
                        <h1 className="text-lg font-semibold">
                            SKY Membership
                        </h1>
                    </div>
                    <div className="w-full h-full p-5 text-start">
                        <h1 className="text-base font-semibold">Daftar akun</h1>
                        <p className="text-sm text-slate-400">
                            Silahkan lengkapi form pendaftaran
                        </p>

                        <div className="my-3 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500"></div>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center justify-end space-y-3"
                        >
                            <div className="w-full">
                                <label
                                    htmlFor="fullname"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    id="fullname"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    placeholder="Masukkan nama lengkap"
                                />
                                {formErrors.fullname && (
                                    <p className="text-red-500 text-xs">
                                        {formErrors.fullname}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Masukkan username"
                                />
                                {formErrors.username && (
                                    <p className="text-red-500 text-xs">
                                        {formErrors.username}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Masukkan email"
                                />
                                {formErrors.email && (
                                    <p className="text-red-500 text-xs">
                                        {formErrors.email}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Masukkan password"
                                    />

                                    <button
                                        type="button"
                                        className="absolute right-5 top-3 text-gray-500"
                                        onClick={togglePassword}
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>
                                </div>
                                {formErrors.password && (
                                    <p className="text-red-500 text-xs">
                                        {formErrors.password}
                                    </p>
                                )}
                                <div className="relative mt-2 h-2 w-full bg-gray-300 rounded-full">
                                    <div
                                        className={`${getProgressBarColor()} ${getProgressBarWidth()} h-full rounded-full`}
                                    ></div>
                                </div>
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="passwordConfirm"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    Konfirmasi Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        id="passwordConfirm"
                                        name="passwordConfirm"
                                        value={formData.passwordConfirm}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Konfirmasi password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-5 top-3 text-gray-500"
                                        onClick={togglePassword}
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>
                                </div>
                                {formErrors.passwordConfirm && (
                                    <p className="text-red-500 text-xs">
                                        {formErrors.passwordConfirm}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    Alamat
                                </label>
                                <textarea
                                    name="address"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Masukkan alamat"
                                    cols="30"
                                    rows={5}
                                />
                                {formErrors.address && (
                                    <p className="text-red-500 text-xs">
                                        {formErrors.address}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="phone_number"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    Nomor Telepon
                                </label>
                                <input
                                    type="text"
                                    id="phone_number"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Masukkan nomor telepon"
                                />
                                {formErrors.phone_number && (
                                    <p className="text-red-500 text-xs">
                                        {formErrors.phone_number}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Gender
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            onChange={handleChange}
                                            className="mr-2"
                                            onBlur={handleBlur}
                                        />
                                        Male
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            onChange={handleChange}
                                            className="mr-2"
                                            onBlur={handleBlur}
                                        />
                                        Female
                                    </label>
                                </div>
                                {formErrors.gender && (
                                    <p className="text-red-500 text-xs">
                                        {formErrors.gender}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="dob"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    Tanggal Lahir
                                </label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={formData.dob || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {formErrors.dob && (
                                    <p className="text-red-500 text-xs">
                                        {formErrors.dob}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="pin"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    PIN
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        id="pin"
                                        name="pin"
                                        value={formData.pin}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Masukkan PIN (6 digit)"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-5 top-3 text-gray-500"
                                        onClick={togglePassword}
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>
                                </div>
                                {formErrors.pin && (
                                    <p className="text-red-500 text-xs">
                                        {formErrors.pin}
                                    </p>
                                )}
                            </div>

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
                                        onClick={refreshCaptcha}
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
                                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Masukkan captcha"
                                />
                                {formErrors.captcha && (
                                    <p className="text-red-500 text-xs">
                                        {formErrors.captcha}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Daftar
                            </button>
                            <button
                                type="button"
                                onClick={handleBack}
                                className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Kembali
                            </button>
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
                                        ? 'bg-red-100 text-red-600'
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

                        <button
                            className="bg-blue-500 hover:bg-blue-700 mt-7 text-white font-bold py-2 px-4 rounded"
                            onClick={closeModal}
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
