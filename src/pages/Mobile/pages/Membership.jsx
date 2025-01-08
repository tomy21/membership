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
  const [vehicleList, setVehicleList] = useState([]);
  const [periodeList, setPeriodeList] = useState([]);
  const [ProductList, setProductList] = useState([]);
  const [vehicleListData, setVehicleListData] = useState([]);
  const [tariff, setTariff] = useState(0);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedTypeVehicle, setSelectedTypeVehicle] = useState("");
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [errors, setErrors] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await Location.getAll();
        setLocation(response.data);
      } catch (error) {
        console.error("Failed to fetch location data:", error);
      }
    };

    const fetchVehicleType = async () => {
      const locationCode = selectedLocation.Code;
      if (selectedLocation) {
        try {
          const response = await MembershipProduct.getVehicleType(locationCode);
          setVehicleList(response.data);
        } catch (error) {
          console.error("Failed to fetch product data:", error);
        }
      }
    };

    const fetchPeriode = async () => {
      const type = selectedTypeVehicle.Name;
      const locationCode = selectedLocation.Code;
      if (selectedTypeVehicle) {
        try {
          const response = await MembershipProduct.getPeriode(
            type,
            locationCode
          );
          setPeriodeList(response.data);
        } catch (error) {
          console.error("Failed to fetch product data:", error);
        }
      }
    };

    const fetchProduct = async () => {
      const locationCode = selectedLocation.Code;
      const type = selectedTypeVehicle.Name;
      const periode = selectedPeriode.Name;
      if (selectedPeriode) {
        try {
          const response = await MembershipProduct.getProduct(
            periode,
            locationCode,
            type
          );
          setProductList(response.data);
        } catch (error) {
          console.error("Failed to fetch product data:", error);
        }
      }
    };

    const fetchPlateUser = async () => {
      const type = selectedTypeVehicle.Name;
      const locationCode = selectedLocation.Code;
      if (selectedTypeVehicle) {
        try {
          const response = await Users.getVehicleUnActiveLocation(
            type,
            locationCode
          );
          setVehicleListData(response.data);
        } catch (error) {
          console.error("Failed to fetch product data:", error);
        }
      }
    };

    if (selectedProduct) {
      setTariff(selectedProduct.Price);
      setStartDate(selectedProduct.StartDate);
      setEndDate(selectedProduct.EndDate);
    }

    fetchLocation();
    fetchVehicleType();
    fetchPeriode();
    fetchProduct();
    fetchPlateUser();
  }, [selectedLocation, selectedTypeVehicle, selectedPeriode, selectedProduct]);

  // console.log("data", selectedTypeVehicle);

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

  const vehicleTypes = Array.isArray(vehicleList)
    ? [
        ...new Set(
          vehicleList.map((item) => ({
            Code: item.vehicle_type,
            Name: item.vehicle_type,
          }))
        ),
      ]
    : [];

  const periodData = Array.isArray(periodeList)
    ? [
        ...new Set(
          periodeList.map((item) => ({
            Code: item.periode,
            Name: item.periode,
          }))
        ),
      ]
    : [];

  const productData = Array.isArray(ProductList)
    ? [
        ...new Set(
          ProductList.map((item) => ({
            Code: item.id,
            Name: item.product_name,
            StartDate: item.start_date,
            EndDate: item.end_date,
            Price: item.price,
          }))
        ),
      ]
    : [];

  const plateUsers = Array.isArray(vehicleListData)
    ? [
        ...new Set(
          vehicleListData.map((item) => ({
            Code: item.plate_number,
            Name: item.plate_number,
          }))
        ),
      ]
    : [];

  const handleProceed = () => {
    const newErrors = {};
    if (!selectedLocation)
      newErrors.selectedLocation = "Pilih lokasi terlebih dahulu";
    if (!selectedTypeVehicle)
      newErrors.selectedTypeVehicle = "Pilih tipe kendaraan terlebih dahulu";
    if (!selectedPeriode)
      newErrors.selectedPeriode = "Pilih periode terlebih dahulu";
    if (!selectedProduct)
      newErrors.selectedProduct = "Pilih produk terlebih dahulu";
    if (!selectedVehicle)
      newErrors.selectedVehicle = "Pilih nomor kendaraan terlebih dahulu";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const data = {
        type: "Member",
        // periodId: periodeId,
        productId: selectedProduct.Code,
        location: selectedLocation.Name,
        locationCode: selectedLocation.Code,
        plateNumber: selectedVehicle.Name,
        vehicleType: selectedTypeVehicle.Name,
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

  useEffect(() => {
    // Reset semua field di bawah lokasi
    if (selectedLocation) {
      setSelectedTypeVehicle("");
      setSelectedPeriode("");
      setSelectedProduct("");
      setSelectedVehicle("");
      setVehicleList([]);
      setPeriodeList([]);
      setProductList([]);
      setVehicleListData([]);
      setTariff(0);
      setStartDate(null);
      setEndDate(null);
    }
  }, [selectedLocation]);

  useEffect(() => {
    // Reset semua field di bawah tipe kendaraan
    if (selectedTypeVehicle) {
      setSelectedPeriode("");
      setSelectedProduct("");
      setSelectedVehicle("");
      setPeriodeList([]);
      setProductList([]);
      setVehicleListData([]);
      setTariff(0);
      setStartDate(null);
      setEndDate(null);
    }
  }, [selectedTypeVehicle]);

  useEffect(() => {
    // Reset semua field di bawah periode
    if (selectedPeriode) {
      setSelectedProduct("");
      setSelectedVehicle("");
      setProductList([]);
      setVehicleListData([]);
      setTariff(0);
      setStartDate(null);
      setEndDate(null);
    }
  }, [selectedPeriode]);

  useEffect(() => {
    // Reset kendaraan
    if (selectedProduct) {
      setSelectedVehicle("");
      setVehicleListData([]);
    }
  }, [selectedProduct]);

  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="flex w-full space-x-4 items-center py-4 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-md">
          <FaArrowLeftLong
            className="pl-3 w-10 cursor-pointer"
            onClick={handleBack}
          />
          <h1 className="text-lg font-semibold px-3">Pembelian Produk</h1>
        </div>

        <div className="overflow-y-auto max-h-full px-3 pb-10">
          <div className="w-full flex flex-col items-start justify-start py-3 font-medium border-b border-gray-300">
            <h1 className="text-xl">Paket Membership</h1>
            <p className="text-sm text-gray-400">
              Pilih paket yang kamu inginkan.
            </p>
          </div>

          {/* Lokasi Member */}
          <div className="flex flex-col w-full mt-2 items-start justify-start">
            <label className="text-gray-400">Lokasi Member</label>
            <ListComponent
              id={"lokasi-select"}
              name={"lokasi"}
              list={listLocation}
              title={"Pilih lokasi"}
              search={"Cari lokasi"}
              selected={selectedLocation}
              setSelected={setSelectedLocation}
              bottom={false}
            />
            {errors.selectedLocation && (
              <p className="text-red-500">{errors.selectedLocation}</p>
            )}
          </div>

          {/* Type Kendaraan */}
          <div className="flex flex-col w-full mt-2 items-start justify-start">
            <label className="text-gray-400">Type Kendaraan</label>
            <ListComponent
              id={"vehicle-select"}
              name={"vehicleTypes"}
              list={vehicleTypes}
              title={"Pilih type kendaraan"}
              search={"Cari type kendaraan"}
              selected={selectedTypeVehicle}
              setSelected={setSelectedTypeVehicle}
              bottom={false}
            />
            {errors.selectedTypeVehicle && (
              <p className="text-red-500">{errors.selectedTypeVehicle}</p>
            )}
          </div>

          {/* Periode Membership */}
          <div className="flex flex-col w-full mt-2 items-start justify-start">
            <label className="text-gray-400">Periode Membership</label>
            <ListComponent
              id="periode-select"
              name={"periode"}
              list={periodData}
              title={"Pilih periode"}
              search={"Cari periode"}
              selected={selectedPeriode}
              setSelected={setSelectedPeriode}
              bottom={false}
            />
            {errors.selectedPeriode && (
              <p className="text-red-500">{errors.selectedPeriode}</p>
            )}
          </div>

          {/* Produk Membership */}
          <div className="flex flex-col w-full mt-2 items-start justify-start">
            <label className="text-gray-400">Produk Membership</label>
            <ListComponent
              id="product-select"
              name="product"
              list={productData}
              title={"Pilih product"}
              search={"Cari product"}
              selected={selectedProduct}
              setSelected={setSelectedProduct}
              bottom={false}
            />
            {errors.selectedProduct && (
              <p className="text-red-500">{errors.selectedProduct}</p>
            )}
          </div>

          {/* Harga */}
          <div className=" mt-4 text-left">
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

          {/* Kendaraan */}
          <div className="flex flex-col w-full mt-2 items-start justify-start">
            <label className="text-gray-400">Kendaraan</label>
            <ListComponent
              id="vehicle-select"
              name="plateUsers"
              list={plateUsers}
              title={"Pilih Kendaraan"}
              search={"Cari kendaraan"}
              selected={selectedVehicle}
              setSelected={setSelectedVehicle}
              bottom={true}
            />
            {errors.selectedVehicle && (
              <p className="text-red-500">{errors.selectedVehicle}</p>
            )}
          </div>

          {/* Tombol Next */}
          <div className="flex flex-col w-full mt-5 mb-10">
            <button
              className={`w-full text-white py-3 px-5 rounded-lg shadow-md cursor-pointer mt-5  ${
                selectedLocation &&
                selectedTypeVehicle &&
                selectedPeriode &&
                selectedProduct &&
                selectedVehicle
                  ? "bg-blue-500"
                  : "bg-gray-500"
              }`}
              onClick={handleProceed}
              disabled={
                !(
                  selectedLocation &&
                  selectedTypeVehicle &&
                  selectedPeriode &&
                  selectedProduct &&
                  selectedVehicle
                )
              }
            >
              <span>Lanjutkan</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
