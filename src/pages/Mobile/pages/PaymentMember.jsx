import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarMobile from "../components/NavbarMobile";
import { endOfMonth, format } from "date-fns";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { TbExclamationMark } from "react-icons/tb";
import { getAllProvider } from "../../../api/apiProvider";
import { Listbox } from "@headlessui/react";

function PaymentMember() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [providers, setProviders] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleProceed = () => {
    if (selectedProvider) {
      setIsModalVisible(true);
    } else {
      alert("Pilih metode pembayaran terlebih dahulu.");
    }
  };
  console.log(selectedProvider);
  useEffect(() => {
    const fetchProvider = async () => {
      const response = await getAllProvider.getProvider();
      setProviders(response.data);
    };

    fetchProvider();
  }, []);

  const handleProceedCancel = () => {
    navigate("/dashboard");
  };

  const getMonthlyPeriod = (date) => {
    const start = new Date();
    const end = endOfMonth(date);

    return {
      start: format(start, "dd MMM yyyy"),
      end: format(end, "dd MMM yyyy"),
    };
  };

  const verifikasi = () => {
    setIsModalVisible(false);
    navigate("/verifikasi", {
      state: {
        providerName: selectedProvider.ProviderName,
        providerId: selectedProvider.Id,
        productId: location.state.productId,
        plateNumber: location.state.platNomor,
        data: {
          location,
        },
      },
    });
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  //   const handleBack = () => {
  //     navigate("/dashboard");
  //   };

  const currentPeriod = getMonthlyPeriod(new Date());
  return (
    <>
      <div>
        {isModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
        )}
        <NavbarMobile />
        <div className="container px-3">
          <div className="flex flex-col items-start justify-start mt-2 w-full border border-gray-400 rounded-lg">
            <div className="px-3 flex flex-col justify-start items-start w-full">
              <div className="flex flex-col justify-start items-start border-b border-gray-400 w-full pb-2">
                <p className="text-lg pt-2 font-semibold">Informasi Member</p>
                <p className="text-gray-400">
                  {location.state ? location.state.platNomor : "-"}
                </p>
                <p className="text-gray-400">
                  {location.state.vehicleType === 1 ? "Mobil" : "Motor"}
                </p>
                <p className="text-gray-400">
                  {location.state ? location.state.location : "-"}
                </p>
              </div>

              <p className="text-lg pt-2 font-semibold">Periode</p>
              <p className="font-semibol text-gray-400 ">
                {`${currentPeriod.start} - ${currentPeriod.end}`}
              </p>
              <p className="text-gray-400 pb-2">
                {location.state.tariff
                  ? `IDR ${parseInt(location.state.tariff).toLocaleString(
                      "id-ID"
                    )}`
                  : "-"}
              </p>
            </div>
          </div>
          <p className="flex items-start text-md font-medium mb-3 mt-3">
            Pilih metode pembayaran
          </p>
          <div className="mb-2 text-start min-h-[25vh] overflow-y-auto">
            <div className="text-sm mb-4">
              <Listbox value={selectedType} onChange={setSelectedType}>
                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    <span className="block truncate">
                      {selectedType || "Pilih Metode"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-400"
                      />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-12 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {["Virtual Account", "E-Wallet"].map((type, index) => (
                      <Listbox.Option
                        key={index}
                        value={type}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-3 pr-9 ${
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {type}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                  active ? "text-white" : "text-indigo-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
            {selectedType && (
              <div className="text-sm mt-5">
                <Listbox
                  value={selectedProvider}
                  onChange={setSelectedProvider}
                >
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                      <span className="block truncate">
                        {selectedProvider
                          ? selectedProvider.ProviderName
                          : "Pilih Provider"}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-gray-400"
                        />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-20 mt-12 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredProviders.map((provider) => (
                        <Listbox.Option
                          key={provider.Id}
                          value={provider}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-3 pr-9 ${
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900"
                            }`
                          }
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-semibold" : "font-normal"
                                }`}
                              >
                                {provider.ProviderName}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                    active ? "text-white" : "text-indigo-600"
                                  }`}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
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
            {location.state.tariff
              ? `${parseInt(
                  parseInt(location.state.tariff) + 5000
                ).toLocaleString("id-ID")}`
              : "-"}
          </h1>

          <div className="flex justify-between items-center mt-5 border-b border-gray-300 pb-2 pt-3">
            <div className="text-base text-gray-400">Metode pembayaran</div>
            <p className="font-semibold">
              {`${selectedProvider.ProviderName} ${
                selectedProvider.Type === "Virtual Account" ? "VA" : ""
              }`}
            </p>
          </div>

          <div className="flex justify-between items-center border-b border-gray-300 pb-2 pt-3">
            <div className="text-base text-gray-400">Biaya member</div>
            <p className="font-semibold">
              <span className="font-semibold">IDR</span>{" "}
              {parseInt(location.state.tariff).toLocaleString("id-ID")}
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
            <div className="text-base text-gray-400">Tanggal</div>
            <p className="font-semibold">{format(new Date(), "dd MMMM Y")}</p>
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

export default PaymentMember;
