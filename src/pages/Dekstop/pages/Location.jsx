import React, { useState } from "react";
import NavbarClient from "../components/NavbarClient";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const initialData = [
  // Data yang sama seperti sebelumnya
  {
    id: 1,
    createdAt: "2024-07-10 10:59",
    typeTransaction: "Membership",
    status: "Paid",
    memberId: "SKY0001",
    plateNumber: "B123ABC",
    location: "SKY Karawaci Office Park",
  },
  {
    id: 2,
    createdAt: "2024-07-10 10:59",
    typeTransaction: "Membership",
    status: "Paid",
    memberId: "SKY0002",
    plateNumber: "B123ABC",
    location: "SKY Karawaci Office Park",
  },
  {
    id: 3,
    createdAt: "2024-07-10 10:59",
    typeTransaction: "Membership",
    status: "Paid",
    memberId: "SKY0003",
    plateNumber: "B123ABC",
    location: "SKY Karawaci Office Park",
  },
  {
    id: 4,
    createdAt: "2024-07-10 10:59",
    typeTransaction: "Membership",
    status: "Paid",
    memberId: "SKY0004",
    plateNumber: "B123ABC",
    location: "SKY Karawaci Office Park",
  },
  {
    id: 5,
    createdAt: "2024-07-10 10:59",
    typeTransaction: "Membership",
    status: "Paid",
    memberId: "SKY0005",
    plateNumber: "B123ABC",
    location: "SKY Karawaci Office Park",
  },
  {
    id: 6,
    createdAt: "2024-07-10 10:59",
    typeTransaction: "Membership",
    status: "Paid",
    memberId: "SKY0006",
    plateNumber: "B123ABC",
    location: "SKY Karawaci Office Park",
  },
  {
    id: 7,
    createdAt: "2024-07-10 10:59",
    typeTransaction: "Membership",
    status: "Paid",
    memberId: "SKY0007",
    plateNumber: "B123ABC",
    location: "SKY Karawaci Office Park",
  },
  {
    id: 8,
    createdAt: "2024-07-10 10:59",
    typeTransaction: "Membership",
    status: "Paid",
    memberId: "SKY0007",
    plateNumber: "B123ABC",
    location: "SKY Karawaci Office Park",
  },
  {
    id: 9,
    createdAt: "2024-07-10 10:59",
    typeTransaction: "Membership",
    status: "Paid",
    memberId: "SKY0007",
    plateNumber: "B123ABC",
    location: "SKY Karawaci Office Park",
  },
  {
    id: 10,
    createdAt: "2024-07-10 10:59",
    typeTransaction: "Membership",
    status: "Paid",
    memberId: "SKY0007",
    plateNumber: "B123ABC",
    location: "SKY Karawaci Office Park",
  },
  {
    id: 11,
    createdAt: "2024-07-10 10:59",
    typeTransaction: "Membership",
    status: "Paid",
    memberId: "SKY0007",
    plateNumber: "B123ABC",
    location: "SKY Karawaci Office Park",
  },
  {
    id: 12,
    createdAt: "2024-07-10 10:59",
    typeTransaction: "Membership",
    status: "Paid",
    memberId: "SKY0007",
    plateNumber: "B123ABC",
    location: "SKY Karawaci Office Park",
  },
  {
    id: 13,
    createdAt: "2024-07-10 10:59",
    typeTransaction: "Membership",
    status: "Paid",
    memberId: "SKY0007",
    plateNumber: "B123ABC",
    location: "SKY Karawaci Office Park",
  },
];

const itemsPerPage = 10;

function Location() {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  const filteredData = data.filter((item) =>
    item.plateNumber.toLowerCase().includes(filter.toLowerCase())
  );

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedData = filteredData.slice(startIdx, endIdx);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  return (
    <>
      <NavbarClient />
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <div className="flex justify-between mb-5">
            <div>
              <h1 className="text-start font-semibold text-xl">Location</h1>
            </div>
          </div>
          <div className="flex justify-between items-center mb-3">
            <input
              type="text"
              placeholder="Search history..."
              value={filter}
              onChange={handleFilterChange}
              className="border p-2 rounded-md text-xs w-52"
            />
            <div className="flex flex-row space-x-2">
              <div className="flex flex-row space-x-2 justify-end items-center text-emerald-500 border-l border-gray-300 px-3">
                <IoCloudDownloadOutline />
                <p className="text-xs">Export</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-md">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member ID
                  </th>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type Transaction
                  </th>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plate Number
                  </th>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Satus
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={idx % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="p-2 text-start whitespace-nowrap text-xs font-medium text-gray-900">
                      {idx + 1}
                    </td>
                    <td className="p-2 text-start whitespace-nowrap text-xs text-gray-900">
                      {item.createdAt}
                    </td>
                    <td className="p-2 text-start whitespace-nowrap text-xs text-gray-900">
                      {item.location}
                    </td>
                    <td className="p-2 text-start whitespace-nowrap text-xs text-gray-900">
                      {item.memberId}
                    </td>
                    <td className="p-2 text-start whitespace-nowrap text-xs text-gray-900 flex items-center space-x-2">
                      {item.typeTransaction}
                    </td>
                    <td className="p-2 text-start whitespace-nowrap text-xs text-gray-900">
                      {item.plateNumber}
                    </td>
                    <td className="p-2 text-start whitespace-nowrap text-xs text-gray-900">
                      <span
                        className={`px-5 py-1 rounded-full text-xs font-reguler ${
                          item.status === "Paid"
                            ? "bg-green-100 text-green-500"
                            : item.status === "IN"
                            ? "bg-green-100 text-green-500"
                            : item.status === "Out"
                            ? "bg-red-100 text-red-500"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4 px-2 py-1 bg-gray-100">
              <span className="text-xs text-gray-500">Result 10 of 13</span>
              <div className="flex justify-center items-center">
                <span className="text-xs text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2"
                >
                  <IoIosArrowBack />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2"
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Location;
