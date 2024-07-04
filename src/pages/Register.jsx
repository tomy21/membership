import React, { useEffect, useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Register() {
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
            <h1 className="text-base font-semibold">Daftar akun</h1>

            <div className="my-3 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500"></div>

            <form
              action=""
              className="flex flex-col items-end justify-end space-y-3"
            >
              <input
                type="text"
                className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
                placeholder="Masukan username anda"
                autoComplete="false"
              />
              <input
                type="email"
                className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
                placeholder="Masukan email anda"
                autoComplete="false"
                autoCorrect="false"
              />
              <input
                type="password"
                className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
                placeholder="Masukan password anda"
                autoComplete="false"
              />
              <input
                type="password"
                className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg"
                placeholder="Validasi password anda"
                autoComplete="false"
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
    </>
  );
}
