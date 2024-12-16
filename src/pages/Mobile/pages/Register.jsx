import React, { useEffect, useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUsers } from "../../../api/apiUsers";
import Modal from "react-modal";
import Loading from "../components/Loading";

Modal.setAppElement("#root");

export default function Register() {
  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    address: "",
    password: "",
    passwordConfirm: "",
    email: "",
    phone_number: "+62",
    pin: "",
    gender: "",
    dob: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    // Terapkan sanitasi hanya pada properti tertentu
    if (
      [
        "username",
        "email",
        "password",
        "passwordConfirm",
        "phone_number",
      ].includes(name)
    ) {
      sanitizedValue = value.replace(/\s+/g, ""); // Hilangkan spasi
    }

    if (name === "phone_number") {
      // Pastikan +62 tetap di awal
      let sanitizedValue = value.startsWith("+62") ? value : "+62" + value;

      // Hapus spasi atau karakter tidak valid
      sanitizedValue = sanitizedValue.replace(/[^0-9+]/g, "");

      // Mencegah penghapusan +62
      if (!sanitizedValue.startsWith("+62")) {
        sanitizedValue = "+62";
      }

      // Perbarui nilai input dan validasi
      setFormData((prevData) => ({
        ...prevData,
        [name]: sanitizedValue,
      }));

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        phone_number: !/^\+628[0-9]{8,13}$/.test(sanitizedValue)
          ? "Nomor telepon tidak valid (harus antara 8-13 digit setelah +62)"
          : "",
      }));
    } else if (name === "pin") {
      const formattedPin = sanitizedValue.replace(/[^0-9]/g, ""); // Hanya angka
      if (formattedPin.length <= 6) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: formattedPin,
        }));
      }
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        pin: formattedPin.length !== 6 ? "PIN harus terdiri dari 6 angka" : "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: sanitizedValue,
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    let errors = {};
    if (!formData.fullname) errors.fullname = "Nama Lengkap harus diisi";
    if (!formData.username) errors.username = "Username harus diisi";
    if (!formData.address) errors.address = "Alamat harus diisi";
    if (!formData.email) errors.email = "Email harus diisi";
    if (!formData.dob) errors.dob = "Tanggal lahir harus diisi";
    if (!formData.gender) errors.gender = "Jenis kelamin harus diisi";
    if (!formData.password) errors.password = "Password harus diisi";
    if (formData.password !== formData.passwordConfirm)
      errors.passwordConfirm = "Passwords tidak cocok";
    if (!formData.phone_number)
      errors.phone_number = "Nomor telpone harus diisi";
    if (!formData.pin) errors.pin = "PIN harus diisi";
    if (inputCaptcha !== captcha) errors.captcha = "Captcha tidak cocok";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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

        if (response.status === "success") {
          setLoading(false);
          setFormErrors({});
          setIsModalOpen(true);
          setLoading(false);
          setFormData({
            fullname: "",
            username: "",
            address: "",
            password: "",
            passwordConfirm: "",
            email: "",
            phone_number: "",
            pin: "",
            gender: "",
            dob: "",
          });
        } else {
          setLoading(false);
          toast.error(response.message);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
      }
    }
  };

  // Refresh captcha
  const refreshCaptcha = () => {
    const newCaptcha = Math.random().toString(36).slice(2, 8);
    setCaptcha(newCaptcha);
    setValid(false);
  };

  // Check password strength
  const checkPasswordStrength = (password) => {
    let strength = "Weak";
    if (password.length > 8) strength = "Medium";
    if (
      password.length > 12 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    )
      strength = "Strong";
    setPasswordStrength(strength);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Effect hooks
  useEffect(() => {
    refreshCaptcha();
  }, []);

  useEffect(() => {
    checkPasswordStrength(formData.password);
  }, [formData.password]);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        closeModal();
        navigate(-1);
        setLoading(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isModalOpen, navigate]);

  // Get password progress bar color
  const getProgressBarColor = () => {
    switch (passwordStrength) {
      case "Strong":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "Weak":
      default:
        return "bg-red-500";
    }
  };

  // Get password progress bar width
  const getProgressBarWidth = () => {
    switch (passwordStrength) {
      case "Strong":
        return "w-full";
      case "Medium":
        return "w-2/3";
      case "Weak":
      default:
        return "w-1/3";
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen flex-col items-center justify-between p-6 md:p-20">
        <div className="container w-full md:w-[80%] h-full">
          <div className="flex flex-col items-center space-y-2">
            <img src="/assets/logo.png" className="w-16 h-16" alt="Logo" />
            <h1 className="text-lg font-semibold">SKY Membership</h1>
          </div>
          <div className="w-full h-full p-5 text-start">
            <h1 className="text-base font-semibold">Daftar akun</h1>
            <p className="text-xs text-slate-400">
              Silahkan lengkapi form pendaftaran
            </p>

            <div className="my-3 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500"></div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-end space-y-3 text-xs"
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan nama lengkap"
                />
                {formErrors.fullname && (
                  <p className="text-red-500 text-xs">{formErrors.fullname}</p>
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan username"
                />
                {formErrors.username && (
                  <p className="text-red-500 text-xs">{formErrors.username}</p>
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan email"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs">{formErrors.email}</p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan password"
                />
                {formErrors.password && (
                  <p className="text-red-500 text-xs">{formErrors.password}</p>
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
                <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Konfirmasi password"
                />
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan alamat"
                  cols="30"
                  rows={5}
                />
                {formErrors.address && (
                  <p className="text-red-500 text-xs">{formErrors.address}</p>
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    />
                    Female
                  </label>
                </div>
                {formErrors.gender && (
                  <p className="text-red-500 text-xs">{formErrors.gender}</p>
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
                  value={formData.dob || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.dob && (
                  <p className="text-red-500 text-xs">{formErrors.dob}</p>
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="pin"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  PIN
                </label>
                <input
                  type="text"
                  id="pin"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan PIN (6 digit)"
                />
                {formErrors.pin && (
                  <p className="text-red-500 text-xs">{formErrors.pin}</p>
                )}
              </div>

              <div className="w-full">
                <div className="flex items-center space-x-2">
                  <span
                    className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white font-bold rounded-lg shadow-lg w-[70%] h-12 text-lg tracking-wide"
                    style={{
                      letterSpacing: "0.2em", // Tambahkan jarak antar karakter
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Efek bayangan
                      transform: "rotate(-1deg)", // Miringkan sedikit teks secara global
                    }}
                  >
                    {captcha.split("").map((char, idx) => (
                      <span
                        key={idx}
                        style={{
                          transform: `rotate(${Math.random() * 20 - 10}deg)`, // Random rotasi per karakter
                          margin: "0 2px", // Tambahkan margin antar angka
                          color: idx % 2 === 0 ? "gold" : "white", // Variasi warna
                          fontSize: `${Math.random() * 0.4 + 1.2}rem`, // Variasi ukuran font
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="flex items-center px-3 py-2 text-blue-500 border border-amber-500 rounded-lg shadow-md hover:bg-amber-500 hover:text-white transition-all duration-300"
                  >
                    <MdOutlineRefresh size={20} className="mr-1" />
                  </button>
                </div>

                <input
                  type="text"
                  id="captcha"
                  name="captcha"
                  value={inputCaptcha}
                  onChange={(e) => setInputCaptcha(e.target.value)}
                  className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan captcha"
                />
                {formErrors.captcha && (
                  <p className="text-red-500 text-xs">{formErrors.captcha}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Daftar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
