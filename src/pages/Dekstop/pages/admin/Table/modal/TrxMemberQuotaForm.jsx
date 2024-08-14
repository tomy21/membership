import React, { useState, useEffect } from "react";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export default function TrxMemberQuotaForm({ productId, onSubmit, previous }) {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [year, setYear] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const months = [
    { value: "01", label: "Januari" },
    { value: "02", label: "Februari" },
    { value: "03", label: "Maret" },
    { value: "04", label: "April" },
    { value: "05", label: "Mei" },
    { value: "06", label: "Juni" },
    { value: "07", label: "Juli" },
    { value: "08", label: "Agustus" },
    { value: "09", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
  ];

  useEffect(() => {
    if (selectedMonth && year) {
      const start = startOfMonth(new Date(year, selectedMonth - 1));
      const end = endOfMonth(new Date(year, selectedMonth - 1));
      setStartDate(format(start, "dd MMM yyyy"));
      setEndDate(format(end, "dd MMM yyyy"));
    } else {
      setStartDate("");
      setEndDate("");
    }
  }, [selectedMonth, year]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      Year: year,
      Month: selectedMonth,
      MemberProductId: productId,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative h-full w-full">
      <div className="flex flex-wrap justify-start items-start gap-3 px-5">
        <div className="w-72 flex flex-col justify-start items-start">
          <label
            htmlFor="month"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Bulan
          </label>
          <select
            name="month"
            id="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
          >
            <option value="" disabled>
              Pilih Bulan
            </option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        {selectedMonth && (
          <div className="w-72 flex flex-col justify-start items-start">
            <label
              htmlFor="year"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Tahun
            </label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={handleYearChange}
              placeholder="Tahun"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              required
            />
          </div>
        )}
      </div>

      {startDate && endDate && (
        <div className="flex flex-wrap justify-center items-center gap-3">
          <div className="w-72 flex flex-col justify-start items-start">
            <label
              htmlFor="start-date"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Tanggal Mulai
            </label>
            <input
              type="text"
              id="start-date"
              value={startDate}
              readOnly
              className="px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed w-full"
            />
          </div>
          <div className="w-72 flex flex-col justify-start items-start">
            <label
              htmlFor="end-date"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Tanggal Akhir
            </label>
            <input
              type="text"
              id="end-date"
              value={endDate}
              readOnly
              className="px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed w-full"
            />
          </div>
        </div>
      )}
      <div className="py-4 border-t border-slate-200 flex justify-end items-end absolute bottom-0 w-full">
        <button
          onClick={previous}
          className="mr-2 px-4 py-2 bg-indigo-500 text-white rounded-md"
        >
          <FaArrowLeftLong />
        </button>
        <button
          type="submit"
          className="mr-2 px-4 py-2 bg-indigo-500 text-white rounded-md"
        >
          <FaArrowRightLong />
        </button>
      </div>
    </form>
  );
}
