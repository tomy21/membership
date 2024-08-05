import React, { useState } from "react";
import { addProductBundleAll } from "../../../../../../api/apiProduct";
import { MdClose } from "react-icons/md";
import { format, addMonths, endOfMonth, startOfMonth } from "date-fns";

export default function AddModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");

  const handleStartMonthChange = (e) => {
    setStartMonth(e.target.value);
    calculateDates(e.target.value, duration);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    calculateDates(startMonth, e.target.value);
  };

  const calculateDates = (startMonthValue, durationValue) => {
    if (!startMonthValue || !durationValue) return;

    let startDate;
    if (durationValue === "1_year") {
      startDate = new Date("2024-02-01");
    } else {
      startDate = new Date(`2024-${startMonthValue}-01`);
    }

    let endDate;
    if (durationValue === "1_month") {
      endDate = endOfMonth(startDate);
    } else if (durationValue === "3_months") {
      endDate = endOfMonth(addMonths(startDate, 2));
    } else if (durationValue === "6_months") {
      endDate = endOfMonth(addMonths(startDate, 5));
    } else if (durationValue === "1_year") {
      endDate = endOfMonth(addMonths(startDate, 11));
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
      isDeleted: false,
      price: parseFloat(price),
    };

    try {
      const response = await addProductBundleAll.storeProduct(data);
      console.log(response.data);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("There was an error creating the bundle!", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 text-sm">
      <div className="bg-white rounded-lg w-1/3">
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
            <div className="mt-4">
              <label className="block text-gray-700">Bundle Name</label>
              <input
                type="text"
                className="w-full mt-2 px-4 py-2 border rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Start Month</label>
              <select
                className="w-full mt-2 px-4 py-2 border rounded-lg"
                value={startMonth}
                onChange={handleStartMonthChange}
                required
                disabled={duration === "1_year"}
              >
                <option value="">Select month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Duration</label>
              <select
                className="w-full mt-2 px-4 py-2 border rounded-lg"
                value={duration}
                onChange={handleDurationChange}
                required
              >
                <option value="">Select duration</option>
                <option value="1_month">1 Month</option>
                <option value="3_months">3 Months</option>
                <option value="6_months">6 Months</option>
                <option value="1_year">1 Year (Starts from February)</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Start Date</label>
              <input
                type="text"
                className="w-full mt-2 px-4 py-2 border rounded-lg"
                value={startDate}
                readOnly
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">End Date</label>
              <input
                type="text"
                className="w-full mt-2 px-4 py-2 border rounded-lg"
                value={endDate}
                readOnly
              />
            </div>
            <div className="mt-4">
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
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded mr-2"
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
