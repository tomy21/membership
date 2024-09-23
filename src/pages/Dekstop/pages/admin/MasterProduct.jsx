import React from "react";
import MasterProductTable from "./Table/MasterProductTable";

export default function MasterProduct() {
  return (
    <>
      <div className="text-lg mb-5">Master Product</div>

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <MasterProductTable />
      </div>
    </>
  );
}
