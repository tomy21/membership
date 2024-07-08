import React, { useEffect, useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ListComponent from "../components/ListComponent";
import { HiPhoto } from "react-icons/hi2";

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
  },
  {
    id: 2,
    name: "Motor",
  },
];

const paket = [
  {
    id: 1,
    name: "1 Bulan",
    type: 1,
    tariff: 300000,
  },
  {
    id: 2,
    name: "2 Bulan",
    type: 1,
    tariff: 300000,
  },
  {
    id: 3,
    name: "3 Bulan",
    type: 1,
    tariff: 300000,
  },
  {
    id: 4,
    name: "6 Bulan",
    type: 1,
    tariff: 500000,
  },
  {
    id: 5,
    name: "1 Tahun",
    type: 1,
    tariff: 1300000,
  },
  {
    id: 6,
    name: "1 Bulan",
    type: 2,
    tariff: 110000,
  },
  {
    id: 7,
    name: "2 Bulan",
    type: 2,
    tariff: 220000,
  },
  {
    id: 8,
    name: "3 Bulan",
    type: 2,
    tariff: 330000,
  },
];

export default function Membership() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");

  const [vehicleType, setVehicleType] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const [packageMember, setPackageMember] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState("");

  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/payment_member", {
      state: {
        location: location,
        vehicleType: vehicleType,
        packageMember: packageMember,
      },
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const filteredPaket = vehicleType
    ? paket.filter((p) => p.type === vehicleType.id)
    : [];

  // console.log(location.Quota);
  return (
    <>
      <div className="container overflow-auto">
        <NavbarMobile />
        <div className="flex flex-col items-start justify-start min-h-[60vh] w-full">
          <div className="flex w-full space-x-20 justify-start items-center py-3 bg-amber-300">
            <FaArrowLeftLong
              className="pl-3 w-10"
              onClick={() => handleBack()}
            />
            <h1 className="text-lg font-semibold px-3">Membership</h1>
          </div>

          <div className="w-full flex flex-col items-start justify-start px-3 py-3 font-medium border-b border-gray-300">
            <h1 className="text-xl">Paket Member</h1>
            <p className="text-sm text-gray-400">
              Pilih paket yang anda inginkan
            </p>
          </div>

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

          {vehicleType && (
            <ListComponent
              list={filteredPaket}
              title={"Pilih Paket Member"}
              search={"Cari Paket"}
              selected={packageMember}
              setSelected={setPackageMember}
              query={selectedPackage}
              setQuery={setSelectedPackage}
            />
          )}

          <div className="px-3 flex flex-col justify-start items-start w-full mt-3">
            <div className="relative rounded-md shadow-sm w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                <span className="text-gray-500 sm:text-sm">IDR</span>
              </div>
              <input
                id="price"
                name="price"
                type="text"
                placeholder="0.00"
                className="block w-full rounded-md border-0 py-3 pl-16 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={
                  packageMember
                    ? `${parseInt(packageMember.tariff).toLocaleString(
                        "id-ID"
                      )}`
                    : "-"
                }
                disabled
              />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-0 mt-3 py-3 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={location ? `${location.Used}/${location.Quota}` : "-"}
              disabled
            />
            <input
              type="text"
              className="block w-full rounded-md border-0 mt-3 py-3 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Masukan Plat nomor kendaraan"
            />
          </div>

          <div className="col-span-full px-3 w-full">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5">
              <div className="text-center">
                <HiPhoto
                  aria-hidden="true"
                  className="mx-auto h-12 w-12 text-gray-300"
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

          <div className="px-3 flex flex-col justify-start items-start w-full mt-3">
            <button
              className="flex items-center justify-center w-full bg-blue-500 text-white py-3 px-5 rounded-lg shadow-md cursor-pointer mt-5"
              onClick={handleProceed}
            >
              <span>Lanjutkan</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
