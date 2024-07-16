import {
  Dialog,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  PopoverGroup,
  Transition,
} from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { BsGear, BsPlusCircle } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ListComponent from "./ListComponent";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiPhoto } from "react-icons/hi2";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const lokasi = [
  {
    id: 1,
    Code: "004SK",
    name: "SKY UNIVERSITAS PELITA HARAPAN	",
    Quota: 2000,
    Used: 1500,
  },
  {
    id: 2,
    Code: "007SK",
    name: "SKY ZONA 3 SILOAM KARAWACI",
    Quota: 3000,
    Used: 2300,
  },
  {
    id: 3,
    Code: "002SK",
    name: "SKY CYBERPARK KARAWACI",
    Quota: 800,
    Used: 800,
  },
  {
    id: 4,
    Code: "003SK",
    name: "SKY KARAWACI OFFICE PARK",
    Quota: 2000,
    Used: 1800,
  },
  {
    id: 5,
    Code: "901SK",
    name: "SKY BCA FORESTA",
    Quota: 1000,
    Used: 1000,
  },
  {
    id: 6,
    Code: "009SK",
    name: "SKY MAXBOXX LIPPO VILLAGE",
    Quota: 1000,
    Used: 1000,
  },
  {
    id: 7,
    Code: "005SK",
    name: "SKY ZONA 2 HELI",
    Quota: 2000,
    Used: 1500,
  },
  {
    id: 8,
    Code: "05QSK",
    name: "SKY OT BUILDING",
    Quota: 2000,
    Used: 1500,
  },
  {
    id: 9,
    Code: "00000",
    name: "SKY HYPERMART KARAWACI",
    Quota: 2000,
    Used: 1500,
  },
  {
    id: 10,
    Code: "00001",
    name: "SKY LIPPO THAMRIN",
    Quota: 2000,
    Used: 1500,
  },
];

const vehicle = [
  {
    id: 1,
    name: "Mobil",
    tariff: 330000,
  },
  {
    id: 2,
    name: "Motor",
    tariff: 110000,
  },
];

const userNavigation = [
  { name: "Profil", href: "/profil" },
  { name: "Keluar", href: "/" },
];

