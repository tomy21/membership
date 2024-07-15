import React, { useEffect } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { HiChevronUpDown } from "react-icons/hi2";

function ListData({
  list,
  title,
  search,
  selected,
  setSelected,
  query,
  setQuery,
}) {
  // Filtering the list based on the query
  const filteredList = list.filter(
    (item) =>
      item.name?.toLowerCase().includes(query.toLowerCase()) ||
      item.plate?.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setQuery("");
  }, [selected, setQuery]);

  return (
    <div className="flex flex-col justify-start items-start w-full mt-2">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative w-full">
          <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1 pr-4 text-left text-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-xs sm:leading-6">
            <span className="flex items-center">
              <span className="ml-3 block truncate">
                {selected && (selected.name || selected.plate)
                  ? selected.name || selected.plate
                  : `${title}`}
              </span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <HiChevronUpDown />
            </span>
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-9 max-h-56 w-full rounded-md bg-white py-1 pr-3 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs"
          >
            <div className="px-3 py-2">
              <input
                type="text"
                placeholder={search}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="max-h-40 overflow-auto">
              {filteredList.length > 0 ? (
                filteredList.map((item) => (
                  <ListboxOption
                    key={item.id || item.plate}
                    value={item}
                    className="group relative cursor-default select-none py-2 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white max-h-52 overflow-y-auto"
                  >
                    <div className="flex items-center">
                      <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                        {item.name || item.plate}
                      </span>
                    </div>
                  </ListboxOption>
                ))
              ) : (
                <div className="py-2 px-3 text-gray-500">
                  Tidak ada lokasi yang cocok.
                </div>
              )}
            </div>
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}

export default ListData;
