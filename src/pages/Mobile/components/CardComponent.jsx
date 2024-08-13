import React from "react";

export default function CardComponent({ openModal, product }) {
  return (
    <div className="relative" onClick={() => openModal(product)}>
      <img
        src={
          product.TypeVehicle === "Mobil"
            ? "/assets/card03.png"
            : "/assets/card02.png"
        }
        alt={product.PlateNumber || "Product Image"}
        className="w-64 m-auto "
      />
      <div className="absolute bottom-0 left-[4rem] text-white flex flex-row justify-center items-center space-x-2 mb-4 w-32 text-start">
        {product.PlateNumber}
      </div>
    </div>
  );
}
