import React, { useEffect, useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Login() {
  const [captcha, setCaptcha] = useState("");
  const [valid, setValid] = useState(false);

  const refreshString = () => {
    setCaptcha(Math.random().toString(36).slice(2, 8));
  };

  useEffect(() => {
    refreshString();
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between p-6 md:p-20">
        <div className="container w-full md:w-[80%] h-full">
          <div className="flex flex-col items-center space-y-2">
            <img src={"/assets/logo.png"} className="w-16 h-16" alt="" />
            <h1 className="text-lg font-semibold">SKY Membership</h1>
          </div>
          <div className="w-full h-full p-5 text-start">
            <h1 className="text-base font-semibold">Selamat datang kembali,</h1>
            <h1 className="text-sm text-slate-400">
              Silahkan log in untuk masuk ke akun anda
            </h1>

            <div className="my-3 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500"></div>

            <button className="w-full h-10 m-auto border border-slate-200 rounded-md shadow-md hover:bg-slate-100">
              <span className="text-xl font-semibold text-[#1D4DF9]">G</span>
              <span className="text-xl font-semibold text-[#EB2929]">o</span>
              <span className="text-xl font-semibold text-[#FEC90E]">o</span>
              <span className="text-xl font-semibold text-[#1D4DF9]">g</span>
              <span className="text-xl font-semibold text-[#00B960]">l</span>
              <span className="text-xl font-semibold text-[#EB2929]">e</span>
            </button>

            <div className="flex flex-row space-x-2 justify-center items-center my-1">
              <div className="flex-1 my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500"></div>

              <h1>OR</h1>

              <div className="flex-1 my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500"></div>
            </div>

            <form
              action=""
              className="flex flex-col items-end justify-end space-y-3"
            >
              <input
                type="text"
                className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
                placeholder="No handphone, email atau username"
              />
              <input
                type="password"
                className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
                placeholder="No handphone, email atau username"
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
                  onClick={refreshString}
                >
                  <MdOutlineRefresh />
                </button>
              </div>

              <input
                type="text"
                className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
                placeholder="Captcha"
              />

              <p className="text-cyan-600 font-semibold text-xs">
                Lupa password ?
              </p>
              <button className="bg-cyan-600 text-white w-full h-10 rounded-md">
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
