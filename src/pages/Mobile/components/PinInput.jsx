import React, { useEffect, useRef, useState } from "react";
import { verifikasiUsers } from "../../../api/apiUsers";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import {
  apiBarindCekstatus,
  apiBayarindExtend,
  apiBayarindTopUp,
  apiBayarindVa,
} from "../../../api/apiBayarind";
import Loading from "../components/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorModal from "./ErrorModal";
import SuccessModal from "./SuccessModal";

function PinInput() {
  const [pin, setPin] = useState(Array(6).fill(""));
  const [idUser, setIdUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorShowModal, setErrorShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const location = useLocation();

  const verifyPin = async (enteredPin) => {
    setLoading(true);
    try {
      const response = await verifikasiUsers.verifikasiPin({
        memberUserId: idUser,
        pinVerifikasi: enteredPin,
      });

      console.log(location.state);

      if (response.status === false) {
        setErrorMessage(response.message);
        setErrorShowModal(true);
      } else if (response.statusCode === 200) {
        if (location.state.type === "Member") {
          const dataFormTopUp = {
            bank_id: location.state.providerId,
            plate_number: location.state.plateNumber,
          };
          const idProduct = location.state.productId;
          const responseBayarind = await apiBayarindVa.createVa(
            idProduct,
            dataFormTopUp
          );

          if (responseBayarind.status === true) {
            const data = {
              bankProvider: location.state,
              response: responseBayarind.data,
            };

            navigate("/payment_process", { state: data });
          } else {
            console.log(responseBayarind.data.message);
            setErrorMessage(responseBayarind.data.message);
            setPin(Array(6).fill(""));
            setErrorShowModal(true);
          }
        } else if (location.state.type === "Extend") {
          const data = {
            userProductId: location.state.userProductId,
            productId: location.state.productId,
            periodId: location.state.periodId,
            providerId: location.state.providerId,
          };

          const responseBayarind = await apiBayarindExtend.extend(
            location.state.userProductId,
            location.state.productId,
            location.state.periodId,
            location.state.providerId
          );

          if (responseBayarind.data.responseCode === "2002700") {
            const data = {
              periodId: location.state.periodId,
              bankProvider: location.state.providerName,
              virtualAccountNomor:
                responseBayarind.data.virtualAccountData.virtualAccountNo,
              amount:
                responseBayarind.data.virtualAccountData.totalAmount.value,
              response: responseBayarind.data,
            };
            navigate("/payment_process", { state: data });
          } else if (responseBayarind.data.responseCode === "400") {
            setErrorMessage(responseBayarind.data.responseMessage);
            setPin(Array(6).fill(""));
            setErrorShowModal(true);
          } else {
            setErrorMessage(responseBayarind.data.responseMessage);
            setPin(Array(6).fill(""));
            setShowModal(true);
          }
        } else if (location.state.type === "topup") {
          const dataFormTopUp = {
            bank_id: location.state.bank_id,
            amount: location.state.amount,
          };
          const responseBayarind = await apiBayarindTopUp.createVaTopup(
            dataFormTopUp
          );
          console.log(responseBayarind);

          if (responseBayarind.status === true) {
            const data = {
              bankProvider: location.state,
              response: responseBayarind.data,
            };

            navigate("/payment_process", { state: data });
          } else if (responseBayarind.data.responseCode === "400") {
            setErrorMessage(responseBayarind.data.responseMessage);
            setPin(Array(6).fill(""));
            setErrorShowModal(true);
          }
        }
      } else {
        toast.error("Silahkan coba kembali");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan, silahkan coba lagi");
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e, index) => {
    const value = e.target.value;

    // Filter untuk memastikan hanya angka yang bisa diinput
    if (/^\d$/.test(value)) {
      if (value.length === 1 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Check if PIN is complete
      if (index === inputRefs.current.length - 1 && value.length === 1) {
        verifyPin(newPin.join(""));
      }
    }
  };

  const handleKeypadClick = (value) => {
    const newPin = [...pin];
    const firstEmptyIndex = newPin.findIndex((p) => p === "");
    if (firstEmptyIndex !== -1) {
      newPin[firstEmptyIndex] = value;
      setPin(newPin);
      inputRefs.current[firstEmptyIndex].focus();

      // Check if PIN is complete
      if (firstEmptyIndex === inputRefs.current.length - 1) {
        verifyPin(newPin.join(""));
      }
    }
  };

  const handleBackspace = () => {
    const newPin = [...pin];
    const lastFilledIndex = newPin
      .slice()
      .reverse()
      .findIndex((p) => p !== "");
    if (lastFilledIndex !== -1) {
      const index = 5 - lastFilledIndex;
      newPin[index] = "";
      setPin(newPin);
      inputRefs.current[index].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleCloseModal = () => {
    setErrorShowModal(false);
  };

  const handleCloseModalSuccess = () => {
    setShowModal(false);
    navigate("/dashboard");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center w-full">
        <ErrorModal
          showModal={errorShowModal}
          handleClose={handleCloseModal}
          message={errorMessage}
        />
        <SuccessModal
          showModal={showModal}
          handleSuccessClose={handleCloseModalSuccess}
          message={errorMessage}
        />
        <div className="text-center mb-4 text-lg font-semibold mt-5">
          Masukkan 6 digit PIN Kamu
        </div>
        <div className="flex justify-center space-x-2 mb-4 mt-8">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                type="password" // Menggunakan type tel untuk fokus pada input numerik
                maxLength="1"
                className="w-10 h-10 border border-gray-300 rounded-full text-center text-xl"
                autoFocus={index === 0}
                onChange={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                value={pin[index]}
                inputMode="none" // Tidak memunculkan keypad mobile bawaan
                autoComplete="off" // Nonaktifkan autoComplete
                readOnly // Mencegah input langsung
                style={{ caretColor: "transparent" }} // Menyembunyikan kursor
              />
            ))}
        </div>
        {/* <button className="mb-6 text-blue-600">Lupa PIN?</button> */}
        <div className="grid grid-cols-3 gap-10 mt-20">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, idx) => (
            <button
              key={idx}
              onClick={() => handleKeypadClick(num.toString())}
              className="w-[4rem] h-[4rem] border border-gray-300 rounded-full bg-white shadow-md text-xl flex items-center justify-center"
            >
              {num}
            </button>
          ))}
          <div className="w-[4rem] h-[4rem]"></div>
          <button
            onClick={() => handleKeypadClick("0")}
            className="w-[4rem] h-[4rem] border border-gray-300 rounded-full bg-white shadow-md text-xl flex items-center justify-center"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="w-[4rem] h-[4rem] border border-gray-300 rounded-full bg-white shadow-md text-xl flex items-center justify-center"
          >
            ⌫
          </button>
        </div>
      </div>
    </>
  );
}

export default PinInput;
