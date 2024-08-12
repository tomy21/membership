import React, { useEffect, useRef, useState } from "react";
import { verifikasiUsers } from "../../../api/apiUsers";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { apiBayarindTopUp, apiBayarindVa } from "../../../api/apiBayarind";
import Loading from "../components/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorModal from "./ErrorModal";

function PinInput() {
  const [pin, setPin] = useState(Array(6).fill(""));
  const [idUser, setIdUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

      if (response.statusCode === 200) {
        const dataForm = {
          providerId: location.state?.providerId ?? "",
          productId: location.state?.productId ?? "",
          periodId: location.state?.periodId ?? "",
          plateNumber: location.state?.data?.location?.state?.platNomor ?? "",
          expiredByMinute: 30,
          amount: Math.floor(
            location.state?.data?.location?.state?.tariff ??
              location.state.amount
          ).toFixed(2),
          files: Array.isArray(location.state?.data?.location?.state?.file)
            ? location.state.data.location.state.file
            : [],
        };

        if (location.state.type === "member") {
          const responseBayarind = await apiBayarindVa.createVa(dataForm);
          if (responseBayarind.data.responseCode === "2002700") {
            const data = {
              periodId: location.state.periodId,
              bankProvider: location.state.providerName,
              expairedDate:
                responseBayarind.data.virtualAccountData.expiredDate,
              virtualAccountNomor:
                responseBayarind.data.virtualAccountData.virtualAccountNo,
              amount:
                responseBayarind.data.virtualAccountData.totalAmount.value,
              accountName:
                responseBayarind.data.virtualAccountData.virtualAccountName,
            };

            navigate("/payment_process", { state: data });
          } else if (responseBayarind.data.responseCode === "400") {
            setErrorMessage(responseBayarind.data.responseMessage);
            setPin(Array(6).fill(""));
            setShowModal(true);
          }
        } else if (location.state.type === "topup") {
          const dataFormTopUp = {
            providerId: location.state.providerId,
            amount: dataForm.amount,
            expiredByMinute: dataForm.expiredByMinute,
          };

          const responseBayarind = await apiBayarindTopUp.createVaTopup(
            dataFormTopUp
          );

          if (responseBayarind.data.responseCode === "2002700") {
            const data = {
              bankProvider: location.state.providerName,
              expairedDate:
                responseBayarind.data.virtualAccountData.expiredDate,
              virtualAccountNomor:
                responseBayarind.data.virtualAccountData.virtualAccountNo,
              amount:
                responseBayarind.data.virtualAccountData.totalAmount.value,
              accountName:
                responseBayarind.data.virtualAccountData.virtualAccountName,
            };

            navigate("/payment_process", { state: data });
          } else if (responseBayarind.data.responseCode === "400") {
            setErrorMessage(responseBayarind.data.responseMessage);
            setPin(Array(6).fill(""));
            setShowModal(true);
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

  useEffect(() => {
    const fetchToken = async () => {
      const token = Cookies.get("refreshToken");
      if (!token) {
        navigate("/");
      }
      if (token) {
        const decodedToken = jwtDecode(token);
        setIdUser(decodedToken.Id);
      }
    };
    fetchToken();
  }, [navigate]);

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <ToastContainer />
      <ErrorModal
        showModal={showModal}
        handleClose={handleCloseModal}
        message={errorMessage}
      />
      <div className="text-center mb-4 text-lg font-semibold mt-5">
        Masukkan 6 digit PIN Kamu
      </div>
      <div className="flex justify-center space-x-2 mb-4">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <input
              key={index}
              type="password"
              maxLength="1"
              className="w-10 h-10 border border-gray-300 rounded-full text-center text-xl"
              autoFocus={index === 0}
              onChange={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              value={pin[index]}
              inputMode="numeric"
              autoComplete="input-pin"
            />
          ))}
      </div>
      <button className="mb-6 text-blue-600">Lupa PIN?</button>
      <div className="grid grid-cols-3 gap-4">
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
  );
}

export default PinInput;