function NavbarClient({ client }) {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const navigate = useNavigate();

  const [vehicleType, setVehicleType] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const handleProceed = () => {
    navigate("/payment_member", {
      state: {
        location: location,
        vehicleType: vehicleType,
      },
    });
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // const handleBack = () => {
  //   navigate(-1);
  // };
  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-md">
        <div className="container m-auto ">
          <nav
            aria-label="Global"
            className="mx-auto flex max-w-7xl items-center justify-between p-3"
          >
            <div className="flex lg:flex-1 space-x-10 justify-start items-end">
              <Link to="#" className="-m-1.5 p-1.5">
                <span className="sr-only">SKY Membership</span>
                <img alt="" src={"/logo.png"} className="h-12 w-auto" />
              </Link>
              <PopoverGroup className="flex gap-x-12 justify-between items-end">
                <NavLink
                  to={client === true ? "/dashboard-client" : "/dashboard"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-sm font-medium leading-6 text-gray-900 py-2 px-2 border-b-2 border-amber-400"
                      : "text-sm font-medium leading-6 text-gray-900 py-2 px-2 hover:border-b-2 border-amber-400"
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    isActive
                      ? "text-sm font-medium leading-6 text-gray-900 py-2 px-2 border-b-2 border-amber-400"
                      : "text-sm font-medium leading-6 text-gray-900 py-2 px-2 hover:border-b-2 border-amber-400"
                  }
                >
                  History
                </NavLink>
                <NavLink
                  to="/location"
                  className={({ isActive }) =>
                    isActive
                      ? "text-sm font-medium leading-6 text-gray-900 py-2 px-2 border-b-2 border-amber-400"
                      : "text-sm font-medium leading-6 text-gray-900 py-2 px-2 hover:border-b-2 border-amber-400"
                  }
                >
                  Locations
                </NavLink>
              </PopoverGroup>
            </div>

            <PopoverGroup className="flex gap-x-5 justify-center items-center">
              {client === false ? (
                ""
              ) : (
                <Link
                  onClick={openModal}
                  className="flex flex-row space-x-2 justify-center items-center text-sm font-medium leading-6 text-gray-900 px-3 py-2 bg-emerald-400 rounded-md hover:bg-emerald-200 transition"
                >
                  <BsPlusCircle size={15} />
                  <h1 className="text-xs">Member</h1>
                </Link>
              )}
              <Link
                to="#"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                <Menu as="div" className="relative ml-2">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-start rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <IoMdNotificationsOutline size={20} />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-1 w-48 origin-top-left text-start rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </Link>
              <Link
                to="#"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                <Menu as="div" className="relative ml-2">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-start rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <BsGear size={20} />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-1 w-48 origin-top-left text-start rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </Link>

              <div className="flex flex-row justify-center items-center border-l border-gray-200 pl-5">
                <div className="flex flex-col justify-end items-end">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs font-light">{user.email}</p>
                </div>
                <Menu as="div" className="relative ml-2">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-start rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src={user.imageUrl}
                        className="h-12 w-12 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 -mt-1 w-48 origin-top-left text-start rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </PopoverGroup>
          </nav>
        </div>
      </header>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-2 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="w-full flex flex-col items-start justify-start px-3 py-3 font-medium border-b border-gray-300">
                      <h1 className="text-xl">Paket Member</h1>
                      <p className="text-sm text-gray-400">
                        Pilih paket yang anda inginkan
                      </p>
                    </div>
                  </Dialog.Title>
                  <div className="mt-0">
                    <div className="flex flex-col items-start justify-start min-h-[60vh] w-full">
                      <ListComponent
                        list={lokasi}
                        title={"Pilih Lokasi"}
                        search={"Cari Lokasi"}
                        selected={location}
                        setSelected={setLocation}
                        query={selectedLocation}
                        setQuery={setSelectedLocation}
                      />
                      <ListComponent
                        list={vehicle}
                        title={"Pilih Type Kendaraan"}
                        search={"Cari Type Kendaraan"}
                        selected={vehicleType}
                        setSelected={setVehicleType}
                        query={selectedVehicle}
                        setQuery={setSelectedVehicle}
                      />

                      <div className="px-3 flex flex-col justify-start items-start w-full mt-3">
                        <div className="relative rounded-md shadow-sm w-full">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                            <span className="text-gray-500 sm:text-sm border-r border-gray-400 pr-2">
                              IDR
                            </span>
                          </div>
                          <input
                            id="price"
                            name="price"
                            type="text"
                            placeholder="0.00"
                            className="block w-full rounded-md border-0 py-3 pl-16 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={
                              vehicleType
                                ? `${parseInt(
                                    vehicleType.tariff
                                  ).toLocaleString("id-ID")}`
                                : "-"
                            }
                            disabled
                          />
                        </div>
                        <input
                          type="text"
                          className="block w-full rounded-md border-0 mt-3 py-3 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={
                            location
                              ? `${location.Used}/${location.Quota}`
                              : "-"
                          }
                          disabled
                        />
                        <input
                          type="text"
                          className="block w-full rounded-md border-0 mt-3 py-3 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Masukan Plat nomor kendaraan"
                        />
                      </div>

                      <div className="col-span-full px-3 w-full">
                        <div className="mt-3 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5">
                          <div className="text-center">
                            <HiPhoto
                              aria-hidden="true"
                              className="mx-auto h-7 w-12 text-gray-300"
                            />
                            <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload foto STNK</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                />
                              </label>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="px-3 flex flex-row justify-center items-center w-full mt-4 space-x-2">
                        <button
                          className="shadow-md inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-3 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-full"
                          onClick={handleProceed}
                        >
                          <span>Lanjutkan</span>
                        </button>
                        <button
                          type="button"
                          className="shadow-md inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-3 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 w-full"
                          onClick={closeModal}
                        >
                          Tutup
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 px-3"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default NavbarClient;
