import React, { useState } from "react";
import { addProductBundleAll } from "../../../../../../api/apiProduct";
import { MdClose } from "react-icons/md";
import { format, addMonths, endOfMonth } from "date-fns";

export default function AddModal({ isOpen, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [typeKendaraan, setTypeKendaraan] = useState("");

  const handleStartMonthChange = (e) => {
    setStartMonth(e.target.value);
    calculateDates(e.target.value, duration);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    calculateDates(startMonth, e.target.value);
  };

  const calculateDates = (startMonthValue, durationValue) => {
    if (!durationValue) return;

    let startDate;
    let endDate;
    let year = 2024; // Tahun awal yang diinginkan

    // Atur tanggal mulai berdasarkan durasi dan bulan awal
    if (durationValue === "1_year") {
      startDate = new Date(`${year}-02-01`);
      endDate = endOfMonth(addMonths(startDate, 11));
    } else {
      if (!startMonthValue) return;
      startDate = new Date(`${year}-${startMonthValue}-01`);

      if (durationValue === "1_month") {
        endDate = endOfMonth(startDate);
      } else if (durationValue === "3_months") {
        endDate = endOfMonth(addMonths(startDate, 2));
      } else if (durationValue === "6_months") {
        endDate = endOfMonth(addMonths(startDate, 5));
      }
    }

    setStartDate(format(startDate, "yyyy-MM-dd"));
    setEndDate(format(endDate, "yyyy-MM-dd"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      startDate,
      endDate,
      typeKendaraan,
      isDeleted: false,
      price: parseFloat(price),
    };

    try {
      const response = await addProductBundleAll.storeProduct(data);
      console.log(response);
      if (response.statusCode === 201) {
        onSuccess(true, response.message);
      } else {
        onSuccess(false, "There was an error creating the bundle!");
      }
    } catch (error) {
      console.error("There was an error creating the bundle!", error);
      onSuccess(false, "There was an error creating the bundle!");
    }
  };

  if (!isOpen) return null;

  const getStartMonthOptions = () => {
    switch (duration) {
      case "1_month":
        return [
          { value: "01", label: "January" },
          { value: "02", label: "February" },
          { value: "03", label: "March" },
          { value: "04", label: "April" },
          { value: "05", label: "May" },
          { value: "06", label: "June" },
          { value: "07", label: "July" },
          { value: "08", label: "August" },
          { value: "09", label: "September" },
          { value: "10", label: "October" },
          { value: "11", label: "November" },
          { value: "12", label: "December" },
        ];
      case "3_months":
        return [
          { value: "02", label: "February" },
          { value: "05", label: "May" },
          { value: "08", label: "August" },
          { value: "11", label: "November" },
        ];
      case "6_months":
        return [
          { value: "02", label: "February" },
          { value: "08", label: "August" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 text-sm">
      <div className="bg-white rounded-lg w-1/2">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center border-b border-slate-00 py-3">
            <h3 className="text-xl font-semibold">Create a new product</h3>
            <button
              className="text-gray-500 hover:text-gray-700 w-5 h-5"
              onClick={onClose}
            >
              <MdClose />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="text-start">
            <div className="flex flex-row justify-between items-center gap-x-2">
              <div className="mt-2 w-1/2">
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  className="w-full mt-2 px-4 py-2 border rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mt-2 w-1/2">
                <label className="block text-gray-700">Duration</label>
                <select
                  className="w-full mt-2 px-4 py-2 border rounded-lg"
                  value={duration}
                  onChange={handleDurationChange}
                  required
                >
                  <option value="">Select Duration</option>
                  <option value="1_month">1 Month</option>
                  <option value="3_months">3 Months</option>
                  <option value="6_months">6 Months</option>
                  <option value="1_year">1 Year (Starts from February)</option>
                </select>
              </div>
            </div>
            {duration && duration !== "1_year" && (
              <div className="mt-2">
                <label className="block text-gray-700">Start Month</label>
                <select
                  className="w-full mt-2 px-4 py-2 border rounded-lg"
                  value={startMonth}
                  onChange={handleStartMonthChange}
                  required
                >
                  <option value="">Select month</option>
                  {getStartMonthOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="mt-2">
              <label className="block text-gray-700">Type Vehicle</label>
              <select
                className="w-full mt-2 px-4 py-2 border rounded-lg"
                value={typeKendaraan}
                onChange={(e) => setTypeKendaraan(e.target.value)}
                required
              >
                <option value="">Select Type</option>
                <option value="Motor">Motor</option>
                <option value="Mobil">Mobil</option>
              </select>
            </div>
            <div className="mt-2 flex justify-between items-center w-full gap-x-2">
              <div className="w-1/2">
                <label className="block text-gray-700">Start Date</label>
                <input
                  type="text"
                  className="w-full mt-2 px-4 py-2 border rounded-lg"
                  value={startDate}
                  readOnly
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">End Date</label>
                <input
                  type="text"
                  className="w-full mt-2 px-4 py-2 border rounded-lg"
                  value={endDate}
                  readOnly
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                step="0.01"
                className="w-full mt-2 px-4 py-2 border rounded-lg"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="bg-red-300 hover:bg-red-400 text-red-700 px-4 py-2 rounded mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
