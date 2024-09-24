import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaRegThumbsUp } from "react-icons/fa6";
import Loading from "../../../../components/Loading";
import {
  getBundleByType,
  storeProduct,
} from "../../../../../../api/apiProduct";
import { apiLocations } from "../../../../../../api/apiLocations";

export default function AddModal({ isOpen, onClose, onSuccess }) {
  const [formProduct, setFormProduct] = useState({
    ProductName: "",
    ProductDescription: "",
    VehicleType: "",
    DateActive: "",
    MaxQuote: "",
    IsDeleted: false,
    LocationCode: "",
    LocationName: "",
    MemberProductBundleId: "",
    isDeleted: 0,
  });

  const [dataProduct, setDataProduct] = useState([]);
  const [dataLocation, setDataLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [vehicleOptions, setVehicleOptions] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseBundle = await getBundleByType.getByType(
          formProduct.Type
        );
        setDataProduct(responseBundle.data);

        // Mengatur DateActive berdasarkan StartDate dari response
      } catch (err) {
        setError("Failed to fetch product data.");
      }
    };

    const fetchLocation = async () => {
      try {
        const responseData = await apiLocations.getLocationActive();
        setDataLocation(responseData);
      } catch (error) {
        setError("Failed to fetch location data.");
      }
    };

    fetchLocation();
    if (formProduct.Type) {
      fetchProduct();
    }
  }, [formProduct.Type]);

  useEffect(() => {
    if (formProduct.Type) {
      setVehicleOptions(
        dataProduct.map((data) => ({
          value: data.id,
          label: data.Name,
        }))
      );
    } else {
      setVehicleOptions([]);
    }
  }, [dataProduct, formProduct.Type]);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const handleClose = () => {
    setFormProduct({
      ProductName: "",
      ProductDescription: "",
      VehicleType: "",
      DateActive: "",
      MaxQuote: "",
      IsDeleted: false,
      LocationCode: "",
      LocationName: "",
      MemberProductBundleId: "",
    });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulasi request submit data ke API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await storeProduct.createProduct(formProduct);
      console.log(response);
      setLoading(false);
      setShowSuccessModal(true);
      onSuccess(); // Memanggil fungsi `onSuccess` jika ada
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormProduct({
      ...formProduct,
      [name]: value,
    });

    // Ketika MemberProductBundleId berubah, ambil StartDate dari bundle yang dipilih
    if (name === "MemberProductBundleId") {
      const selectedBundle = dataProduct.find((bundle) => bundle.id === value);
      if (selectedBundle) {
        setFormProduct((prevForm) => ({
          ...prevForm,
          DateActive: selectedBundle.StartDate, // Mengisi DateActive dengan StartDate dari bundle
        }));
      }
    }

    // Ketika LocationCode berubah, kita simpan data lokasi yang dipilih
    if (name === "LocationCode") {
      const location = dataLocation.find((loc) => loc.LocationCode === value);
      if (location) {
        setSelectedLocation(location);
        setFormProduct((prevForm) => ({
          ...prevForm,
          LocationName: location.Name, // Set LocationName in formProduct
        }));
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      {loading ? (
        <Loading />
      ) : showSuccessModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="flex flex-col justify-center items-center space-y-3 mb-10">
              <FaRegThumbsUp size={40} className="text-green-600" />
              <h3 className="text-lg">{successMessage}</h3>
            </div>
            <button
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300"
              onClick={handleCloseSuccessModal}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg w-full md:w-1/2 lg:w-1/2 max-h-[90vh] flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-700">
              {"Add New Product"}
            </h3>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>

          <form className="p-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 text-start mb-2">
              <div>
                <label className="block mb-1 font-semibold text-sm text-gray-600">
                  Product Name
                </label>
                <input
                  type="text"
                  name="ProductName"
                  value={formProduct.ProductName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-sm text-gray-600">
                  Vehicle Type
                </label>
                <select
                  name="Type"
                  value={formProduct.VehicleType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="Mobil">Mobil</option>
                  <option value="Motor">Motor</option>
                </select>
              </div>

              {formProduct.Type && vehicleOptions.length > 0 && (
                <div>
                  <label className="block mb-2 font-semibold text-sm text-gray-600">
                    Product Bundle
                  </label>
                  <select
                    name="MemberProductBundleId"
                    value={formProduct.MemberProductBundleId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="" disabled>
                      Select Product Bundle
                    </option>
                    {vehicleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 text-start mb-5">
              <div>
                <label className="text-start block mb-1 font-semibold text-sm text-gray-600">
                  Location Code
                </label>
                <select
                  name="LocationCode"
                  value={formProduct.LocationCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select Location
                  </option>
                  {dataLocation.map((data, index) => (
                    <option key={index} value={data.LocationCode}>
                      {data.LocationCode}
                    </option>
                  ))}
                </select>
              </div>

              {/* Display input for Location Name if location is selected */}
              {selectedLocation && (
                <div>
                  <label className="block mb-1 font-semibold text-sm text-gray-600">
                    Location Name
                  </label>
                  <input
                    type="text"
                    name="LocationName"
                    value={selectedLocation.Name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
              )}

              <div>
                <label className="block mb-1 font-semibold text-sm text-gray-600">
                  Quota
                </label>
                <input
                  type="text"
                  name="MaxQuote"
                  value={formProduct.MaxQuote}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-start mb-5">
              <div>
                <label className="block mb-1 font-semibold text-sm text-gray-600">
                  Date Active
                </label>
                <input
                  type="text"
                  name="DateActive"
                  value={formProduct.DateActive}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>

              <div>
                <label className="text-start block mb-1 font-semibold text-sm text-gray-600">
                  Location Code
                </label>
                <select
                  name="LocationCode"
                  value={formProduct.LocationCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select Location
                  </option>
                  {dataLocation.map((data, index) => (
                    <option key={index} value={data.LocationCode}>
                      {data.LocationCode}
                    </option>
                  ))}
                </select>
              </div>

              {selectedLocation && (
                <div>
                  <label className="block mb-1 font-semibold text-sm text-gray-600">
                    Location Name
                  </label>
                  <input
                    type="text"
                    name="LocationName"
                    value={selectedLocation.Name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block mb-1 font-semibold text-sm text-gray-600 text-start">
                Product Description
              </label>
              <textarea
                name="ProductDescription"
                value={formProduct.ProductDescription}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="border-b border-slate-300 w-full my-5"></div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className={`px-5 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-colors ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
