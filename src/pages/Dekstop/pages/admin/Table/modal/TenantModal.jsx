import React, { useState } from "react";
import Loading from "../../../../components/Loading";
import { FaRegThumbsUp } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

export default function TenantModal({ isOpen, onClose, onSuccess, message }) {
  const [formProduct, setFormProduct] = useState({
    Name: "",
    UserName: "",
    Description: "",
    Email: "",
    Password: "",
    PhoneNumber: "",
    Pin: "",
    Address: "",
    City: "",
    Region: "",
    PostalCode: "",
    Country: "",
    Fax: "",
  });

  const [dataLocation, setDataLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      //   await storeProduct.createProduct(formProduct);
      setLoading(false);
      setSuccessMessage("Product successfully added!"); // Set success message
      setShowSuccessModal(true); // Tampilkan modal sukses
      if (onSuccess) {
        onSuccess(true);
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong");
    }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormProduct({
      ...formProduct,
      [name]: value,
    });

    // Ketika LocationCode berubah, kita simpan data lokasi yang dipilih
    if (name === "LocationCode") {
      const location = dataLocation.find((loc) => loc.LocationCode === value);
      const quotaMobil = parseInt(location.QuotaMobil) || 0;
      const quotaMotor = parseInt(location.QuotaMotor) || 0;
      const maxQuote = quotaMobil + quotaMotor;
      if (location) {
        setSelectedLocation(location);
        setFormProduct((prevForm) => ({
          ...prevForm,
          LocationName: location.LocationName,
          MaxQuote: maxQuote,
        }));
      }
    }
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-900 bg-opacity-50">
        {loading ? (
          <Loading />
        ) : showSuccessModal ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="flex flex-col justify-center items-center space-y-3 mb-10">
                <FaRegThumbsUp size={40} className="text-green-600" />
                <h3 className="text-lg">{successMessage}</h3>{" "}
                {/* Tampilkan successMessage */}
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
                  <label
                    htmlFor="ProductName"
                    className="block mb-1 font-semibold text-sm text-gray-600"
                  >
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
                  <label
                    htmlFor="VehicleType"
                    className="block mb-1 font-semibold text-sm text-gray-600"
                  >
                    Vehicle Type
                  </label>
                  <select
                    name="VehicleType"
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

                <div>
                  <label
                    htmlFor="LocationCode"
                    className="text-start block mb-1 font-semibold text-sm text-gray-600"
                  >
                    Location Code
                  </label>
                  <select
                    id="LocationCode"
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
              </div>

              <div className="grid grid-cols-3 gap-4 text-start mb-5">
                {selectedLocation && (
                  <>
                    <div>
                      <label
                        htmlFor="LocationName"
                        className="block mb-1 font-semibold text-sm text-gray-600"
                      >
                        Location Name
                      </label>
                      <input
                        id="LocationName"
                        type="text"
                        name="LocationName"
                        value={selectedLocation.LocationName}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="MaxQuoteMobil"
                        className="block mb-1 font-semibold text-sm text-gray-600"
                      >
                        Quota Mobil
                      </label>
                      <input
                        id="MaxQuoteMobil"
                        type="text"
                        name="MaxQuoteMobil"
                        value={selectedLocation.QuotaMobil}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="MaxQuoteMotor"
                        className="block mb-1 font-semibold text-sm text-gray-600"
                      >
                        Quota Motor
                      </label>
                      <input
                        id="MaxQuoteMotor"
                        type="text"
                        name="MaxQuoteMotor"
                        value={selectedLocation.QuotaMotor}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="DateActive"
                        className="block mb-1 font-semibold text-sm text-gray-600"
                      >
                        Date Active
                      </label>
                      <input
                        id="DateActive"
                        type="date"
                        name="DateActive"
                        value={formProduct.DateActive}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </>
                )}
              </div>

              <div>
                <label
                  htmlFor="ProductDescription"
                  className="block mb-1 font-semibold text-sm text-gray-600 text-start"
                >
                  Product Description
                </label>
                <textarea
                  id="ProductDescription"
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
    </>
  );
}
