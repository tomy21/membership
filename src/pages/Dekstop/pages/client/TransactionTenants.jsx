import React from "react";
import TransactionTable from "./Table/TransactionTable";

export default function TransactionTenants() {
  return (
    <>
      <div className="text-lg mb-5">Transaction</div>

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <TransactionTable />
      </div>
    </>
  );
}
