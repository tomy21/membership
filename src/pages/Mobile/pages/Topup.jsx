import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { TbExclamationMark } from "react-icons/tb";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import PaymentMethodSelector from "../components/PaymentMethodSelector";
import ProviderSelector from "../components/ProviderSelector";
import { getAllProvider, getProviderById } from "../../../api/apiProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Topup() {
  const [amount, setAmount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Menghapus karakter non-numerik
    setAmount(Number(value));
  };

  useEffect(() => {
    if (selectedType) {
      const filtered = providers.filter(
        (provider) => provider.Type === selectedType
      );
      setFilteredProviders(filtered);
    } else {
      setFilteredProviders([]);
    }
  }, [selectedType, providers]);

  console.log(selectedType);

  useEffect(() => {
    const fetchProvider = async () => {
      const response = await getProviderById.getById(1);
      setProviders(response.data);
    };

    fetchProvider();
  }, []);

  const handleProceed = () => {
    if (selectedProvider) {
      if (selectedProvider && amount >= 10000) {
        setIsModalVisible(true);
      } else {
        if (amount < 10000) {
          toast.error("Minimal topup Rp. 10.000");
        } else {
          toast.error("Pilih metode pembayaran terlebih dahulu.");
        }
      }
    } else {
      toast.error("Pilih metode pembayaran terlebih dahulu.");
    }
  };

  const handleProceedCancel = () => {
    navigate("/dashboard");
  };

  const verifikasi = () => {
    setIsModalVisible(false);
    const totalAmount = amount + 5000;
    navigate("/verifikasi", {
      state: {
        type: "topup",
        providerName: selectedProvider.ProviderName,
        providerId: selectedProvider.Id,
        amount: totalAmount.toFixed(2),
      },
    });
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <ToastContainer />
      <div className="container w-full overflow-x-hidden">
        {isModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
        )}
        <div className="flex space-x-20 justify-start items-center w-full py-3 bg-amber-300">
          <FaArrowLeftLong className="pl-3 w-10" onClick={handleBack} />
          <h1 className="text-lg font-bold px-3">Top up Point</h1>
        </div>

        <div className="flex flex-col items-center justify-start px-5 bg-white">
          <div className="text-center mb-5 border-b border-slate-300 pb-5">
            <h2 className="text-xl font-medium text-slate-400 mt-5">
              Nominal Top Up
            </h2>
            <input
              type="text"
              value={`IDR ${amount.toLocaleString("id-ID")}`}
              onChange={handleAmountChange}
              className="text-4xl font-semibold my-3 text-center border-gray-300 focus:outline-none focus:border-blue-500"
              maxLength={15}
            />
            <p className="text-gray-400">
              {amount.toLocaleString("id-ID")} Points
            </p>

            <div className="flex flex-row justify-center items-center space-x-2 mt-3">
              {[500000, 300000, 100000, 70000, 50000].map((val, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-blue-100 text-blue-700 px-3 py-1 cursor-pointer"
                  onClick={() => setAmount(val)}
                >
                  {val / 1000}K
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full">
            <p className="text-start text-md font-medium mb-2 ">
              Pilih metode pembayaran
            </p>
            <PaymentMethodSelector
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            {selectedType && (
              <ProviderSelector
                selectedProvider={selectedProvider}
                setSelectedProvider={setSelectedProvider}
                filteredProviders={filteredProviders}
              />
            )}
          </div>

          <button
            className="flex items-center justify-center w-full bg-blue-500 text-white py-3 rounded-lg shadow-md cursor-pointer mt-10"
            onClick={handleProceed}
          >
            <span>Lanjutkan</span>
          </button>
          <button
            className="flex items-center justify-center w-full bg-red-500 text-white py-3 rounded-lg shadow-md cursor-pointer mt-2"
            onClick={handleProceedCancel}
          >
            <span>Batal</span>
          </button>
        </div>
      </div>
      {isModalVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 w-full bg-white p-5 shadow-2xl rounded-t-3xl border border-slate-400 z-20"
        >
          <h2 className="text-base max-h-[90vh] text-slate-400 font-medium mb-1 mt-20">
            Total pembayaran
          </h2>
          <h1 className="text-4xl font-medium">
            <span className="font-semibold">IDR</span>{" "}
            {(amount + 5000).toLocaleString("id-ID")}
          </h1>

          <div className="flex justify-between items-center mt-5 border-b border-gray-300 pb-2 pt-3">
            <div className="text-base text-gray-400">Metode pembayaran</div>
            <p className="font-semibold">
              {selectedProvider.ProviderName}{" "}
              {selectedProvider.Type === "Virtual Account" ? "VA" : "E-Wallet"}
            </p>
          </div>

          <div className="flex justify-between items-center border-b border-gray-300 pb-2 pt-3">
            <div className="text-base text-gray-400">Biaya admin</div>
            <p className="font-semibold">
              <span className="font-semibold">IDR</span>{" "}
              {parseInt("5000").toLocaleString("id-ID")}
            </p>
          </div>

          <div className="flex justify-between items-center border-b border-gray-300 pb-2 pt-3">
            <div className="text-base text-gray-400">Total points</div>
            <p className="font-semibold">
              {amount.toLocaleString("id-ID")} Points
            </p>
          </div>

          <div className="flex justify-between items-center border-b border-gray-300 pb-2 pt-3">
            <div className="text-base text-gray-400">Tanggal</div>
            <p className="font-semibold">
              {format(new Date(), "dd MMMM yyyy")}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center space-y-1">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-5 w-full"
              onClick={verifikasi}
            >
              Lanjutkan
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg mt-5 w-full"
              onClick={closeModal}
            >
              Batal
            </button>
          </div>
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <div className="relative w-36 h-36 bg-blue-600 opacity-40 rounded-full"></div>
            <div className="absolute inset-0 w-24 h-24 bg-blue-600 opacity-100 rounded-full m-auto">
              <TbExclamationMark
                size={50}
                className="m-auto mt-5 text-amber-500"
              />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
