import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="container max-h-screen m-auto w-[80%] mt-20">
        <div className="flex flex-row items-start justify-center gap-3 h-full w-full p-3 border border-gray-400 rounded-md">
          <img
            src={"/assets/skyparking_image.jpg"}
            className="w-[600px] h-[400px] rounded-sm shadow-md"
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
              action=""
              className="flex flex-col items-end justify-end space-y-3 mt-2"
            >
              <input
                type="text"
                className="w-full py-2 px-3 text-sm border border-slate-300 bg-slate-100 rounded-lg"
                placeholder="No handphone, email atau username"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="w-full py-2 px-3 text-sm border border-slate-300 bg-slate-100 rounded-lg"
                placeholder="Password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />

              <div className="relative bg-black w-full select-none">
                <div className="bg-black text-white font-semibold w-full h-[40px] px-1 rounded-md text-3xl tracking-[15px]">
                  {/* {captcha} */}
                </div>
                {/* <button
                  type="button"
                  className="absolute text-white top-2 right-5"
                  onClick={refreshString}
                >
                  <MdOutlineRefresh />
                </button> */}
              </div>

              <input
                type="text"
                className="w-full py-2 px-3 border border-slate-300 bg-slate-100 rounded-lg text-sm"
                placeholder="Captcha"
                // value={inputCaptcha}
                // onChange={(e) => setInputCaptcha(e.target.value)}
              />

              <p className="text-cyan-600 font-semibold text-xs">
                Lupa password ?
              </p>
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
