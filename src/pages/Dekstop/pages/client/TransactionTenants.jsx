import React, { useState } from "react";
import TransactionTable from "./Table/OrderTenants/TransactionTable";
import { LuDownload } from "react-icons/lu";
import ModalOrders from "./Table/OrderTenants/Modal/ModalOrderAdd";

export default function TransactionTenants() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <div className="text-lg">Transaction</div>
        <div className="flex flex-row justify-end items-center space-x-4">
          <button className="text-xs rounded-md border border-emerald-500 text-emerald-500 px-3 py-2 flex flex-row justify-center items-center space-x-1 hover:bg-emerald-500 hover:text-white">
            <LuDownload />
            <p>Export</p>
          </button>
          <button
            className="text-xs rounded-md bg-sky-500 text-white px-3 py-2 border border-sky-500 hover:border-sky-500 hover:bg-transparent hover:text-sky-500"
            onClick={handleAddModal}
          >
            <p>Create Order</p>
          </button>
        </div>
      </div>

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center shadow-md">
        <TransactionTable />
      </div>

      {isModalOpen && (
        <ModalOrders isOpen={isModalOpen} onClose={handleClose} />
      )}
    </>
  );
}
