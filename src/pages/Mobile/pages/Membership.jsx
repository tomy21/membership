import React, { useEffect, useState } from "react";
// import NavbarMobile from "../components/NavbarMobile";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ListComponent from "../components/ListComponent";
import { HiPhoto } from "react-icons/hi2";
import Cookies from "js-cookie";
import { apiLocations } from "../../../api/apiLocations";

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

export default function Membership() {
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const [vehicleType, setVehicleType] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocation = async () => {
      const token = Cookies.get("refreshToken");
      if (token) {
        try {
          const response = await apiLocations.getLocation();
          setLocation(response);
        } catch (error) {
          console.error("Failed to fetch location data:", error);
        }
      }
    };

    fetchLocation();
  }, []);

  const handleProceed = () => {
    navigate("/payment_member", {
      state: {
        location: location,
        vehicleType: vehicleType,
      },
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  // console.log(location.Quota);
  return (
    <>
      <div className="container overflow-auto">
        {/* <NavbarMobile /> */}
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
            list={location}
            title={"Pilih Lokasi"}
            search={"Cari Lokasi"}
            selected={selectedLocation}
            setSelected={setSelectedLocation}
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
          {/* 
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
          )} */}

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
                    ? `${parseInt(vehicleType.tariff).toLocaleString("id-ID")}`
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
