// Login.js
import React, { useEffect, useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";
import { Users } from "../../../api/apiMembershipV2";

export default function Login() {
  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({});

  const refreshString = () => {
    setCaptcha(Math.random().toString(36).slice(2, 8));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.username) errors.username = "Username is required";
    if (!formData.password) errors.password = "Password is required";
    if (inputCaptcha !== captcha) errors.captcha = "Captcha does not match";
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
      const response = await Users.login(formData.username, formData.password);
      console.log(response);
      localStorage.setItem("userToken", response.token); // Simpan token autentikasi
      localStorage.setItem("userData", JSON.stringify(response.user));
      setFormErrors({});
      setFormData({
        username: "",
        password: "",
        rememberMe: false,
      });

      setTimeout(() => {
        navigate("/dashboard");
        toast.success("Login successful!");
      }, 500);

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
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
            <img src={"/assets/logo.png"} className="w-16 h-16" alt="" />
            <h1 className="text-lg font-semibold">SKY Membership</h1>
          </div>
          <div className="w-full h-full p-5 text-start">
            <h1 className="text-base font-semibold">Selamat datang kembali,</h1>
            <h1 className="text-xs text-slate-400">
              Silahkan log in untuk masuk ke akun anda
            </h1>

            <div className="my-3 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500"></div>

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
                <p className="text-red-500 text-xs">{formErrors.username}</p>
              )}
              <input
                type="password"
                className="w-full p-3 border border-slate-300 bg-slate-100 rounded-lg"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              {formErrors.password && (
                <p className="text-red-500 text-xs">{formErrors.password}</p>
              )}

              <div className="relative bg-black w-full select-none">
                <div className="bg-black text-white font-semibold w-full h-[40px] px-1 rounded-md text-3xl tracking-[15px]">
                  {captcha}
                </div>
                <button
                  type="button"
                  className="absolute text-white top-2 right-5"
                  onClick={refreshString}
                >
                  <MdOutlineRefresh />
                </button>
              </div>

              <input
                type="text"
                className="w-full p-3 border border-slate-300 bg-slate-100 rounded-lg"
                placeholder="Captcha"
                value={inputCaptcha}
                onChange={(e) => setInputCaptcha(e.target.value)}
              />
              {formErrors.captcha && (
                <p className="text-red-500 text-xs">{formErrors.captcha}</p>
              )}

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
                  to={"/lupapassword"}
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
                  <Link to={"/register"}>Daftar akun</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
