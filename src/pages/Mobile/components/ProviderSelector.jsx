import React from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const ProviderSelector = ({
  selectedProvider,
  setSelectedProvider,
  filteredProviders,
}) => {
  console.log("selectedProvider", selectedProvider);

  return (
    <div className="text-sm w-full text-start">
      <Listbox value={selectedProvider} onChange={setSelectedProvider}>
        <div className="relative mt-2">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 flex flex-row justify-start items-center gap-x-3">
            {selectedProvider ? (
              <>
                <img
                  src={`${
                    selectedProvider.code_bank === "BCA"
                      ? "/assets/payment/bca_logo.png"
                      : "/assets/payment/nobu_logo.png"
                  }`}
                  className="w-7"
                  alt={selectedProvider?.code_bank}
                />
                <span className="block truncate">
                  {selectedProvider?.code_bank}
                </span>
              </>
            ) : (
              <span className="block truncate">Pilih Provider</span>
            )}
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
                key={provider.id}
                value={provider}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-3 pr-9 flex flex-row justify-start items-center gap-x-4 ${
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  }`
                }
              >
                {({ selected, active }) => (
                  <>
                    <img
                      src={`${
                        provider.code_bank === "BCA"
                          ? "/assets/payment/bca_logo.png"
                          : "/assets/payment/nobu_logo.png"
                      }`}
                      className="w-7"
                      alt={provider?.code_bank}
                    />
                    <span
                      className={`block truncate ${
                        selected ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {provider.code_bank === "NATIONALNOBU"
                        ? "Nobu"
                        : provider.code_bank}
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
        </div>
      </Listbox>
    </div>
  );
};

export default ProviderSelector;
