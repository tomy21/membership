import React from "react";
import ProductTable from "./Table/ProductTable";

export default function Product() {
  return (
    <>
      <div className="text-lg mb-5">Product</div>

      <div className="w-full bg-white h-screen rounded-md flex flex-col justify-start items-center">
        <ProductTable />
      </div>
    </>
  );
}
