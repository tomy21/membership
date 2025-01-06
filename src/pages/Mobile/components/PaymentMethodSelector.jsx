import React, { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const PaymentMethodSelector = ({
  selectedType,
  setSelectedType,
  typePayment,
}) => {
  const [paymentChannel, setPaymentChannel] = useState([]);

  useEffect(() => {
    if (typePayment === "topup") {
      const data = [{ label: "Virtual Account", value: "VIRTUAL_ACCOUNT" }];
      setPaymentChannel(data);
    } else {
      const data = [
        { label: "Virtual Account", value: "VIRTUAL_ACCOUNT" },
        { label: "Point", value: "POINT" },
      ];
      setPaymentChannel(data);
    }
  }, [typePayment]);

  return (
    <div className="text-sm mb-4 w-full text-start">
      <Listbox
        value={selectedType}
        onChange={(selected) => setSelectedType(selected)}
      >
        <div className="relative mt-2">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
            <span className="block truncate">
              {selectedType ? selectedType.label : "Pilih Metode"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              />
            </span>
          </Listbox.Button>
          {paymentChannel.length > 0 && (
            <Listbox.Options className="absolute z-10 mt-2 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {paymentChannel.map((channel, index) => (
                <Listbox.Option
                  key={index}
                  value={channel}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-9 ${
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
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
                        {channel.label}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                            active ? "text-white" : "text-indigo-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          )}
        </div>
      </Listbox>
    </div>
  );
};

export default PaymentMethodSelector;
