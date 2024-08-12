import React, { useEffect, useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";
import { loginUsers } from "../../../api/apiUsers";
import Cookies from "js-cookie";

function Login() {
  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({});

  const refreshString = () => {
    setCaptcha(Math.random().toString(36).slice(2, 8));
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
    if (!formData.identifier) errors.identifier = "Username is required";
    if (!formData.password) errors.password = "Password is required";
    if (inputCaptcha !== captcha) errors.captcha = "Captcha does not match";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    refreshString();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    if (validateForm()) {
      setLoading(true);
      try {
        const response = await loginUsers.login(formData);
        console.log("response", response);
        setFormErrors({});
        setFormData({
          identifier: "",
          password: "",
        });

        const token = response.token;
        Cookies.set("refreshToken", token);

        // Add a delay before navigating to the dashboard
        setTimeout(() => {
          navigate("/dashboard");
          toast.success("Login successful!");
        }, 500); // 500 milliseconds delay

        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      if (formErrors.captcha) {
        toast.error("Captcha does not match!");
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen w-[80%] m-auto">
        <div className="flex flex-row items-center justify-center gap-3 h-full w-full p-3 border border-gray-400 rounded-md">
          <img
            src={"/assets/skyparking_image.jpg"}
            className="w-[600px] h-[450px] rounded-sm shadow-md"
            alt=""
          />
          <div className="flex flex-col w-full px-7">
            <div className="flex flex-col items-start justify-start w-full h-full border-b border-gray-400 pt-2 pb-3 space-y-3">
              <div className="flex flex-row space-x-3 justify-end items-end">
                <img src={"/logo.png"} className="w-10" alt="" />
                <h1 className="text-xl font-semibold">Membership</h1>
              </div>
              <p className="text-xs text-gray-400 ">
                Silahkan masuk ke akun anda
              </p>
            </div>
            <form
              action={handleLogin}
              className="flex flex-col items-end justify-end space-y-3 mt-2"
            >
              <input
                type="text"
                className="w-full py-3 px-3 text-sm border border-slate-300 bg-slate-100 rounded-lg"
                placeholder="Masukan email atau username"
                value={formData.identifier}
                name="identifier"
                onChange={handleChange}
              />
              {formErrors.identifier && (
                <p className="text-red-500 text-xs">{formErrors.identifier}</p>
              )}

              <input
                type="password"
                className="w-full py-3 px-3 text-sm border border-slate-300 bg-slate-100 rounded-lg"
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
                className="w-full py-3 px-3 border border-slate-300 bg-slate-100 rounded-lg text-sm"
                placeholder="Captcha"
                value={inputCaptcha}
                onChange={(e) => setInputCaptcha(e.target.value)}
              />
              {formErrors.captcha && (
                <p className="text-red-500 text-xs">{formErrors.captcha}</p>
              )}

              <div className="flex justify-between items-center w-full">
                <p className="text-cyan-600 font-semibold text-xs">
                  Lupa password ?
                </p>
              </div>

              <button
                type="button"
                className="bg-cyan-600 text-white w-full h-10 rounded-md"
                onClick={handleLogin}
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

export default Login;
