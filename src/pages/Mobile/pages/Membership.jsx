import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ListComponent from "../components/ListComponent";
import { HiPhoto } from "react-icons/hi2";
import Cookies from "js-cookie";
import { apiLocations } from "../../../api/apiLocations";
import {
  getProductById,
  getProductByLocation,
  verifikasiPlate,
} from "../../../api/apiProduct";

export default function Membership() {
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [tariff, setTariff] = useState(0);
  const [maxQuota, setMaxQuota] = useState(0);
  const [currentQuota, setCurrentQuota] = useState(0);
  const [dataLocation, setDataLocation] = useState([]);
  const [platNomor, setPlatNomor] = useState("");
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [productId, setProductId] = useState(0);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
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

  useEffect(() => {
    const fetchProduct = async () => {
      if (selectedLocation) {
        const response = await getProductByLocation.getByCode(selectedLocation);
        setDataLocation(response.data);
      }
    };

    fetchProduct();
  }, [selectedLocation]);

  const vehicleTypes = [
    ...new Set(
      dataLocation.map((item) => ({
        Code: item.Id,
        Name: item.VehicleType,
        Tariff: item.Price,
      })) || []
    ),
  ];

  useEffect(() => {
    const fetchMemberById = async () => {
      if (selectedVehicleType) {
        const response = await getProductById.getById(selectedVehicleType);
        setProductId(response.data.product.Id);
        setSelectedLocationName(response.data.product.LocationName);
        setTariff(response.data.product.Price);
        setMaxQuota(response.data.product.MaxQuote);
        setCurrentQuota(response.data.product.CurrentQuote);
      }
    };

    fetchMemberById();
  }, [selectedVehicleType]);

  const handleProceed = () => {
    const newErrors = {};
    if (!selectedLocation) newErrors.selectedLocation = "Lokasi harus dipilih";
    if (!selectedVehicleType)
      newErrors.selectedVehicleType = "Tipe kendaraan harus dipilih";
    if (!platNomor) newErrors.platNomor = "Plat nomor harus diisi";
    if (!file) newErrors.file = "Foto STNK harus diunggah";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      navigate("/payment_member", {
        state: {
          productId: productId,
          location: selectedLocationName,
          vehicleType: selectedVehicleType,
          tariff: tariff,
          platNomor: platNomor,
          file: file,
        },
      });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
      setFile(file);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (platNomor) {
        handleVerification();
      }
    }, 500); // Verifikasi setelah 500ms tidak ada input

    return () => clearTimeout(delayDebounceFn);
  }, [platNomor]);

  const handleVerification = async () => {
    try {
      const response = await verifikasiPlate.verifikasi(platNomor);
      console.log("FE", response);
      if (response && response.message === "Plat nomor sudah terdaftar") {
        setMessage(response.message);
      }
      if (response && response.message === "Plat nomor belum terdaftar") {
        setMessage("");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const handleChange = (e) => {
    const formattedValue = e.target.value.replace(/\s+/g, "").toUpperCase();
    setPlatNomor(formattedValue);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="container overflow-auto">
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

          <div className="flex flex-col w-full justify-start items-start m-auto px-3 mt-2">
            <label className="text-gray-400">Lokasi Member</label>
            <ListComponent
              list={location}
              title={"Pilih Lokasi"}
              search={"Cari Lokasi"}
              selected={selectedLocation}
              setSelected={setSelectedLocation}
            />
            {errors.selectedLocation && (
              <p className="text-red-500">{errors.selectedLocation}</p>
            )}
          </div>

          <div className="flex flex-col w-full justify-start items-start m-auto px-3 mt-2">
            <label className="text-gray-400">Type Kendaraan</label>
            <ListComponent
              list={vehicleTypes}
              title={"Pilih Type Kendaraan"}
              search={"Cari Type Kendaraan"}
              selected={selectedVehicleType}
              setSelected={setSelectedVehicleType}
            />
            {errors.selectedVehicleType && (
              <p className="text-red-500">{errors.selectedVehicleType}</p>
            )}
          </div>

          <div className="px-3 flex flex-col justify-start items-start w-full mt-3">
            <label htmlFor="price" className="text-gray-400">
              Harga
            </label>
            <div className="relative rounded-md shadow-sm w-full mt-2">
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
                  tariff
                    ? `${parseInt(tariff - 5000).toLocaleString("id-ID")}`
                    : "-"
                }
                disabled
              />
            </div>

            <label htmlFor="kuotaMember" className="mt-2 text-gray-400">
              Kuota Member
            </label>
            <input
              type="text"
              name="kuotaMember"
              id="kuotaMember"
              className="block w-full rounded-md border-0 mt-3 py-3 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={`${currentQuota} /${maxQuota}`}
              disabled
            />

            <label htmlFor="platnomor" className="mt-2 text-gray-400">
              Plat Nomor Kendaraan
            </label>
            {message && <p className="text-sm text-red-500 mt-2 ">{message}</p>}
            {errors.platNomor && (
              <p className="text-red-500">{errors.platNomor}</p>
            )}
            <input
              type="text"
              name="platnomor"
              id="platnomor"
              className="block w-full rounded-md border-0 mt-3 py-3 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="ex : B123ABC"
              value={platNomor}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-full px-3 w-full">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5">
              <div className="text-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mx-auto h-48 w-auto"
                  />
                ) : (
                  <HiPhoto
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-gray-300"
                  />
                )}
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
                      accept=".jpg, .png, .jpeg"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG up to 10MB
                </p>
                {errors.file && <p className="text-red-500">{errors.file}</p>}
              </div>
            </div>
          </div>

          <div className="px-3 flex flex-col justify-start items-start w-full mb-5">
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
