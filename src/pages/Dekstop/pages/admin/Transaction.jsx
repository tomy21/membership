import React, { useState } from "react";
import NavbarClient from "../../components/NavbarClient";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdAddCircleOutline,
} from "react-icons/io";
import { IoCloudDownloadOutline } from "react-icons/io5";
import TableTransaction from "./components/TableTransaction";

const dataTransaksi = [
  {
    id: 1,
    orderId: "MB0001",
    name: "Hypermart",
    email: "Hypermart",
    phone: "8123098111",
    location: "SKY Karawaci Office Park",
    jumlah: 100,
    price: 300000000,
    status: "New",
    createdOn: "01 Jan 2024 10:11",
  },
  {
    id: 2,
    orderId: "MB0002",
    name: "Hypermart",
    email: "Hypermart",
    phone: "8123098111",
    location: "SKY Karawaci Office Park",
    jumlah: 100,
    price: 300000000,
    status: "New",
    createdOn: "02 Jan 2024 17:11",
  },
  {
    id: 3,
    orderId: "MB0003",
    name: "Hypermart",
    email: "Hypermart",
    phone: "8123098111",
    location: "SKY Karawaci Office Park",
    jumlah: 100,
    price: 300000000,
    status: "New",
    createdOn: "03 Jan 2024 10:11",
  },
  {
    id: 4,
    orderId: "MB0004",
    name: "Hypermart",
    email: "Hypermart",
    phone: "8123098111",
    location: "SKY Karawaci Office Park",
    jumlah: 100,
    price: 300000000,
    status: "New",
    createdOn: "04 Jan 2024 10:11",
  },
  {
    id: 5,
    orderId: "MB0005",
    name: "Hypermart",
    email: "Hypermart",
    phone: "8123098111",
    location: "SKY Karawaci Office Park",
    jumlah: 100,
    price: 300000000,
    status: "Approve",
    createdOn: "05 Jan 2024 10:11",
  },
  {
    id: 6,
    orderId: "MB0006",
    name: "Hypermart",
    email: "Hypermart",
    phone: "8123098111",
    location: "SKY Karawaci Office Park",
    jumlah: 100,
    price: 300000000,
    status: "Approve",
    createdOn: "10 Jan 2024 10:11",
  },
  {
    id: 7,
    orderId: "MB0007",
    name: "Hypermart",
    email: "Hypermart",
    phone: "8123098111",
    location: "SKY Karawaci Office Park",
    jumlah: 100,
    price: 300000000,
    status: "On process",
    createdOn: "12 Jan 2024 14:11",
  },
  {
    id: 8,
    orderId: "MB0008",
    name: "Hypermart",
    email: "Hypermart",
    phone: "8123098111",
    location: "SKY Karawaci Office Park",
    jumlah: 100,
    price: 300000000,
    status: "Approve",
    createdOn: "13 Jan 2024 10:11",
  },
];

const itemsPerPage = 5;

const Transaction = () => {
  const [data, setData] = useState(dataTransaksi);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  const filteredData = data.filter((item) =>
    item.orderId.toLowerCase().includes(filter.toLowerCase())
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
      <NavbarClient client={false} />
      <div className="container mx-auto p-4 min-h-[88vh]">
        <div className="overflow-x-auto">
          <div className="flex justify-between mb-5">
            <div>
              <h1 className="text-start font-semibold text-xl">Transaction</h1>
            </div>
          </div>
          <div className="flex justify-between items-center mb-3">
            <input
              type="text"
              placeholder="Search order..."
              value={filter}
              onChange={handleFilterChange}
              className="border p-2 rounded-md text-xs w-52"
            />
            <div className="flex flex-row space-x-2">
              <div className="flex flex-row space-x-2 justify-end items-center text-blue-500 px-3 cursor-pointer hover:text-blue-800">
                <IoMdAddCircleOutline />
                <p className="text-xs">Add Order</p>
              </div>
              <div className="flex flex-row space-x-2 justify-end items-center text-emerald-500 border-l border-gray-300 cursor-pointer px-3 hover:text-emerald-800">
                <IoCloudDownloadOutline />
                <p className="text-xs">Export</p>
              </div>
            </div>
          </div>
          <div className="rounded-md">
            <TableTransaction dataTransaksi={paginatedData} />
            <div className="flex justify-between items-center mt-4 px-2 py-1 bg-red-200 rounded-b-xl">
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
};

export default Transaction;
