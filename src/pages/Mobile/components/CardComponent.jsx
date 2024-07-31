import React from "react";

export default function CardComponent({ openModal, product }) {
  return (
    <div className="relative" onClick={openModal}>
      <img
        src={
          product.TypeVehicle === "Mobil"
            ? "/assets/card03.png"
            : "/assets/card02.png"
        }
        alt={product.LocationName || "Product Image"}
        className="w-64 m-auto"
      />
      <div className="absolute bottom-1 left-[5.5rem] text-white flex flex-row justify-center items-center space-x-2 mb-4">
        <p className="text-xs font-medium">
          {product.LocationName || "SKY Karawaci Office Park"}
        </p>
      </div>
    </div>
  );
}
