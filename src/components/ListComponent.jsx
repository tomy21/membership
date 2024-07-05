import React, { useEffect, useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { HiChevronUpDown } from "react-icons/hi2";

function ListComponent({ list, title }) {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");

  const filteredPeople = list.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setQuery("");
  }, [selected]);

  return (
    <div className="px-3 flex flex-col justify-start items-start w-full mt-2">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-2 w-full">
          <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
            <span className="flex items-center">
              <span className="ml-3 block truncate">
                {selected && selected.name ? selected.name : `${title}`}
              </span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <HiChevronUpDown />
            </span>
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-12 max-h-56 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <div className="px-3 py-2">
              <input
                type="text"
                placeholder="Cari lokasi..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="max-h-40 overflow-auto">
              {filteredPeople.length > 0 ? (
                filteredPeople.map((person) => (
                  <ListboxOption
                    key={person.id}
                    value={person}
                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white max-h-52 overflow-y-auto"
                  >
                    <div className="flex items-center">
                      <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                        {person.name}
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

export default ListComponent;
