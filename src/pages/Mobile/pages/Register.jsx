import React, { useEffect, useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUsers } from "../../../api/apiUsers";
import Modal from "react-modal";
import { IoCheckmarkOutline } from "react-icons/io5";
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
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    phone: "",
    pin: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password !== formData.passwordConfirm)
      errors.passwordConfirm = "Passwords do not match";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.pin) errors.pin = "PIN is required";
    if (inputCaptcha !== captcha) errors.captcha = "Captcha does not match";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await apiUsers.register(formData);
        console.log("response", response);
        setFormErrors({});
        setIsModalOpen(true);
        setFormData({
          username: "",
          password: "",
          passwordConfirm: "",
          email: "",
          phone: "",
          pin: "",
        });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const refreshCaptcha = () => {
    const newCaptcha = Math.random().toString(36).slice(2, 8);
    setCaptcha(newCaptcha);
    setValid(false);
  };

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      }, 3000); // Modal akan tertutup setelah 3 detik dan navigasi ke login

      return () => clearTimeout(timer);
    }
  }, [isModalOpen, navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between p-6 md:p-20">
        <div className="container w-full md:w-[80%] h-full">
          <div className="flex flex-col items-center space-y-2">
            <img src={"/assets/logo.png"} className="w-16 h-16" alt="" />
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
              className="flex flex-col items-end justify-end space-y-3 text-xs"
            >
              <input
                type="text"
                className={`w-full py-2 px-3 border ${
                  formErrors.username ? "border-red-600" : "border-slate-300"
                } bg-slate-100 rounded-lg`}
                placeholder="Masukan username anda"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />

              <input
                type="email"
                className={`w-full py-2 px-3 border ${
                  formErrors.email ? "border-red-600" : "border-slate-300"
                } bg-slate-100 rounded-lg`}
                placeholder="Masukan email anda"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                className={`w-full py-2 px-3 border ${
                  formErrors.password ? "border-red-600" : "border-slate-300"
                } bg-slate-100 rounded-lg`}
                placeholder="Masukan password anda"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className={`text-xs ${
                  passwordStrength === "Strong"
                    ? "text-green-500"
                    : passwordStrength === "Medium"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                Password strength: {passwordStrength}
              </span>
              <input
                type="password"
                className={`w-full py-2 px-3 border ${
                  formErrors.passwordConfirm
                    ? "border-red-600"
                    : "border-slate-300"
                } bg-slate-100 rounded-lg`}
                placeholder="Validasi password anda"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
              <input
                type="text"
                className={`w-full py-2 px-3 border ${
                  formErrors.phone ? "border-red-600" : "border-slate-300"
                } bg-slate-100 rounded-lg`}
                placeholder="Masukan nomor telepon anda"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="password"
                className={`w-full py-2 px-3 border ${
                  formErrors.pin ? "border-red-600" : "border-slate-300"
                } bg-slate-100 rounded-lg`}
                placeholder="Masukan pin anda"
                name="pin"
                value={formData.pin}
                onChange={handleChange}
              />

              <div className="relative bg-black w-full select-none">
                <div
                  className={`${
                    valid ? "bg-green-500" : "bg-black text-white"
                  } font-semibold w-full h-[40px] px-1 rounded-md text-3xl tracking-[15px]`}
                >
                  {captcha}
                </div>
                <button
                  type="button"
                  className="absolute text-white top-2 right-5"
                  onClick={refreshCaptcha}
                >
                  <MdOutlineRefresh />
                </button>
              </div>

              <input
                type="text"
                className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
                placeholder="Captcha"
                value={inputCaptcha}
                onChange={(e) => setInputCaptcha(e.target.value)}
              />
              {formErrors.captcha && (
                <span className="text-red-500">{formErrors.captcha}</span>
              )}

              <button className="bg-cyan-600 text-white w-full h-10 rounded-md">
                Daftar
              </button>

              <p className="flex text-center items-center justify-center text-xs">
                Sudah punya akun ?
                <span className="text-cyan-600 font-semibold ml-1">
                  <Link to={"/"}> Login</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Success Modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="flex justify-center items-center bg-green-100 w-28 h-28 rounded-full m-auto">
          <div className="flex justify-center items-center bg-green-400 w-20 h-20 rounded-full m-auto border border-green-700 shadow-inner shadow-green-600 text-green-200">
            <IoCheckmarkOutline size={70} />
          </div>
        </div>
        <h2 className="text-center text-xl font-semibold mb-4 mt-3">
          Berhasil
        </h2>
        <p className="text-center text-sm mb-6">Pendaftaran berhasil</p>
      </Modal>
      <ToastContainer />
    </>
  );
}
