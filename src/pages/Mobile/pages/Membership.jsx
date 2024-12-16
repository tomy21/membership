import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ListComponent from "../components/ListComponent";
import {
  Location,
  MembershipProduct,
  Users,
} from "../../../api/apiMembershipV2";

export default function Membership() {
  const [location, setLocation] = useState([]);
  const [tariff, setTariff] = useState(0);
  const [dataLocation, setDataLocation] = useState([]);
  const [productId, setProductId] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [errors, setErrors] = useState({});
  const [vehicleList, setVehicleList] = useState([]);
  const [periodeId, setPeriodId] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigate = useNavigate();

  // Fetch Product by Location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await Location.getAll();
        setLocation(response.data);
      } catch (error) {
        console.error("Failed to fetch location data:", error);
      }
    };
    const fetchProduct = async () => {
      const locationCode = selectedLocation.Code;
      if (selectedLocation) {
        try {
          const response = await MembershipProduct.getByLocationCode(
            locationCode
          );
          setDataLocation(response.data);
        } catch (error) {
          console.error("Failed to fetch product data:", error);
        }
      }
    };

    const fetchVehicle = async () => {
      const typeVehicle = selectedVehicleType.Vehicle;
      if (selectedLocation) {
        try {
          const response = await Users.getVehicleByType(typeVehicle);
          console.log(response.data);
          setVehicleList(response.data);
        } catch (error) {
          console.error("Failed to fetch product data:", error);
        }
      }
    };

    if (selectedVehicleType) {
      setTariff(selectedVehicleType.Tariff);
      setStartDate(selectedVehicleType.StartDate);
      setEndDate(selectedVehicleType.EndDate);
    }

    fetchVehicle();
    fetchLocation();
    fetchProduct();
  }, [selectedLocation, selectedVehicleType]);

  // Vehicle Types List
  const vehicleTypes = Array.isArray(dataLocation)
    ? [
        ...new Set(
          dataLocation.map((item) => ({
            Code: item.id,
            Name: item.product_name,
            Vehicle: item.vehicle_type,
            Tariff: item.price,
            StartDate: item.start_date,
            EndDate: item.end_date,
          }))
        ),
      ]
    : [];

  const listLocation = Array.isArray(location)
    ? [
        ...new Set(
          location.map((item) => ({
            Code: item.location_code,
            Name: item.location_name,
          }))
        ),
      ]
    : [];

  const vehicleListData = Array.isArray(vehicleList)
    ? [
        ...new Set(
          vehicleList.map((item) => ({
            Code: item.id,
            Name: item.plate_number,
          }))
        ),
      ]
    : [];

  const handleProceed = () => {
    const newErrors = {};
    if (!selectedLocation)
      newErrors.selectedLocation = "Location must be select";
    if (!selectedVehicleType)
      newErrors.selectedVehicleType = "Vehicle type must be select";
    if (!selectedVehicle)
      newErrors.selectedVehicle = "Vehicle number must be select";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const data = {
        type: "Member",
        // periodId: periodeId,
        productId: selectedVehicleType.Code,
        location: selectedLocation.Name,
        locationCode: selectedLocation.Code,
        plateNumber: selectedVehicle.Name,
        vehicleType: selectedVehicleType.Vehicle,
        tariff: tariff,
        startDate: startDate,
        endDate: endDate,
      };
      navigate("/payment_member", {
        state: data,
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="container overflow-auto  min-h-screen">
        <div className="flex w-full space-x-4 items-center py-4 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-md">
          <FaArrowLeftLong
            className="pl-3 w-10 cursor-pointer"
            onClick={handleBack}
          />
          <h1 className="text-lg font-semibold px-3">Pembelian Produk</h1>
        </div>

        <div className="w-full flex flex-col items-start justify-start px-3 py-3 font-medium border-b border-gray-300">
          <h1 className="text-xl">Paket Membership</h1>
          <p className="text-sm text-gray-400">
            Pilih paket yang kamu inginkan.{" "}
          </p>
        </div>

        <div className="flex flex-col w-full justify-start items-start m-auto px-3 mt-2">
          <label className="text-gray-400">Lokasi Member</label>
          <ListComponent
            list={listLocation}
            title={"Select Location"}
            search={"Search Location"}
            selected={selectedLocation}
            setSelected={setSelectedLocation}
          />
          {errors.selectedLocation && (
            <p className="text-red-500">{errors.selectedLocation}</p>
          )}
        </div>

        <div className="flex flex-col w-full justify-start items-start m-auto px-3 mt-2">
          <label className="text-gray-400">Produk Membership</label>
          <ListComponent
            list={vehicleTypes}
            title={"Select Product Membership"}
            search={"Search Product Membership"}
            selected={selectedVehicleType}
            setSelected={setSelectedVehicleType}
          />
          {errors.selectedVehicleType && (
            <p className="text-red-500">{errors.selectedVehicleType}</p>
          )}
        </div>

        <div className="px-4 mt-4 text-left">
          <label
            htmlFor="price"
            className="text-gray-600 font-medium mb-2 block"
          >
            Harga
          </label>
          <div className="relative bg-gray-100 rounded-lg shadow-inner p-3">
            <div className="absolute inset-y-0 left-4 flex items-center">
              <span className="text-gray-500 font-medium">IDR</span>
            </div>
            <input
              id="price"
              name="price"
              type="text"
              disabled
              value={
                tariff !== 0
                  ? `${parseInt(tariff).toLocaleString("id-ID")}`
                  : "0"
              }
              className="w-full bg-transparent pl-16 text-gray-800 text-lg font-medium outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col w-full justify-start items-start m-auto px-3 mt-2">
          <label className="text-gray-400">Kendaraan</label>
          <ListComponent
            list={vehicleListData}
            title={"Select your vehicle"}
            search={"Search Vehicle"}
            selected={selectedVehicle}
            setSelected={setSelectedVehicle}
          />
          {errors.selectedVehicle && (
            <p className="text-red-500">{errors.selectedVehicle}</p>
          )}
        </div>

        <div className="px-3 flex flex-col justify-start items-start w-full mt-10">
          <button
            className="flex items-center justify-center w-full bg-blue-500 text-white py-3 px-5 rounded-lg shadow-md cursor-pointer mt-5"
            onClick={handleProceed}
          >
            <span>Next</span>
          </button>
        </div>
      </div>
    </>
  );
}
