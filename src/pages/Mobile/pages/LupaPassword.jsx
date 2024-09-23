import React, { useState } from "react";
import { apiUsers } from "../../../api/apiUsers";
import Loading from "../components/Loading";
import { BsEnvelopeCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function LupaPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form action
    setLoading(true);
    setError(""); // Reset error state before making a request
    try {
      console.log(email);
      const response = await apiUsers.resetPassword(email);
      //   console.log("userReset", response);
      if (response.status === "success") {
        setSuccess(true);
      } else {
        setError("Terjadi kesalahan, coba lagi.");
      }
    } catch (err) {
      setError("Gagal mengirim email, coba lagi.");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setEmail("");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container w-full py-5">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center space-y-2 mb-10">
            <img src={"/assets/logo.png"} className="w-16 h-16" alt="Logo" />
            <h1 className="text-lg font-semibold">SKY Membership</h1>
          </div>

          <div className="border border-slate-300 rounded-md p-3 w-[90%]">
            <h1 className="text-start font-semibold">Lupa Password</h1>
            <p className="text-xs text-start text-slate-400">
              Masukkan email yang terdaftar, kami akan kirimkan link untuk reset
              password.
            </p>

            <div className="border-b border-slate-400 w-full mt-1 mb-4"></div>

            {/* Form Handling */}
            <form
              onSubmit={handleSubmit} // Correct the event to onSubmit
              className="flex flex-col justify-center items-center space-y-5"
            >
              <input
                type="email"
                className="border border-slate-300 rounded-md w-full py-3 px-2 text-sm"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-400 w-full py-2 rounded-md text-sm"
              >
                Submit
              </button>
            </form>

            <h1 className="text-sm text-right mt-5">
              Kembali ke{" "}
              <Link to={"/"} className="text-blue-400">
                login
              </Link>
            </h1>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {success && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-5"
          style={{ margin: 0 }}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <div className="flex flex-col justify-center items-center text-emerald-500 mb-3">
              <BsEnvelopeCheck size={40} />
              <h1 className="text-center font-semibold text-xl">Sukses</h1>
            </div>

            <p className="text-center text-gray-700">
              Kami telah mengirimkan email ke <strong>{email}</strong>, Silakan
              cek inbox Anda.
            </p>
            <button
              onClick={handleClose} // Close modal
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
