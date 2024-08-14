import React, { useEffect, useState } from "react";
import Select from "react-select";
import { apiLocations } from "../../../../../../api/apiLocations";
import { FaArrowRightLong } from "react-icons/fa6";

export default function MemberProductForm({ onSubmit, preview }) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [dateActive, setDateActive] = useState("");
  const [maxQuote, setMaxQuote] = useState("");
  const [locationCode, setLocationCode] = useState("");
  const [locationName, setLocationName] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ProductName: productName,
      ProductDescription: productDescription,
      VehicleType: vehicleType,
      DateActive: new Date(dateActive).toISOString(),
      MaxQuote: maxQuote,
      LocationCode: locationCode,
      LocationName: locationName,
    });
  };

  const fetchLocations = async (page, term) => {
    setIsLoading(true);
    const response = await apiLocations.getLocation(page, term);
    const options = response.data.map((location) => ({
      value: location.Code,
      label: location.Name,
    }));
    setLocationList((prev) => [...prev, ...options]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLocations(page, searchTerm);
  }, [page, searchTerm]);

  const handleInputChange = (newValue) => {
    setSearchTerm(newValue);
    setPage(1);
    setLocationList([]);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative h-full w-full">
      {/* Input fields for MemberProduct */}
      <div className="flex flex-wrap justify-center items-start gap-3 text-sm w-full">
        <div className="flex flex-col justify-start items-start gap-y-2 w-72">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            className="px-3 py-2 border border-slate-300 rounded-md ring-1 focus:border-blue-500 focus:outline-none w-full"
            required
          />
        </div>

        <div className="flex flex-col justify-start items-start gap-y-2 w-72">
          <label htmlFor="location">Location</label>
          <Select
            options={locationList}
            onInputChange={handleInputChange}
            onChange={(selectedOption) => {
              setLocationCode(selectedOption.value);
              setLocationName(selectedOption.label);
            }}
            onMenuScrollToBottom={handleLoadMore}
            isLoading={isLoading}
            placeholder="Search Location"
            className="w-full ring-1 focus:border-blue-500 focus:outline-none rounded-md text-start text-sm"
            value={locationList.find((option) => option.value === locationCode)}
          />
        </div>

        <div className="flex justify-between items-center w-72 gap-x-2">
          <div className="flex flex-col justify-start items-start gap-y-2 w-1/2">
            <label htmlFor="vehicleType">Vehicle Type</label>
            <select
              name="vehicleType"
              id="vehicleType"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="px-3 py-[0.4rem] border border-slate-300 rounded-md ring-1 focus:border-blue-500 focus:outline-none w-full"
            >
              <option value="">Selected</option>
              <option value="Mobil">Mobil</option>
              <option value="Motor">Motor</option>
            </select>
          </div>

          <div className="flex flex-col justify-start items-start gap-y-2 w-1/2">
            <label htmlFor="maxQuote">Quota</label>
            <input
              type="number"
              id="maxQuote"
              value={maxQuote}
              onChange={(e) => setMaxQuote(Number(e.target.value))}
              placeholder="Quota Parking"
              className="px-3 py-2 border border-slate-300 rounded-md ring-1 focus:border-blue-500 focus:outline-none w-full no-spinner"
              required
            />
          </div>
        </div>

        <div className="flex flex-col justify-start items-start gap-y-2 w-72">
          <label htmlFor="dateActive">Date Activated</label>
          <input
            type="datetime-local"
            id="dateActive"
            value={dateActive}
            onChange={(e) => setDateActive(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-md ring-1 focus:border-blue-500 focus:outline-none w-full"
          />
        </div>

        <div className="flex flex-col justify-start items-start gap-y-2 w-full px-6">
          <label htmlFor="productDescription">Description</label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            cols="30"
            rows="5"
            className="px-3 py-2 border border-slate-300 rounded-md ring-1 focus:border-blue-500 focus:outline-none w-full"
            placeholder="Description product"
          ></textarea>
        </div>
      </div>
      <div className="py-4 border-t border-slate-200 flex justify-end items-end absolute bottom-0 w-full">
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
