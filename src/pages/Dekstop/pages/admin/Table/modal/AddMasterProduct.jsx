import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { productBundleAll } from "../../../../../../api/apiProduct";
import Loading from "../../../../../Dekstop/components/Loading";
import { FaRegThumbsUp } from "react-icons/fa6";
import { startOfMonth, endOfMonth, addMonths } from "date-fns";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function AddMasterProduct({ isOpen, onClose, data }) {
  const [formProduct, setFormProduct] = useState({
    Name: "",
    StartDate: "",
    EndDate: "",
    IsDeleted: false,
    Price: "",
    CardActivateFee: "",
    Type: "",
    Fee: "",
    CreatedBy: "Admin",
  });

  const [monthsDuration, setMonthsDuration] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        try {
          const response = await productBundleAll.getById(data);
          if (response) {
            setFormProduct(response.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [data]);

  const formatDateToCustomString = (date) => {
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2); // Bulan mulai dari 0
    const year = date.getFullYear();
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  };

  const calculateDates = (months, selectedMonth) => {
    if (!months || !selectedMonth) return;

    const monthIndex = monthNames.indexOf(selectedMonth);
    const startMonthDate = new Date(new Date().getFullYear(), monthIndex, 1);

    const newStartDate = startOfMonth(startMonthDate);
    const newEndDate = endOfMonth(
      addMonths(newStartDate, parseInt(months) - 1)
    );

    const formattedStartDate = formatDateToCustomString(newStartDate); // Format manual
    const formattedEndDate = formatDateToCustomString(newEndDate); // Format manual

    setFormProduct({
      ...formProduct,
      StartDate: formattedStartDate,
      EndDate: formattedEndDate,
    });
  };

  const formatCurrency = (value) => {
    const parts = value.toString().split(",");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  };

  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9,]/g, "");
    setFormProduct({
      ...formProduct,
      [name]: numericValue,
    });
  };

  const handleMonthsChange = (e) => {
    const value = e.target.value;
    setMonthsDuration(value);
    calculateDates(value, selectedMonth);
  };

  // Handle perubahan pada dropdown bulan
  const handleMonthSelect = (e) => {
    const value = e.target.value;
    setSelectedMonth(value);
    calculateDates(monthsDuration, value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormProduct({
      ...formProduct,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Konversi StartDate dan EndDate sebelum dikirim ke API
      const startDateSQL = convertToSQLDateTime(formProduct.StartDate);
      const endDateSQL = convertToSQLDateTime(formProduct.EndDate);

      // Buat payload dengan tanggal yang sudah dikonversi
      const payload = {
        ...formProduct,
        StartDate: startDateSQL,
        EndDate: endDateSQL,
      };

      if (data) {
        const response = await productBundleAll.updateProduct(data, payload);
        setSuccessMessage(response.message);
      } else {
        const response = await productBundleAll.storeProduct(payload);
        setSuccessMessage(response.message);
      }

      setLoading(false);
      setShowSuccessModal(true);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong");
    }
  };

  const convertToSQLDateTime = (dateString) => {
    const [date, time] = dateString.split(", ");
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day} ${time}`;
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const handleClose = () => {
    setFormProduct("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-40">
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
                {data ? "Edit Product" : "Add New Product"}
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

              <div className="grid grid-cols-3 md:grid-cols-3 gap-4 text-start">
                <div>
                  <label
                    htmlFor="Name"
                    className="block mb-1 font-semibold text-sm text-gray-600"
                  >
                    Product Name
                  </label>
                  <input
                    id="Name"
                    type="text"
                    name="Name"
                    value={formProduct.Name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="Type"
                    className="block mb-1 font-semibold text-sm text-gray-600"
                  >
                    Product Type
                  </label>
                  <select
                    id="Type"
                    name="Type"
                    value={formProduct.Type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="" disabled>
                      Select Product Type
                    </option>
                    <option value="Mobil">Mobil</option>
                    <option value="Motor">Motor</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="Price"
                    className="block mb-1 font-semibold text-sm text-gray-600"
                  >
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">
                      Rp
                    </span>
                    <input
                      id="Price"
                      type="text"
                      name="Price"
                      value={formatCurrency(formProduct.Price)}
                      onChange={handleCurrencyChange}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="CardActivateFee"
                    className="block mb-1 font-semibold text-sm text-gray-600"
                  >
                    Card Activation Fee
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">
                      Rp
                    </span>
                    <input
                      id="CardActivateFee"
                      type="text"
                      name="CardActivateFee"
                      value={formatCurrency(formProduct.CardActivateFee)}
                      onChange={handleCurrencyChange}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="Fee"
                    className="block mb-1 font-semibold text-sm text-gray-600"
                  >
                    Additional Fee
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">
                      Rp
                    </span>
                    <input
                      id="Fee"
                      type="text"
                      name="Fee"
                      value={formatCurrency(formProduct.Fee)}
                      onChange={handleCurrencyChange}
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-300 w-full my-5"></div>

              <div className="grid grid-cols-2 gap-4 text-start">
                <div>
                  <label
                    htmlFor="monthsDuration"
                    className="block mb-1 font-semibold text-sm text-gray-600"
                  >
                    Duration Members
                  </label>
                  <input
                    id="monthsDuration"
                    type="number"
                    name="monthsDuration"
                    value={monthsDuration}
                    onChange={handleMonthsChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan jumlah bulan"
                  />
                </div>

                <div>
                  <label
                    for="selectedMonth"
                    className="block mb-1 font-semibold text-sm text-gray-600"
                  >
                    Selected Month
                  </label>
                  <select
                    id="selectedMonth"
                    name="selectedMonth"
                    value={selectedMonth}
                    onChange={handleMonthSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Pilih Bulan</option>
                    {monthNames.map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-b border-slate-300 w-full my-5"></div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-start">
                <div>
                  <label
                    htmlFor="StartDate"
                    className="block mb-1 font-semibold text-sm text-gray-600"
                  >
                    Start Date
                  </label>
                  <input
                    id="StartDate"
                    type="text" // Gunakan tipe text agar bisa diisi secara manual jika perlu
                    name="StartDate"
                    value={formProduct.StartDate} // Format custom dd/mm/yyyy HH:mm:ss
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="EndDate"
                    className="block mb-1 font-semibold text-sm text-gray-600"
                  >
                    End Date
                  </label>
                  <input
                    id="EndDate"
                    type="text" // Gunakan tipe text agar bisa diisi secara manual jika perlu
                    name="EndDate"
                    value={formProduct.EndDate} // Format custom dd/mm/yyyy HH:mm:ss
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-200 focus:outline-none"
                  />
                </div>
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
