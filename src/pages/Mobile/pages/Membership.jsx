import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ListComponent from "../components/ListComponent";
import { HiPhoto } from "react-icons/hi2";
import Cookies from "js-cookie";
import { apiLocations } from "../../../api/apiLocations";
import {
  getBundleById,
  getBundleByType,
  getProductAll,
  getProductById,
  getProductByLocation,
  productBundleAll,
  verifikasiPlate,
} from "../../../api/apiProduct";

export default function Membership() {
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [tariff, setTariff] = useState(0);
  const [currentQuota, setCurrentQuota] = useState(0);
  const [dataLocation, setDataLocation] = useState([]);
  const [platNomor, setPlatNomor] = useState("");
  const [productId, setProductId] = useState(0);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [dataFileStnk, setFileSTNK] = useState(null);
  const [errors, setErrors] = useState({});
  const [productBundle, setProductBundle] = useState([]);
  const [selectBundleProduct, setSelectBundleProduct] = useState("");
  const [periodeId, setPeriodId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingPlate, setLoadingPlate] = useState(false);
  const [editEnabled, setEditEnabled] = useState(false); // State untuk mengontrol tombol edit
  const [showPopup, setShowPopup] = useState(false); // State untuk mengontrol popup edit
  const [timeoutId, setTimeoutId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigate = useNavigate();

  // Fetch Locations
  useEffect(() => {
    const fetchLocation = async () => {
      const token = Cookies.get("refreshToken");
      if (token) {
        try {
          const response = await getProductAll.getAll();
          if (response.data && Array.isArray(response.data.products)) {
            setLocation(response.data.products);
          } else {
            console.error("Invalid response format");
          }
        } catch (error) {
          console.error("Failed to fetch location data:", error);
        }
      }

      if (!token || token === undefined) {
        navigate("/");
      }
    };
    fetchLocation();
  }, [navigate]);

  // Fetch Product by Location
  useEffect(() => {
    const fetchProduct = async () => {
      if (selectedLocation) {
        try {
          const response = await productBundleAll.getByIdProduct(
            selectedLocation.IdProduct
          );
          const responseQuota = await productBundleAll.getProductQuote(
            selectedLocation.IdProduct
          );
          setPeriodId(responseQuota.data[0].Id ?? responseQuota.data.Id);
          console.log(responseQuota.data[0].Id ?? responseQuota.data.Id);
          setDataLocation(response.data);
        } catch (error) {
          console.error("Failed to fetch product data:", error);
        }
      }
    };
    fetchProduct();
  }, [selectedLocation]);

  // Vehicle Types List
  const vehicleTypes = Array.isArray(dataLocation)
    ? [
        ...new Set(
          dataLocation.map((item) => ({
            Code: item.id,
            Name: item.Name,
            Vehicle: item.Type,
          }))
        ),
      ]
    : [];

  const listLocation = Array.isArray(location)
    ? [
        ...new Set(
          location.map((item) => ({
            Code: item.LocationCode,
            Name: item.LocationName,
            IdProduct: item.Id,
          }))
        ),
      ]
    : [];

  // Fetch Member by Vehicle Type
  useEffect(() => {
    const fetchMemberById = async () => {
      if (selectedVehicleType.Code) {
        try {
          const responseBundle = await productBundleAll.getById(
            selectedVehicleType.Code
          );

          setTariff(responseBundle.data.Price);
          setProductBundle(responseBundle?.data);
          setProductId(responseBundle.data.MemberProductId);
          setStartDate(responseBundle.data?.StartDate);
          setEndDate(responseBundle.data?.EndDate);
        } catch (error) {
          console.error("Failed to fetch member data:", error);
        }
      }
    };
    fetchMemberById();
  }, [selectedVehicleType, selectBundleProduct]);

  // Handle Proceed to Next Step
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
      const data = {
        type: "Member",
        periodId: periodeId,
        productId: productId,
        location: selectedLocation.Name,
        vehicleType: selectedVehicleType.Name,
        tariff: tariff,
        platNomor: platNomor,
        file: file,
        startDate: startDate,
        endDate: endDate,
      };
      navigate("/payment_member", {
        state: data,
      });
    }
  };

  // File Upload Handler
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  // File Change Handler with Preview
  const handleFileChange = (event) => {
    setLoading(true);
    const fileStnk = event.target.files[0];
    if (fileStnk) {
      const fileUrl = URL.createObjectURL(fileStnk);
      setPreview(fileUrl);
      setFileSTNK(fileStnk);
      setLoading(false);
    }
  };

  // Fetch Plate Number from Image
  useEffect(() => {
    if (file) {
      const fetchPlateNumber = async () => {
        setLoadingPlate(true);
        const formData = new FormData();
        formData.append("upload", file);
        const apiToken = "c6f266f5f06d9bbbb9b1688722211a9f2e7770d0";
        try {
          const response = await fetch(
            "https://api.platerecognizer.com/v1/plate-reader/",
            {
              method: "POST",
              headers: {
                Authorization: `Token ${apiToken}`,
              },
              body: formData,
            }
          );

          const result = await response.json();
          if (result.results && result.results.length > 0) {
            setPlatNomor(result.results[0].plate.toUpperCase());
          } else {
            setEditEnabled(true); // Jika tidak terdeteksi, izinkan edit
          }
        } catch (error) {
          console.error("Error:", error);
          setEditEnabled(true); // Jika terjadi error, izinkan edit
        } finally {
          setLoadingPlate(false);
        }
      };
      fetchPlateNumber();

      // Timeout untuk edit
      const timeout = setTimeout(() => {
        setEditEnabled(true);
      }, 3000); // Tunggu 3 detik sebelum mengizinkan edit

      setTimeoutId(timeout);
    }
  }, [file]);

  const handleChange = (e) => {
    if (editEnabled) {
      const formattedValue = e.target.value.replace(/\s+/g, "").toUpperCase();
      setPlatNomor(formattedValue);
    }
  };

  const handleEdit = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
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
              className="pl-3 w-10 cursor-pointer"
              onClick={handleBack}
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
              list={listLocation}
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
            <label className="text-gray-400">Product Membership</label>
            <ListComponent
              list={vehicleTypes}
              title={"Pilih Product Membership"}
              search={"Cari Product Membership"}
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
                  tariff !== 0
                    ? `${parseInt(tariff).toLocaleString("id-ID")}`
                    : "Price not available"
                }
                disabled
              />
            </div>

            <label htmlFor="platnomor" className="mt-2 text-gray-400">
              Plat Nomor Kendaraan
            </label>
            {message && <p className="text-sm text-red-500 mt-2 ">{message}</p>}
            {errors.platNomor && (
              <p className="text-red-500">{errors.platNomor}</p>
            )}
            <div className="relative">
              <input
                type="file"
                name="file"
                id="file"
                className="block w-full mt-3 py-3 pl-5 pr-20 text-gray-900 border border-slate-300 rounded-md"
                onChange={handleFileUpload}
                accept=".jpg, .png, .jpeg"
              />
              <input
                type="text"
                name="platnomor"
                id="platnomor"
                className="block w-full rounded-md border-0 mt-3 py-3 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="ex : B123ABC"
                value={platNomor}
                onChange={handleChange}
                disabled={!editEnabled}
                readOnly
              />
              {loadingPlate && (
                <div className="absolute right-0 top-20 mt-3 mr-5 flex items-center">
                  <div className="loader"></div>
                </div>
              )}
              {!loadingPlate && editEnabled && (
                <button
                  className="absolute right-0 top-20 mt-3 mr-5 text-blue-500"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
            </div>
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

      {/* Popup Edit */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Plat Nomor</h2>
            <input
              type="text"
              className="block w-full rounded-md border-0 mt-3 py-3 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="ex : B123ABC"
              value={platNomor}
              onChange={handleChange}
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                onClick={closePopup}
              >
                Simpan
              </button>
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded-lg"
                onClick={closePopup}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
